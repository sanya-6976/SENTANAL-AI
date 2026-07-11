"""
Sentinel AI — Database Connection Configuration

Provides SQLAlchemy engine, session factory, and Neo4j driver
for all database operations across the data module.
"""

from __future__ import annotations

from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker, DeclarativeBase

from config.settings import get_settings


# ============================================================
# SQLAlchemy Setup
# ============================================================

settings = get_settings()

engine = create_engine(
    settings.postgres_url,
    echo=settings.is_development,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
)

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
