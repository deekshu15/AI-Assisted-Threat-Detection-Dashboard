import sys
from pathlib import Path

import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from utils.validator import DatasetValidator


print("=" * 60)
print("Validator Tests")
print("=" * 60)

# File type
DatasetValidator.validate_file_type("evtx_data.csv")
print("✓ File type validation passed")

# Dataset source
DatasetValidator.validate_dataset_source("windows")
print("✓ Dataset source validation passed")

# Sample dataframe
df = pd.DataFrame({
    "EventID": [4624],
    "TimeCreated": ["2026-07-10"],
    "Computer": ["SERVER01"]
})

DatasetValidator.validate_not_empty(df)
print("✓ Empty check passed")

DatasetValidator.validate_required_columns(
    df,
    ["EventID", "TimeCreated", "Computer"]
)

print("✓ Required column validation passed")

print("=" * 60)
print("All validator tests passed!")
print("=" * 60)