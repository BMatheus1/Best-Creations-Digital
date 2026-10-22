from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class StrictInput(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=False)


class Credentials(StrictInput):
    email: EmailStr
    password: str = Field(min_length=12, max_length=128)

    @field_validator("email")
    @classmethod
    def normalize(cls, value: str) -> str:
        return value.lower()


class Registration(Credentials):
    name: str = Field(min_length=2, max_length=100)
    workspace_name: str = Field(min_length=2, max_length=100)

    @field_validator("name", "workspace_name")
    @classmethod
    def nonblank(cls, value: str) -> str:
        if len(value.strip()) < 2:
            raise ValueError("Informe pelo menos dois caracteres.")
        return value.strip()


class EmailInput(StrictInput):
    email: EmailStr


class TokenInput(StrictInput):
    token: str = Field(min_length=32, max_length=128)


class ResetInput(TokenInput):
    password: str = Field(min_length=12, max_length=128)


class ProfileInput(StrictInput):
    name: str = Field(min_length=2, max_length=100)
    timezone: str = Field(min_length=1, max_length=64)

    @field_validator("name")
    @classmethod
    def nonblank(cls, value: str) -> str:
        if len(value.strip()) < 2:
            raise ValueError("Informe pelo menos dois caracteres.")
        return value.strip()


class WorkspaceInput(ProfileInput):
    pass


class SelectWorkspaceInput(StrictInput):
    workspace_id: str = Field(min_length=36, max_length=36)


class RoleInput(StrictInput):
    role: Literal["admin", "member"]
