#!/usr/bin/env python3
"""
Sentinel AI - Synthetic Data Generator (v2.0)
=============================================
Generates realistic synthetic CSV datasets for Karnataka State Police
Crime Intelligence Operating System.

15 Crime Categories | 40+ Subtypes | 700 FIRs | 15 Districts
ALL DATA IS FICTIONAL — Safe for public demonstration.

Entities (Primary + Junction):
  Primary: districts, police_stations, officers, crime_categories, firs,
           crimes, suspects, victims, witnesses, vehicles, weapons,
           evidence, users, roles
  Junction: fir_suspects, fir_victims, fir_witnesses, fir_vehicles,
            fir_weapons, fir_evidence, crime_suspects, user_roles

Author: Sentinel AI Data Engineering Team
"""

import csv
import os
import random
import uuid
import hashlib
from datetime import datetime, timedelta

# ─── Reproducibility ──────────────────────────────────────────────────────────
random.seed(2024)

# ─── Output base path ─────────────────────────────────────────────────────────
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
RAW_DIR = os.path.join(BASE_DIR, 'datasets', 'raw')

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

def write_csv(entity_name, rows, fieldnames):
    """Write rows to datasets/raw/{entity_name}/{entity_name}.csv"""
    folder = os.path.join(RAW_DIR, entity_name)
    ensure_dir(folder)
    basename = entity_name.split('/')[-1] if '/' in entity_name else entity_name
    filepath = os.path.join(folder, f'{basename}.csv')
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    print(f"  > {entity_name}: {len(rows)} rows -> {filepath}")
    return filepath

# ─── UUID helper ───────────────────────────────────────────────────────────────
def genuuid():
    return str(uuid.uuid4())

# ─── Date helpers ──────────────────────────────────────────────────────────────
START_DATE = datetime(2022, 1, 1)
END_DATE   = datetime(2025, 3, 31)
TOTAL_DAYS = (END_DATE - START_DATE).days

def random_date(start=None, end=None):
    s = start or START_DATE
    e = end or END_DATE
    delta = (e - s).days
    if delta <= 0:
        return s
    return s + timedelta(days=random.randint(0, delta))

def random_datetime(start=None, end=None):
    d = random_date(start, end)
    return d.replace(hour=random.randint(0, 23),
                     minute=random.randint(0, 59),
                     second=random.randint(0, 59))

def fmt_date(dt):
    return dt.strftime('%Y-%m-%d')

def fmt_datetime(dt):
    return dt.strftime('%Y-%m-%d %H:%M:%S')

# ═══════════════════════════════════════════════════════════════════════════════
#  REFERENCE DATA — Karnataka-specific
# ═══════════════════════════════════════════════════════════════════════════════

# Primary demo districts (as specified)
KARNATAKA_DISTRICTS = [
    "Bengaluru Urban", "Bengaluru Rural", "Mysuru",
    "Dakshina Kannada", "Udupi", "Shivamogga",
    "Hassan", "Tumakuru", "Hubballi-Dharwad",
    "Belagavi", "Ballari", "Kalaburagi",
    "Vijayapura", "Raichur", "Kolar",
]

# Full 30-district list for extra realism in secondary tables
ALL_KARNATAKA_DISTRICTS = [
    "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban",
    "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga",
    "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan",
    "Haveri", "Hubballi-Dharwad", "Kalaburagi", "Kodagu", "Kolar",
    "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara",
    "Shivamogga", "Tumakuru", "Udupi", "Vijayapura", "Yadgir",
]

DISTRICT_DIVISION = {
    "Bengaluru Urban": "Bengaluru", "Bengaluru Rural": "Bengaluru",
    "Ramanagara": "Bengaluru", "Tumakuru": "Bengaluru", "Chikballapur": "Bengaluru",
    "Kolar": "Bengaluru", "Chitradurga": "Bengaluru", "Davanagere": "Bengaluru",
    "Shivamogga": "Bengaluru",
    "Mysuru": "Mysuru", "Mandya": "Mysuru", "Chamarajanagar": "Mysuru",
    "Hassan": "Mysuru", "Kodagu": "Mysuru", "Chikkamagaluru": "Mysuru",
    "Dakshina Kannada": "Mysuru", "Udupi": "Mysuru",
    "Belagavi": "Belagavi", "Dharwad": "Belagavi", "Haveri": "Belagavi",
    "Gadag": "Belagavi", "Uttara Kannada": "Belagavi", "Bagalkot": "Belagavi",
    "Vijayapura": "Belagavi", "Hubballi-Dharwad": "Belagavi",
    "Kalaburagi": "Kalaburagi", "Bidar": "Kalaburagi", "Raichur": "Kalaburagi",
    "Koppal": "Kalaburagi", "Ballari": "Kalaburagi", "Yadgir": "Kalaburagi",
}

DISTRICT_RTO_CODES = {
    "Bengaluru Urban": ["KA01", "KA02", "KA03", "KA04", "KA05", "KA41",
                        "KA50", "KA51", "KA52", "KA53"],
    "Bengaluru Rural": ["KA57"],
    "Mysuru": ["KA09", "KA55"],
    "Belagavi": ["KA22"],
    "Ballari": ["KA26"],
    "Dakshina Kannada": ["KA19", "KA21"],
    "Tumakuru": ["KA06"],
    "Kolar": ["KA07"],
    "Mandya": ["KA10"],
    "Hassan": ["KA13"],
    "Hubballi-Dharwad": ["KA25"],
    "Shivamogga": ["KA14"],
    "Davanagere": ["KA16"],
    "Chitradurga": ["KA15"],
    "Chikkamagaluru": ["KA18"],
    "Udupi": ["KA20"],
    "Kalaburagi": ["KA32"],
    "Raichur": ["KA36"],
    "Bidar": ["KA38"],
    "Kodagu": ["KA12"],
    "Haveri": ["KA24"],
    "Gadag": ["KA27"],
    "Koppal": ["KA37"],
    "Bagalkot": ["KA23"],
    "Vijayapura": ["KA28"],
    "Uttara Kannada": ["KA29", "KA48"],
    "Yadgir": ["KA39"],
    "Chamarajanagar": ["KA11"],
    "Chikballapur": ["KA08"],
    "Ramanagara": ["KA43"],
}

# Realistic police station names per district
PS_TEMPLATES = {
    "Bengaluru Urban": [
        "Cubbon Park", "Koramangala", "Indiranagar", "HSR Layout",
        "Whitefield", "Electronic City", "Jayanagar", "Rajajinagar",
        "Yelahanka", "Marathahalli", "JP Nagar", "Basavanagudi",
        "KR Puram", "Mahadevapura", "Hebbal", "Banashankari",
        "BTM Layout", "Bommanahalli", "Ramamurthy Nagar", "Peenya"
    ],
    "Mysuru": [
        "Devaraja", "Nazarbad", "Lashkar Mohalla", "Kuvempunagar",
        "Jayalakshmipuram", "Vijayanagar", "Mysuru North", "Mysuru South"
    ],
    "Dakshina Kannada": [
        "Mangaluru East", "Mangaluru West", "Kadri", "Bunder",
        "Panambur", "Surathkal", "Bajpe"
    ],
    "Udupi": [
        "Udupi Town", "Manipal", "Karkala", "Brahmavar", "Kundapur"
    ],
    "Belagavi": [
        "Camp", "Market", "Udyambag", "Shahapur", "Tilakwadi",
        "Belagavi Rural", "Gokak"
    ],
    "Hubballi-Dharwad": [
        "Hubballi Town", "Dharwad", "Keshwapur", "Vidyanagar",
        "Gokul Road", "Unkal"
    ],
    "Kalaburagi": [
        "Brahmapur", "Maha Gandhi Nagar", "Chowk", "Jewargi Colony",
        "Kalaburagi Rural", "Aland"
    ],
    "Shivamogga": [
        "Shivamogga Town", "Sagar", "Thirthahalli", "Bhadravathi",
        "Hosanagara"
    ],
    "Hassan": [
        "Hassan Town", "Belur", "Sakleshpur", "Alur", "Channarayapatna"
    ],
    "Tumakuru": [
        "Tumakuru Town", "Tiptur", "Sira", "Pavagada", "Madhugiri"
    ],
    "Ballari": [
        "Ballari Town", "Hospet", "Siruguppa", "Bellary Rural"
    ],
    "Vijayapura": [
        "Vijayapura Town", "Muddebihal", "Indi", "Basavana Bagewadi"
    ],
    "Raichur": [
        "Raichur Town", "Lingsugur", "Manvi", "Sindhanur"
    ],
    "Kolar": [
        "Kolar Town", "Bangarpet", "KGF", "Malur", "Mulbagal"
    ],
    "Bengaluru Rural": [
        "Devanahalli", "Doddaballapura", "Nelamangala", "Hoskote"
    ],
}

GENERIC_PS_NAMES = [
    "Town", "City", "Rural", "East", "West", "North", "South",
    "Market Yard", "Taluk", "Cantonment", "New Town", "Old Town",
    "Industrial Area", "University", "Railway Station", "Bus Stand",
]

# ─── Indian Names ──────────────────────────────────────────────────────────────
MALE_FIRST = [
    "Ramesh", "Suresh", "Mahesh", "Rajesh", "Ganesh", "Venkatesh",
    "Manjunath", "Basavaraj", "Shivakumar", "Siddaramaiah", "Krishnappa",
    "Nagaraj", "Shankar", "Ravi", "Kumar", "Arun", "Vijay", "Prasad",
    "Anand", "Mohan", "Deepak", "Sanjay", "Kiran", "Manoj", "Sunil",
    "Naveen", "Vinod", "Ashok", "Harish", "Girish", "Pradeep",
    "Srinivas", "Raghavendra", "Jagadish", "Prakash", "Dinesh",
    "Umesh", "Ramachandra", "Hanumanthappa", "Mallikarjun",
    "Channappa", "Sangamesh", "Fakkirappa", "Yamanappa", "Basappa",
    "Iranna", "Sharanappa", "Shivanand", "Veerabhadra", "Ningappa",
    "Amith", "Rohit", "Sachin", "Prashant", "Santosh",
    "Chethan", "Darshan", "Abhishek", "Akash", "Mohammed",
    "Imran", "Saleem", "Farhan", "Abdul", "Rizwan",
    "Ibrahim", "Ismail", "Altaf", "Asif", "Nadeem",
    "Joseph", "David", "Samuel", "Daniel", "Thomas",
    "Arjun", "Rahul", "Vikram", "Rajan", "Srikanth",
]

FEMALE_FIRST = [
    "Lakshmi", "Parvathi", "Saraswathi", "Savitri", "Meena",
    "Geetha", "Shantha", "Bhagya", "Suma", "Anitha",
    "Rekha", "Kavitha", "Sunitha", "Padma", "Pushpa",
    "Roopa", "Asha", "Mamatha", "Nethravathi", "Jayamma",
    "Rashmi", "Pooja", "Divya", "Sneha", "Priya",
    "Swathi", "Anusha", "Nandini", "Vidya", "Shilpa",
    "Deepika", "Pallavi", "Rachana", "Sinchana", "Chaitra",
    "Akshatha", "Ramya", "Sahana", "Tejaswini", "Shwetha",
    "Fatima", "Ayesha", "Amina", "Zainab", "Nafisa",
    "Maria", "Grace", "Sarah", "Ruth", "Rebecca",
    "Kavya", "Sana", "Riya", "Anuradha", "Bhavana",
]

LAST_NAMES = [
    "Gowda", "Shetty", "Naik", "Patil", "Reddy", "Hegde", "Rao",
    "Kumar", "Sharma", "Patel", "Kulkarni", "Desai", "Joshi",
    "Nayak", "Bhat", "Acharya", "Kamath", "Shenoy", "Poojary",
    "Bangera", "Devadiga", "Kini", "Suvarna", "Shettigar",
    "Hiremath", "Hosur", "Hubli", "Mudhol", "Badami",
    "Biradar", "Hadagali", "Hukkeri", "Savadi", "Kattimani",
    "Madar", "Lamani", "Nayaka", "Thimmappa", "Sidda",
    "Hanumanthachar", "Lingappa", "Basavalingappa", "Dodda",
    "Khan", "Ahmed", "Sheikh", "Pasha", "Baig",
    "Pereira", "D'Souza", "Fernandes", "Lobo", "Rodrigues",
    "Nair", "Pillai", "Menon", "Iyer", "Iyengar",
]

# ═══════════════════════════════════════════════════════════════════════════════
#  CRIME CATEGORY HIERARCHY — 15 Categories, 40+ Subtypes
# ═══════════════════════════════════════════════════════════════════════════════

CRIME_CATEGORY_HIERARCHY = {
    "Theft": {
        "severity": "Medium",
        "ipc": ["379", "380", "381"],
        "subtypes": ["Mobile Theft", "Jewellery Theft", "Shoplifting", "Bag Theft"],
    },
    "Vehicle Theft": {
        "severity": "High",
        "ipc": ["379", "411"],
        "subtypes": ["Motorcycle Theft", "Car Theft", "Commercial Vehicle Theft"],
    },
    "Burglary": {
        "severity": "High",
        "ipc": ["454", "457", "458", "380"],
        "subtypes": ["Residential Burglary", "Office Burglary", "Warehouse Break-in"],
    },
    "Robbery": {
        "severity": "Critical",
        "ipc": ["390", "392", "394", "397"],
        "subtypes": ["Armed Robbery", "Chain Snatching", "Street Robbery"],
    },
    "Cyber Crime": {
        "severity": "High",
        "ipc": ["420", "465", "468", "471", "66C", "66D"],
        "subtypes": ["UPI Fraud", "QR Scam", "OTP Scam", "Phishing", "Fake Job Scam", "Online Shopping Fraud", "Identity Theft"],
    },
    "Financial Fraud": {
        "severity": "High",
        "ipc": ["406", "409", "420", "465", "467", "468"],
        "subtypes": ["Investment Scam", "Loan Fraud", "Credit Card Fraud", "Forgery"],
    },
    "Assault": {
        "severity": "High",
        "ipc": ["323", "324", "325", "326", "504", "506"],
        "subtypes": ["Physical Assault", "Group Violence", "Public Altercation"],
    },
    "Missing Person": {
        "severity": "High",
        "ipc": ["363", "365"],
        "subtypes": ["Missing Adult", "Missing Child"],
    },
    "Kidnapping / Abduction": {
        "severity": "Critical",
        "ipc": ["363", "364", "365", "366", "370"],
        "subtypes": ["Kidnapping for Ransom", "Abduction"],
    },
    "Drug & NDPS Offences": {
        "severity": "Critical",
        "ipc": ["NDPS-8", "NDPS-20", "NDPS-22", "NDPS-29"],
        "subtypes": ["Drug Possession", "Drug Trafficking"],
    },
    "Traffic & Road Crime": {
        "severity": "High",
        "ipc": ["279", "304A", "337", "338"],
        "subtypes": ["Hit and Run", "Drunk Driving", "Rash Driving"],
    },
    "Property Damage": {
        "severity": "Medium",
        "ipc": ["427", "435", "436"],
        "subtypes": ["Vandalism", "Arson"],
    },
    "Public Disorder": {
        "severity": "High",
        "ipc": ["143", "144", "147", "148", "149"],
        "subtypes": ["Riot", "Unlawful Assembly"],
    },
    "Illegal Arms & Organized Crime": {
        "severity": "Critical",
        "ipc": ["25", "27", "120B", "395"],
        "subtypes": ["Illegal Weapon Possession", "Organized Criminal Activity"],
    },
    "Environmental & Wildlife Crime": {
        "severity": "High",
        "ipc": ["WPA-51", "MMDR-21", "IFA-33"],
        "subtypes": ["Illegal Sand Mining", "Wildlife Smuggling", "Forest Offence"],
    },
}

