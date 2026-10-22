"""Dedicated E2E server; refuses to run against normal application databases."""

import os

import uvicorn
from alembic import command
from alembic.config import Config

if __name__ == "__main__":
    if os.getenv("E2E_TEST_MODE") != "1" or os.getenv("DATABASE_URL") != "sqlite:///./e2e.db":
        raise RuntimeError("Use apenas o banco SQLite e2e.db descartável neste servidor.")
    command.upgrade(Config("alembic.ini"), "head")
    uvicorn.run("app.main:app", host="127.0.0.1", port=8001, access_log=False)
