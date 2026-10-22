from sqlalchemy import select

from app.models import Membership
from tests.conftest import signup


def test_tenant_isolation(client, factory):
    first = signup(client)
    first_cookie = client.cookies["pp_session"]
    first_csrf = client.cookies["pp_csrf"]
    second = signup(client, "bia@example.com", "Bia Costa", "Studio Bia")
    client.cookies.set("pp_session", first_cookie, domain="127.0.0.1", path="/")
    client.headers["X-CSRF-Token"] = first_csrf
    listed = client.get("/api/v1/workspaces").json()["items"]
    assert [ws["id"] for ws in listed] == [first["workspace_id"]]
    assert (
        client.post(
            "/api/v1/workspaces/select",
            json={
                "workspace_id": second["workspace_id"],
            },
        ).status_code
        == 404
    )
    with factory() as db:
        other = db.scalar(
            select(Membership).where(
                Membership.workspace_id == second["workspace_id"],
            )
        )
        other_id = other.id
    response = client.patch(f"/api/v1/memberships/{other_id}", json={"role": "admin"})
    assert response.status_code == 404
    assert client.get("/api/v1/auth/session").json()["workspace_id"] == first["workspace_id"]


def test_member_cannot_manage_workspace_or_roles(client, factory):
    data = signup(client)
    with factory.begin() as db:
        member = db.scalar(select(Membership))
        member.role = "member"
        member_id = member.id
    assert (
        client.patch(
            "/api/v1/workspaces/current",
            json={
                "name": "Invadido",
                "timezone": "UTC",
            },
        ).status_code
        == 403
    )
    response = client.patch(f"/api/v1/memberships/{member_id}", json={"role": "admin"})
    assert response.status_code == 403
    assert client.get("/api/v1/workspaces").json()["items"][0]["id"] == data["workspace_id"]


def test_workspace_create_switch_and_update(client):
    signup(client)
    second = client.post("/api/v1/workspaces", json={"name": "Equipe", "timezone": "UTC"})
    assert second.status_code == 201
    assert (
        client.post(
            "/api/v1/workspaces/select",
            json={
                "workspace_id": second.json()["id"],
            },
        ).status_code
        == 200
    )
    result = client.patch(
        "/api/v1/workspaces/current",
        json={
            "name": "Equipe criativa",
            "timezone": "America/Manaus",
        },
    )
    assert result.status_code == 200
    assert len(result.json()["workspaces"]) == 2


def test_owner_cannot_demote_self(client, factory):
    signup(client)
    with factory() as db:
        member_id = db.scalar(select(Membership)).id
    response = client.patch(f"/api/v1/memberships/{member_id}", json={"role": "member"})
    assert response.status_code == 409


def test_dashboard_contains_workspace_data(client):
    signup(client)
    dashboard = client.get("/api/v1/dashboard").json()
    assert dashboard["members"] == 1
    assert dashboard["metrics"] is None
    assert dashboard["content_available"] is False
    assert dashboard["activity"][0]["action"] == "auth.register"
    assert client.get("/api/v1/memberships?limit=101").status_code == 422
