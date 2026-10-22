import os

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.engine import make_url
from sqlalchemy.orm import sessionmaker

from app.core.config import Settings, get_settings
from app.db import Base, get_db, make_engine
from app.main import app


@pytest.fixture
def factory(tmp_path):
    url = os.getenv("TEST_DATABASE_URL", f"sqlite:///{tmp_path / 'test.db'}")
    if not url.startswith("sqlite") and "postpilot_test" not in (make_url(url).database or ""):
        pytest.fail("Use um banco descartável com postpilot_test no nome para estes testes.")
    engine = make_engine(url)
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    factory = sessionmaker(engine, expire_on_commit=False)
    yield factory
    Base.metadata.drop_all(engine)
    engine.dispose()


@pytest.fixture
def client(factory):
    def override_db():
        with factory() as db:
            yield db

    app.dependency_overrides[get_db] = override_db
    app.dependency_overrides[get_settings] = lambda: Settings(_env_file=None)
    with TestClient(
        app, base_url="http://127.0.0.1:3000", headers={"Origin": "http://127.0.0.1:3000"}
    ) as client:
        yield client
    app.dependency_overrides.clear()


def signup(client, email="ana@example.com", name="Ana Silva", workspace="Studio Ana"):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "name": name,
            "workspace_name": workspace,
            "email": email,
            "password": "uma-senha-segura-2026",
        },
    )
    assert response.status_code == 201, response.text
    client.headers["X-CSRF-Token"] = client.cookies["pp_csrf"]
    return response.json()
