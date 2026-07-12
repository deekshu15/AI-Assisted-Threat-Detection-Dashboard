"""
Test Processor Factory
"""

import sys
from pathlib import Path

# Add normalize_security_logs folder to Python path
PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from processors.factory import ProcessorFactory

datasets = [
    "windows",
    "ids",
    "linux",
    "firewall"
]

print("=" * 60)
print("Testing Processor Factory")
print("=" * 60)

for dataset in datasets:
    processor = ProcessorFactory.create(dataset)
    print(f"{dataset:<10} -> {processor.__class__.__name__}")

print("=" * 60)
print("Factory Test Passed")
print("=" * 60)