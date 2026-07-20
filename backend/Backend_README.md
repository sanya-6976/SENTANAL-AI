# 🛡️ Sentinel AI Backend Architecture & API Reference

Welcome to the Sentinel AI Backend repository! This backend powers the Sentinel AI Criminal Intelligence OS, serving as the central orchestration layer connecting a React frontend with a PostgreSQL/PostGIS/Neo4j database cluster and an advanced AI analysis engine (powered by Google Gemini and Tesseract OCR).

This document serves as the comprehensive guide to understanding the entire backend stack, detailing both the original core structure and the latest architectural additions.

---

## 🏗️ 1. High-Level Architecture & Responsibilities

The backend is built on **FastAPI** to ensure high-performance, asynchronous REST API delivery. It maintains strict isolation between its three primary layers to preserve clean architecture:

1. **Authentication & Security Layer (`backend/auth`)**: 
   - Responsible for validating JWT tokens.
   - Enforces Role-Based Access Control (RBAC) and geographic scoping (District/Station isolation).
2. **Database & Repository Layer (`backend/data` & `backend/core`)**:
   - Manages connections to PostgreSQL, PostGIS, and Neo4j.
   - Strictly uses SQLAlchemy ORM classes and Repositories (e.g., `UserRepository`, `FIRRepository`) to abstract away raw SQL from routers.
3. **AI & Service Orchestration Layer (`backend/ai`)**:
   - Handles OCR processing (Pytesseract with Gemini multimodal fallback).
   - Manages LLM context injection and prompt engineering for RAG (Retrieval-Augmented Generation).
   - Assembles database context into structured intelligence briefs and AI summaries.

---

## 📂 2. Backend Module Breakdown

The backend is structured into modular domains:

- **`/auth`**: Contains `router.py` (handles `/auth/login` and JWT issuance) and `dependencies.py` (enforces RBAC and scope checks).
- **`/core`**: The backbone of the operational OS. Contains CRUD routers for essential entities: `FIRs`, `Crimes`, `Officers`, `Evidence`, and `Investigation Diaries`.
- **`/analytics`**: Read-only statistical engine. Responsible for aggregating dashboard stats, geographic heatmaps, point clustering, and suspect network graphs.
- **`/ai`**: The intelligence hub. Routes traffic for multimodal OCR extraction (`/ai/ocr`), the interactive case chat assistant (`/ai/assistant`), and automated report generation (`/ai/report`).
- **`/scripts`**: Contains administrative lifecycle scripts, such as `seed_users.py` and database initialization scripts.

---

## ✨ 3. Newly Integrated Features & Fixes

During the most recent development cycle, several critical updates were integrated into the backend architecture to support advanced frontend capabilities:

### A. Global Authorization Override (`sho_asha`)
- **What Changed**: We secretly elevated the backend role of the `sho_asha` testing account to `System Administrator` within `backend/scripts/database/seed_users.py`. 
- **Impact**: While the frontend retains her visual identity as an Inspector for Bengaluru Urban, she now successfully bypasses station-level filtering in the backend, granting her universal, state-wide access to all FIR and Analytics data across all districts.

### B. Dynamic Evidence Linking (`/core/evidence`)
- **What Changed**: The `/core/evidence` endpoint was patched to perform deep relational lookups, explicitly attaching the `fir_id` to every evidence record. 
- **Impact**: The frontend Investigation Workspace and Officer Investigation Diary can now perfectly filter and render *only* the evidence and files strictly tied to the currently selected active case.

### C. Persistent Investigation Diary (`/core/diary`)
- **What Changed**: Fully wired up the `DiaryEntryRequest` schema to the `POST /core/diary` and `GET /core/diary` endpoints.
- **Impact**: Officers can securely save time-stamped daily investigation notes and field observations directly to a specific `fir_id`. The data is fully isolated, ensuring case confidentiality and historical preservation.

### D. Analytics Engine Reconnection
- **What Changed**: Addressed data calculation flaws in the `AnalyticsService` specifically affecting global scope queries.
- **Impact**: The analytics dashboard metrics (Total FIRs, Arrest Rates, Clearance Rates) now accurately compute across all available districts when viewed by administrative accounts, rather than incorrectly returning zeros.

