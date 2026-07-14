from fastapi import FastAPI
from fastapi.responses import JSONResponse

from backend.auth.router import auth_router
from backend.auth.exceptions import (
    InvalidTokenError,
    ExpiredTokenError,
    InactiveUserError,
    InsufficientPermissionError
)

app = FastAPI(
    title="Sentinel AI API Gateway",
    description="Sentinel AI — Data Platform Backend Services",
    version="1.0.0"
)

# Global Exception Handlers for Auth Exception mapping
@app.exception_handler(InvalidTokenError)
@app.exception_handler(ExpiredTokenError)
def invalid_token_handler(request, exc):
    return JSONResponse(status_code=401, content={"detail": str(exc)})


@app.exception_handler(InactiveUserError)
def inactive_user_handler(request, exc):
    return JSONResponse(status_code=403, content={"detail": str(exc)})


@app.exception_handler(InsufficientPermissionError)
def insufficient_permission_handler(request, exc):
    return JSONResponse(status_code=403, content={"detail": str(exc)})


# Register Routers
app.include_router(auth_router)

# Import and register Sprint B2, B3, B4 routers
from backend.core.router import core_router
from backend.analytics.router import analytics_router
from backend.ai.router import ai_router

app.include_router(core_router)
app.include_router(analytics_router)
app.include_router(ai_router)


@app.get("/")
def read_root():
    return {"status": "healthy", "service": "Sentinel AI API Gateway"}
