"""
Sentinel AI — Data Loading Module

Loads validated and transformed data into the database using transactions.
Supports chunked inserts and rollback on failure.
Works with both PostgreSQL (production) and SQLite (demo/fallback).
"""

from __future__ import annotations

import pandas as pd
from sqlalchemy.exc import SQLAlchemyError

from config.database import engine
from utils.logger import logger


class Loader:
    """Loads DataFrames into the database."""

    def load_dataset(self, df: pd.DataFrame, table_name: str, chunk_size: int = 10000) -> int:
        """
        Load a DataFrame into the database using chunked inserts within a transaction.

        Args:
            df: DataFrame to load.
            table_name: Target database table.
            chunk_size: Number of rows per insert batch.

        Returns:
            Number of rows successfully loaded.

        Raises:
            SQLAlchemyError: If the database transaction fails.
        """
        if df.empty:
            logger.info(f"[{table_name}] Nothing to load (empty DataFrame).")
            return 0

        logger.info(f"Loading {len(df)} rows into '{table_name}'...")
        rows_loaded = 0

        try:
            # Use an explicit connection/transaction to ensure atomicity
            with engine.begin() as connection:
                rows_loaded = df.to_sql(
                    name=table_name,
                    con=connection,
                    if_exists="append",
                    index=False,
                    chunksize=chunk_size,
                )

            # Pandas to_sql may return None; fallback to len(df)
            if rows_loaded is None:
                rows_loaded = len(df)

            logger.info(f"[{table_name}] Successfully loaded {rows_loaded} rows.")
            return rows_loaded

        except SQLAlchemyError as e:
            logger.error(f"[{table_name}] CRITICAL: Database transaction failed. Rolling back. Error: {e}")
            raise
