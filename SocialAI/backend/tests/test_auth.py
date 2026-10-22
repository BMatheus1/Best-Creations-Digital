import re
from datetime import timedelta

from sqlalchemy import select

from app.core.security import digest, utcnow
from app.models import ActionToken, AuthSession, EmailOutbox, Membership, User, Workspace
from tests.conftest import signup


def email_token(factory, purpose):
    with factory() as db:
        subject = "Redefina%" if purpose == "reset" else "Confirme%"
        message = db.scalar(select(EmailOutbox).where(EmailOutbox.subject.like(subject)))
        return re.search(r"#token=([\w-]+)", message.body).group(1)


def test_registration_atomic_and_cookie_security(client, factory):
    data = signup(client)
    assert data["workspaces"][0]["role"] == "owner"
    assert data["workspace_id"] == data["workspaces"][0]["id"]
    with factory() as db:
        user = db.scalar(select(User))
        assert user.password_hash.startswith("$argon2id$")
        assert db.scalar(select(Workspace)).name == "Studio Ana"
        assert db.scalar(select(Membership)).user_id == user.id
        assert db.scalar(select(AuthSession)).token_hash == digest(client.cookies["pp_session"])
    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "ana@example.com",
            "password": "uma-senha-segura-2026",
        },
    )
    assert "HttpOnly" in response.headers.get_list("set-cookie")[0]
    assert "SameSite=lax" in response.headers.get_list("set-cookie")[0]


def test_invalid_registration_and_no_secret_in_error(client, factory):
    password = "shortsecret"
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "bad",
            "password": password,
            "name": "A",
            "workspace_name": "  ",
        },
    )
    assert response.status_code == 422
    assert password not in response.text
    with factory() as db:
        assert db.scalar(select(User)) is None


def test_duplicate_registration(client):
    signup(client)
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "ANA@example.com",
            "password": "uma-senha-segura-2026",
            "name": "Ana Silva",
            "workspace_name": "Studio",
        },
    )
    assert response.status_code == 409


def test_login_logout_and_session_revocation(client):
    signup(client)
    old_token = client.cookies["pp_session"]
    assert client.post("/api/v1/auth/logout").status_code == 204
    assert client.get("/api/v1/auth/session").status_code == 401
    client.cookies.set("pp_session", old_token)
    assert client.get("/api/v1/auth/session").status_code == 401


def test_wrong_login_is_generic(client):
    signup(client)
    for email in ["ana@example.com", "unknown@example.com"]:
        response = client.post(
            "/api/v1/auth/login",
            json={
                "email": email,
                "password": "uma-senha-incorreta-2026",
            },
        )
        assert response.status_code == 401
        assert response.json()["detail"] == "Email ou senha incorretos."


def test_expired_and_anonymous_session(client, factory):
    assert client.get("/api/v1/auth/session").status_code == 401
    signup(client)
    with factory.begin() as db:
        db.scalar(select(AuthSession)).expires_at = utcnow() - timedelta(seconds=1)
    assert client.get("/api/v1/auth/session").status_code == 401


def test_csrf_and_origin(client):
    signup(client)
    client.headers.pop("X-CSRF-Token")
    assert client.post("/api/v1/auth/logout").status_code == 403
    response = client.post(
        "/api/v1/auth/login",
        headers={"Origin": "https://evil.example"},
        json={"email": "a@example.com", "password": "123456789012"},
    )
    assert response.status_code == 403


def test_verify_email_one_time(client, factory):
    signup(client)
    token = email_token(factory, "verify")
    assert client.post("/api/v1/auth/verify-email", json={"token": token}).status_code == 200
    assert client.get("/api/v1/auth/session").json()["user"]["email_verified"] is True
    assert client.post("/api/v1/auth/verify-email", json={"token": token}).status_code == 400


def test_recovery_resets_password_and_revokes_sessions(client, factory):
    signup(client)
    result = client.post("/api/v1/auth/forgot-password", json={"email": "ana@example.com"})
    unknown = client.post("/api/v1/auth/forgot-password", json={"email": "nobody@example.com"})
    assert result.json() == unknown.json()
    token = email_token(factory, "reset")
    payload = {"token": token, "password": "uma-senha-nova-segura"}
    assert client.post("/api/v1/auth/reset-password", json=payload).status_code == 200
    assert client.get("/api/v1/auth/session").status_code == 401
    assert client.post("/api/v1/auth/reset-password", json=payload).status_code == 400
    assert (
        client.post(
            "/api/v1/auth/login",
            json={
                "email": "ana@example.com",
                "password": payload["password"],
            },
        ).status_code
        == 200
    )


def test_expired_action_token(client, factory):
    signup(client)
    token = email_token(factory, "verify")
    with factory.begin() as db:
        db.scalar(select(ActionToken)).expires_at = utcnow() - timedelta(seconds=1)
    assert client.post("/api/v1/auth/verify-email", json={"token": token}).status_code == 400


def test_rate_limit_persisted(client):
    statuses = [
        client.post(
            "/api/v1/auth/login",
            json={
                "email": "unknown@example.com",
                "password": "123456789012",
            },
        ).status_code
        for _ in range(11)
    ]
    assert statuses[-1] == 429


def test_profile_validation_and_mass_assignment(client):
    signup(client)
    assert (
        client.patch(
            "/api/v1/users/me",
            json={
                "name": "Ana Maria",
                "timezone": "Mars/Olympus",
            },
        ).status_code
        == 422
    )
    assert (
        client.patch(
            "/api/v1/users/me",
            json={
                "name": "Ana Maria",
                "timezone": "UTC",
                "email_verified_at": "2026-01-01",
            },
        ).status_code
        == 422
    )
    response = client.patch("/api/v1/users/me", json={"name": "Ana Maria", "timezone": "UTC"})
    assert response.status_code == 200
    assert response.json()["user"]["name"] == "Ana Maria"


def test_revoke_all_sessions(client):
    signup(client)
    assert client.post("/api/v1/auth/revoke-sessions").status_code == 204
    assert client.get("/api/v1/auth/session").status_code == 401


def test_body_size_limit(client):
    assert client.post("/api/v1/auth/login", content="x" * 65537).status_code == 413
