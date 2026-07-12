import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from utils.schema import SecurityEvent


event = SecurityEvent(
    event_id="1",
    timestamp="2026-07-10 14:30:00",
    source="windows",
    hostname="DESKTOP-01",
    username="Administrator",
    severity="High"
)

print(event)

print(event.to_dict())