# FastAPI dependencies for authentication and authorization.
# get_current_user: extracts JWT, verifies it, and returns CurrentUser.
# get_current_active_user: ensures current user is active.
# require_role_or_higher: helper function for role requirements.
# require_system_admin, require_state_admin, require_district_admin,
# require_station_officer, require_investigating_officer: role requirement dependencies.
# TODO: Future FastAPI global exception handlers will translate authentication/authorization
# exceptions (e.g. ExpiredTokenError, InvalidTokenError, InactiveUserError,
# InsufficientPermissionError) into appropriate HTTP status codes (401 Unauthorized, 403 Forbidden).

from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from backend.auth.jwt_handler import verify_access_token
from backend.auth.models import CurrentUser, Roles
from backend.auth.exceptions import InactiveUserError, InsufficientPermissionError

security = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> CurrentUser:
    token = credentials.credentials
    payload = verify_access_token(token)
    return CurrentUser(
        id=payload.sub,
        role=Roles(payload.role_id),
        district_id=payload.district_id,
        station_id=payload.station_id,
        is_active=True
    )


def get_current_active_user(user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
    if not user.is_active:
        raise InactiveUserError("User account is inactive")
    return user


def require_role_or_higher(required_role: Roles):
    def dependency(user: CurrentUser = Depends(get_current_active_user)) -> CurrentUser:
        if user.role.value > required_role.value:
            raise InsufficientPermissionError(
                f"Access denied. Requires role '{required_role.name}' or higher."
            )
        return user
    return dependency


require_system_admin = require_role_or_higher(Roles.SYSTEM_ADMIN)
require_state_admin = require_role_or_higher(Roles.STATE_ADMIN)
require_district_admin = require_role_or_higher(Roles.DISTRICT_SUPERINTENDENT)
require_station_officer = require_role_or_higher(Roles.STATION_HOUSE_OFFICER)
require_investigating_officer = require_role_or_higher(Roles.INVESTIGATING_OFFICER)