# ─── Per-subtype Incident Summary Templates ────────────────────────────────────
# Each subtype has 6–8 varied realistic templates. {placeholders} filled at runtime.

INCIDENT_SUMMARIES = {
    # ── Theft ──────────────────────────────────────────────────────────────────
    "Mobile Theft": [
        "Complainant {victim} reported that their {brand} mobile phone (IMEI ending {imei}) was snatched by an unknown male near {location} while they were returning from work.",
        "{victim} filed complaint stating that their smartphone was pickpocketed at a crowded {location}. The device was valued at approximately Rs. {amount}.",
        "Complainant was standing at {location} bus stop when an unidentified youth grabbed the mobile from their hand and fled on a two-wheeler.",
        "{victim} reported that their mobile phone was stolen from their {bag} while travelling in a KSRTC bus on the {route} route.",
        "Theft of mobile phone reported at {location}. Complainant was using the phone near {landmark} when accused snatched it and fled.",
        "A stolen mobile phone complaint was filed by {victim}. The phone went missing during a visit to {location} market area.",
    ],
    "Jewellery Theft": [
        "{victim} reported theft of gold jewellery weighing approximately {weight} grams from their residence at {address} during their absence.",
        "Complainant discovered that a gold necklace and earrings worth approximately Rs. {amount} were stolen from the {room} of their house.",
        "{victim} reported loss of gold bangles and a mangalsutra at {location} while attending a function. The estimated value is Rs. {amount}.",
        "Theft of silver ornaments and gold chain reported by {victim}. The jewellery was kept in a steel almirah which was found broken open.",
        "Complainant reported that an unidentified person stole gold jewellery from their house at {address} by breaking the window latch.",
        "{victim} stated that jewellery worth Rs. {amount} kept for safe custody at {address} went missing and suspected a house theft.",
    ],
    "Shoplifting": [
        "Store manager at {shop}, {location} reported that a male customer concealed merchandise worth Rs. {amount} under their clothing and exited without payment.",
        "Shoplifting reported at {shop} in {location}. Suspect was caught on CCTV concealing {item} worth Rs. {amount} in a bag.",
        "Complainant {victim}, proprietor of {shop}, reported that two individuals distracted staff and stole items worth Rs. {amount}.",
        "Security personnel at {shop}, {location} detained a suspect who attempted to walk out with goods worth Rs. {amount} without billing.",
        "{victim} reported repeated shoplifting incidents at their medical store at {location}. Medicines worth Rs. {amount} found missing.",
        "Theft of goods from a supermarket at {location} reported. CCTV footage captured suspect filling a bag with grocery items valued at Rs. {amount}.",
    ],
    "Bag Theft": [
        "{victim} reported that their handbag containing cash of Rs. {amount}, debit card, and personal documents was snatched near {location}.",
        "Complainant was sitting at {location} when an unknown male grabbed their shoulder bag and fled on a motorcycle.",
        "{victim} reported that their laptop bag was stolen from {location} during peak hours. The bag contained a laptop worth Rs. {amount}.",
        "A bag theft was reported at {location}. Complainant had kept their bag on a chair at a restaurant when it was taken by an unknown person.",
        "{victim} reported that their backpack containing books, wallet and mobile was stolen from {location} college campus.",
        "Complainant reported theft of a {color} bag from {location} vegetable market. The bag contained cash Rs. {amount} and house keys.",
    ],
    # ── Vehicle Theft ──────────────────────────────────────────────────────────
    "Motorcycle Theft": [
        "{victim} reported that their {make} motorcycle bearing registration number {vehicle_no} was stolen from {location} parking area.",
        "Complainant parked their two-wheeler near {location} and returned to find it missing. Vehicle is {color} {make} {model}.",
        "{victim} reported theft of motorcycle from outside {landmark}. Vehicle was last seen parked at {location}.",
        "A {make} {model} motorcycle (Reg. {vehicle_no}) belonging to {victim} was reported stolen from {location} during night hours.",
        "Motorcycle theft reported. Complainant {victim} states vehicle was stolen from a two-wheeler parking zone near {location}.",
        "{victim} reported that their scooter ({make}, Reg. {vehicle_no}) was found missing from {location} apartment parking.",
    ],
    "Car Theft": [
        "{victim} reported theft of their {make} {model} car (Reg. {vehicle_no}) from {location} road. The vehicle is {color} in colour.",
        "Complainant found their car missing from the basement parking of their residential complex at {address}. Car is a {make} bearing Reg. {vehicle_no}.",
        "{victim} parked their {color} {make} car near {landmark} on {date} and reported it missing the following morning.",
        "Car theft reported at {location}. A {make} {model} (Reg. {vehicle_no}) was stolen between {time1} and {time2} hours.",
        "{victim} reported their car stolen from a shopping mall parking lot at {location}. CCTV cameras at the location may have captured the incident.",
        "Vehicle theft complaint by {victim}. A {make} sedan (Reg. {vehicle_no}) parked outside {location} was reported missing.",
    ],
    "Commercial Vehicle Theft": [
        "{victim}, owner of a transport company, reported theft of a {make} goods vehicle (Reg. {vehicle_no}) from {location} depot.",
        "Complainant reported that a tempo traveller (Reg. {vehicle_no}) carrying goods was stolen by an unknown driver from {location}.",
        "Theft of a {make} lorry (Reg. {vehicle_no}) reported from {location} truck parking area. Driver returned to find vehicle missing.",
        "{victim} reported that their auto-rickshaw (Reg. {vehicle_no}) was stolen from outside {landmark} while they had gone inside briefly.",
        "Theft of commercial vehicle reported. A {make} mini-truck used for delivery purposes (Reg. {vehicle_no}) went missing from {location}.",
        "A school bus (Reg. {vehicle_no}) belonging to {victim} institution was stolen from {location} compound during late night hours.",
    ],
    # ── Burglary ───────────────────────────────────────────────────────────────
    "Residential Burglary": [
        "{victim} reported that their residence at {address} was broken into during their absence. Cash Rs. {amount} and jewellery were stolen.",
        "Burglary at {address}. Accused gained entry by breaking the rear window grill. Gold ornaments and cash were taken.",
        "{victim} returned home to find the front door lock broken and household valuables including jewellery worth Rs. {amount} missing.",
        "Housebreaking and theft reported from {address}. The family had gone on vacation and returned to find their home ransacked.",
        "Complainant {victim} reported that burglars entered the first floor of their house through the terrace door and stole electronics worth Rs. {amount}.",
        "Residential burglary at {address}. Accused removed window bars to gain entry and stole cash, jewellery and electronic gadgets.",
    ],
    "Office Burglary": [
        "{victim}, manager of {office} at {location}, reported that the office was broken into at night and cash Rs. {amount} from the safe was stolen.",
        "Burglary at the office of {office}, {location}. Main door lock was tampered and computer equipment worth Rs. {amount} stolen.",
        "Complainant reported housebreaking at commercial establishment at {location}. Server equipment and sensitive documents were taken.",
        "{victim} found that their jewellery showroom at {location} was broken into. Ornaments and cash from the safe were stolen.",
        "Office burglary reported at {location}. Accused gained entry by drilling the shutter lock. Petty cash and laptops were stolen.",
        "Complainant {victim} reported theft from their pharmacy at {location}. Medicines worth Rs. {amount} and cash were found missing.",
    ],
    "Warehouse Break-in": [
        "{victim} reported a break-in at their goods warehouse located at {location}. Electronic appliances worth Rs. {amount} were stolen.",
        "Warehouse break-in at {location}. Unknown persons cut the perimeter fence and stole stored goods worth Rs. {amount}.",
        "Complainant {victim}, proprietor of a cold storage facility at {location}, reported theft of goods worth Rs. {amount} after a break-in.",
        "Burglary at {location} warehouse. Security guard was tied up and gagged by accused who then loaded goods into a vehicle.",
        "{victim} reported break-in at their construction materials godown at {location}. Cement and iron rods worth Rs. {amount} were stolen.",
        "Complainant reported a warehouse theft at {location}. Suspects tampered with CCTV and broke the roller shutter to gain entry.",
    ],
    # ── Robbery ────────────────────────────────────────────────────────────────
    "Armed Robbery": [
        "{victim} was attacked by {count} armed persons near {location} who threatened with a knife and robbed cash Rs. {amount} and gold chain.",
        "Armed robbery at {location}. Complainant was held at gunpoint by two masked individuals who fled with cash Rs. {amount}.",
        "{victim}, a petrol bunk attendant at {location}, reported that three armed miscreants robbed cash collections of Rs. {amount} at closing time.",
        "Complainant {victim} was returning home from {location} when accused displaying a weapon snatched cash and jewellery.",
        "Armed robbery at a textile shop at {location}. Three accused armed with weapons held staff at bay and fled with Rs. {amount}.",
        "Complainant was confronted by armed individuals at {location} who demanded cash and fled with Rs. {amount} after threatening the victim.",
    ],
    "Chain Snatching": [
        "{victim} was walking near {location} when a motorcycle-borne individual snatched their gold chain worth Rs. {amount}.",
        "Chain snatching near {landmark}. Complainant {victim} sustained minor neck injuries. Accused fled on a two-wheeler.",
        "{victim} reported that a gold necklace was snatched while they were standing near {location} ATM withdrawing cash.",
        "Chain snatching incident at {location}. Two persons on a black motorcycle snatched complainant's chain and vanished.",
        "{victim} was alighting from an auto-rickshaw at {location} when a pillion rider snatched the chain and fled.",
        "Complainant {victim} reported chain snatching near {location} market. Accused wore a helmet and fled on a two-wheeler.",
    ],
    "Street Robbery": [
        "{victim} was stopped by {count} individuals at {location} at night who beat the complainant and robbed cash Rs. {amount} and mobile.",
        "Street robbery reported. Complainant was returning home when accosted at {location} by accused who snatched wallet and fled.",
        "{victim} was assaulted at {location} by a group of youths who stole cash and mobile phone after threatening the complainant.",
        "Complainant {victim} was robbed near {location} overbridge. Accused threatened with a knife and took cash Rs. {amount}.",
        "Street robbery at {location}. Two unknown individuals followed the complainant from a bank and snatched cash Rs. {amount}.",
        "{victim} reported robbery near {location} park. Accused snatched the bag containing cash and important documents.",
    ],
    # ── Cyber Crime ────────────────────────────────────────────────────────────
    "UPI Fraud": [
        "{victim} received a call from an individual posing as a bank official. Complainant was convinced to share UPI PIN and lost Rs. {amount}.",
        "Fraudster sent a fake UPI collect request to {victim} claiming it was for a refund. Complainant accepted and Rs. {amount} was debited.",
        "{victim} transferred Rs. {amount} to a fraudulent UPI ID after receiving a convincing message claiming their account would be blocked.",
        "Complainant {victim} received a request link claiming to be from a government scheme and upon clicking transferred Rs. {amount} unknowingly.",
        "{victim} reported UPI fraud of Rs. {amount}. Accused had sent a fake customer service number which redirected calls.",
        "Rs. {amount} debited from {victim}'s account through a fraudulent UPI transaction. Complainant did not initiate any payment.",
    ],
    "QR Scam": [
        "{victim} was trying to sell an item online when the buyer sent a QR code claiming it would credit money. Rs. {amount} was debited instead.",
        "Complainant {victim} received a fake QR code from someone posing as a government authority and lost Rs. {amount} on scanning.",
        "{victim} was duped into scanning a QR code at {location} that drained Rs. {amount} from their bank account.",
        "QR code fraud reported. Complainant was told to scan a QR to receive a cashback of Rs. {amount} but instead lost money.",
        "{victim} placed an ad to sell goods. Buyer sent QR code for advance payment which resulted in debit of Rs. {amount} from complainant's account.",
        "Complainant scanned a QR code pasted on a rental property advertisement at {location} and lost Rs. {amount} as security deposit.",
    ],
    "OTP Scam": [
        "{victim} received a call claiming to be from TRAI threatening to block their mobile number. Caller obtained OTP and transferred Rs. {amount}.",
        "Fraud through OTP sharing. Complainant {victim} received a call from a person posing as a telecom executive and shared OTP, losing Rs. {amount}.",
        "{victim} received an SMS with an OTP followed by a call from a fraudster claiming to be a bank official who guided complainant to share OTP.",
        "Complainant was told their electricity connection would be disconnected unless they share OTP. Rs. {amount} was debited after OTP was shared.",
        "{victim} shared OTP with an individual who called claiming to update KYC details. Amount Rs. {amount} was transferred without consent.",
        "OTP fraud case. Complainant {victim} received a call from a person claiming to process an insurance claim and obtained OTP to steal Rs. {amount}.",
    ],
    "Phishing": [
        "{victim} clicked on a phishing link received via SMS claiming to be from their bank for KYC update. Credentials were compromised and Rs. {amount} stolen.",
        "Phishing attack on {victim}. Complainant received an email from a spoofed bank address and entered credentials on a fake website.",
        "{victim} received a WhatsApp message with a link claiming to offer government scheme benefits. Clicking the link caused banking data theft.",
        "Complainant {victim} reported that clicking a suspicious email link exposed their net banking credentials and Rs. {amount} was transferred.",
        "{victim} reported phishing. An email appearing to be from a known courier company led to credential theft after victim entered details.",
        "Phishing case. Complainant received a link purportedly for a lottery claim and entered personal information, leading to Rs. {amount} loss.",
    ],
    "Fake Job Scam": [
        "{victim} paid Rs. {amount} as registration and training fees for a data entry job promised by a fraudster through WhatsApp.",
        "Complainant {victim} found a job advertisement on social media and transferred Rs. {amount} as processing fee. Company turned out to be fake.",
        "{victim} was offered a government job through an agent who collected Rs. {amount} and thereafter became unreachable.",
        "Fake job fraud. Complainant paid Rs. {amount} to a recruitment agency at {location} for a visa and job abroad that never materialised.",
        "{victim} applied for a BPO job after seeing an advertisement. After paying Rs. {amount}, the person stopped responding.",
        "Complainant {victim} was lured by a job offer via email. Interview was conducted online and fees collected amounting to Rs. {amount}.",
    ],
    "Online Shopping Fraud": [
        "{victim} ordered goods worth Rs. {amount} from a fake e-commerce website. Payment was accepted but no product was delivered.",
        "Complainant purchased a mobile phone worth Rs. {amount} from an unknown online seller. An empty box was delivered instead.",
        "{victim} reported online fraud. A seller on a classified platform sold a fake product and refused to refund Rs. {amount}.",
        "Complainant {victim} paid Rs. {amount} for electronic goods on a social media marketplace. Seller disappeared after receiving payment.",
        "{victim} ordered branded clothing from an Instagram advertisement page. Inferior counterfeit goods were delivered and return refused.",
        "Online shopping fraud reported by {victim}. A pre-owned vehicle advertised online for Rs. {amount} was paid for but never delivered.",
    ],
    "Identity Theft": [
        "{victim} discovered that an unknown person used their identity documents to obtain a SIM card and conduct fraudulent transactions of Rs. {amount}.",
        "Complainant reported that fake documents in their name were used to open a bank account and secure a loan of Rs. {amount}.",
        "{victim} received bank notices for a loan they had not availed. On investigation, their identity was found to have been misused.",
        "Identity theft case. Complainant's name, address and ID details were used to register a company and commit GST fraud.",
        "{victim} found that their stolen driving licence was used to purchase a vehicle. Loan EMI notices arrived in complainant's name.",
        "Complainant {victim} reported that their Voter ID details were misused to create a fake profile online causing financial and reputational damage.",
    ],
    # ── Financial Fraud ────────────────────────────────────────────────────────
    "Investment Scam": [
        "{victim} invested Rs. {amount} in a chit fund scheme promising 30% returns. The company absconded with investor funds.",
        "Complainant {victim} and other investors were defrauded of Rs. {amount} by a Ponzi scheme operator who promised high monthly returns.",
        "{victim} invested Rs. {amount} in a real estate project. The developer vanished after collecting funds from multiple investors.",
        "Investment fraud. Complainant transferred Rs. {amount} to a crypto investment platform that turned out to be a scam.",
        "{victim} was lured into a multi-level marketing scheme and invested Rs. {amount}. The scheme collapsed and organizers fled.",
        "Complainant {victim} reported investment fraud. An online trading company promised guaranteed returns and accepted Rs. {amount} before shutting down.",
    ],
    "Loan Fraud": [
        "{victim} received an unauthorised loan of Rs. {amount} in their name through documents submitted without their knowledge.",
        "Complainant {victim} reported that a lending app illegally accessed contacts and imposed a fraudulent loan of Rs. {amount} with exorbitant interest.",
        "Loan fraud. An agent collected documents from {victim} for a home loan application and used them to fraudulently secure Rs. {amount}.",
        "{victim} received loan recovery notices for a loan they had never applied for. Banks had disbursed Rs. {amount} against forged signatures.",
        "Complainant reported an instant loan app scam. Despite repaying, {victim} continued to receive threats and demands for additional Rs. {amount}.",
        "{victim} gave documents for processing a personal loan. The amount Rs. {amount} was disbursed to a different account without complainant's knowledge.",
    ],
    "Credit Card Fraud": [
        "{victim} received alerts for transactions of Rs. {amount} on their credit card which were not authorised by the complainant.",
        "Credit card cloning fraud reported by {victim}. Unauthorized transactions totalling Rs. {amount} were observed at various online merchants.",
        "{victim} found that their credit card details were misused to make online purchases worth Rs. {amount} on a foreign website.",
        "Complainant reported receiving an OTP on their phone for a credit card transaction of Rs. {amount} they had not initiated.",
        "Credit card details of {victim} were compromised. Purchases worth Rs. {amount} were made from an international e-commerce platform.",
        "{victim} reported that their credit card was used for multiple transactions at ATMs across different cities totalling Rs. {amount}.",
    ],
    "Forgery": [
        "{victim} discovered that forged cheques bearing their signature were encashed at {location} bank totalling Rs. {amount}.",
        "Complainant {victim} found that property documents in their name were forged and used to mortgage the property for a loan of Rs. {amount}.",
        "Forgery case. Fake stamp papers and agreements were used in {victim}'s name to transfer property ownership fraudulently.",
        "{victim} reported that their company letterhead was forged to obtain goods on credit from suppliers worth Rs. {amount}.",
        "Complainant discovered that fake land records were created using forged signatures of {victim} at the sub-registrar office, {location}.",
        "Forgery of educational certificates detected. {victim} found that fake certificates in their name were circulated and used fraudulently.",
    ],
    # ── Assault ────────────────────────────────────────────────────────────────
    "Physical Assault": [
        "{victim} was assaulted by {suspect} near {location} following an argument. Complainant sustained injuries to the {body_part}.",
        "Complainant {victim} was attacked with {weapon} by known individual {suspect} at {location}. First aid was administered.",
        "{victim} reported physical assault at {location}. Accused punched and kicked the complainant causing grievous injuries.",
        "Physical assault case. {victim} and {suspect} had a dispute over {issue} which escalated into a violent confrontation near {location}.",
        "Complainant sustained injuries after being assaulted at {location}. Accused {suspect} used a blunt object to attack the complainant.",
        "{victim} was returning from work when {suspect} accosted and assaulted them near {location}. Neighbours intervened and accused fled.",
    ],
    "Group Violence": [
        "{victim} was set upon by a group of {count} individuals near {location} following a neighbourhood dispute. Multiple injuries reported.",
        "Group assault reported. Complainant {victim} was attacked by members of a rival group at {location}. Stone pelting and stick attacks occurred.",
        "{victim} reported group assault. A gang of {count} youths surrounded the complainant at {location} and attacked. Several persons arrested.",
        "Group violence at {location}. Complainant {victim} and their associates were confronted by a rival group resulting in injuries to both parties.",
        "Complainant {victim} reported that a group attacked them outside {location} during a festive procession. Situation was controlled by police.",
        "Group violence at {location}. {count} accused persons armed with sticks attacked {victim} following a property dispute.",
    ],
    "Public Altercation": [
        "Altercation between {victim} and {suspect} near {location} escalated into a fight. Both parties sustained minor injuries.",
        "Complainant {victim} was verbally abused and pushed by {suspect} at {location} following a traffic dispute.",
        "{victim} reported public altercation at {location}. Accused {suspect} used abusive language and threatened the complainant.",
        "A public fight between tenants of {address} reported by {victim}. Bystanders intervened but minor injuries were sustained.",
        "Complainant {victim} was involved in an altercation with {suspect} at {location}. Both parties exchanged blows and required medical attention.",
        "Public order disturbance at {location}. Accused {suspect} picked a fight with {victim} over {issue} in full public view.",
    ],
    # ── Missing Person ─────────────────────────────────────────────────────────
    "Missing Adult": [
        "{victim}, aged {age}, was last seen at {location} on {date} and has not returned home. Family suspects {reason}.",
        "Missing person complaint filed by family member of {victim}. The adult went missing from {location} area and has not made contact.",
        "{victim}, a resident of {address}, has been missing since {date}. Last seen wearing {clothing} near {location}.",
        "Complainant filed missing report for {victim}, aged {age}. The person had left for {location} on {date} and did not return.",
        "A missing adult case registered. {victim} went to {location} for work and did not return home for {days} days. Phone unreachable.",
        "{victim} aged {age} was last seen at {location}. Family members have searched all known locations and requested police assistance.",
    ],
    "Missing Child": [
        "{victim}, a minor aged {age}, went missing from near {location} while playing with friends on {date}.",
        "Missing child complaint. {victim}, aged {age} years, failed to return home from {school} school at {location} on {date}.",
        "Complainant (parent) reported missing child. {victim}, aged {age}, was last seen near {location} at approximately {time} hours.",
        "{victim} (minor, age {age}) has been missing from {address} since {date}. Child was last seen in {clothing} near {location}.",
        "Missing child report filed. {victim}, age {age}, separated from family at {location} crowded event and has not been located.",
        "Child missing since {date}. {victim}, aged {age} years, was playing outside at {location} and failed to return by evening.",
    ],
    # ── Kidnapping ─────────────────────────────────────────────────────────────
    "Kidnapping for Ransom": [
        "{victim} was abducted from {location} by {count} armed individuals. A ransom demand of Rs. {amount} was communicated to the family.",
        "Kidnapping case. {victim} was forcibly taken from {location} area. Accused made a ransom call demanding Rs. {amount} for safe release.",
        "Complainant family reported that {victim} was abducted while returning from {location}. Kidnappers demanded Rs. {amount} for release.",
        "{victim} went missing from {location}. An unknown caller later demanded Rs. {amount} ransom. Case treated as kidnapping.",
        "Victim {victim} was forcibly bundled into a vehicle near {location}. Kidnappers demanded Rs. {amount} and instructed family not to contact police.",
        "{victim} was abducted from {location} while travelling alone. Ransom call received within hours demanding Rs. {amount}.",
    ],
    "Abduction": [
        "{victim} was lured and taken away from {location} under false pretenses by {suspect}. Family traced them with police help.",
        "Abduction case. Minor {victim} was taken away by {suspect} without parental consent from {location}.",
        "Complainant family reported that {victim} left home willingly with {suspect} and has not returned. Suspected abduction.",
        "{victim} was abducted near {location} in a dispute over {issue}. The complainant was recovered during investigation.",
        "Abduction case registered. {victim} was taken to an undisclosed location by accused {suspect} after an altercation.",
        "Complainant {victim} was forcibly taken from {location} by a group and held for several hours before being released.",
    ],
    # ── Drug & NDPS ────────────────────────────────────────────────────────────
    "Drug Possession": [
        "{suspect} was apprehended near {location} with {quantity} grams of {drug_type} concealed in {concealment}. NDPS Act invoked.",
        "Accused {suspect} found in possession of {drug_type} at {location} during a routine patrol check. Quantity seized: {quantity} grams.",
        "Drug possession case. {suspect} was intercepted at {location} and found carrying {drug_type} worth approximately Rs. {amount}.",
        "Suspect {suspect} was arrested at {location} with {quantity} grams of {drug_type} hidden in vehicle. Case registered under NDPS Act.",
        "Accused {suspect} apprehended at {location} based on credible information. {drug_type} seized during personal search.",
        "Drug possession: accused {suspect} was caught near {location} with a small consignment of {drug_type} in a plastic packet.",
    ],
    "Drug Trafficking": [
        "Based on intelligence inputs, a consignment of {drug_type} weighing {quantity} kilograms was seized at {location}. {count} accused arrested.",
        "Drug trafficking case. Police intercepted a vehicle at {location} and seized {drug_type} worth Rs. {amount}. {count} persons held.",
        "Drug haul at {location}. Accused {suspect} along with associates was found transporting {drug_type} from {source} to {destination}.",
        "{count} accused arrested at {location} for trafficking {drug_type}. The consignment was concealed in a goods vehicle.",
        "Narcotics seized near {location} in an ongoing inter-district drug network operation. {quantity} kg of {drug_type} recovered.",
        "Accused {suspect} was arrested at a checkpost near {location}. Hidden compartment in vehicle contained {quantity} kg of {drug_type}.",
    ],
    # ── Traffic & Road Crime ────────────────────────────────────────────────────
    "Hit and Run": [
        "{victim}, a pedestrian, was struck by a speeding vehicle near {location} and the driver fled the scene. Victim taken to {hospital}.",
        "A hit-and-run accident at {location}. {victim} sustained {injury} injuries when a vehicle ran over them and sped away.",
        "Complainant family reported that {victim} was knocked down by an unknown vehicle near {location} and the driver escaped.",
        "Hit-and-run at {location}. Two-wheeler struck a pedestrian {victim} near {landmark} and fled. Victim hospitalised with {injury}.",
        "{victim} was hit by a vehicle while crossing the road at {location}. The vehicle, a {make}, sped away without stopping.",
        "Road accident reported at {location}. {victim} was riding a bicycle when struck from behind by a fast-moving vehicle that did not stop.",
    ],
    "Drunk Driving": [
        "{suspect} was apprehended near {location} for driving under the influence of alcohol. BAC measured at {bac}. Vehicle seized.",
        "Drunk driving case. Accused {suspect} was found driving erratically on {location} road and failed the breathalyzer test.",
        "{suspect} was stopped at a checking point at {location}. The driver was found intoxicated and caused a minor accident.",
        "Drunk driving case at {location}. Accused {suspect} drove vehicle into a median after losing control. Breathalyzer test positive.",
        "Night patrol team intercepted {suspect} at {location} for rash driving. Driver was found to be heavily intoxicated.",
        "{suspect} apprehended near {location} for dangerous driving. The accused could not walk in a straight line and smelled of alcohol.",
    ],
    "Rash Driving": [
        "{suspect} was booked for rash and negligent driving near {location} after endangering pedestrians and causing a near-accident.",
        "Rash driving case. {suspect} was racing another vehicle on {location} road and caused two other vehicles to swerve dangerously.",
        "Complainant reported that {suspect} drove at high speed through a school zone at {location} and narrowly missed students.",
        "{suspect} was caught on CCTV driving in the wrong direction on {location} highway. Case registered for rash and negligent driving.",
        "Rash driving on {location} ring road. {suspect} overtook multiple vehicles dangerously and caused a minor collision.",
        "{suspect} apprehended for rash driving after ignoring traffic signals at {location} junction and causing chaos during peak hours.",
    ],
    # ── Property Damage ────────────────────────────────────────────────────────
    "Vandalism": [
        "{victim} reported that their vehicle (Reg. {vehicle_no}) was vandalized by unknown persons at {location}. Side mirror and bonnet damaged.",
        "Vandalism reported at {location}. Shop shutters, signboards and glass windows belonging to {victim} were smashed by unknown persons.",
        "{victim} found that the walls of their property at {address} were defaced with graffiti by unknown individuals.",
        "Complainant {victim} reported that their newly constructed boundary wall was demolished by {suspect} in a property dispute.",
        "Vandalism case. Miscreants broke flower pots, furniture and glass doors at the office of {victim} at {location}.",
        "{victim} found public property near {location} vandalized. Street lights, dustbins and benches were found damaged.",
    ],
    "Arson": [
        "{victim}'s agricultural crop in survey no. {survey_no} at {location} was set on fire by unknown individuals causing a loss of Rs. {amount}.",
        "Arson reported. {victim}'s vehicle (Reg. {vehicle_no}) was set ablaze near {location}. Fire brigade responded to douse the fire.",
        "{victim}'s business establishment at {location} was set on fire at night. The blaze caused damage worth Rs. {amount}.",
        "Arson case. A thatched shed belonging to {victim} at {address} was deliberately set on fire, gutting the structure completely.",
        "Complainant {victim} reported that their paddy harvest stored at {location} was set on fire in an apparent act of revenge.",
        "Arson at {location}. {victim}'s vehicle was set ablaze by unidentified persons at night. Motive believed to be personal rivalry.",
    ],
    # ── Public Disorder ────────────────────────────────────────────────────────
    "Riot": [
        "A riot broke out at {location} between two groups following a {trigger}. Police deployed in force. {count} persons arrested.",
        "Group clashes reported at {location}. Two communities engaged in stone pelting and road blockade causing property damage.",
        "Riot at {location}. An altercation between members of rival groups escalated into large-scale violence. Curfew imposed.",
        "Communal tension led to a riot at {location}. {count} persons arrested. Section 144 imposed in the area.",
        "A scheduled procession at {location} led to clashes. Riot police deployed. Vehicles damaged and {count} persons taken into custody.",
        "Riot near {location}. Following a dispute at a local festival, two groups armed with sticks clashed resulting in {count} injuries.",
    ],
    "Unlawful Assembly": [
        "{count} individuals were detained at {location} for unlawful assembly and disturbing public order under Section 144.",
        "Unlawful assembly case at {location}. A group gathered without permission and obstructed traffic causing public nuisance.",
        "Complainant police officer reported that an unlawful assembly of {count} persons at {location} refused to disperse.",
        "Section 144 violation at {location}. A group assembled and conducted an unauthorized rally. {count} persons detained.",
        "Unlawful assembly near {location}. A procession without permission turned rowdy. Lathi charge ordered to control the crowd.",
        "A flash mob of {count} persons at {location} created panic among the public. Group was dispersed and leaders detained.",
    ],
    # ── Illegal Arms & Organized Crime ─────────────────────────────────────────
    "Illegal Weapon Possession": [
        "Accused {suspect} was apprehended at {location} with an unlicensed {weapon}. Arms Act violation case registered.",
        "Illegal weapon seizure at {location}. {suspect} was found carrying a country-made pistol and {count} rounds of ammunition.",
        "{suspect} was arrested based on a tip-off. A search of their residence at {address} revealed an illegal {weapon} and cartridges.",
        "Arms seizure. {suspect} found in possession of an unlicensed firearm near {location}. Case registered under Arms Act.",
        "Accused {suspect} intercepted at {location} during checking. Found to be carrying a sharp weapon and a country-made gun.",
        "Illegal arms recovered during a raid at {location}. {count} weapons and {ammo} rounds of ammunition seized. {count} persons arrested.",
    ],
    "Organized Criminal Activity": [
        "A criminal syndicate operating in {location} area was busted. {count} members arrested for extortion and criminal intimidation.",
        "Organized crime case. A gang led by {suspect} was found running an extortion racket targeting local businesses in {location}.",
        "Police crackdown on gang activity at {location}. {count} members of an organized criminal group arrested.",
        "Complainant {victim} reported extortion threats from a gang. Investigation revealed an organized criminal network in {location}.",
        "Organized crime ring busted at {location}. The group was involved in lending at exorbitant interest rates and using threats for recovery.",
        "Gang arrested for organized criminal activity. Group was planning a dacoity operation in {location}. Weapons and logistics seized.",
    ],
    # ── Environmental & Wildlife Crime ─────────────────────────────────────────
    "Illegal Sand Mining": [
        "Illegal sand mining reported at {location} on the banks of River {river}. Machinery and vehicles seized. {count} persons arrested.",
        "A complaint of illegal sand extraction from {location} riverbed was received. Mining activity was carried out without valid permits.",
        "Illegal sand mining operation busted at {location}. {count} tractor-loads of sand were being transported without permission.",
        "Vigilance team caught {count} individuals engaged in night-time sand mining from river {river} near {location}.",
        "Forest department complaint of illegal sand quarrying at {location}. Heavy machinery found at the scene.",
        "Accused {suspect} was found supervising illegal sand mining operations at {location}. Equipment seized and FIR registered.",
    ],
    "Wildlife Smuggling": [
        "Forest department and police jointly apprehended {suspect} at {location} with {animal_part} of protected species. Wildlife Act case registered.",
        "Wildlife smuggling case. Accused {suspect} was found in possession of {animal_part} concealed in luggage at {location}.",
        "A vehicle intercepted at {location} checkpoint was found to contain live protected birds concealed in boxes.",
        "Accused found with skins and body parts of protected species at {location}. Case registered under Wildlife Protection Act.",
        "Wildlife trafficking bust at {location}. Accused {suspect} was part of an inter-state smuggling ring dealing in protected species.",
        "Forest guard complaint. {suspect} was found hunting in a protected forest area at {location}. Firearms and traps seized.",
    ],
    "Forest Offence": [
        "Illegal tree felling reported at {location} reserve forest. {count} rosewood trees were cut and timber was loaded onto a tractor.",
        "Forest officials detected illegal timber extraction at {location}. Accused {suspect} arrested with illegally felled teak logs.",
        "Forest encroachment at {location}. Accused cleared forest land for agriculture without obtaining required permissions.",
        "Complainant forest ranger reported illegal grazing in reserved forest at {location}. {count} cattle driven inside the forest boundary.",
        "Charcoal manufacturing using illegally procured forest wood detected at {location}. Kiln and raw material seized.",
        "Illegal quarrying near {location} forest boundary. Activity found to be damaging wildlife habitat. {count} persons detained.",
    ],
}

