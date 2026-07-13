# Sentinel AI — Data & Intelligence Module

This repository contains the complete data engineering, analytics, GIS, and Neo4j graph implementation for the **Sentinel AI Crime Intelligence Operating System**, developed for the Karnataka State Police.

## Branch Strategy
This is the `data` branch. All data engineering work happens here before being merged into `main`.

## Module Architecture

- `datasets/` — Raw, cleaned, processed, and exported data files (Not tracked in Git)
- `etl/` — Extract, Transform, Load, and Validate pipelines
- `analytics/` — KPI computation, temporal trends, and district-level statistics
- `gis/` — Geospatial processing, heatmaps, and clustering
- `neo4j/` — Knowledge graph schema, builder, and queries
- `delivery/` — Sprint 5 data delivery layer and export orchestration
- `config/` — Environment variables, database connections, and centralized constants
- `utils/` — Logging, data validation, and shared helpers
- `docs/` — Sprint design documents, data dictionary, and schemas
- `tests/` — Pytest-based test suite

## Quickstart

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Copy the environment template and fill in credentials:
   ```bash
   cp .env.example .env
   ```
3. Initialize the database (coming in Sprint 2):
   ```bash
   # Run Alembic migrations or SQL scripts
   ```

## Sprints

- **Sprint 1**: Data Foundation & Architecture Blueprint (Completed)
- **Sprint 2**: Project Scaffolding & Synthetic Data (Completed)
- **Sprint 3**: Production ETL Pipeline and Data Quality Framework (Completed)
- **Sprint 4**: Data Platform Integration & Database Services (Completed)
- **Sprint 5**: Final Data Delivery Layer and reusable export bundles (Completed)

## Documentation

- `README.md` — Project overview and quickstart
- `CHANGELOG.md` — Sprint deliverables and repository updates
- `DEMO.md` — Hackathon demonstration guide
- `docs/sprint1_design_document.md` — Sprint 1 architecture and data foundation
- `docs/sprint2_design_document.md` — Sprint 2 scaffolding and synthetic dataset generation
- `docs/sprint3_design_document.md` — Sprint 3 ETL pipeline, validation, and reporting
- `docs/sprint4_design_document.md` — Sprint 4 database platform integration and services
- `docs/sprint5_design_document.md` — Sprint 5 delivery layer, exports, and report generation
