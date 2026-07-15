"""Sentinel AI - Query services for analytics and backend integration."""

from __future__ import annotations

from typing import Any

from sqlalchemy import func, or_
from sqlalchemy.orm import Session

from database.models import Crime, CrimeCategory, District, FIR, Officer, PoliceStation, Suspect


class QueryService:
    """Optimized, reusable query layer for downstream consumers."""

    def __init__(self, session: Session) -> None:
        self.session = session

    def _month_expression(self):
        dialect = self.session.bind.dialect.name if self.session.bind is not None else "sqlite"
        if dialect == "postgresql":
            return func.date_trunc("month", Crime.reported_at)
        return func.strftime("%Y-%m-01", Crime.reported_at)

    def crimes_by_district(self) -> list[dict[str, Any]]:
        result = (
            self.session.query(
                District.district_name,
                func.count(Crime.crime_id).label("crime_count"),
            )
            .join(FIR, FIR.district_id == District.district_id)
            .join(Crime, Crime.fir_id == FIR.fir_id)
            .group_by(District.district_name)
            .order_by(func.count(Crime.crime_id).desc())
            .all()
        )
        return [dict(district_name=row[0], crime_count=int(row[1])) for row in result]

    def crimes_by_category(self) -> list[dict[str, Any]]:
        result = (
            self.session.query(
                CrimeCategory.category_name,
                func.count(Crime.crime_id).label("crime_count"),
            )
            .join(Crime, Crime.category_id == CrimeCategory.category_id)
            .group_by(CrimeCategory.category_name)
            .order_by(func.count(Crime.crime_id).desc())
            .all()
        )
        return [dict(category_name=row[0], crime_count=int(row[1])) for row in result]

    def monthly_crime_statistics(self) -> list[dict[str, Any]]:
        month_expr = self._month_expression()
        result = (
            self.session.query(
                month_expr.label("month"),
                func.count(Crime.crime_id).label("crime_count"),
            )
            .group_by(month_expr)
            .order_by(month_expr)
            .all()
        )

        rows: list[dict[str, Any]] = []
        for row in result:
            month_value = row[0]
            if hasattr(month_value, "isoformat"):
                month_value = month_value.isoformat()
            rows.append({"month": month_value, "crime_count": int(row[1])})
        return rows

    def officer_workload(self) -> list[dict[str, Any]]:
        result = (
            self.session.query(
                Officer.full_name,
                func.count(FIR.fir_id).label("assigned_firs"),
            )
            .join(FIR, FIR.investigating_officer_id == Officer.officer_id)
            .group_by(Officer.full_name)
            .order_by(func.count(FIR.fir_id).desc())
            .all()
        )
        return [dict(officer_name=row[0], assigned_firs=int(row[1])) for row in result]

    def fir_search(self, search_text: str) -> list[dict[str, Any]]:
        pattern = f"%{search_text}%"
        results = (
            self.session.query(FIR)
            .filter(or_(FIR.complaint_details.ilike(pattern), FIR.fir_number.ilike(pattern), FIR.complainant_name.ilike(pattern)))
            .limit(50)
            .all()
        )
        return [
            {
                "fir_id": fir.fir_id,
                "fir_number": fir.fir_number,
                "complainant_name": fir.complainant_name,
                "status": fir.status,
            }
            for fir in results
        ]

    def district_summary(self) -> list[dict[str, Any]]:
        result = (
            self.session.query(
                District.district_name,
                func.count(func.distinct(FIR.fir_id)).label("firs"),
                func.count(func.distinct(Crime.crime_id)).label("crimes"),
            )
            .outerjoin(FIR, FIR.district_id == District.district_id)
            .outerjoin(Crime, Crime.fir_id == FIR.fir_id)
            .group_by(District.district_id)
            .order_by(District.district_name)
            .all()
        )
        return [dict(district_name=row[0], firs=int(row[1]), crimes=int(row[2])) for row in result]

    def district_heatmap_data(self) -> list[dict[str, Any]]:
        result = (
            self.session.query(
                District.district_name,
                District.boundary_geojson,
                func.count(FIR.fir_id).label("firs"),
            )
            .outerjoin(FIR, FIR.district_id == District.district_id)
            .group_by(District.district_name, District.boundary_geojson)
            .order_by(func.count(FIR.fir_id).desc())
            .all()
        )
        return [
            {
                "district_name": row[0],
                "boundary_geojson": row[1],
                "firs": int(row[2]),
            }
            for row in result
        ]

    def export_relationship_rows(self) -> list[dict[str, Any]]:
        result = (
            self.session.query(
                FIR.fir_number,
                Crime.crime_id,
                CrimeCategory.category_name,
                District.district_name,
            )
            .join(Crime, Crime.fir_id == FIR.fir_id)
            .join(CrimeCategory, Crime.category_id == CrimeCategory.category_id)
            .join(District, District.district_id == FIR.district_id)
            .all()
        )
        return [
            {
                "fir_number": row[0],
                "crime_id": row[1],
                "category_name": row[2],
                "district_name": row[3],
            }
            for row in result
        ]

    def ai_feature_inputs(self) -> list[dict[str, Any]]:
        result = (
            self.session.query(
                Crime.crime_id,
                Crime.severity,
                Crime.reported_at,
                CrimeCategory.category_name,
                District.district_name,
                PoliceStation.station_type,
            )
            .join(FIR, FIR.fir_id == Crime.fir_id)
            .join(CrimeCategory, CrimeCategory.category_id == Crime.category_id)
            .join(District, District.district_id == FIR.district_id)
            .join(PoliceStation, PoliceStation.station_id == FIR.station_id)
            .all()
        )
        return [
            {
                "crime_id": row[0],
                "severity": row[1],
                "reported_at": row[2].isoformat() if hasattr(row[2], "isoformat") else row[2],
                "category_name": row[3],
                "district_name": row[4],
                "station_type": row[5],
            }
            for row in result
        ]

    def officer_assignment_map(self) -> list[dict[str, Any]]:
        result = (
            self.session.query(
                Officer.officer_id,
                Officer.full_name,
                FIR.fir_number,
                FIR.status,
            )
            .join(FIR, FIR.investigating_officer_id == Officer.officer_id)
            .order_by(Officer.full_name, FIR.fir_number)
            .all()
        )
        return [
            {
                "officer_id": row[0],
                "officer_name": row[1],
                "fir_number": row[2],
                "status": row[3],
            }
            for row in result
        ]
