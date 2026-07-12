import json
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from processors.cve_processor import CVEProcessor

DATASET = (
    Path(__file__).resolve().parents[4]
    / "datasets"
    / "raw"
    / "cve"
    / "nvdcve-2.0-recent.json"
)

print("=" * 70)
print("Testing CVE Processor")
print("=" * 70)

with open(DATASET, "r", encoding="utf-8") as f:
    data = json.load(f)

processor = CVEProcessor()

records = processor.normalize(data)

print(f"\nTotal CVEs : {len(records)}")

print("\nFirst Record\n")

print(records[0])

print("\nAs Dictionary\n")

print(records[0].__dict__)