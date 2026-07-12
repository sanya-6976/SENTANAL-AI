"""Sentinel AI - Repository layer for database entities."""

from __future__ import annotations

from typing import Any, Iterable, TypeVar

from sqlalchemy import func
from sqlalchemy.orm import Session

from database.models import (
    ActivityLog,
    Crime,
    CrimeCategory,
    CrimeEvidence,
    CrimeOfficer,
    CrimeSuspect,
    District,
    Evidence,
    FIR,
    Officer,
    PoliceStation,
    Role,
    Suspect,
    SuspectAssociate,
    User,
    Vehicle,
    Victim,
    Weapon,
    Witness,
)

ModelT = TypeVar("ModelT")


class BaseRepository:
    """Small reusable wrapper around a SQLAlchemy session."""

    model: type[Any] | None = None

    def __init__(self, session: Session) -> None:
        self.session = session

    def add(self, entity: ModelT) -> ModelT:
        self.session.add(entity)
        return entity

    def add_all(self, entities: Iterable[ModelT]) -> list[ModelT]:
        items = list(entities)
        self.session.add_all(items)
        return items

    def delete(self, entity: ModelT) -> None:
        self.session.delete(entity)

    def flush(self) -> None:
        self.session.flush()

    def refresh(self, entity: ModelT) -> ModelT:
        self.session.refresh(entity)
        return entity

    def get(self, entity_type: type[ModelT], entity_id: str) -> ModelT | None:
        return self.session.get(entity_type, entity_id)

    def list_all(self, entity_type: type[ModelT]) -> list[ModelT]:
        return list(self.session.query(entity_type).all())

    def count(self, entity_type: type[ModelT]) -> int:
        return int(self.session.query(func.count()).select_from(entity_type).scalar() or 0)

    def exists(self, entity_type: type[ModelT], **filters: Any) -> bool:
        query = self.session.query(entity_type)
        for field, value in filters.items():
            query = query.filter(getattr(entity_type, field) == value)
        return bool(self.session.query(query.exists()).scalar())

    def get_by_filters(self, entity_type: type[ModelT], **filters: Any) -> list[ModelT]:
        query = self.session.query(entity_type)
        for field, value in filters.items():
            query = query.filter(getattr(entity_type, field) == value)
        return list(query.all())


class DistrictRepository(BaseRepository):
    def get_by_name(self, name: str) -> District | None:
        return self.session.query(District).filter(District.district_name == name).one_or_none()

    def get_by_code(self, code: str) -> District | None:
        return self.session.query(District).filter(District.district_code == code).one_or_none()


class PoliceStationRepository(BaseRepository):
    def get_by_code(self, code: str) -> PoliceStation | None:
        return self.session.query(PoliceStation).filter(PoliceStation.station_code == code).one_or_none()


class RoleRepository(BaseRepository):
    def get_by_name(self, name: str) -> Role | None:
        return self.session.query(Role).filter(Role.role_name == name).one_or_none()


class UserRepository(BaseRepository):
    def get_by_username(self, username: str) -> User | None:
        return self.session.query(User).filter(User.username == username).one_or_none()


class OfficerRepository(BaseRepository):
    def get_by_badge_number(self, badge_number: str) -> Officer | None:
        return self.session.query(Officer).filter(Officer.badge_number == badge_number).one_or_none()

    def list_by_district(self, district_id: str) -> list[Officer]:
        return list(self.session.query(Officer).filter(Officer.district_id == district_id).all())


class FIRRepository(BaseRepository):
    def get_by_number(self, fir_number: str) -> FIR | None:
        return self.session.query(FIR).filter(FIR.fir_number == fir_number).one_or_none()

    def list_by_district(self, district_id: str) -> list[FIR]:
        return list(self.session.query(FIR).filter(FIR.district_id == district_id).all())


class CrimeCategoryRepository(BaseRepository):
    def get_by_name(self, name: str) -> CrimeCategory | None:
        return self.session.query(CrimeCategory).filter(CrimeCategory.category_name == name).one_or_none()


class CrimeRepository(BaseRepository):
    def get_by_fir(self, fir_id: str) -> list[Crime]:
        return list(self.session.query(Crime).filter(Crime.fir_id == fir_id).all())

    def get_by_category(self, category_id: str) -> list[Crime]:
        return list(self.session.query(Crime).filter(Crime.category_id == category_id).all())

    def get_recent(self, limit: int = 50) -> list[Crime]:
        return list(
            self.session.query(Crime)
            .order_by(Crime.reported_at.desc().nullslast(), Crime.crime_id.desc())
            .limit(limit)
            .all()
        )


