"""
Sentinel AI — Data Loading Module

Loads cleaned, validated data into PostgreSQL and Neo4j databases.
Supports bulk inserts, upserts, and incremental loading.

Implementation: Sprint 4
"""

from __future__ import annotations

# Module will be implemented in Sprint 4
# Planned functions:
#   - load_to_postgres(df, table_name, engine) -> int
#   - bulk_insert(df, table_name, engine, chunk_size) -> int
#   - upsert(df, table_name, engine, conflict_columns) -> int
#   - load_to_neo4j(nodes_df, relationships_df, driver) -> dict