# ─── Per-subtype Modus Operandi ────────────────────────────────────────────────
MODUS_OPERANDI = {
    "Mobile Theft": ["Snatching from hand in crowded area", "Pickpocketing in public transport", "Distraction theft at market"],
    "Jewellery Theft": ["Entry through unlocked door during absence", "Friendly thief gaining trust", "Housebreaking through rear window"],
    "Shoplifting": ["Concealing items in clothes or bag", "Distracting staff while accomplice steals", "Switching price tags"],
    "Bag Theft": ["Grab and run near ATM", "Theft from restaurant seat", "Snatching from moving auto"],
    "Motorcycle Theft": ["Bypassing steering lock with tools", "Duplicate key used", "Stolen during nighttime from parking"],
    "Car Theft": ["Relay attack on keyless entry", "Forced entry and hotwiring", "Duplicate key from spare set obtained fraudulently"],
    "Commercial Vehicle Theft": ["Driver replacement scheme", "Vehicle hijacking at isolated road", "Fake delivery assignment to steal vehicle"],
    "Residential Burglary": ["Breaking rear window or door lock", "Entry through terrace staircase", "Targeting houses during festival absences"],
    "Office Burglary": ["Drilling shutter lock at night", "Gaining entry as cleaning staff", "Breaking glass panel of door"],
    "Warehouse Break-in": ["Cutting perimeter fencing at night", "Overpowering security guard", "Organized gang with transport vehicle"],
    "Armed Robbery": ["Threatening at knifepoint", "Gang surrounds victim", "Wearing masks and gloves to avoid identification"],
    "Chain Snatching": ["Motorcycle-borne snatch and flee", "Distracting victim and pulling chain", "Targeting elderly near ATMs"],
    "Street Robbery": ["Surrounding victim in isolated area", "Feigning emergency to lower guard", "Late night ambush near footpath"],
    "UPI Fraud": ["Fake bank executive call and PIN extraction", "Screen sharing app used to monitor transactions", "Fake UPI collect request disguised as refund"],
    "QR Scam": ["Sending payment QR code as receive code", "Pasting fraudulent QR over legitimate one", "Fake cashback QR codes via WhatsApp"],
    "OTP Scam": ["Posing as telecom official threatening disconnection", "Pretending to be bank KYC team", "SIM swap fraud with OTP interception"],
    "Phishing": ["Spoofed email mimicking bank communication", "Fake government portal link via SMS", "Cloned login page on fake domain"],
    "Fake Job Scam": ["Fake job portal posting with call centre", "WhatsApp group based fake recruitment", "Demand for registration/training fees"],
    "Online Shopping Fraud": ["Fake e-commerce site with attractive pricing", "Social media marketplace fraud with advance payment", "Empty box delivery on prepaid orders"],
    "Identity Theft": ["Misuse of documents collected for other purposes", "Stolen ID used for SIM acquisition", "Dark web purchase of identity data"],
    "Investment Scam": ["High-return Ponzi scheme", "Crypto investment platform fraud", "Real estate advance collection and disappearance"],
    "Loan Fraud": ["Misuse of KYC documents for unauthorized loans", "Illegal instant loan apps", "Fraudulent guarantor schemes"],
    "Credit Card Fraud": ["Skimming device at ATM/POS", "Online credential theft and card-not-present fraud", "Phishing to obtain card details"],
    "Forgery": ["Forged property documents for loan fraud", "Fake cheques with forged signatures", "Counterfeit stamps and agreements"],
    "Physical Assault": ["Dispute escalation over road rage", "Neighbourhood property dispute turning violent", "Personal enmity resulting in planned attack"],
    "Group Violence": ["Rival gang confrontation", "Mob attack following rumour or insult", "Political or social dispute group attack"],
    "Public Altercation": ["Road rage incident", "Workplace dispute spilling outside", "Verbal abuse followed by physical confrontation"],
    "Missing Adult": ["Voluntary disappearance due to family issues", "Missing after job hunting in city", "Suspected foul play following threats"],
    "Missing Child": ["Separated from family at crowded place", "Child did not return from school", "Suspected luring by stranger"],
    "Kidnapping for Ransom": ["Forced abduction and vehicle transfer to isolated area", "Organized gang kidnapping for financial demand", "Targeting wealthy family members"],
    "Abduction": ["Luring minor with promise of gifts", "Forcible removal in vehicle", "Planned abduction linked to personal or business dispute"],
    "Drug Possession": ["Concealment in clothing or shoes", "Hidden in vehicle compartment", "Backpack with false bottom"],
    "Drug Trafficking": ["Interstate supply route through isolated roads", "Concealment in commercial vehicle with goods", "Couriers used for last-mile delivery"],
    "Hit and Run": ["Speeding vehicle lost control and fled", "Night-time accident on poorly lit road", "Driver panicked and fled after collision"],
    "Drunk Driving": ["Drunk driver intercepted at checkpost", "Accident caused by intoxicated driver", "Erratic driving noticed by patrol"],
    "Rash Driving": ["Racing on highway", "Running red lights at high speed", "Wrong-side driving causing collision"],
    "Vandalism": ["Property damage in personal dispute", "Gang marking territory", "Politically motivated property destruction"],
    "Arson": ["Crop burning in agricultural land dispute", "Vehicle burnt for personal revenge", "Business premises targeted in rivalry"],
    "Riot": ["Communal or social group clash", "Festival procession dispute escalation", "Mob violence following rumour on social media"],
    "Unlawful Assembly": ["Illegal political gathering", "Flash mob turning disruptive", "Unauthorized protest blocking traffic"],
    "Illegal Weapon Possession": ["Arms smuggling interception", "Weapons found during property search", "Unlicensed firearm carried for personal protection"],
    "Organized Criminal Activity": ["Extortion network targeting traders", "Gang-led loan sharking operation", "Organised dacoity planning intercepted"],
    "Illegal Sand Mining": ["Night-time sand extraction from riverbed", "Use of JCB and tractors without permission", "Bribery of local officials to continue operation"],
    "Wildlife Smuggling": ["Interstate smuggling network for wildlife parts", "Concealment in regular consignment", "Targeting protected forest areas"],
    "Forest Offence": ["Illegal timber felling and transportation", "Forest encroachment for agriculture", "Illegal charcoal manufacturing in forest"],
}

