"""
Test script for the IDS Processor.
"""

import sys
from pathlib import Path

import pandas as pd

# ------------------------------------------------------------------
# Add normalize_security_logs folder to Python path
# ------------------------------------------------------------------
PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from processors.ids_processor import IDSProcessor

# ------------------------------------------------------------------
# Locate IDS dataset folder
# ------------------------------------------------------------------
IDS_FOLDER = (
    Path(__file__).resolve().parents[4]
    / "datasets"
    / "raw"
    / "ids"
)

print("=" * 70)
print("Testing IDS Processor")
print("=" * 70)

print(f"Dataset Folder : {IDS_FOLDER}")

if not IDS_FOLDER.exists():
    raise FileNotFoundError(
        f"IDS folder not found:\n{IDS_FOLDER}"
    )

csv_files = sorted(IDS_FOLDER.glob("*.csv"))

if not csv_files:
    raise FileNotFoundError(
        f"No CSV files found inside:\n{IDS_FOLDER}"
    )

DATASET = csv_files[0]

print(f"Using Dataset : {DATASET.name}")

df = pd.read_csv(
    DATASET,
    low_memory=False
)

print(f"Rows Loaded : {len(df)}")
print(f"Columns     : {len(df.columns)}")

processor = IDSProcessor()

normalized_df = processor.normalize(df)

print("\n" + "=" * 70)
print("Normalization Successful")
print("=" * 70)

print(normalized_df.head())

print("\nRows :", len(normalized_df))
print("Columns :", len(normalized_df.columns))

print("\nColumn Names:")
print(normalized_df.columns.tolist())

print("\nSeverity Counts:")
print(normalized_df["severity"].value_counts())

print("\nTest Passed Successfully!")