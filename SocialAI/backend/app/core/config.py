from functools import lru_cache
from typing import Literal
from urllib.parse import urlparse

from pydantic import model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    app_env: Literal["development", "test", "production"] = "development"
    database_url: str = "sqlite:///./postpilot.db"
    frontend_url: str = "http://127.0.0.1:3000"
    cookie_secure: bool = False
    session_hours: int = 168
    smtp_host: str = "localhost"
    smtp_port: int = 1025
    smtp_username: str = ""
    smtp_password: str = ""
    smtp_starttls: bool = False
    smtp_from: str = "PostPilot <contato@postpilot.local>"
    email_enabled: bool = True

    @model_validator(mode="after")
    def production_safety(self) -> "Settings":
        if not 1 <= self.session_hours <= 720:
            raise ValueError("session_hours deve estar entre 1 e 720")
        parsed = urlparse(self.frontend_url)
        if parsed.scheme not in {"http", "https"} or not parsed.netloc:
            raise ValueError("FRONTEND_URL inválida")
        if parsed.path not in {"", "/"} or parsed.query or parsed.fragment:
            raise ValueError("FRONTEND_URL deve ser uma origem, sem caminho")
        self.frontend_url = self.frontend_url.rstrip("/")
        if self.app_env == "production":
            if not self.database_url.startswith("postgresql+psycopg://"):
                raise ValueError("Produção exige PostgreSQL com psycopg")
            if not self.cookie_secure or parsed.scheme != "https":
                raise ValueError("Produção exige HTTPS e cookies Secure")
            if not self.email_enabled or not self.smtp_starttls:
                raise ValueError("Produção exige SMTP com STARTTLS")
        return self


@lru_cache
def get_settings() -> Settings:
    return Settings()
