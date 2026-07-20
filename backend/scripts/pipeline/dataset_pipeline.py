from __future__ import annotations

import csv
import random
import time
from datetime import datetime, timedelta
from pathlib import Path


class DatasetPipeline:
    """Generate the complete local synthetic dataset bundle."""

    def __init__(self, seed: int = 20260720):
        self.root = Path(__file__).resolve().parents[2]
        self.generated_dir = self.root / "data" / "generated"
        self.random = random.Random(seed)

    def _write(self, name: str, rows: list[dict]) -> None:
        path = self.generated_dir / name
        path.parent.mkdir(parents=True, exist_ok=True)
        if not rows:
            path.write_text("\n", encoding="utf-8")
            return
        with path.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
            writer.writeheader()
            writer.writerows(rows)

    def run(self) -> dict[str, int]:
        started = time.perf_counter()
        self.generated_dir.mkdir(parents=True, exist_ok=True)
        for path in self.generated_dir.glob("*.csv"):
            path.unlink()

        now = datetime.now().replace(microsecond=0)
        persons = []
        for index in range(1, 101):
            persons.append({
                "person_id": f"PER{index:05d}", "first_name": f"Person{index}",
                "last_name": "Synthetic", "gender": "Other",
                "date_of_birth": f"{1970 + index % 30:04d}-01-01", "age": 30 + index % 35,
                "mobile_number": f"9{index:09d}", "aadhaar_number": f"{index:012d}",
                "pan_number": f"SYN{index:04d}P", "district": "Central",
            })
        cases = []
        for index in range(1, 31):
            incident = now - timedelta(days=180 - index)
            cases.append({"case_id": f"CAS{index:05d}", "case_number": f"CASE/{index:05d}",
                          "incident_datetime": incident.isoformat(), "crime_type": "Theft",
                          "status": "Under Investigation"})
        persons_by_case = []
        for index, case in enumerate(cases, 1):
            for offset, role in enumerate(("Complainant", "Suspect", "Witness")):
                persons_by_case.append({"relationship_id": f"REL{len(persons_by_case)+1:06d}",
                                        "case_id": case["case_id"], "person_id": persons[(index + offset) % 100]["person_id"],
                                        "role": role, "assigned_date": case["incident_datetime"][:10], "status": "Active"})
        persons_by_case_ids = {row["case_id"]: row["person_id"] for row in persons_by_case if row["role"] == "Suspect"}
        firms = []
        for index, case in enumerate(cases, 1):
            registered = datetime.fromisoformat(case["incident_datetime"]) + timedelta(days=2)
            firms.append({"fir_id": f"FIR{index:05d}", "case_id": case["case_id"], "complainant_id": persons[(index) % 100]["person_id"],
                          "registration_datetime": registered.isoformat(), "fir_number": f"FIR/{index:05d}", "police_station": "Central"})

        phones = [{"phone_id": f"PHN{index:05d}", "person_id": person["person_id"], "mobile_number": person["mobile_number"],
                   "imei": f"IMEI{index:014d}", "imsi": f"IMSI{index:014d}", "provider": "Synthetic Telecom",
                   "sim_type": "Prepaid", "connection_type": "4G", "activation_date": "2020-01-01", "status": "Active", "is_primary": "True"}
                  for index, person in enumerate(persons, 1)]
        vehicles = [{"vehicle_id": f"VEH{index:05d}", "person_id": persons[index % 100]["person_id"], "registration_number": f"SYN-{index:04d}", "vehicle_type": "Car"} for index in range(1, 51)]
        accounts = [{"account_id": f"ACC{index:05d}", "person_id": persons[index % 100]["person_id"], "account_number": f"ACCT{index:012d}", "bank_name": "Synthetic Bank", "account_type": "Savings"} for index in range(1, 81)]
        transactions = [{"transaction_id": f"TXN{index:06d}", "account_id": accounts[index % 80]["account_id"], "transaction_datetime": (now - timedelta(days=index % 60)).isoformat(), "amount": f"{100 + index * 13.5:.2f}", "transaction_type": "Credit"} for index in range(1, 201)]
        evidence = [{"evidence_id": f"EVD{index:05d}", "fir_id": fir["fir_id"], "case_id": fir["case_id"], "evidence_type": "Digital", "collected_datetime": fir["registration_datetime"]} for index, fir in enumerate(firms, 1)]
        arrests = [{"arrest_id": f"ARR{index:05d}", "fir_id": fir["fir_id"], "case_id": fir["case_id"], "suspect_id": persons_by_case_ids[fir["case_id"]], "arrest_datetime": (datetime.fromisoformat(fir["registration_datetime"]) + timedelta(days=3)).isoformat()} for index, fir in enumerate(firms, 1)]
        chargesheets = [{"chargesheet_id": f"CHG{index:05d}", "fir_id": fir["fir_id"], "case_id": fir["case_id"], "suspect_id": persons_by_case_ids[fir["case_id"]], "filing_date": (datetime.fromisoformat(fir["registration_datetime"]) + timedelta(days=10)).date().isoformat()} for index, fir in enumerate(firms, 1)]
        court = [{"court_case_id": f"CRT{index:05d}", "chargesheet_id": chargesheets[index-1]["chargesheet_id"], "case_id": fir["case_id"], "hearing_date": (datetime.fromisoformat(fir["registration_datetime"]) + timedelta(days=20)).date().isoformat()} for index, fir in enumerate(firms, 1)]
        diary = [{"diary_id": f"DIA{index:05d}", "case_id": case["case_id"], "entry_datetime": (datetime.fromisoformat(case["incident_datetime"]) + timedelta(days=5)).isoformat(), "entry_text": "Investigation activity recorded."} for index, case in enumerate(cases, 1)]
        devices = [{"device_id": f"DEV{index:05d}", "person_id": persons[index % 100]["person_id"], "device_type": "Mobile", "device_identifier": f"DEVICE{index:08d}"} for index in range(1, 81)]
        def communication(name, key, count):
            rows = []
            for index in range(1, count + 1):
                case = cases[index % len(cases)]
                sender = persons[index % 100]["person_id"]
                receiver = persons[(index + 1) % 100]["person_id"]
                row = {key: f"{key.upper()[:3]}{index:06d}", "sender_person_id": sender, "receiver_person_id": receiver, "case_id": case["case_id"], "message_datetime": (now - timedelta(days=index % 30)).isoformat()}
                if name == "emails":
                    row["email_datetime"] = row.pop("message_datetime")
                rows.append(row)
            return rows
        datasets = {"persons.csv": persons, "phones.csv": phones, "vehicles.csv": vehicles, "bank_accounts.csv": accounts,
                    "transactions.csv": transactions, "cases.csv": cases, "case_person_relationships.csv": persons_by_case,
                    "fir.csv": firms, "evidence.csv": evidence, "arrests.csv": arrests, "chargesheets.csv": chargesheets,
                    "court_cases.csv": court, "investigation_diary.csv": diary, "devices.csv": devices,
                    "cdr.csv": communication("cdr", "cdr_id", 150), "sms_records.csv": communication("sms_records", "sms_id", 150),
                    "whatsapp_messages.csv": communication("whatsapp_messages", "message_id", 150), "emails.csv": communication("emails", "email_id", 100)}
        for name, rows in datasets.items():
            self._write(name, rows)
        elapsed = time.perf_counter() - started
        print(f"SUCCESS: generated {len(datasets)} CSV files with {sum(map(len, datasets.values()))} records in {elapsed:.2f}s")
        return {name: len(rows) for name, rows in datasets.items()}


if __name__ == "__main__":
    DatasetPipeline().run()