# ─── IPC Sections ──────────────────────────────────────────────────────────────
IPC_SECTIONS = [
    "302", "304", "304A", "306", "307", "323", "324", "325",
    "326", "341", "342", "354", "354A", "354B",
    "363", "365", "366", "370", "376",
    "379", "380", "381", "382", "384", "385", "386",
    "390", "392", "393", "394", "395", "396", "397",
    "406", "408", "409", "411", "413", "414",
    "415", "417", "418", "419", "420", "421", "422",
    "427", "435", "436", "447", "448", "449", "450",
    "452", "453", "454", "456", "457", "458", "459", "460",
    "465", "467", "468", "471",
    "494", "498A", "504", "506", "509", "511",
]

WEAPON_TYPES = [
    "Knife", "Machete", "Axe", "Sword", "Dagger", "Sickle",
    "Country-made Pistol", "Revolver", "Rifle", "Shotgun",
    "Iron Rod", "Wooden Stick", "Cricket Bat", "Hockey Stick",
    "Stone", "Brick", "Glass Bottle", "Acid",
    "Rope", "Wire", "Chain", "Hammer",
    "Explosive", "Petrol Bomb",
    "Bare Hands", "Blunt Object", "Sharp Object", "Unknown"
]

EVIDENCE_TYPES = [
    "Physical", "Documentary", "Digital", "Forensic",
    "Testimonial", "Photographic", "Video", "Audio",
    "Biological", "Ballistic", "Chemical", "Trace"
]

EVIDENCE_SUBTYPES = {
    "Physical": ["Weapon", "Clothing", "Tool", "Vehicle Part", "Broken Lock", "Footwear", "Container", "Packaging"],
    "Documentary": ["FIR Copy", "Panchanama", "Medical Report", "Bank Statement",
                    "Phone Records", "Driving Licence", "Property Deed", "Agreement"],
    "Digital": ["CCTV Footage", "Mobile Phone Data", "Email Records",
                "Social Media Posts", "GPS Data", "Computer Hard Drive", "USB Drive", "Transaction Logs"],
    "Forensic": ["Fingerprints", "DNA Sample", "Blood Sample", "Hair Sample",
                 "Fibre Sample", "Soil Sample", "Paint Sample", "Bite Mark"],
    "Testimonial": ["Witness Statement", "Dying Declaration", "Confession Statement",
                    "Expert Opinion", "Informant Statement"],
    "Photographic": ["Crime Scene Photos", "Injury Photos", "Evidence Photos",
                     "Surveillance Photos", "Satellite Image"],
    "Video": ["Body Cam Footage", "Dash Cam Footage", "CCTV Recording",
              "Drone Footage", "Mobile Video"],
    "Audio": ["Phone Call Recording", "Ambient Recording", "Voice Note"],
    "Biological": ["Blood Stain", "Saliva Sample", "Tissue Sample", "Urine Sample"],
    "Ballistic": ["Bullet", "Cartridge Case", "Firearm", "Gun Powder Residue"],
    "Chemical": ["Drug Sample", "Poison Sample", "Explosive Residue", "Accelerant", "Alcohol Sample"],
    "Trace": ["Glass Fragment", "Paint Chip", "Tyre Mark", "Tool Mark", "Soil Sample"]
}

VEHICLE_MAKES_MODELS = {
    "Maruti Suzuki": ["Alto", "Swift", "Baleno", "Dzire", "WagonR",
                      "Brezza", "Ertiga", "Celerio", "S-Presso", "Eeco"],
    "Hyundai": ["i10", "i20", "Creta", "Venue", "Verna", "Aura", "Alcazar"],
    "Tata": ["Nexon", "Harrier", "Safari", "Punch", "Altroz", "Tiago", "Tigor"],
    "Mahindra": ["Scorpio", "Bolero", "XUV700", "Thar", "XUV300"],
    "Honda": ["City", "Amaze", "WR-V", "Jazz"],
    "Toyota": ["Innova", "Fortuner", "Glanza", "Urban Cruiser"],
    "Kia": ["Seltos", "Sonet", "Carens"],
    "Bajaj": ["Pulsar", "Dominar", "Platina", "CT100", "Avenger"],
    "Hero": ["Splendor", "HF Deluxe", "Glamour", "Xtreme", "Xpulse"],
    "TVS": ["Apache", "Jupiter", "Ntorq", "Raider", "Star City"],
    "Royal Enfield": ["Classic 350", "Bullet", "Meteor", "Hunter 350", "Himalayan"],
    "Yamaha": ["FZ", "R15", "MT-15", "Fascino", "Ray ZR"],
    "Honda MC": ["Activa", "Shine", "Unicorn", "SP125", "Dio"],
    "Ashok Leyland": ["Dost", "Bada Dost", "Partner", "Ecomet"],
    "TATA CV": ["Ace", "Yodha", "Intra", "Ultra"],
    "Eicher": ["Pro 2049", "Pro 3015", "Pro 6025"],
}

VEHICLE_COLORS = [
    "White", "Silver", "Grey", "Black", "Red", "Blue",
    "Brown", "Green", "Yellow", "Orange", "Maroon", "Beige"
]

ADDRESSES_AREAS = [
    "MG Road", "Brigade Road", "Residency Road", "Commercial Street",
    "Gandhi Nagar", "Nehru Nagar", "Ambedkar Nagar", "Rajiv Nagar",
    "Jawahar Nagar", "Basaveshwara Nagar", "Vidyanagar",
    "Shivaji Nagar", "Subhash Nagar", "Tilak Nagar",
    "Industrial Area", "Market Area", "Railway Colony",
    "Teachers Colony", "Doctors Colony", "Bank Colony",
    "1st Cross", "2nd Cross", "3rd Main", "4th Main",
    "5th Cross", "6th Main", "7th Cross", "8th Main",
    "9th Cross", "10th Main", "Ring Road", "Bypass Road",
    "Station Road", "Temple Road", "College Road", "Hospital Road",
    "Bus Stand Road", "Lake View", "Hill View", "Park View",
    "JP Nagar", "Whitefield Extension", "Lake View Colony", "MG Layout",
]

OFFICER_RANKS = [
    "Director General of Police",
    "Additional Director General of Police",
    "Inspector General of Police",
    "Deputy Inspector General of Police",
    "Superintendent of Police",
    "Additional Superintendent of Police",
    "Deputy Superintendent of Police",
    "Inspector", "Sub-Inspector", "Assistant Sub-Inspector",
    "Head Constable", "Constable"
]

RANK_WEIGHTS = [1, 2, 4, 6, 31, 31, 40, 80, 100, 60, 80, 65]

OFFICER_DESIGNATIONS = {
    "Director General of Police": ["DGP"],
    "Additional Director General of Police": ["ADGP Crime", "ADGP Law & Order", "ADGP Training"],
    "Inspector General of Police": ["IGP Bengaluru", "IGP Mysuru", "IGP Belagavi", "IGP Kalaburagi"],
    "Deputy Inspector General of Police": ["DIG Range", "DIG Admin", "DIG Crime"],
    "Superintendent of Police": ["SP"],
    "Additional Superintendent of Police": ["Addl SP"],
    "Deputy Superintendent of Police": ["Dy SP Circle", "Dy SP Crime"],
    "Inspector": ["SHO", "Inspector Crime", "Inspector Traffic", "Inspector CEN"],
    "Sub-Inspector": ["SI Law & Order", "SI Crime", "SI Traffic"],
    "Assistant Sub-Inspector": ["ASI"],
    "Head Constable": ["HC"],
    "Constable": ["PC"]
}

