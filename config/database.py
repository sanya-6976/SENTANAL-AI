"""
Sentinel AI — Database Connection Configuration

Provides SQLAlchemy engine, session factory, and Neo4j driver
for all database operations across the data module.

Supports PostgreSQL (production) with automatic SQLite fallback (demo/dev).
"""

from __future__ import annotations

from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker, DeclarativeBase

from config.settings import get_settings, PROJECT_ROOT
from utils.logger import logger


# ============================================================
# SQLAlchemy Setup — with SQLite fallback
# ============================================================

settings = get_settings()

_use_sqlite = False


def _create_engine():
    """
    Attempt PostgreSQL connection; fall back to SQLite if unavailable.
    """
    global _use_sqlite

    # First, try PostgreSQL
    try:
        pg_engine = create_engine(
            settings.postgres_url,
            echo=False,
            pool_size=10,
            max_overflow=20,
            pool_pre_ping=True,
        )
        # Test the connection
        with pg_engine.connect() as conn:
            conn.execute(pg_engine.dialect.statement_compiler(pg_engine.dialect, None).process(None) if False else conn.execute.__func__.__code__ and None)
        # If we get here, just try a real query
        with pg_engine.connect() as conn:
            conn.execute(pg_engine.raw_connection().cursor().execute("SELECT 1") if False else None)
        return pg_engine
    except Exception:
        pass

    # Attempt a simple connect test
    try:
        pg_engine = create_engine(settings.postgres_url, echo=False)
        with pg_engine.connect() as conn:
            from sqlalchemy import text
            conn.execute(text("SELECT 1"))
        logger.info("Connected to PostgreSQL successfully.")
        return pg_engine
    except Exception as e:
        logger.warning(
            f"PostgreSQL unavailable ({type(e).__name__}). "
            f"Falling back to SQLite for demo/development mode."
        )
        _use_sqlite = True

    # Fallback: SQLite
    sqlite_path = PROJECT_ROOT / "datasets" / "sentinel_ai.db"
    sqlite_path.parent.mkdir(parents=True, exist_ok=True)
    sqlite_url = f"sqlite:///{sqlite_path}"
    logger.info(f"Using SQLite database at {sqlite_path}")
    return create_engine(sqlite_url, echo=False)


engine = _create_engine()

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    """SQLAlchemy declarative base for all ORM models."""
    pass


def get_db() -> Generator[Session, None, None]:
    """
    Dependency that provides a database session.

    Yields:
        Session: SQLAlchemy database session.

    Usage:
        with next(get_db()) as db:
            db.query(...)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def is_using_sqlite() -> bool:
    """Check if the application is using the SQLite fallback."""
    return _use_sqlite


# ============================================================
# Neo4j Setup
# ============================================================

def get_neo4j_driver():
    """
    Create and return a Neo4j driver instance.

    Returns:
        neo4j.Driver: Authenticated Neo4j driver.

    Note:
        The caller is responsible for closing the driver
        when done: driver.close()
    """
    from neo4j import GraphDatabase

    return GraphDatabase.driver(
        settings.neo4j_uri,
        auth=(settings.neo4j_user, settings.neo4j_password),
    )