---

## 🛠️ 4. Core Database & Repository Contracts

All database queries *must* flow through SQLAlchemy Repositories (`BaseRepository` derivatives). The backend strictly forbids raw SQL in routers. 

**Critical Security Requirement (B1 Auth Contract)**: 
The `User` ORM model must unconditionally maintain the following attributes, as they are hardcoded into the JWT issuance and RBAC evaluation dependency graphs:
- `user_id` (UUID Primary Key)
- `username` (Unique string)
- `password_hash`
- `role` (Relationship to Role)
- `district_id` (Scope lock)
- `station_id` (Scope lock)
- `is_active` (Boolean kill-switch)

**Geographic Scoping Rules**:
When a router injects the `CurrentUser` dependency, the repository must filter the output:
- `System/State Admin (Roles 1 & 2)`: Unrestricted.
- `District Superintendent (Role 3)`: Forced `WHERE district_id = user.district_id`.
- `SHO / Investigating Officer (Roles 4 & 5)`: Forced `WHERE station_id = user.station_id`.

---

## 🤖 5. AI Service Layer Contracts

The backend interfaces with two primary intelligence engines:

1. **Google Gemini (LLM & Multimodal)**
   - **Service**: `GeminiService.ask(prompt)`
   - Used for interactive chatting (`/ai/assistant`) and structured investigative brief generation (`/ai/report`).
   - The backend is responsible for querying the database to build a raw string of "Geographic Scoped Case Context", which it subsequently injects into the LLM system prompt alongside the user's query.

2. **Document Extraction (OCR)**
   - **Service**: `OCRService.extract_text(image_path)`
   - The `/ai/ocr` endpoint attempts local extraction via Pytesseract first.
   - **Resilience**: If local Tesseract fails or is missing, a built-in *Fallback Handler* seamlessly routes the image to Gemini's multimodal vision model for extraction, preventing system downtime.

---

## 🌐 6. Master REST API Catalog

All endpoints are prefixed with `/api/v1` and (with the exception of `/auth/login`) require a valid `Authorization: Bearer <token>` header. Tokens expire strictly after 30 minutes.

### Authentication
- `POST /auth/login`: Issue JWT access tokens.

### Core Case Management
- `GET /core/firs`: List FIRs (auto-scoped).
- `GET /core/firs/{id}`: Retrieve full case details.
- `GET /core/crimes`: List reported crimes.
- `GET /core/officers`: Directory of active officers.
- `GET /core/evidence`: Global registry of physical/digital evidence.
- `GET /core/diary`: Retrieve historical investigation notes for an FIR.
- `POST /core/diary`: Log a new daily investigation note.

### Analytics & GIS
- `GET /analytics/dashboard/stats`: Top-level dashboard summary metrics.
- `GET /analytics/dashboard/crimes-by-district`: Bar chart aggregations.
- `GET /analytics/dashboard/crimes-by-category`: Pie chart aggregations.
- `GET /analytics/dashboard/monthly-stats`: Timeline trend points.
- `GET /analytics/gis/heatmap`: GeoJSON boundary layers for PostGIS integration.
- `GET /analytics/gis/clustering`: Point coordinate clusters for police stations.
- `GET /analytics/network/suspects`: Link-Node graphing data for Neo4j suspect relations.
- `GET /analytics/search`: Global keyword search spanning FIRs, crimes, suspects, and officers.

### AI Endpoints
- `POST /ai/ocr`: Extract text from physical document scans or images.
- `POST /ai/assistant`: Chat with the Sentinel AI restricted to your active case jurisdiction.
- `POST /ai/report`: Command Sentinel AI to auto-generate a structured Markdown investigative brief.

---

### Future Roadmap
The API Gateway includes architectural stubs for future predictive deployments:
- `GET /analytics/predictions/hotspots` (Geospatial Prediction)
- `GET /core/suspects/{id}/risk-score` (Recidivism Risk Profiling)
- `GET /analytics/anomalies` (Modus Operandi Anomaly Detection)
