from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.connection import get_db
from backend.auth.dependencies import get_current_active_user
from backend.auth.models import CurrentUser
from backend.core.service import core_service, orm_to_dict

core_router = APIRouter(prefix="/core", tags=["core"])

# ── FIR Endpoints ────────────────────────────────────────────────────────────

@core_router.get("/firs")
def get_firs(
    station_id: Optional[str] = None,
    district_id: Optional[str] = None,
    status: Optional[str] = None,
    severity: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_active_user),
):
    """Retrieve list of FIR cases filtered by current user's geographical scope."""
    return orm_to_dict(
        core_service.get_firs(
            db=db,
            user=current_user,
            station_id=station_id,
            district_id=district_id,
            status=status,
            severity=severity
        )
    )


@core_router.get("/firs/{fir_id}")
def get_fir_by_id(
    fir_id: str,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_active_user),
):
    """Retrieve details of a specific FIR case after checking geographical visibility."""
    return orm_to_dict(core_service.get_fir_by_id(db=db, user=current_user, fir_id=fir_id))


# ── Crime Endpoints ──────────────────────────────────────────────────────────

@core_router.get("/crimes")
def get_crimes(
    category_id: Optional[str] = None,
    severity: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_active_user),
):
    """Retrieve list of recorded crimes filtered by user geographical access."""
    return orm_to_dict(
        core_service.get_crimes(
            db=db,
            user=current_user,
            category_id=category_id,
            severity=severity
        )
    )


@core_router.get("/crimes/{crime_id}")
def get_crime_by_id(
    crime_id: str,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_active_user),
):
    """Retrieve details of a specific crime instance."""
    return orm_to_dict(core_service.get_crime_by_id(db=db, user=current_user, crime_id=crime_id))


# ── District Endpoints ────────────────────────────────────────────────────────

@core_router.get("/districts")
def get_districts(
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_active_user),
):
    """Retrieve districts list, scoping results depending on administrative access."""
    return orm_to_dict(core_service.get_districts(db=db, user=current_user))


@core_router.get("/districts/{district_id}")
def get_district_by_id(
    district_id: str,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_active_user),
):
    """Retrieve specific district metadata."""
    return orm_to_dict(core_service.get_district_by_id(db=db, user=current_user, district_id=district_id))


# ── Officer Endpoints ─────────────────────────────────────────────────────────

@core_router.get("/officers")
def get_officers(
    station_id: Optional[str] = None,
    district_id: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_active_user),
):
    """Retrieve list of registered officers in current user's geographical scope."""
    return orm_to_dict(
        core_service.get_officers(
            db=db,
            user=current_user,
            station_id=station_id,
            district_id=district_id,
            status=status
        )
    )


@core_router.get("/officers/{officer_id}")
def get_officer_by_id(
    officer_id: str,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_active_user),
):
    """Retrieve specific officer file details."""
    return orm_to_dict(core_service.get_officer_by_id(db=db, user=current_user, officer_id=officer_id))


# ── Evidence Endpoints ────────────────────────────────────────────────────────

@core_router.get("/evidence")
def get_evidence(
    evidence_type: Optional[str] = None,
    collected_by: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_active_user),
):
    """Retrieve evidence items record filtered by user's jurisdiction."""
    return orm_to_dict(
        core_service.get_evidence(
            db=db,
            user=current_user,
            evidence_type=evidence_type,
            collected_by=collected_by
        )
    )


@core_router.get("/evidence/{evidence_id}")
def get_evidence_by_id(
    evidence_id: str,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_active_user),
):
    """Retrieve a specific piece of evidence details."""
    return orm_to_dict(core_service.get_evidence_by_id(db=db, user=current_user, evidence_id=evidence_id))

