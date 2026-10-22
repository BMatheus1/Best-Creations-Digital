import socketserver
import threading
from concurrent.futures import ThreadPoolExecutor

import pytest
from fastapi import HTTPException
from pydantic import ValidationError
from sqlalchemy import select

from app import email_worker, services
from app.core.config import Settings
from app.models import EmailOutbox
from tests.conftest import signup
from tests.test_auth import email_token


def test_configuration_rejects_unsafe_production():
    with pytest.raises(ValidationError):
        Settings(app_env="production", _env_file=None)
    settings = Settings(
        app_env="production",
        database_url="postgresql+psycopg:///postpilot",
        frontend_url="https://app.example.com",
        cookie_secure=True,
        smtp_starttls=True,
        _env_file=None,
    )
    assert settings.cookie_secure is True


def test_token_concurrent_consumption_has_only_one_winner(client, factory):
    signup(client)
    token = email_token(factory, "verify")

    def consume():
        with factory.begin() as db:
            try:
                services.consume_token(db, token, "verify")
                return 200
            except HTTPException as exc:
                return exc.status_code

    with ThreadPoolExecutor(max_workers=2) as executor:
        statuses = list(executor.map(lambda _: consume(), range(2)))
    assert sorted(statuses) == [200, 400]


def test_smtp_delivery_over_real_local_socket(client, factory, monkeypatch):
    """Local protocol capture, not delivery to an external mailbox."""
    signup(client)
    received = []

    class SMTPHandler(socketserver.StreamRequestHandler):
        def handle(self):
            self.wfile.write(b"220 localhost PostPilot test\r\n")
            while line := self.rfile.readline():
                command = line.upper()
                if command.startswith(b"DATA"):
                    self.wfile.write(b"354 End with dot\r\n")
                    body = bytearray()
                    while (part := self.rfile.readline()) not in {b".\r\n", b""}:
                        body.extend(part)
                    received.append(bytes(body))
                    self.wfile.write(b"250 Accepted\r\n")
                elif command.startswith(b"QUIT"):
                    self.wfile.write(b"221 Bye\r\n")
                    return
                else:
                    self.wfile.write(b"250 OK\r\n")

    with socketserver.TCPServer(("127.0.0.1", 0), SMTPHandler) as server:
        server.timeout = 10
        thread = threading.Thread(target=server.handle_request, daemon=True)
        thread.start()
        monkeypatch.setattr(email_worker, "SessionLocal", factory)
        monkeypatch.setattr(
            email_worker,
            "get_settings",
            lambda: Settings(
                smtp_host="127.0.0.1",
                smtp_port=server.server_address[1],
                _env_file=None,
            ),
        )
        assert email_worker.deliver_one() is True
        thread.join(timeout=5)
    assert len(received) == 1
    assert b"ana@example.com" in received[0]
    assert b"/verify-email#token=" in received[0]
    with factory() as db:
        assert db.scalar(select(EmailOutbox)).sent_at is not None
