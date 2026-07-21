# Changelog

All notable changes to this repository are documented in this file.

## [Unreleased]

- Sprint 1 through Sprint 4 work documented and synchronized.
- ETL pipeline completed with validation, reporting, logging, checkpointing, and DAG-aware recovery.
- Added Sprint 4 data platform services: connection management, repository layer, query services, bulk loading, performance reporting, and integration interfaces.
- Added Sprint 5 data delivery layer with dashboard, district, GIS, trend, Neo4j, AI, backend, and query-optimization exports.

## Sprint 5 - Data Delivery Layer

- Added `delivery.Sprint5DataDeliveryLayer` to compose reusable datasets for dashboard analytics, district analytics, GIS, trend analysis, Neo4j imports, AI preparation, backend APIs, and query tuning.
- Added JSON, CSV, and Markdown report generation under `reports/sprint5/`.
- Added graph-ready node and relationship exports for District, Police Station, Officer, FIR, Crime, Suspect, Victim, Vehicle, Weapon, and Evidence entities.
- Added clean FIR text, AI-ready metadata, structured crime summaries, and vector-ready records for future retrieval workflows.
- Added Sprint 5 unit tests covering the delivery manifest and file outputs.

## Sprint 4 - Data Platform Integration & Database Services

- Added a reusable PostgreSQL/SQLite connection manager with retry logic and session helpers.
- Centralized configuration for pool sizing, retry behavior, and database URLs.
- Added repository abstractions for crime, district, officer, evidence, and analytics access.
- Added query services for district summaries, monthly trends, officer workload, search, GIS exports, Neo4j exports, and AI feature inputs.
- Added bulk loading utilities with chunked insert support and PostgreSQL COPY optimization.
- Added database benchmark reporting utilities and platform integration wrappers.
- Added SQLite-backed tests covering the database connection, repositories, queries, and bulk loading.

## Sprint 3 - Production ETL Pipeline

- Implemented ETL orchestrator with Extract, Validate, Transform, Load stages.
- Added configuration-driven DAG and schema version tracking.
- Built recovery mode with dependency-aware skip logic.
- Added consolidated `reports/` output for HTML summary, metrics, duplicate reports, and failed records.
- Added structured logging to `logs/etl.log` and `logs/error.log`.
- Added unit tests for ETL validation and metrics.

## Sprint 2 - Project Scaffolding and Synthetic Data

- Added project scaffolding for data engineering, analytics, GIS, and graph modules.
- Added configuration management, database settings, and environment loading.
- Added synthetic dataset generation scripts.
- Added initial database migration files.
- Added validation utilities and logging framework.

## Sprint 1 - Data Architecture and Foundation

- Defined data architecture and folder structure.
- Documented dataset design, ER diagrams, PostgreSQL schema, Neo4j graph schema, and GIS data models.
- Created the Sprint 1 design document in `docs/sprint1_design_document.md`.
