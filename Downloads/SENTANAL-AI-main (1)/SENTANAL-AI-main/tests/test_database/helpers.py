from __future__ import annotations

from datetime import datetime

from database.models import Crime, CrimeCategory, District, FIR, Officer, PoliceStation, Role


def seed_minimum_crime_graph(session) -> dict[str, object]:
    district = District(district_name="Central", district_code="CTR", region="Metro", headquarters="HQ")
    role = Role(role_name="Inspector", description="Investigative role", permissions={"firs": "rw"})
    station = PoliceStation(station_name="Central Station", station_code="CTR-001", station_type="HQ", district=district)
    officer = Officer(
        full_name="Asha Kumar",
        badge_number="B-100",
        rank="Inspector",
        designation="SHO",
        station=station,
        district=district,
    )
    category = CrimeCategory(category_name="Theft", severity="Medium", description="Property crime")
    fir = FIR(
        fir_number="FIR-2024-001",
        fir_date=datetime(2024, 4, 10, 9, 0, 0),
        station=station,
        district=district,
        complainant_name="Ravi",
        complaint_details="Reported theft from market road",
        investigating_officer=officer,
        status="Registered",
        severity="Medium",
    )
    crime = Crime(
        fir=fir,
        category=category,
        crime_description="Wallet theft",
        modus_operandi="Pickpocketing",
        reported_at=datetime(2024, 4, 10, 10, 0, 0),
        severity="Medium",
    )

    session.add_all([district, role, station, officer, category, fir, crime])
    session.commit()
    return {
        "district": district,
        "role": role,
        "station": station,
        "officer": officer,
        "category": category,
        "fir": fir,
        "crime": crime,
    }

