from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Membership, User, Workspace


def user_by_email(db: Session, email: str) -> User | None:
    return db.scalar(select(User).where(User.email == email.lower()))


def membership(db: Session, user_id: str, workspace_id: str) -> Membership | None:
    return db.scalar(
        select(Membership).where(
            Membership.user_id == user_id,
            Membership.workspace_id == workspace_id,
        )
    )


def workspace_list(db: Session, user_id: str) -> list[dict]:
    rows = db.execute(
        select(Workspace, Membership.role)
        .join(
            Membership,
            Membership.workspace_id == Workspace.id,
        )
        .where(Membership.user_id == user_id)
        .order_by(Workspace.created_at)
    ).all()
    return [
        {"id": ws.id, "name": ws.name, "timezone": ws.timezone, "role": role} for ws, role in rows
    ]