class SuspectRepository(BaseRepository):
    def get_by_name(self, name: str) -> list[Suspect]:
        return list(self.session.query(Suspect).filter(Suspect.full_name == name).all())


class VictimRepository(BaseRepository):
    def get_by_name(self, name: str) -> list[Victim]:
        return list(self.session.query(Victim).filter(Victim.full_name == name).all())


class WitnessRepository(BaseRepository):
    def get_by_name(self, name: str) -> list[Witness]:
        return list(self.session.query(Witness).filter(Witness.full_name == name).all())


class VehicleRepository(BaseRepository):
    def get_by_registration(self, registration_number: str) -> Vehicle | None:
        return self.session.query(Vehicle).filter(Vehicle.registration_number == registration_number).one_or_none()


class WeaponRepository(BaseRepository):
    def get_by_type(self, weapon_type: str) -> list[Weapon]:
        return list(self.session.query(Weapon).filter(Weapon.weapon_type == weapon_type).all())


class EvidenceRepository(BaseRepository):
    def get_by_type(self, evidence_type: str) -> list[Evidence]:
        return list(self.session.query(Evidence).filter(Evidence.evidence_type == evidence_type).all())

    def get_by_collector(self, officer_id: str) -> list[Evidence]:
        return list(self.session.query(Evidence).filter(Evidence.collected_by == officer_id).all())


class ActivityLogRepository(BaseRepository):
    def list_by_user(self, user_id: str) -> list[ActivityLog]:
        return list(self.session.query(ActivityLog).filter(ActivityLog.user_id == user_id).all())


class SuspectAssociateRepository(BaseRepository):
    def get_associates_for_suspect(self, suspect_id: str) -> list[SuspectAssociate]:
        return list(self.session.query(SuspectAssociate).filter(SuspectAssociate.suspect_id == suspect_id).all())


class CrimeRelationshipRepository(BaseRepository):
    def list_crime_suspects(self, crime_id: str) -> list[CrimeSuspect]:
        return list(self.session.query(CrimeSuspect).filter(CrimeSuspect.crime_id == crime_id).all())

    def list_crime_officers(self, crime_id: str) -> list[CrimeOfficer]:
        return list(self.session.query(CrimeOfficer).filter(CrimeOfficer.crime_id == crime_id).all())

    def list_crime_evidence(self, crime_id: str) -> list[CrimeEvidence]:
        return list(self.session.query(CrimeEvidence).filter(CrimeEvidence.crime_id == crime_id).all())


class AnalyticsRepository(BaseRepository):
    """Reusable data-access helpers for analytics consumers."""

    def crimes_by_district(self) -> list[tuple[str, int]]:
        rows = (
            self.session.query(District.district_name, func.count(Crime.crime_id))
            .join(FIR, FIR.district_id == District.district_id)
            .join(Crime, Crime.fir_id == FIR.fir_id)
            .group_by(District.district_name)
            .order_by(func.count(Crime.crime_id).desc())
            .all()
        )
        return [(row[0], int(row[1])) for row in rows]

    def crimes_by_category(self) -> list[tuple[str, int]]:
        rows = (
            self.session.query(CrimeCategory.category_name, func.count(Crime.crime_id))
            .join(Crime, Crime.category_id == CrimeCategory.category_id)
            .group_by(CrimeCategory.category_name)
            .order_by(func.count(Crime.crime_id).desc())
            .all()
        )
        return [(row[0], int(row[1])) for row in rows]

    def monthly_crime_counts(self) -> list[dict[str, Any]]:
        dialect = self.session.bind.dialect.name if self.session.bind is not None else "sqlite"
        month_expr = func.date_trunc("month", Crime.reported_at) if dialect == "postgresql" else func.strftime("%Y-%m-01", Crime.reported_at)
        rows = (
            self.session.query(month_expr.label("month"), func.count(Crime.crime_id))
            .group_by(month_expr)
            .order_by(month_expr)
            .all()
        )
        return [{"month": row[0].isoformat() if hasattr(row[0], "isoformat") else row[0], "crime_count": int(row[1])} for row in rows]
