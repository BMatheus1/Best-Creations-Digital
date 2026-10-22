import smtplib
from unittest.mock import MagicMock, patch

from sqlalchemy import select

from app import email_worker
from app.models import EmailOutbox
from tests.conftest import signup


def test_email_outbox_delivery_scrubs_body(client, factory, monkeypatch):
    signup(client)
    monkeypatch.setattr(email_worker, "SessionLocal", factory)
    smtp = MagicMock()
    with patch("app.email_worker.smtplib.SMTP", return_value=smtp):
        assert email_worker.deliver_one() is True
    smtp.__enter__.return_value.send_message.assert_called_once()
    with factory() as db:
        message = db.scalar(select(EmailOutbox))
        assert message.sent_at is not None
        assert message.body == ""
    assert email_worker.deliver_one() is False


def test_email_failure_is_persistent_and_delayed(client, factory, monkeypatch):
    signup(client)
    monkeypatch.setattr(email_worker, "SessionLocal", factory)
    with patch("app.email_worker.smtplib.SMTP", side_effect=smtplib.SMTPException):
        assert email_worker.deliver_one() is True
    with factory() as db:
        message = db.scalar(select(EmailOutbox))
        assert message.attempts == 1
        assert message.sent_at is None
        assert message.claimed_until is None
    assert email_worker.deliver_one() is False
