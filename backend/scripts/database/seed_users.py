import os
import sys
from pathlib import Path

# Add the root directory to path to allow imports from database and config
root_dir = Path(__file__).resolve().parents[3]
sys.path.append(str(root_dir))

from database.connection import get_session
from database.models import User, Role, District, PoliceStation, Officer
from backend.auth.password import hash_password

def seed_users():
    with get_session() as session:
        # Create default roles
        admin_role = session.query(Role).filter_by(role_name="Admin").first()
        if not admin_role:
            admin_role = Role(role_name="Admin", description="Administrator", permissions={"all": True}, is_system_role=True)
            session.add(admin_role)

        sho_role = session.query(Role).filter_by(role_name="SHO").first()
        if not sho_role:
            sho_role = Role(role_name="SHO", description="Station House Officer", permissions={"read": True, "write": True}, is_system_role=True)
            session.add(sho_role)
            
        session.flush()

        # Get Bengaluru Urban district specifically
        district = session.query(District).filter_by(district_name="Bengaluru Urban").first()
        station = session.query(PoliceStation).filter_by(station_name="Central Station").first()

        # Create a specific officer for sho_asha if needed
        officer = session.query(Officer).filter_by(full_name="Asha Patil").first()
        if not officer:
            officer = Officer(
                full_name="Asha Patil",
                rank="Inspector",
                designation="SHO",
                district_id=district.district_id if district else None,
                station_id=station.station_id if station else None
            )
            session.add(officer)
            session.flush()

        # Ensure System Admin role exists
        sys_admin_role = session.query(Role).filter_by(role_name="System Administrator").first()
        if not sys_admin_role:
            sys_admin_role = Role(role_name="System Administrator", description="Full system access", is_system_role=True)
            session.add(sys_admin_role)
            session.flush()

        # Create sho_asha user
        sho_asha = session.query(User).filter_by(username="sho_asha").first()
        if not sho_asha:
            sho_asha = User(
                username="sho_asha",
                email="asha@police.gov.in",
                password_hash=hash_password("SecurePassword123!"),
                role_id=sys_admin_role.role_id, # Set to System Administrator for universal access
                officer_id=officer.officer_id if officer else None,
                district_id=district.district_id if district else None,
                station_id=station.station_id if station else None,
                is_active=True
            )
            session.add(sho_asha)
        else:
            sho_asha.role_id = sys_admin_role.role_id # Update existing user

        admin_user = session.query(User).filter_by(username="admin").first()
        if not admin_user:
            admin_user = User(
                username="admin",
                email="admin@police.gov.in",
                password_hash=hash_password("admin"),
                role_id=sys_admin_role.role_id,
                officer_id=None,
                district_id=None,
                station_id=None,
                is_active=True
            )
            session.add(admin_user)
        else:
            admin_user.role_id = sys_admin_role.role_id
            admin_user.district_id = None
            admin_user.password_hash = hash_password("admin")
            
        session.commit()
        
        print("Successfully seeded users:")
        print(f"- sho_asha / SecurePassword123! (Rank: Inspector, District: {district.district_name if district else 'Unknown'})")
        print(f"- admin / admin (Rank: Any, District: Any - System Admin)")

if __name__ == "__main__":
    seed_users()
