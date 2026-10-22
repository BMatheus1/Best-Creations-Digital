"""Durable SMTP outbox. This is NOT the future Instagram publication worker."""

import json
import logging
import signal
import smtplib
import ssl
import time
from datetime import timedelta
from email.message import EmailMessage

from sqlalchemy import delete, or_, select

from app.core.config import get_settings
from app.core.security import utcnow
from app.db import SessionLocal
from app.models import ActionToken, AuthSession, EmailOutbox, RateBucket

logger = logging.getLogger("postpilot.email")
logging.basicConfig(level=logging.INFO, format="%(message)s")
running = True


def deliver_one() -> bool:
    settings = get_settings()
    now = utcnow()
    with SessionLocal.begin() as db:
        row = db.scalar(
            select(EmailOutbox)
            .where(
                EmailOutbox.sent_at.is_(None),
                EmailOutbox.attempts < 5,
                EmailOutbox.available_at <= now,
                or_(EmailOutbox.claimed_until.is_(None), EmailOutbox.claimed_until < now),
            )
            .order_by(EmailOutbox.created_at)
            .with_for_update(skip_locked=True)
            .limit(1)
        )
        if row is None:
            return False
        row.claimed_until = now + timedelta(minutes=2)
        row.attempts += 1
        job_id, attempt = row.id, row.attempts
        message = EmailMessage()
        message["From"], message["To"] = settings.smtp_from, row.recipient
        message["Subject"] = row.subject
        message["Message-ID"] = f"<{row.id}@postpilot>"
        message.set_content(row.body)
    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as smtp:
            if settings.smtp_starttls:
                smtp.starttls(context=ssl.create_default_context())
            if settings.smtp_username:
                smtp.login(settings.smtp_username, settings.smtp_password)
            smtp.send_message(message)
    except (OSError, smtplib.SMTPException):
        with SessionLocal.begin() as db:
            row = db.get(EmailOutbox, job_id)
            row.claimed_until = None
            row.available_at = utcnow() + timedelta(seconds=min(3600, 30 * 2**attempt))
        logger.warning(json.dumps({"event": "email.failed", "job_id": job_id, "attempt": attempt}))
    else:
        with SessionLocal.begin() as db:
            row = db.get(EmailOutbox, job_id)
            row.sent_at, row.claimed_until, row.body = utcnow(), None, ""
        logger.info(json.dumps({"event": "email.sent", "job_id": job_id}))
    return True


def cleanup() -> None:
    with SessionLocal.begin() as db:
        now = utcnow()
        db.execute(delete(RateBucket).where(RateBucket.expires_at < now))
        db.execute(delete(ActionToken).where(ActionToken.expires_at < now - timedelta(days=1)))
        db.execute(delete(AuthSession).where(AuthSession.expires_at < now - timedelta(days=7)))
        # Failed messages contain one-time links; delete after their useful lifetime.
        db.execute(delete(EmailOutbox).where(EmailOutbox.created_at < now - timedelta(days=2)))


def stop(_signum, _frame):
    global running
    running = False


if __name__ == "__main__":
    signal.signal(signal.SIGINT, stop)
    signal.signal(signal.SIGTERM, stop)
    ticks = 0
    while running:
        try:
            if ticks % 60 == 0:
                cleanup()
            if not deliver_one():
                time.sleep(2)
        except Exception as exc:
            logger.error(
                json.dumps({"event": "email.worker_error", "error_type": type(exc).__name__})
            )
            time.sleep(5)
        ticks += 1
