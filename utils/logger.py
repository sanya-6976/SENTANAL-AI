"""
Sentinel AI — Structured Logging

Provides a pre-configured Loguru logger for the entire data module.
Logs to both console (colored) and rotating file.

Usage:
    from utils.logger import logger

    logger.info("Processing started")
    logger.error("Failed to load data", exc_info=True)
"""

from __future__ import annotations

import sys
from pathlib import Path

from loguru import logger as _logger

from config.settings import get_settings, PROJECT_ROOT


def setup_logger() -> None:
    """
    Configure the application logger.

    - Console: colored, INFO+ level in production, DEBUG in development.
    - File: rotating log at logs/sentinel_data.log, 10 MB max, 30-day retention.
    """
    settings = get_settings()

    # Remove default handler
    _logger.remove()

    # Console handler
    _logger.add(
        sys.stderr,
        level=settings.log_level,
        format=(
            "<green>{time:YYYY-MM-DD HH:mm:ss}</green> | "
            "<level>{level: <8}</level> | "
            "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> | "
            "<level>{message}</level>"
        ),
        colorize=True,
    )

    # File handler
    log_dir = PROJECT_ROOT / "logs"
    log_dir.mkdir(exist_ok=True)

    _logger.add(
        log_dir / "sentinel_data.log",
        level="DEBUG",
        format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} | {message}",
        rotation="10 MB",
        retention="30 days",
        compression="gz",
        enqueue=True,
    )


# Auto-configure on import
setup_logger()

# Re-export the configured logger
logger = _logger
