import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from utils.logger import get_logger

logger = get_logger(__name__)

logger.debug("Debug log")
logger.info("Info log")
logger.warning("Warning log")
logger.error("Error log")
logger.critical("Critical log")