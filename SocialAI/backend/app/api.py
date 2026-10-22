from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy import func, select, update
from sqlalchemy.orm import Session

from app import repositories, services
from app.core.config import Settings, get_settings
from app.core.security import aware, utcnow, validate_timezone
from app.db import get_db
from app.models import AuditLog, AuthSession, Membership, User, Workspace
from app.schemas import (
    Credentials,
    EmailInput,
    ProfileInput,
    Registration,
    ResetInput,
    RoleInput,
    SelectWorkspaceInput,
    TokenInput,
    WorkspaceInput,
)

router = APIRouter(prefix="/api/v1")
DB = Annotated[Session, Depends(get_db)]
Config = Annotated[Settings, Depends(get_settings)]


def current(request: Request, db: DB) -> tuple[User, AuthSession, Membership]:
    return services.authenticate(db, request)


Auth = Annotated[tuple[User, AuthSession, Membership], Depends(current)]


def throttle(request: Request, db: Session, action: str, email: str = "") -> None:
    # Do not trust X-Forwarded-For from arbitrary clients. Configure trusted proxy in deployment.
    ip = request.client.host if request.client else "unknown"
    services.rate_limit(db, f"{action}:ip:{ip}", limit=30)
    if email:
        services.rate_limit(db, f"{action}:email:{email.lower()}", limit=10)


@router.post("/auth/register", status_code=201, tags=["auth"])
def register(data: Registration, request: Request, response: Response, db: DB, settings: Config):
    throttle(request, db, "register", str(data.email))
    return services.register(db, data, response, settings)


@router.post("/auth/login", tags=["auth"])
def login(data: Credentials, request: Request, response: Response, db: DB, settings: Config):
    throttle(request, db, "login", str(data.email))
    return services.login(db, data, response, settings)


@router.get("/auth/session", tags=["auth"])
def session(auth: Auth, db: DB):
    return services.session_payload(db, auth[0], auth[1])


@router.post("/auth/logout", status_code=204, tags=["auth"])
def logout(auth: Auth, db: DB, response: Response):
    auth[1].revoked_at = utcnow()
    services.audit(db, "auth.logout", auth[0].id, auth[1].workspace_id)
    db.commit()
    response.delete_cookie(services.COOKIE_NAME, path="/")
    response.delete_cookie(services.CSRF_COOKIE, path="/")


@router.post("/auth/revoke-sessions", status_code=204, tags=["auth"])
def revoke_sessions(auth: Auth, db: DB, response: Response):
    db.execute(
        update(AuthSession).where(AuthSession.user_id == auth[0].id).values(revoked_at=utcnow())
    )
    services.audit(db, "auth.revoke_sessions", auth[0].id, auth[1].workspace_id)
    db.commit()
    response.delete_cookie(services.COOKIE_NAME, path="/")
    response.delete_cookie(services.CSRF_COOKIE, path="/")


@router.post("/auth/forgot-password", tags=["auth"])
def forgot(data: EmailInput, request: Request, db: DB, settings: Config):
    throttle(request, db, "forgot", str(data.email))
    user = repositories.user_by_email(db, str(data.email))
    if user:
        services.issue_email(db, settings, user, "reset")
        db.commit()
    return {"message": "Se o email estiver cadastrado, enviaremos um link de recuperação."}


@router.post("/auth/reset-password", tags=["auth"])
def reset(data: ResetInput, request: Request, db: DB):
    throttle(request, db, "reset")
    user = services.consume_token(db, data.token, "reset")
    user.password_hash = services.password_hasher.hash(data.password)
    db.execute(
        update(AuthSession).where(AuthSession.user_id == user.id).values(revoked_at=utcnow())
    )
    services.audit(db, "auth.reset_password", user.id)
    db.commit()
    return {"message": "Senha atualizada. Entre novamente com sua nova senha."}


@router.post("/auth/verify-email", tags=["auth"])
def verify(data: TokenInput, request: Request, db: DB):
    throttle(request, db, "verify")
    user = services.consume_token(db, data.token, "verify")
    user.email_verified_at = utcnow()
    services.audit(db, "auth.verify_email", user.id)
    db.commit()
    return {"message": "Email confirmado com sucesso."}


@router.post("/auth/resend-verification", tags=["auth"])
def resend(auth: Auth, request: Request, db: DB, settings: Config):
    throttle(request, db, "resend", auth[0].email)
    if not auth[0].email_verified_at:
        services.issue_email(db, settings, auth[0], "verify")
        db.commit()
    return {"message": "Se necessário, um novo link será enviado para seu email."}