ROLES_DATA = [
    ("Super Admin", "Full system access with all permissions"),
    ("Admin", "Administrative access for user and system management"),
    ("SP", "Superintendent of Police - district level access"),
    ("Inspector", "Station House Officer level access"),
    ("Sub-Inspector", "Sub-Inspector level access for case management"),
    ("Data Analyst", "Read-only analytical access to dashboards and reports"),
    ("Forensic Expert", "Access to evidence and forensic data modules"),
    ("Viewer", "Basic read-only access to public case information")
]

FIR_STATUSES = [
    "Registered", "Under Investigation", "Charge Sheet Filed",
    "Closed", "Transferred", "Reopened", "Referred to Court"
]

CRIME_STATUSES = [
    "Reported", "Under Investigation", "Evidence Collection",
    "Suspect Identified", "Arrested", "Charge Sheeted",
    "Acquitted", "Convicted", "Case Closed", "Pending Trial"
]

SUSPECT_STATUSES = [
    "Suspected", "Wanted", "Arrested", "Released on Bail",
    "Absconding", "Surrendered", "Convicted", "Acquitted"
]

BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

EDUCATION_LEVELS = [
    "Illiterate", "Primary", "Middle School", "High School",
    "PUC/12th", "Diploma", "Graduate", "Post Graduate", "Professional"
]

OCCUPATIONS = [
    "Farmer", "Daily Wage Labourer", "Auto Driver", "Taxi Driver",
    "Shop Keeper", "Business", "Teacher", "Government Employee",
    "Private Employee", "Student", "Homemaker", "Doctor",
    "Engineer", "Lawyer", "Contractor", "Real Estate",
    "Unemployed", "Retired", "Self Employed", "IT Professional",
    "Mechanic", "Electrician", "Plumber", "Carpenter",
    "Mason", "Painter", "Security Guard", "Watchman"
]

RELIGIONS = ["Hindu", "Muslim", "Christian", "Jain", "Buddhist", "Sikh", "Other"]
RELIGION_WEIGHTS = [72, 14, 5, 4, 2, 1, 2]

CASTES = ["General", "OBC", "SC", "ST"]
CASTE_WEIGHTS = [25, 40, 20, 15]

# Karnataka rivers for environmental crimes
RIVERS = ["Tungabhadra", "Krishna", "Cauvery", "Sharavathi", "Kali", "Bedthi", "Malaprabha"]

# Drug types for NDPS cases
DRUG_TYPES = ["Ganja (Cannabis)", "Brown Sugar (Heroin)", "MDMA", "Amphetamine",
              "Methamphetamine (Ice)", "Cocaine", "Opium", "Prescription Drugs (Tramadol)"]

# Animal parts for wildlife cases
ANIMAL_PARTS = [
    "leopard skin", "elephant tusk (ivory)", "peacock feathers",
    "star tortoise", "live parakeets", "mongoose hair",
    "monitor lizard skin", "red sand boa snake",
]

# ═══════════════════════════════════════════════════════════════════════════════
#  HELPER FUNCTIONS
# ═══════════════════════════════════════════════════════════════════════════════

def random_name(gender=None):
    if gender is None:
        gender = random.choice(["M", "F"])
    first = random.choice(MALE_FIRST if gender == "M" else FEMALE_FIRST)
    last = random.choice(LAST_NAMES)
    return first, last, gender

def random_phone():
    """Generate fictional but realistic-looking Indian mobile numbers."""
    prefixes = ["62", "63", "70", "73", "74", "75", "76", "77",
                "78", "79", "80", "81", "82", "83", "84", "85",
                "86", "87", "88", "89", "90", "91", "92", "93",
                "94", "95", "96", "97", "98", "99"]
    return random.choice(prefixes) + str(random.randint(10000000, 99999999))

def random_email(first, last):
    domains = ["gmail.com", "yahoo.co.in", "rediffmail.com", "outlook.com", "hotmail.com"]
    sep = random.choice([".", "_", ""])
    num = random.randint(1, 999)
    return f"{first.lower()}{sep}{last.lower()}{num}@{random.choice(domains)}"

def random_vehicle_reg(district=None):
    """Generate fictional Karnataka vehicle registration numbers."""
    d = district or random.choice(list(DISTRICT_RTO_CODES.keys()))
    codes = DISTRICT_RTO_CODES.get(d)
    if not codes:
        all_codes = [c for v in DISTRICT_RTO_CODES.values() for c in v]
        codes = all_codes
    rto = random.choice(codes)
    letters = random.choice(["A", "B", "C", "D", "E", "F", "G", "H",
                              "J", "K", "L", "M", "N", "P", "Q", "R",
                              "S", "T", "U", "V", "W", "X", "Y", "Z",
                              "AA", "AB", "AC", "AD", "AE", "AF",
                              "BA", "BB", "BC", "BD", "BE", "BF"])
    num = random.randint(1000, 9999)
    return f"{rto}-{letters}-{num}"

def random_lat_lon(district_name):
    district_coords = {
        "Bengaluru Urban": (12.97, 77.59, 0.15),
        "Bengaluru Rural": (13.15, 77.40, 0.25),
        "Mysuru": (12.30, 76.65, 0.30),
        "Belagavi": (15.85, 74.50, 0.40),
        "Kalaburagi": (17.33, 76.83, 0.30),
        "Ballari": (15.15, 76.93, 0.35),
        "Hubballi-Dharwad": (15.46, 75.01, 0.25),
        "Dakshina Kannada": (12.87, 74.88, 0.30),
        "Tumakuru": (13.34, 77.10, 0.30),
        "Hassan": (13.00, 76.10, 0.30),
        "Udupi": (13.34, 74.74, 0.25),
        "Shivamogga": (13.93, 75.57, 0.35),
        "Raichur": (16.20, 77.36, 0.30),
        "Vijayapura": (16.83, 75.71, 0.30),
        "Kolar": (13.14, 78.13, 0.20),
        "Mandya": (12.52, 76.90, 0.25),
        "Chitradurga": (14.23, 76.40, 0.30),
        "Davanagere": (14.47, 75.92, 0.25),
        "Kodagu": (12.42, 75.74, 0.20),
        "Chikkamagaluru": (13.32, 75.78, 0.30),
        "Haveri": (14.79, 75.40, 0.25),
        "Gadag": (15.43, 75.63, 0.20),
        "Bidar": (17.91, 77.52, 0.25),
        "Koppal": (15.35, 76.15, 0.25),
        "Bagalkot": (16.18, 75.70, 0.30),
        "Uttara Kannada": (14.63, 74.69, 0.40),
        "Yadgir": (16.77, 77.14, 0.20),
        "Chamarajanagar": (11.93, 76.94, 0.25),
        "Chikballapur": (13.44, 77.73, 0.20),
        "Ramanagara": (12.72, 77.28, 0.20),
    }
    if district_name in district_coords:
        lat, lon, spread = district_coords[district_name]
    else:
        lat, lon, spread = 14.0, 76.0, 1.0
    return (
        round(lat + random.uniform(-spread, spread), 6),
        round(lon + random.uniform(-spread, spread), 6)
    )

def random_address(area=None):
    house_num = random.randint(1, 999)
    if area is None:
        area = random.choice(ADDRESSES_AREAS)
    ward = random.randint(1, 198)
    return f"#{house_num}, {area}, Ward {ward}"

def random_amount():
    """Return a realistic stolen/fraud amount."""
    amounts = [500, 1000, 2000, 3000, 5000, 8000, 10000, 15000, 20000,
               25000, 30000, 50000, 75000, 1_00_000, 1_50_000, 2_00_000,
               5_00_000, 10_00_000, 20_00_000, 50_00_000]
    return random.choice(amounts)

def fill_summary_template(template, district):
    """Fill template placeholders with fictional data."""
    brands = ["Samsung", "Realme", "Vivo", "Oppo", "Redmi", "OnePlus", "Motorola", "Nokia"]
    makes = list(VEHICLE_MAKES_MODELS.keys())
    colors = VEHICLE_COLORS
    areas = ADDRESSES_AREAS
    weapons = WEAPON_TYPES[:15]
    body_parts = ["head", "left arm", "right hand", "back", "face"]
    issues = ["land boundary", "water sharing", "old monetary dispute", "personal enmity", "business rivalry"]
    hospitals = ["District Government Hospital", "KR Hospital", "Civil Hospital", "Government Medical College"]
    clothing = ["blue jeans and white shirt", "saree", "kurta and pyjama", "school uniform"]
    rooms = ["bedroom", "master bedroom", "kitchen", "drawing room"]
    shops = ["Sri Lakshmi Textiles", "Ramesh Electronics", "Nagaraj Supermarket", "City Pharmacy", "Green Vegetables"]
    offices = ["Shree Enterprises", "Kaveri Trading Co.", "Basaveshwara Builders", "Sampoorna Agencies"]
    items = ["electronics", "cosmetics", "garments", "footwear", "mobile accessories"]
    bags = ["sling bag", "shoulder bag", "backpack", "handbag"]
    routes = ["Bengaluru-Mysuru", "Bengaluru-Hubli", "Mysuru-Hassan", "Hubli-Belagavi"]
    landmarks = ["the main junction", "the bus stand", "the railway station", "the market area", "a temple"]

    first_name, last_name, _ = random_name()
    victim_name = f"{first_name} {last_name}"
    sus_first, sus_last, _ = random_name(gender="M")
    suspect_name = f"{sus_first} {sus_last}"

    make = random.choice(makes)
    model = random.choice(VEHICLE_MAKES_MODELS[make])
    vehicle_no = random_vehicle_reg(district)
    amount = random_amount()

    replacements = {
        "{victim}": victim_name,
        "{suspect}": suspect_name,
        "{brand}": random.choice(brands),
        "{imei}": str(random.randint(1000, 9999)),
        "{location}": random_address(random.choice(areas)),
        "{address}": random_address(),
        "{amount}": f"{amount:,}",
        "{vehicle_no}": vehicle_no,
        "{make}": make,
        "{model}": model,
        "{color}": random.choice(colors),
        "{weight}": str(random.randint(10, 80)),
        "{room}": random.choice(rooms),
        "{shop}": random.choice(shops),
        "{office}": random.choice(offices),
        "{item}": random.choice(items),
        "{bag}": random.choice(bags),
        "{route}": random.choice(routes),
        "{landmark}": random.choice(landmarks),
        "{weapon}": random.choice(weapons),
        "{body_part}": random.choice(body_parts),
        "{issue}": random.choice(issues),
        "{count}": str(random.randint(2, 8)),
        "{date}": fmt_date(random_date()),
        "{time}": f"{random.randint(8,22):02d}:00",
        "{time1}": f"{random.randint(20,22):02d}:00",
        "{time2}": f"{random.randint(5,7):02d}:00",
        "{age}": str(random.randint(5, 75)),
        "{days}": str(random.randint(2, 15)),
        "{clothing}": random.choice(clothing),
        "{school}": f"{random.choice(['Govt High', 'Kendriya Vidyalaya', 'Govt Primary', 'Vidya Mandir'])} School",
        "{hospital}": random.choice(hospitals),
        "{injury}": random.choice(["multiple", "severe", "minor", "critical"]),
        "{bac}": f"0.{random.randint(10,25)}%",
        "{drug_type}": random.choice(DRUG_TYPES),
        "{quantity}": str(random.randint(5, 500)),
        "{concealment}": random.choice(["their jeans pocket", "a notebook bag", "a false-bottomed suitcase", "their waistband"]),
        "{source}": random.choice(["Belagavi", "Udupi", "Kalaburagi", "Bengaluru"]),
        "{destination}": random.choice(["Bengaluru", "Mysuru", "Mangaluru", "Hubli"]),
        "{animal_part}": random.choice(ANIMAL_PARTS),
        "{river}": random.choice(RIVERS),
        "{survey_no}": f"{random.randint(1, 500)}/{random.randint(1, 20)}",
        "{trigger}": random.choice(["social media post", "festival dispute", "political rivalry", "property dispute"]),
        "{reason}": random.choice(["foul play", "voluntary absence due to domestic issues", "mental health concerns"]),
        "{ammo}": str(random.randint(5, 50)),
    }

    result = template
    for k, v in replacements.items():
        result = result.replace(k, v)
    return result, victim_name, suspect_name

# ═══════════════════════════════════════════════════════════════════════════════
#  ENTITY GENERATORS
# ═══════════════════════════════════════════════════════════════════════════════

def generate_districts():
    rows = []
    for i, name in enumerate(KARNATAKA_DISTRICTS, 1):
        did = genuuid()
        division = DISTRICT_DIVISION.get(name, "Bengaluru")
        lat, lon = random_lat_lon(name)
        rows.append({
            "district_id": did,
            "district_name": name,
            "district_code": f"KA{i:02d}",
            "division": division,
            "state": "Karnataka",
            "population": random.randint(300000, 12000000),
            "area_sq_km": round(random.uniform(1400, 10500), 2),
            "latitude": lat,
            "longitude": lon,
            "created_at": fmt_datetime(random_datetime(datetime(2022,1,1), datetime(2022,1,31))),
            "updated_at": fmt_datetime(random_datetime(datetime(2024,6,1), datetime(2025,3,31))),
            "is_active": True
        })
    return rows

