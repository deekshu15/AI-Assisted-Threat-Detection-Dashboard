import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from processors.detector import DatasetDetector


samples = [
    "windows/evtx_data.csv",
    "ids/Friday-WorkingHours.csv",
    "linux/auth.log",
    "firewall/firewall_logs.csv",
    "cve/nvdcve-2.0-2026.json",
    "threat_feeds/otx.json",
    "incident_records/incidents.csv"
]

for sample in samples:
    print(sample, "->", DatasetDetector.detect(sample))