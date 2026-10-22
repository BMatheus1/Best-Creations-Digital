import json
import logging
import time
import uuid

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text
from starlette.exceptions import HTTPException

from app.api import router
from app.core.config import get_settings
from app.db import SessionLocal

logger = logging.getLogger("postpilot")
logging.basicConfig(level=logging.INFO, format="%(message)s")
settings = get_settings()
app = FastAPI(
    title="PostPilot API",
    version="0.1.0",
    docs_url="/docs" if settings.app_env != "production" else None,
    redoc_url=None,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type", "X-CSRF-Token"],
)


@app.middleware("http")
async def request_context(request: Request, call_next):
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id
    start = time.monotonic()
    if request.method not in {"GET", "HEAD", "OPTIONS"}:
        if request.headers.get("origin") != settings.frontend_url:
            return JSONResponse(
                {"detail": "Origem da solicitação não autorizada.", "request_id": request_id},
                status_code=403,
            )
        length = request.headers.get("content-length", "0")
        if not length.isdigit() or int(length) > 65536:
            return JSONResponse({"detail": "Solicitação muito grande."}, status_code=413)
        # Enforce the limit for chunked bodies too. Phase 2 uploads use a separate limit.
        body = bytearray()
        async for chunk in request.stream():
            body.extend(chunk)
            if len(body) > 65536:
                return JSONResponse({"detail": "Solicitação muito grande."}, status_code=413)
        request._body = bytes(body)
    try:
        response = await call_next(request)
    except Exception as exc:
        logger.error(
            json.dumps(
                {
                    "event": "request.failed",
                    "request_id": request_id,
                    "error_type": type(exc).__name__,
                }
            )
        )
        response = JSONResponse(
            {"detail": "Não foi possível concluir a solicitação.", "request_id": request_id},
            status_code=500,
        )
    response.headers["X-Request-ID"] = request_id
    response.headers["Cache-Control"] = "no-store"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "no-referrer"
    logger.info(
        json.dumps(
            {
                "event": "request.completed",
                "request_id": request_id,
                "method": request.method,
                "path": request.url.path,
                "status": response.status_code,
                "duration_ms": round((time.monotonic() - start) * 1000),
            }
        )
    )
    return response


@app.exception_handler(HTTPException)
async def http_error(request: Request, exc: HTTPException):
    return JSONResponse(
        {"detail": exc.detail, "request_id": request.state.request_id},
        status_code=exc.status_code,
        headers=exc.headers,
    )


@app.exception_handler(RequestValidationError)
async def validation_error(request: Request, exc: RequestValidationError):
    # Never return submitted values (passwords/tokens) in validation errors.
    errors = [
        {"field": ".".join(str(part) for part in err["loc"][1:]), "type": err["type"]}
        for err in exc.errors()
    ]
    return JSONResponse(
        {
            "detail": "Confira os dados informados.",
            "errors": errors,
            "request_id": request.state.request_id,
        },
        status_code=422,
    )


@app.get("/api/v1/health", tags=["health"])
def health():
    try:
        with SessionLocal() as db:
            db.execute(text("SELECT 1"))
    except Exception:
        return JSONResponse({"status": "unavailable", "database": "unavailable"}, status_code=503)
    return {"status": "ok", "database": "ok"}


app.include_router(router)