@router.patch("/users/me", tags=["users"])
def update_profile(data: ProfileInput, auth: Auth, db: DB):
    auth[0].name, auth[0].timezone = data.name, validate_timezone(data.timezone)
    services.audit(db, "profile.updated", auth[0].id, auth[1].workspace_id)
    db.commit()
    return services.session_payload(db, auth[0], auth[1])


@router.get("/workspaces", tags=["workspaces"])
def workspaces(auth: Auth, db: DB):
    return {"items": repositories.workspace_list(db, auth[0].id)}


@router.post("/workspaces", status_code=201, tags=["workspaces"])
def create_workspace(data: WorkspaceInput, auth: Auth, request: Request, db: DB):
    throttle(request, db, "workspace", auth[0].email)
    ws = Workspace(name=data.name, timezone=validate_timezone(data.timezone))
    db.add(ws)
    db.flush()
    db.add(Membership(workspace_id=ws.id, user_id=auth[0].id, role="owner"))
    services.audit(db, "workspace.created", auth[0].id, ws.id)
    db.commit()
    return {"id": ws.id, "name": ws.name, "timezone": ws.timezone, "role": "owner"}


@router.post("/workspaces/select", tags=["workspaces"])
def select_workspace(data: SelectWorkspaceInput, auth: Auth, db: DB):
    if repositories.membership(db, auth[0].id, data.workspace_id) is None:
        raise HTTPException(404, "Workspace não encontrado.")
    auth[1].workspace_id = data.workspace_id
    db.commit()
    return services.session_payload(db, auth[0], auth[1])


@router.patch("/workspaces/current", tags=["workspaces"])
def update_workspace(data: WorkspaceInput, auth: Auth, db: DB):
    services.require_manager(auth[2])
    ws = db.get(Workspace, auth[1].workspace_id)
    if ws is None:
        raise HTTPException(404, "Workspace não encontrado.")
    ws.name, ws.timezone = data.name, validate_timezone(data.timezone)
    services.audit(db, "workspace.updated", auth[0].id, ws.id)
    db.commit()
    return services.session_payload(db, auth[0], auth[1])


@router.get("/memberships", tags=["memberships"])
def members(auth: Auth, db: DB, offset: int = 0, limit: int = 50):
    if offset < 0 or not 1 <= limit <= 100:
        raise HTTPException(422, "Paginação inválida.")
    rows = db.execute(
        select(Membership, User)
        .join(User, User.id == Membership.user_id)
        .where(Membership.workspace_id == auth[1].workspace_id)
        .order_by(Membership.created_at)
        .offset(offset)
        .limit(limit)
    ).all()
    return {"items": [{"id": m.id, "name": u.name, "role": m.role} for m, u in rows]}


@router.patch("/memberships/{member_id}", tags=["memberships"])
def change_role(member_id: str, data: RoleInput, auth: Auth, db: DB):
    if auth[2].role != "owner":
        raise HTTPException(403, "Somente o proprietário pode alterar permissões.")
    member = db.scalar(
        select(Membership).where(
            Membership.id == member_id,
            Membership.workspace_id == auth[1].workspace_id,
        )
    )
    if member is None:
        raise HTTPException(404, "Membro não encontrado.")
    if member.role == "owner":
        raise HTTPException(409, "A propriedade do workspace não pode ser alterada por esta ação.")
    member.role = data.role
    services.audit(db, "membership.role_updated", auth[0].id, member.workspace_id)
    db.commit()
    return {"id": member.id, "role": member.role}


@router.get("/dashboard", tags=["dashboard"])
def dashboard(auth: Auth, db: DB):
    workspace_id = auth[1].workspace_id
    count = db.scalar(
        select(func.count()).select_from(Membership).where(Membership.workspace_id == workspace_id)
    )
    events = db.scalars(
        select(AuditLog)
        .where(AuditLog.workspace_id == workspace_id)
        .order_by(AuditLog.created_at.desc())
        .limit(5)
    ).all()
    return {
        "members": count,
        "activity": [
            {"id": event.id, "action": event.action, "created_at": aware(event.created_at)}
            for event in events
        ],
        "content_available": False,
        "metrics": None,
        "upcoming_posts": [],
        "integrations": {"instagram": "not_implemented", "billing": "not_implemented"},
    }