def generate_police_stations(districts, target=120):
    rows = []
    district_ids_by_name = {d["district_name"]: d["district_id"] for d in districts}

    for dist_name, stations in PS_TEMPLATES.items():
        if dist_name not in district_ids_by_name:
            continue
        did = district_ids_by_name[dist_name]
        for ps_name in stations:
            lat, lon = random_lat_lon(dist_name)
            rows.append({
                "station_id": genuuid(),
                "station_name": f"{ps_name} Police Station",
                "station_code": f"PS{len(rows)+1:04d}",
                "district_id": did,
                "address": random_address(ps_name),
                "phone": f"080-{random.randint(20000000, 29999999)}",
                "email": f"{ps_name.lower().replace(' ', '')}ps@kapolice.gov.in",
                "latitude": lat,
                "longitude": lon,
                "station_type": random.choice(["Urban", "Semi-Urban"]),
                "jurisdiction_area_sq_km": round(random.uniform(5, 50), 2),
                "officer_strength": random.randint(15, 80),
                "created_at": fmt_datetime(random_datetime(datetime(2022,1,1), datetime(2022,2,28))),
                "updated_at": fmt_datetime(random_datetime(datetime(2024,6,1), datetime(2025,3,31))),
                "is_active": True
            })

    remaining = target - len(rows)
    other_districts = [d for d in districts if d["district_name"] not in PS_TEMPLATES]
    if other_districts and remaining > 0:
        stations_per = max(1, remaining // len(other_districts))
        for dist in other_districts:
            did = dist["district_id"]
            dist_name = dist["district_name"]
            count = random.randint(max(1, stations_per - 1), stations_per + 2)
            for j in range(count):
                if len(rows) >= target:
                    break
                suffix = random.choice(GENERIC_PS_NAMES)
                ps_name = f"{dist_name} {suffix}"
                lat, lon = random_lat_lon(dist_name)
                rows.append({
                    "station_id": genuuid(),
                    "station_name": f"{ps_name} Police Station",
                    "station_code": f"PS{len(rows)+1:04d}",
                    "district_id": did,
                    "address": random_address(),
                    "phone": f"08{random.randint(10,99)}-{random.randint(200000, 299999)}",
                    "email": f"{suffix.lower().replace(' ', '')}ps_{dist_name[:3].lower()}@kapolice.gov.in",
                    "latitude": lat,
                    "longitude": lon,
                    "station_type": random.choice(["Urban", "Semi-Urban", "Rural"]),
                    "jurisdiction_area_sq_km": round(random.uniform(20, 200), 2),
                    "officer_strength": random.randint(10, 45),
                    "created_at": fmt_datetime(random_datetime(datetime(2022,1,1), datetime(2022,2,28))),
                    "updated_at": fmt_datetime(random_datetime(datetime(2024,6,1), datetime(2025,3,31))),
                    "is_active": random.choices([True, False], weights=[97, 3])[0]
                })
            if len(rows) >= target:
                break

    return rows[:target]

def generate_officers(police_stations, districts, target=500):
    rows = []
    station_ids = [s["station_id"] for s in police_stations]
    station_district = {s["station_id"]: s["district_id"] for s in police_stations}

    for i in range(target):
        first, last, gender = random_name()
        rank = random.choices(OFFICER_RANKS, weights=RANK_WEIGHTS, k=1)[0]
        designation = random.choice(OFFICER_DESIGNATIONS[rank])
        sid = random.choice(station_ids)
        join_date = random_date(datetime(2000,1,1), datetime(2022,12,31))

        rows.append({
            "officer_id": genuuid(),
            "badge_number": f"KSP{random.randint(10000, 99999)}",
            "first_name": first,
            "last_name": last,
            "full_name": f"{first} {last}",
            "gender": gender,
            "date_of_birth": fmt_date(random_date(datetime(1965,1,1), datetime(1998,12,31))),
            "rank": rank,
            "designation": designation,
            "station_id": sid,
            "district_id": station_district[sid],
            "phone": random_phone(),
            "email": f"{first.lower()}.{last.lower()}{i}@kapolice.gov.in",
            "date_of_joining": fmt_date(join_date),
            "years_of_service": (datetime(2025,3,31) - join_date).days // 365,
            "specialization": random.choice([
                "Crime Investigation", "Cyber Crime", "Traffic",
                "Law & Order", "Forensics", "Intelligence",
                "Anti-Terrorism", "Narcotics", "Women & Child",
                "General Duty", "VIP Security", "Communication"
            ]),
            "is_active": random.choices([True, False], weights=[93, 7])[0],
            "created_at": fmt_datetime(random_datetime(datetime(2022,1,1), datetime(2022,6,30))),
            "updated_at": fmt_datetime(random_datetime(datetime(2024,1,1), datetime(2025,3,31)))
        })
    return rows

def generate_crime_categories():
    """Generate all 15 parent categories + 40+ subtypes with proper metadata."""
    rows = []
    cat_id_map = {}  # name -> category_id

    for parent_name, meta in CRIME_CATEGORY_HIERARCHY.items():
        parent_id = genuuid()
        cat_id_map[parent_name] = parent_id
        rows.append({
            "category_id": parent_id,
            "category_name": parent_name,
            "category_code": parent_name[:4].upper().replace(" ", "") + str(len(rows)+1).zfill(2),
            "parent_category_id": "",
            "description": f"All offences classified under {parent_name} as per Karnataka Police CRMS",
            "severity_level": meta["severity"],
            "ipc_sections": ",".join(meta["ipc"]),
            "is_active": True,
            "created_at": fmt_datetime(random_datetime(datetime(2022,1,1), datetime(2022,1,31))),
            "updated_at": fmt_datetime(random_datetime(datetime(2024,6,1), datetime(2025,3,31)))
        })

    for parent_name, meta in CRIME_CATEGORY_HIERARCHY.items():
        parent_id = cat_id_map[parent_name]
        for subtype_name in meta["subtypes"]:
            sub_id = genuuid()
            cat_id_map[subtype_name] = sub_id
            assigned_ipc = random.sample(IPC_SECTIONS, k=random.randint(1, 3))
            rows.append({
                "category_id": sub_id,
                "category_name": subtype_name,
                "category_code": subtype_name[:4].upper().replace(" ", "") + str(len(rows)+1).zfill(2),
                "parent_category_id": parent_id,
                "description": f"{subtype_name} — specific offence under {parent_name}",
                "severity_level": random.choices(
                    ["Low", "Medium", "High", "Critical"],
                    weights=[5, 25, 45, 25], k=1
                )[0],
                "ipc_sections": ",".join(meta["ipc"][:2] + [assigned_ipc[0]]),
                "is_active": True,
                "created_at": fmt_datetime(random_datetime(datetime(2022,1,1), datetime(2022,1,31))),
                "updated_at": fmt_datetime(random_datetime(datetime(2024,6,1), datetime(2025,3,31)))
            })

    return rows, cat_id_map

def generate_firs(police_stations, officers, districts, cat_id_map, target=700):
    """
    Generate FIR records. Each FIR is tied to a specific crime_category and crime_subtype
    for realistic incident summaries and modus operandi.
    """
    rows = []
    station_ids = [s["station_id"] for s in police_stations]
    station_district_map = {s["station_id"]: s["district_id"] for s in police_stations}
    station_name_map = {s["station_id"]: s["station_name"] for s in police_stations}
    officer_ids = [o["officer_id"] for o in officers]
    district_name_map = {d["district_id"]: d["district_name"] for d in districts}

    # Build flat list of (parent_cat_name, subtype_name) pairs with weights
    # reflecting real-world crime distribution
    category_weights = {
        "Theft": 18,
        "Cyber Crime": 15,
        "Vehicle Theft": 10,
        "Financial Fraud": 8,
        "Assault": 10,
        "Burglary": 8,
        "Robbery": 7,
        "Traffic & Road Crime": 7,
        "Drug & NDPS Offences": 5,
        "Missing Person": 5,
        "Property Damage": 4,
        "Public Disorder": 3,
        "Illegal Arms & Organized Crime": 2,
        "Kidnapping / Abduction": 2,
        "Environmental & Wildlife Crime": 2,
    }

    cat_choices = []
    cat_weights = []
    for parent, meta in CRIME_CATEGORY_HIERARCHY.items():
        w = category_weights.get(parent, 3)
        per_sub = w / len(meta["subtypes"])
        for sub in meta["subtypes"]:
            cat_choices.append((parent, sub))
            cat_weights.append(per_sub)

    for i in range(target):
        sid = random.choice(station_ids)
        did = station_district_map[sid]
        dist_name = district_name_map.get(did, "Bengaluru Urban")
        fir_date = random_datetime()
        year = fir_date.year

        parent_cat, subtype = random.choices(cat_choices, weights=cat_weights, k=1)[0]
        io = random.choice(officer_ids)

        status = random.choices(
            FIR_STATUSES,
            weights=[10, 32, 18, 15, 5, 5, 15],
            k=1
        )[0]

        # Pick a template for this subtype
        templates = INCIDENT_SUMMARIES.get(subtype, INCIDENT_SUMMARIES.get(parent_cat, ["A crime was reported at {location}."]))
        template = random.choice(templates)
        summary, victim_name, suspect_name = fill_summary_template(template, dist_name)

        # IPC sections for this crime type
        meta = CRIME_CATEGORY_HIERARCHY[parent_cat]
        ipc = list(meta["ipc"])
        extra_ipc = random.sample(IPC_SECTIONS, k=random.randint(0, 2))
        all_ipc = list(set(ipc + extra_ipc))

        rows.append({
            "fir_id": genuuid(),
            "fir_number": f"FIR/{year}/{dist_name[:3].upper()}/{i+1:05d}",
            "fir_date": fmt_datetime(fir_date),
            "station_id": sid,
            "district_id": did,
            "complainant_name": victim_name,
            "complainant_phone": random_phone(),
            "complainant_address": random_address(),
            "incident_date": fmt_datetime(fir_date - timedelta(days=random.randint(0, 5))),
            "incident_location": random_address(),
            "incident_latitude": random_lat_lon(dist_name)[0],
            "incident_longitude": random_lat_lon(dist_name)[1],
            "ipc_sections": ",".join(all_ipc[:4]),
            "crime_category": parent_cat,
            "crime_subtype": subtype,
            "description": summary,
            "investigating_officer_id": io,
            "status": status,
            "priority": random.choices(
                ["Low", "Medium", "High", "Critical"],
                weights=[15, 40, 35, 10], k=1
            )[0],
            "closure_date": fmt_datetime(fir_date + timedelta(days=random.randint(30, 365))) if status in ["Closed", "Charge Sheet Filed", "Referred to Court"] else "",
            "closure_reason": random.choice(["Case Solved", "Insufficient Evidence", "Compromise", "Final Report", ""]) if status == "Closed" else "",
            "created_at": fmt_datetime(fir_date),
            "updated_at": fmt_datetime(random_datetime(fir_date, END_DATE))
        })
    return rows

def generate_crimes(firs, crime_categories, cat_id_map, target=900):
    """Generate crime records linked to FIRs, using category-specific modus operandi."""
    rows = []
    fir_ids = [f["fir_id"] for f in firs]
    fir_map = {f["fir_id"]: f for f in firs}

    # Build subtype_name -> category_id map (leaf categories only)
    leaf_cat_ids = {c["category_name"]: c["category_id"] for c in crime_categories if c.get("parent_category_id")}
    parent_cat_ids = {c["category_name"]: c["category_id"] for c in crime_categories if not c.get("parent_category_id")}

    assigned_firs = list(fir_ids)
    random.shuffle(assigned_firs)

    for i in range(target):
        if i < len(assigned_firs):
            fid = assigned_firs[i]
        else:
            fid = random.choice(fir_ids)

        fir = fir_map[fid]
        subtype = fir.get("crime_subtype", "")
        parent_cat = fir.get("crime_category", "")

        # Use specific subtype category_id if available, else parent
        cat_id = leaf_cat_ids.get(subtype) or parent_cat_ids.get(parent_cat) or random.choice(list(leaf_cat_ids.values()))

        crime_date = datetime.strptime(fir["fir_date"], '%Y-%m-%d %H:%M:%S')

        # Pick modus operandi for this subtype
        mo_list = MODUS_OPERANDI.get(subtype, MODUS_OPERANDI.get(parent_cat, ["Unknown method"]))
        mo = random.choice(mo_list)

        rows.append({
            "crime_id": genuuid(),
            "fir_id": fid,
            "category_id": cat_id,
            "crime_category": parent_cat,
            "crime_subtype": subtype,
            "crime_date": fmt_datetime(crime_date),
            "crime_location": fir["incident_location"],
            "crime_latitude": fir["incident_latitude"],
            "crime_longitude": fir["incident_longitude"],
            "district_id": fir["district_id"],
            "station_id": fir["station_id"],
            "ipc_sections": fir["ipc_sections"],
            "status": random.choices(
                CRIME_STATUSES,
                weights=[8, 22, 10, 12, 12, 14, 5, 7, 8, 2],
                k=1
            )[0],
            "modus_operandi": mo,
            "severity": random.choices(
                ["Low", "Medium", "High", "Critical"],
                weights=[10, 35, 40, 15], k=1
            )[0],
            "is_solved": random.choices([True, False], weights=[42, 58])[0],
            "created_at": fmt_datetime(crime_date),
            "updated_at": fmt_datetime(random_datetime(crime_date, END_DATE))
        })
    return rows

def generate_persons(target, role_type="suspect"):
    rows = []
    for i in range(target):
        first, last, gender = random_name()
        dob = random_date(datetime(1960,1,1), datetime(2005,12,31))
        age = 2025 - dob.year

        row = {
            f"{role_type}_id": genuuid(),
            "first_name": first,
            "last_name": last,
            "full_name": f"{first} {last}",
            "gender": gender,
            "date_of_birth": fmt_date(dob),
            "age": age,
            "phone": random_phone(),
            "email": random_email(first, last) if random.random() > 0.3 else "",
            "address": random_address(),
            "city": random.choice(KARNATAKA_DISTRICTS),
            "state": "Karnataka",
            "nationality": "Indian",
            "id_type": random.choice(["Driving Licence", "Voter ID", "Ration Card", "PAN Card"]),
            "id_number": f"SYNTH{random.randint(100000, 999999)}",  # Clearly fictional
            "blood_group": random.choice(BLOOD_GROUPS),
            "religion": random.choices(RELIGIONS, weights=RELIGION_WEIGHTS, k=1)[0],
            "caste_category": random.choices(CASTES, weights=CASTE_WEIGHTS, k=1)[0],
            "education": random.choice(EDUCATION_LEVELS),
            "occupation": random.choice(OCCUPATIONS),
            "created_at": fmt_datetime(random_datetime()),
            "updated_at": fmt_datetime(random_datetime())
        }

        if role_type == "suspect":
            row["alias"] = random.choice(["", f"{first[:3]}a", f"Chhota {first}", f"{first} Bhai"]) if random.random() > 0.5 else ""
            row["status"] = random.choices(SUSPECT_STATUSES, weights=[20, 10, 25, 15, 10, 5, 10, 5], k=1)[0]
            row["criminal_history"] = random.choices([True, False], weights=[35, 65])[0]
            row["num_prior_cases"] = random.randint(0, 12) if row["criminal_history"] else 0
            row["is_habitual_offender"] = row["num_prior_cases"] >= 3
            row["risk_score"] = round(random.uniform(0.1, 1.0), 2)
            row["height_cm"] = random.randint(150, 190)
            row["weight_kg"] = random.randint(45, 110)
            row["complexion"] = random.choice(["Fair", "Wheatish", "Dark", "Very Fair"])
            row["identifying_marks"] = random.choice([
                "", "Scar on left cheek", "Tattoo on right arm",
                "Mole below right eye", "Missing front tooth",
                "Burn mark on left hand", "Birthmark on neck"
            ])

        elif role_type == "victim":
            row["injury_type"] = random.choice([
                "None", "Minor", "Grievous", "Fatal",
                "Fracture", "Laceration", "Bruise", "Burns"
            ])
            row["injury_description"] = random.choice([
                "", "Head injury", "Multiple fractures",
                "Stab wounds", "Blunt force trauma",
                "Chemical burns", "Emotional trauma",
                "Financial loss"
            ])
            row["medical_status"] = random.choice([
                "Treated and Discharged", "Under Treatment",
                "Hospitalized", "Deceased", "No Treatment Required"
            ])
            row["compensation_amount"] = random.choice([0, 0, 0, 10000, 25000, 50000, 100000, 200000, 500000])
            row["is_minor"] = age < 18

        elif role_type == "witness":
            row["witness_type"] = random.choice([
                "Eye Witness", "Ear Witness", "Expert Witness",
                "Character Witness", "Hostile Witness", "Independent Witness"
            ])
            row["statement_recorded"] = random.choices([True, False], weights=[75, 25])[0]
            row["statement_date"] = fmt_date(random_date()) if row["statement_recorded"] else ""
            row["is_reliable"] = random.choices([True, False], weights=[80, 20])[0]
            row["protection_required"] = random.choices([True, False], weights=[15, 85])[0]

        rows.append(row)
    return rows

def generate_vehicles(target=400):
    rows = []
    for i in range(target):
        make = random.choice(list(VEHICLE_MAKES_MODELS.keys()))
        model = random.choice(VEHICLE_MAKES_MODELS[make])
        district = random.choice(KARNATAKA_DISTRICTS)

        if make in ["Bajaj", "Hero", "TVS", "Royal Enfield", "Yamaha"]:
            body = "Motorcycle"
        elif make == "Honda MC":
            body = random.choice(["Motorcycle", "Scooter"])
        elif make in ["Ashok Leyland", "TATA CV", "Eicher"]:
            body = random.choice(["Truck", "Tempo", "Bus"])
        else:
            body = random.choice(["Sedan", "Hatchback", "SUV", "MUV"])

        fuel = random.choice(["Petrol", "Diesel", "CNG", "Electric"])
        year = random.randint(2005, 2024)

        rows.append({
            "vehicle_id": genuuid(),
            "registration_number": random_vehicle_reg(district),
            "make": make,
            "model": model,
            "body_type": body,
            "color": random.choice(VEHICLE_COLORS),
            "fuel_type": fuel,
            "year_of_manufacture": year,
            "engine_number": f"ENG{random.randint(100000, 999999)}",
            "chassis_number": f"CHS{random.randint(1000000, 9999999)}",
            "owner_name": f"{random.choice(MALE_FIRST + FEMALE_FIRST)} {random.choice(LAST_NAMES)}",
            "owner_phone": random_phone(),
            "owner_address": random_address(),
            "district": district,
            "vehicle_status": random.choices(
                ["Active", "Stolen", "Recovered", "Seized", "Scrapped", "Abandoned"],
                weights=[40, 25, 10, 15, 5, 5], k=1
            )[0],
            "involvement_type": random.choice([
                "Suspect Vehicle", "Victim Vehicle", "Evidence Vehicle",
                "Stolen Vehicle", "Accident Vehicle", "Getaway Vehicle"
            ]),
            "is_stolen": random.choices([True, False], weights=[25, 75])[0],
            "created_at": fmt_datetime(random_datetime()),
            "updated_at": fmt_datetime(random_datetime())
        })
    return rows

def generate_weapons(target=300):
    rows = []
    for i in range(target):
        wtype = random.choice(WEAPON_TYPES)
        is_firearm = wtype in ["Country-made Pistol", "Revolver", "Rifle", "Shotgun"]

        rows.append({
            "weapon_id": genuuid(),
            "weapon_type": wtype,
            "weapon_category": "Firearm" if is_firearm else (
                "Sharp" if wtype in ["Knife", "Machete", "Axe", "Sword", "Dagger", "Sickle"] else (
                "Blunt" if wtype in ["Iron Rod", "Wooden Stick", "Cricket Bat", "Hockey Stick",
                                      "Stone", "Brick", "Hammer"] else (
                "Explosive" if wtype in ["Explosive", "Petrol Bomb", "Grenade"] else (
                "Chemical" if wtype == "Acid" else "Other"
                )))),
            "description": f"{wtype} recovered/found during investigation",
            "serial_number": f"WPN{random.randint(10000, 99999)}" if is_firearm else "",
            "is_licensed": random.choices([True, False], weights=[20, 80])[0] if is_firearm else False,
            "license_number": f"KA/FA/{random.randint(1000, 9999)}/{random.randint(2015, 2024)}" if is_firearm and random.random() > 0.5 else "",
            "recovery_status": random.choices(
                ["Recovered", "Not Recovered", "Seized", "Destroyed"],
                weights=[40, 30, 20, 10], k=1
            )[0],
            "recovery_date": fmt_date(random_date()) if random.random() > 0.3 else "",
            "recovery_location": random_address() if random.random() > 0.3 else "",
            "forensic_report_available": random.choices([True, False], weights=[40, 60])[0],
            "created_at": fmt_datetime(random_datetime()),
            "updated_at": fmt_datetime(random_datetime())
        })
    return rows

def generate_evidence(firs, target=3000):
    rows = []
    fir_ids = [f["fir_id"] for f in firs]

    for i in range(target):
        etype = random.choice(EVIDENCE_TYPES)
        subtype = random.choice(EVIDENCE_SUBTYPES[etype])
        collection_date = random_datetime()

        rows.append({
            "evidence_id": genuuid(),
            "evidence_number": f"EVD/{collection_date.year}/{i+1:06d}",
            "evidence_type": etype,
            "evidence_subtype": subtype,
            "description": f"{subtype} collected as {etype.lower()} evidence during investigation",
            "collection_date": fmt_datetime(collection_date),
            "collection_location": random_address(),
            "collected_by": f"{random.choice(MALE_FIRST)} {random.choice(LAST_NAMES)}",
            "storage_location": f"Evidence Room {random.choice(['A', 'B', 'C', 'D', 'E'])}-{random.randint(1, 50):02d}",
            "chain_of_custody": f"Collected -> Sealed -> Transported -> Stored (Entry #{random.randint(1000, 9999)})",
            "forensic_lab_id": f"KFSL/{random.choice(['BLR', 'MYS', 'BLG', 'KLB'])}/{random.randint(1000, 9999)}",
            "forensic_status": random.choices(
                ["Pending Analysis", "Under Analysis", "Analysis Complete",
                 "Report Generated", "Not Sent"],
                weights=[20, 15, 30, 25, 10], k=1
            )[0],
            "forensic_findings": random.choice([
                "", "Match found with suspect profile", "Inconclusive results",
                "DNA profile generated", "Fingerprint matched with database record",
                "Chemical analysis complete — substance confirmed", "No significant findings",
                "Partial match — further analysis required"
            ]),
            "is_tampered": random.choices([True, False], weights=[3, 97])[0],
            "digital_hash": hashlib.sha256(f"evidence_{i}_{random.random()}".encode()).hexdigest(),
            "created_at": fmt_datetime(collection_date),
            "updated_at": fmt_datetime(random_datetime(collection_date, END_DATE))
        })
    return rows

def generate_roles():
    rows = []
    for name, desc in ROLES_DATA:
        rows.append({
            "role_id": genuuid(),
            "role_name": name,
            "role_code": name.upper().replace(" ", "_"),
            "description": desc,
            "permissions": ",".join(random.sample([
                "view_fir", "create_fir", "edit_fir", "delete_fir",
                "view_crime", "create_crime", "edit_crime",
                "view_evidence", "manage_evidence",
                "view_suspect", "manage_suspect",
                "view_reports", "generate_reports",
                "manage_users", "system_config", "audit_log",
                "view_dashboard", "export_data", "import_data",
                "manage_stations", "view_analytics", "manage_gis"
            ], k=random.randint(3, 15))),
            "is_active": True,
            "created_at": fmt_datetime(random_datetime(datetime(2022,1,1), datetime(2022,1,31))),
            "updated_at": fmt_datetime(random_datetime(datetime(2024,6,1), datetime(2025,3,31)))
        })
    return rows

def generate_users(officers, roles, target=50):
    rows = []
    officer_subset = random.sample(officers, min(target, len(officers)))
    role_ids = [r["role_id"] for r in roles]

    for i, officer in enumerate(officer_subset):
        username = f"{officer['first_name'].lower()}.{officer['last_name'].lower()}{i}"
        rows.append({
            "user_id": genuuid(),
            "username": username,
            "email": officer["email"],
            "password_hash": hashlib.sha256(f"sentinel_{username}_{random.random()}".encode()).hexdigest(),
            "officer_id": officer["officer_id"],
            "first_name": officer["first_name"],
            "last_name": officer["last_name"],
            "phone": officer["phone"],
            "is_active": random.choices([True, False], weights=[90, 10])[0],
            "last_login": fmt_datetime(random_datetime(datetime(2024,1,1), END_DATE)),
            "login_count": random.randint(1, 500),
            "failed_login_attempts": random.randint(0, 5),
            "account_locked": False,
            "created_at": fmt_datetime(random_datetime(datetime(2022,1,1), datetime(2022,6,30))),
            "updated_at": fmt_datetime(random_datetime(datetime(2024,1,1), END_DATE))
        })
    return rows


# ═══════════════════════════════════════════════════════════════════════════════
#  JUNCTION TABLE GENERATORS
# ═══════════════════════════════════════════════════════════════════════════════

def generate_fir_suspects(firs, suspects):
    rows = []
    seen = set()
    fir_ids = [f["fir_id"] for f in firs]
    suspect_ids = [s["suspect_id"] for s in suspects]

    for sid in suspect_ids:
        fid = random.choice(fir_ids)
        key = (fid, sid)
        if key not in seen:
            seen.add(key)
            rows.append({
                "fir_suspect_id": genuuid(),
                "fir_id": fid,
                "suspect_id": sid,
                "role_in_crime": random.choice([
                    "Main Accused", "Accomplice", "Abettor",
                    "Conspirator", "Handler", "Lookout"
                ]),
                "date_linked": fmt_date(random_date()),
                "created_at": fmt_datetime(random_datetime()),
                "updated_at": fmt_datetime(random_datetime())
            })

    extra = len(fir_ids) // 3
    for _ in range(extra):
        fid = random.choice(fir_ids)
        sid = random.choice(suspect_ids)
        key = (fid, sid)
        if key not in seen:
            seen.add(key)
            rows.append({
                "fir_suspect_id": genuuid(),
                "fir_id": fid,
                "suspect_id": sid,
                "role_in_crime": random.choice([
                    "Main Accused", "Accomplice", "Abettor",
                    "Conspirator", "Handler", "Lookout"
                ]),
                "date_linked": fmt_date(random_date()),
                "created_at": fmt_datetime(random_datetime()),
                "updated_at": fmt_datetime(random_datetime())
            })

    return rows

def generate_fir_victims(firs, victims):
    rows = []
    seen = set()
    fir_ids = [f["fir_id"] for f in firs]
    victim_ids = [v["victim_id"] for v in victims]

    for vid in victim_ids:
        fid = random.choice(fir_ids)
        key = (fid, vid)
        if key not in seen:
            seen.add(key)
            rows.append({
                "fir_victim_id": genuuid(),
                "fir_id": fid,
                "victim_id": vid,
                "victim_type": random.choice(["Primary", "Secondary", "Indirect"]),
                "date_linked": fmt_date(random_date()),
                "created_at": fmt_datetime(random_datetime()),
                "updated_at": fmt_datetime(random_datetime())
            })

    extra = len(fir_ids) // 4
    for _ in range(extra):
        fid = random.choice(fir_ids)
        vid = random.choice(victim_ids)
        key = (fid, vid)
        if key not in seen:
            seen.add(key)
            rows.append({
                "fir_victim_id": genuuid(),
                "fir_id": fid,
                "victim_id": vid,
                "victim_type": random.choice(["Primary", "Secondary", "Indirect"]),
                "date_linked": fmt_date(random_date()),
                "created_at": fmt_datetime(random_datetime()),
                "updated_at": fmt_datetime(random_datetime())
            })

    return rows

def generate_fir_witnesses(firs, witnesses):
    rows = []
    seen = set()
    fir_ids = [f["fir_id"] for f in firs]
    witness_ids = [w["witness_id"] for w in witnesses]

    for wid in witness_ids:
        fid = random.choice(fir_ids)
        key = (fid, wid)
        if key not in seen:
            seen.add(key)
            rows.append({
                "fir_witness_id": genuuid(),
                "fir_id": fid,
                "witness_id": wid,
                "witness_sequence": random.randint(1, 10),
                "date_linked": fmt_date(random_date()),
                "created_at": fmt_datetime(random_datetime()),
                "updated_at": fmt_datetime(random_datetime())
            })

    return rows

def generate_fir_vehicles(firs, vehicles):
    rows = []
    seen = set()
    fir_ids = [f["fir_id"] for f in firs]
    vehicle_ids = [v["vehicle_id"] for v in vehicles]

    num_links = len(vehicle_ids) + len(fir_ids) // 5
    for _ in range(num_links):
        fid = random.choice(fir_ids)
        vid = random.choice(vehicle_ids)
        key = (fid, vid)
        if key not in seen:
            seen.add(key)
            rows.append({
                "fir_vehicle_id": genuuid(),
                "fir_id": fid,
                "vehicle_id": vid,
                "involvement_type": random.choice([
                    "Suspect Vehicle", "Victim Vehicle", "Evidence",
                    "Getaway Vehicle", "Stolen Vehicle", "Accident Vehicle"
                ]),
                "date_linked": fmt_date(random_date()),
                "created_at": fmt_datetime(random_datetime()),
                "updated_at": fmt_datetime(random_datetime())
            })
    return rows

def generate_fir_weapons(firs, weapons):
    rows = []
    seen = set()
    fir_ids = [f["fir_id"] for f in firs]
    weapon_ids = [w["weapon_id"] for w in weapons]

    num_links = len(weapon_ids) + len(fir_ids) // 4
    for _ in range(num_links):
        fid = random.choice(fir_ids)
        wid = random.choice(weapon_ids)
        key = (fid, wid)
        if key not in seen:
            seen.add(key)
            rows.append({
                "fir_weapon_id": genuuid(),
                "fir_id": fid,
                "weapon_id": wid,
                "usage_description": random.choice([
                    "Used in commission of crime",
                    "Found at crime scene",
                    "Recovered from suspect",
                    "Used for threatening victim",
                    "Seized during search"
                ]),
                "date_linked": fmt_date(random_date()),
                "created_at": fmt_datetime(random_datetime()),
                "updated_at": fmt_datetime(random_datetime())
            })
    return rows

def generate_fir_evidence(firs, evidence):
    rows = []
    seen = set()
    fir_ids = [f["fir_id"] for f in firs]
    evidence_ids = [e["evidence_id"] for e in evidence]

    for eid in evidence_ids:
        fid = random.choice(fir_ids)
        key = (fid, eid)
        if key not in seen:
            seen.add(key)
            rows.append({
                "fir_evidence_id": genuuid(),
                "fir_id": fid,
                "evidence_id": eid,
                "relevance": random.choice(["Primary", "Supporting", "Circumstantial"]),
                "date_linked": fmt_date(random_date()),
                "created_at": fmt_datetime(random_datetime()),
                "updated_at": fmt_datetime(random_datetime())
            })

    return rows

def generate_crime_suspects(crimes, suspects):
    rows = []
    seen = set()
    crime_ids = [c["crime_id"] for c in crimes]
    suspect_ids = [s["suspect_id"] for s in suspects]

    for sid in suspect_ids:
        num_crimes = random.randint(1, 3)
        for _ in range(num_crimes):
            cid = random.choice(crime_ids)
            key = (cid, sid)
            if key not in seen:
                seen.add(key)
                rows.append({
                    "crime_suspect_id": genuuid(),
                    "crime_id": cid,
                    "suspect_id": sid,
                    "role_in_crime": random.choice([
                        "Principal Offender", "Accomplice", "Abettor",
                        "Conspirator", "Instigator"
                    ]),
                    "confidence_score": round(random.uniform(0.3, 1.0), 2),
                    "date_linked": fmt_date(random_date()),
                    "created_at": fmt_datetime(random_datetime()),
                    "updated_at": fmt_datetime(random_datetime())
                })
    return rows

def generate_user_roles(users, roles):
    rows = []
    seen = set()
    role_ids = [r["role_id"] for r in roles]

    for user in users:
        num_roles = random.choices([1, 2], weights=[70, 30])[0]
        assigned_roles = random.sample(role_ids, k=min(num_roles, len(role_ids)))
        for rid in assigned_roles:
            key = (user["user_id"], rid)
            if key not in seen:
                seen.add(key)
                rows.append({
                    "user_role_id": genuuid(),
                    "user_id": user["user_id"],
                    "role_id": rid,
                    "assigned_date": fmt_date(random_date(datetime(2022,1,1), datetime(2023,12,31))),
                    "assigned_by": random.choice(users)["user_id"] if len(users) > 1 else user["user_id"],
                    "is_active": random.choices([True, False], weights=[90, 10])[0],
                    "created_at": fmt_datetime(random_datetime(datetime(2022,1,1), datetime(2023,6,30))),
                    "updated_at": fmt_datetime(random_datetime(datetime(2024,1,1), END_DATE))
                })
    return rows


# ═══════════════════════════════════════════════════════════════════════════════
#  FIELD NAME DEFINITIONS
# ═══════════════════════════════════════════════════════════════════════════════

DISTRICT_FIELDS = [
    "district_id", "district_name", "district_code", "division", "state",
    "population", "area_sq_km", "latitude", "longitude",
    "created_at", "updated_at", "is_active"
]

STATION_FIELDS = [
    "station_id", "station_name", "station_code", "district_id",
    "address", "phone", "email", "latitude", "longitude",
    "station_type", "jurisdiction_area_sq_km", "officer_strength",
    "created_at", "updated_at", "is_active"
]

OFFICER_FIELDS = [
    "officer_id", "badge_number", "first_name", "last_name", "full_name", "gender",
    "date_of_birth", "rank", "designation", "station_id", "district_id",
    "phone", "email", "date_of_joining", "years_of_service",
    "specialization", "is_active", "created_at", "updated_at"
]

CATEGORY_FIELDS = [
    "category_id", "category_name", "category_code", "parent_category_id",
    "description", "severity_level", "ipc_sections",
    "is_active", "created_at", "updated_at"
]

FIR_FIELDS = [
    "fir_id", "fir_number", "fir_date", "station_id", "district_id",
    "complainant_name", "complainant_phone", "complainant_address",
    "incident_date", "incident_location", "incident_latitude", "incident_longitude",
    "ipc_sections", "crime_category", "crime_subtype",
    "description", "investigating_officer_id", "status",
    "priority", "closure_date", "closure_reason",
    "created_at", "updated_at"
]

CRIME_FIELDS = [
    "crime_id", "fir_id", "category_id", "crime_category", "crime_subtype",
    "crime_date", "crime_location", "crime_latitude", "crime_longitude",
    "district_id", "station_id", "ipc_sections", "status",
    "modus_operandi", "severity", "is_solved",
    "created_at", "updated_at"
]

SUSPECT_FIELDS = [
    "suspect_id", "first_name", "last_name", "full_name", "gender",
    "date_of_birth", "age", "phone", "email", "address", "city", "state",
    "nationality", "id_type", "id_number", "blood_group",
    "religion", "caste_category", "education", "occupation",
    "alias", "status", "criminal_history", "num_prior_cases",
    "is_habitual_offender", "risk_score",
    "height_cm", "weight_kg", "complexion", "identifying_marks",
    "created_at", "updated_at"
]

VICTIM_FIELDS = [
    "victim_id", "first_name", "last_name", "full_name", "gender",
    "date_of_birth", "age", "phone", "email", "address", "city", "state",
    "nationality", "id_type", "id_number", "blood_group",
    "religion", "caste_category", "education", "occupation",
    "injury_type", "injury_description", "medical_status",
    "compensation_amount", "is_minor",
    "created_at", "updated_at"
]

WITNESS_FIELDS = [
    "witness_id", "first_name", "last_name", "full_name", "gender",
    "date_of_birth", "age", "phone", "email", "address", "city", "state",
    "nationality", "id_type", "id_number", "blood_group",
    "religion", "caste_category", "education", "occupation",
    "witness_type", "statement_recorded", "statement_date",
    "is_reliable", "protection_required",
    "created_at", "updated_at"
]

VEHICLE_FIELDS = [
    "vehicle_id", "registration_number", "make", "model", "body_type",
    "color", "fuel_type", "year_of_manufacture",
    "engine_number", "chassis_number",
    "owner_name", "owner_phone", "owner_address", "district",
    "vehicle_status", "involvement_type", "is_stolen",
    "created_at", "updated_at"
]

WEAPON_FIELDS = [
    "weapon_id", "weapon_type", "weapon_category", "description",
    "serial_number", "is_licensed", "license_number",
    "recovery_status", "recovery_date", "recovery_location",
    "forensic_report_available",
    "created_at", "updated_at"
]

EVIDENCE_FIELDS = [
    "evidence_id", "evidence_number", "evidence_type", "evidence_subtype",
    "description", "collection_date", "collection_location",
    "collected_by", "storage_location", "chain_of_custody",
    "forensic_lab_id", "forensic_status", "forensic_findings",
    "is_tampered", "digital_hash",
    "created_at", "updated_at"
]

ROLE_FIELDS = [
    "role_id", "role_name", "role_code", "description",
    "permissions", "is_active", "created_at", "updated_at"
]

USER_FIELDS = [
    "user_id", "username", "email", "password_hash", "officer_id",
    "first_name", "last_name", "phone",
    "is_active", "last_login", "login_count",
    "failed_login_attempts", "account_locked",
    "created_at", "updated_at"
]

FIR_SUSPECT_FIELDS = ["fir_suspect_id", "fir_id", "suspect_id", "role_in_crime", "date_linked", "created_at", "updated_at"]
FIR_VICTIM_FIELDS = ["fir_victim_id", "fir_id", "victim_id", "victim_type", "date_linked", "created_at", "updated_at"]
FIR_WITNESS_FIELDS = ["fir_witness_id", "fir_id", "witness_id", "witness_sequence", "date_linked", "created_at", "updated_at"]
FIR_VEHICLE_FIELDS = ["fir_vehicle_id", "fir_id", "vehicle_id", "involvement_type", "date_linked", "created_at", "updated_at"]
FIR_WEAPON_FIELDS = ["fir_weapon_id", "fir_id", "weapon_id", "usage_description", "date_linked", "created_at", "updated_at"]
FIR_EVIDENCE_FIELDS = ["fir_evidence_id", "fir_id", "evidence_id", "relevance", "date_linked", "created_at", "updated_at"]
CRIME_SUSPECT_FIELDS = ["crime_suspect_id", "crime_id", "suspect_id", "role_in_crime", "confidence_score", "date_linked", "created_at", "updated_at"]
USER_ROLE_FIELDS = ["user_role_id", "user_id", "role_id", "assigned_date", "assigned_by", "is_active", "created_at", "updated_at"]


# ═══════════════════════════════════════════════════════════════════════════════
#  MAIN ORCHESTRATOR
# ═══════════════════════════════════════════════════════════════════════════════

def main():
    print("=" * 70)
    print("  SENTINEL AI - Synthetic Data Generator v2.0")
    print("  Karnataka State Police Crime Intelligence System")
    print("  15 Categories | 40+ Subtypes | 700 FIRs | Fully Fictional")
    print("=" * 70)
    print(f"\n  Output: {RAW_DIR}\n")

    print("[1/3] Generating primary entities...\n")

    districts = generate_districts()
    write_csv("districts", districts, DISTRICT_FIELDS)

    police_stations = generate_police_stations(districts, target=120)
    write_csv("police_stations", police_stations, STATION_FIELDS)

    officers = generate_officers(police_stations, districts, target=500)
    write_csv("officers", officers, OFFICER_FIELDS)

    crime_categories, cat_id_map = generate_crime_categories()
    write_csv("crime_categories", crime_categories, CATEGORY_FIELDS)
    print(f"    → {len([c for c in crime_categories if not c['parent_category_id']])} parent categories")
    print(f"    → {len([c for c in crime_categories if c['parent_category_id']])} subtypes")

    firs = generate_firs(police_stations, officers, districts, cat_id_map, target=700)
    write_csv("firs", firs, FIR_FIELDS)

    crimes = generate_crimes(firs, crime_categories, cat_id_map, target=900)
    write_csv("crimes", crimes, CRIME_FIELDS)

    suspects = generate_persons(target=800, role_type="suspect")
    write_csv("suspects", suspects, SUSPECT_FIELDS)

    victims = generate_persons(target=1000, role_type="victim")
    write_csv("victims", victims, VICTIM_FIELDS)

    witnesses = generate_persons(target=600, role_type="witness")
    write_csv("witnesses", witnesses, WITNESS_FIELDS)

    vehicles = generate_vehicles(target=400)
    write_csv("vehicles", vehicles, VEHICLE_FIELDS)

    weapons = generate_weapons(target=300)
    write_csv("weapons", weapons, WEAPON_FIELDS)

    evidence = generate_evidence(firs, target=2500)
    write_csv("evidence", evidence, EVIDENCE_FIELDS)

    roles = generate_roles()
    write_csv("roles", roles, ROLE_FIELDS)

    users = generate_users(officers, roles, target=50)
    write_csv("users", users, USER_FIELDS)

    print("\n[2/3] Generating junction tables...\n")

    junctions_dir = os.path.join(RAW_DIR, 'junctions')
    ensure_dir(junctions_dir)

    fir_suspects = generate_fir_suspects(firs, suspects)
    write_csv("junctions/fir_suspects", fir_suspects, FIR_SUSPECT_FIELDS)

    fir_victims = generate_fir_victims(firs, victims)
    write_csv("junctions/fir_victims", fir_victims, FIR_VICTIM_FIELDS)

    fir_witnesses = generate_fir_witnesses(firs, witnesses)
    write_csv("junctions/fir_witnesses", fir_witnesses, FIR_WITNESS_FIELDS)

    fir_vehicles = generate_fir_vehicles(firs, vehicles)
    write_csv("junctions/fir_vehicles", fir_vehicles, FIR_VEHICLE_FIELDS)

    fir_weapons = generate_fir_weapons(firs, weapons)
    write_csv("junctions/fir_weapons", fir_weapons, FIR_WEAPON_FIELDS)

    fir_evidence = generate_fir_evidence(firs, evidence)
    write_csv("junctions/fir_evidence", fir_evidence, FIR_EVIDENCE_FIELDS)

    crime_suspects = generate_crime_suspects(crimes, suspects)
    write_csv("junctions/crime_suspects", crime_suspects, CRIME_SUSPECT_FIELDS)

    user_roles = generate_user_roles(users, roles)
    write_csv("junctions/user_roles", user_roles, USER_ROLE_FIELDS)

    # ── Summary ──────────────────────────────────────────────────────────────
    print("\n" + "=" * 70)
    print("  GENERATION COMPLETE — Summary")
    print("=" * 70)

    all_entities = [
        ("districts", districts), ("police_stations", police_stations),
        ("officers", officers), ("crime_categories", crime_categories),
        ("firs", firs), ("crimes", crimes),
        ("suspects", suspects), ("victims", victims),
        ("witnesses", witnesses), ("vehicles", vehicles),
        ("weapons", weapons), ("evidence", evidence),
        ("roles", roles), ("users", users),
    ]
    all_junctions = [
        ("fir_suspects", fir_suspects), ("fir_victims", fir_victims),
        ("fir_witnesses", fir_witnesses), ("fir_vehicles", fir_vehicles),
        ("fir_weapons", fir_weapons), ("fir_evidence", fir_evidence),
        ("crime_suspects", crime_suspects), ("user_roles", user_roles),
    ]

    total = 0
    print(f"\n  {'Entity':<25} {'Rows':>8}")
    print(f"  {'---'*9} {'---'*3}")
    for name, data in all_entities:
        print(f"  {name:<25} {len(data):>8,}")
        total += len(data)
    print(f"\n  {'Junction Table':<25} {'Rows':>8}")
    print(f"  {'---'*9} {'---'*3}")
    for name, data in all_junctions:
        print(f"  {name:<25} {len(data):>8,}")
        total += len(data)

    print(f"\n  {'TOTAL':<25} {total:>8,}")
    print(f"\n  All files saved to: {RAW_DIR}")

    # ── Crime category distribution summary ──────────────────────────────────
    print("\n  Crime Category Distribution in FIRs:")
    cat_counts = {}
    for fir in firs:
        cat = fir.get("crime_category", "Unknown")
        cat_counts[cat] = cat_counts.get(cat, 0) + 1
    for cat, count in sorted(cat_counts.items(), key=lambda x: -x[1]):
        bar = "█" * (count // 5)
        print(f"  {cat:<35} {count:>4}  {bar}")

    print("=" * 70)

    # ── Verify FK consistency ────────────────────────────────────────────────
    print("\n[3/3] Verifying foreign key consistency...\n")

    district_ids = {d["district_id"] for d in districts}
    station_ids = {s["station_id"] for s in police_stations}
    officer_ids = {o["officer_id"] for o in officers}
    fir_ids = {f["fir_id"] for f in firs}
    crime_ids = {c["crime_id"] for c in crimes}
    suspect_ids = {s["suspect_id"] for s in suspects}
    victim_ids = {v["victim_id"] for v in victims}
    witness_ids = {w["witness_id"] for w in witnesses}
    vehicle_ids = {v["vehicle_id"] for v in vehicles}
    weapon_ids = {w["weapon_id"] for w in weapons}
    evidence_ids = {e["evidence_id"] for e in evidence}
    user_ids = {u["user_id"] for u in users}
    role_ids_set = {r["role_id"] for r in roles}
    category_ids = {c["category_id"] for c in crime_categories}

    checks = [
        ("police_stations.district_id -> districts", all(s["district_id"] in district_ids for s in police_stations)),
        ("officers.station_id -> police_stations", all(o["station_id"] in station_ids for o in officers)),
        ("officers.district_id -> districts", all(o["district_id"] in district_ids for o in officers)),
        ("firs.station_id -> police_stations", all(f["station_id"] in station_ids for f in firs)),
        ("firs.district_id -> districts", all(f["district_id"] in district_ids for f in firs)),
        ("firs.investigating_officer_id -> officers", all(f["investigating_officer_id"] in officer_ids for f in firs)),
        ("crimes.fir_id -> firs", all(c["fir_id"] in fir_ids for c in crimes)),
        ("crimes.category_id -> crime_categories", all(c["category_id"] in category_ids for c in crimes)),
        ("crimes.district_id -> districts", all(c["district_id"] in district_ids for c in crimes)),
        ("crimes.station_id -> police_stations", all(c["station_id"] in station_ids for c in crimes)),
        ("fir_suspects.fir_id -> firs", all(r["fir_id"] in fir_ids for r in fir_suspects)),
        ("fir_suspects.suspect_id -> suspects", all(r["suspect_id"] in suspect_ids for r in fir_suspects)),
        ("fir_victims.fir_id -> firs", all(r["fir_id"] in fir_ids for r in fir_victims)),
        ("fir_victims.victim_id -> victims", all(r["victim_id"] in victim_ids for r in fir_victims)),
        ("fir_witnesses.fir_id -> firs", all(r["fir_id"] in fir_ids for r in fir_witnesses)),
        ("fir_witnesses.witness_id -> witnesses", all(r["witness_id"] in witness_ids for r in fir_witnesses)),
        ("fir_vehicles.fir_id -> firs", all(r["fir_id"] in fir_ids for r in fir_vehicles)),
        ("fir_vehicles.vehicle_id -> vehicles", all(r["vehicle_id"] in vehicle_ids for r in fir_vehicles)),
        ("fir_weapons.fir_id -> firs", all(r["fir_id"] in fir_ids for r in fir_weapons)),
        ("fir_weapons.weapon_id -> weapons", all(r["weapon_id"] in weapon_ids for r in fir_weapons)),
        ("fir_evidence.fir_id -> firs", all(r["fir_id"] in fir_ids for r in fir_evidence)),
        ("fir_evidence.evidence_id -> evidence", all(r["evidence_id"] in evidence_ids for r in fir_evidence)),
        ("crime_suspects.crime_id -> crimes", all(r["crime_id"] in crime_ids for r in crime_suspects)),
        ("crime_suspects.suspect_id -> suspects", all(r["suspect_id"] in suspect_ids for r in crime_suspects)),
        ("user_roles.user_id -> users", all(r["user_id"] in user_ids for r in user_roles)),
        ("user_roles.role_id -> roles", all(r["role_id"] in role_ids_set for r in user_roles)),
        ("users.officer_id -> officers", all(u["officer_id"] in officer_ids for u in users)),
    ]

    all_passed = True
    for desc, result in checks:
        status = "PASS" if result else "FAIL"
        if not result:
            all_passed = False
        print(f"  [{status}]  {desc}")

    print(f"\n  {'All FK checks passed!' if all_passed else 'Some FK checks FAILED — review above.'}")
    print("=" * 70)
    print("\n  ✓ Dataset ready for Sentinel AI Crime Intelligence Platform")
    print("  ✓ All records are SYNTHETIC — safe for public demonstration")
    print("=" * 70)


if __name__ == "__main__":
    main()
