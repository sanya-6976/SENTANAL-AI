# Changelog

All notable changes to this repository are documented in this file.

## [Unreleased]

- Sprint 1, Sprint 2, and Sprint 3 work documented and synchronized.
- ETL pipeline completed with validation, reporting, logging, checkpointing, and DAG-aware recovery.

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
