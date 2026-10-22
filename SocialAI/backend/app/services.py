import secrets
from datetime import timedelta

from fastapi import HTTPException, Request, Response
from sqlalchemy import select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app import repositories
from app.core.config import Settings
from app.core.security import (
    DUMMY_HASH,
    aware,
    digest,
    new_secret,
    password_hasher,
    utcnow,
)
from app.models import (
    ActionToken,
    AuditLog,
    AuthSession,
    EmailOutbox,
    Membership,
    RateBucket,
    User,
    Workspace,
)
from app.schemas import Credentials, Registration

COOKIE_NAME = "pp_session"
CSRF_COOKIE = "pp_csrf"


def audit(db: Session, action: str, user_id: str, workspace_id: str | None = None) -> None:
    db.add(AuditLog(action=action, user_id=user_id, workspace_id=workspace_id))


def rate_limit(db: Session, identity: str, limit: int = 10, seconds: int = 900) -> None:
    """Atomic counter shared by API processes; database time windows, no in-memory state."""
    now = utcnow()
    window = int(now.timestamp()) // seconds
    key = digest(f"{identity}:{window}")
    try:
        with db.begin_nested():
            db.add(RateBucket(key=key, attempts=0, expires_at=now + timedelta(seconds=seconds)))
            db.flush()
    except IntegrityError:
        pass
    count = db.scalar(
        update(RateBucket)
        .where(RateBucket.key == key)
        .values(attempts=RateBucket.attempts + 1)
        .returning(RateBucket.attempts)
    )
    db.commit()
    if count is not None and count > limit:
        raise HTTPException(
            429, "Muitas tentativas. Aguarde alguns minutos.", headers={"Retry-After": str(seconds)}
        )


def issue_email(db: Session, settings: Settings, user: User, purpose: str) -> None:
    if not settings.email_enabled:
        raise HTTPException(503, "O envio de email não está configurado.")
    now = utcnow()
    db.execute(
        update(ActionToken)
        .where(
            ActionToken.user_id == user.id,
            ActionToken.purpose == purpose,
            ActionToken.consumed_at.is_(None),
        )
        .values(consumed_at=now)
    )
    token = new_secret()
    db.add(
        ActionToken(
            user_id=user.id,
            purpose=purpose,
            token_hash=digest(token),
            expires_at=now + timedelta(hours=24 if purpose == "verify" else 1),
        )
    )
    path = "verify-email" if purpose == "verify" else "reset-password"
    title = "Confirme seu email" if purpose == "verify" else "Redefina sua senha"
    # Fragment avoids putting the one-time secret in proxy access logs / referrers.
    link = f"{settings.frontend_url}/{path}#token={token}"
    db.add(
        EmailOutbox(
            recipient=user.email,
            subject=f"{title} · PostPilot",
            body=f"{title} no PostPilot:\n\n{link}\n\n"
            "Se você não fez esta solicitação, ignore esta mensagem.",
        )
    )


def consume_token(db: Session, raw: str, purpose: str) -> User:
    now = utcnow()
    user_id = db.scalar(
        update(ActionToken)
        .where(
            ActionToken.token_hash == digest(raw),
            ActionToken.purpose == purpose,
            ActionToken.consumed_at.is_(None),
            ActionToken.expires_at > now,
        )
        .values(consumed_at=now)
        .returning(ActionToken.user_id)
    )
    if user_id is None:
        raise HTTPException(400, "Este link expirou ou já foi utilizado.")
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(400, "Link inválido.")
    return user


def session_cookies(response: Response, token: str, csrf: str, settings: Settings) -> None:
    options = {
        "secure": settings.cookie_secure,
        "samesite": "lax",
        "path": "/",
        "max_age": settings.session_hours * 3600,
    }
    response.set_cookie(COOKIE_NAME, token, httponly=True, **options)
    response.set_cookie(CSRF_COOKIE, csrf, httponly=False, **options)


def create_session(
    db: Session, user: User, workspace_id: str, response: Response, settings: Settings
) -> AuthSession:
    token, csrf = new_secret(), new_secret()
    session = AuthSession(
        user_id=user.id,
        workspace_id=workspace_id,
        token_hash=digest(token),
        csrf_hash=digest(csrf),
        expires_at=utcnow() + timedelta(hours=settings.session_hours),
    )
    db.add(session)
    session_cookies(response, token, csrf, settings)
    return session


def register(db: Session, data: Registration, response: Response, settings: Settings) -> dict:
    if repositories.user_by_email(db, str(data.email)):
        raise HTTPException(409, "Este email já está cadastrado. Entre ou recupere sua senha.")
    user = User(
        email=str(data.email), name=data.name, password_hash=password_hasher.hash(data.password)
    )
    workspace = Workspace(name=data.workspace_name)
    db.add_all([user, workspace])
    try:
        db.flush()
        db.add(Membership(user_id=user.id, workspace_id=workspace.id, role="owner"))
        session = create_session(db, user, workspace.id, response, settings)
        issue_email(db, settings, user, "verify")
        audit(db, "auth.register", user.id, workspace.id)
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(
            409, "Não foi possível concluir o cadastro. Confira seu email."
        ) from exc
    return session_payload(db, user, session)


def login(db: Session, data: Credentials, response: Response, settings: Settings) -> dict:
    user = repositories.user_by_email(db, str(data.email))
    valid = password_hasher.verify(data.password, user.password_hash if user else DUMMY_HASH)
    if not valid or user is None:
        raise HTTPException(401, "Email ou senha incorretos.")
    member = db.scalar(
        select(Membership).where(Membership.user_id == user.id).order_by(Membership.created_at)
    )
    if member is None:
        raise HTTPException(403, "Nenhum workspace disponível para esta conta.")
    session = create_session(db, user, member.workspace_id, response, settings)
    audit(db, "auth.login", user.id, member.workspace_id)
    db.commit()
    return session_payload(db, user, session)


def authenticate(db: Session, request: Request) -> tuple[User, AuthSession, Membership]:
    token = request.cookies.get(COOKIE_NAME)
    session = (
        db.scalar(select(AuthSession).where(AuthSession.token_hash == digest(token)))
        if token
        else None
    )
    if session is None or session.revoked_at or aware(session.expires_at) <= utcnow():
        raise HTTPException(401, "Sua sessão expirou. Entre novamente.")
    user = db.get(User, session.user_id)
    member = repositories.membership(db, session.user_id, session.workspace_id)
    if user is None or member is None:
        raise HTTPException(403, "Você não tem acesso a este workspace.")
    if request.method not in {"GET", "HEAD", "OPTIONS"}:
        csrf = request.headers.get("X-CSRF-Token", "")
        if not secrets.compare_digest(digest(csrf), session.csrf_hash):
            raise HTTPException(403, "Solicitação inválida. Atualize a página e tente novamente.")
    return user, session, member


def session_payload(db: Session, user: User, session: AuthSession) -> dict:
    return {
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "timezone": user.timezone,
            "email_verified": bool(user.email_verified_at),
        },
        "workspaces": repositories.workspace_list(db, user.id),
        "workspace_id": session.workspace_id,
    }


def require_manager(member: Membership) -> None:
    if member.role not in {"owner", "admin"}:
        raise HTTPException(403, "Somente administradores podem alterar o workspace.")
