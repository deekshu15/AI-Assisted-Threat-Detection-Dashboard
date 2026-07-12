"""
Test script for the Normalization Pipeline.
"""

import sys
from pathlib import Path

import pandas as pd

# ------------------------------------------------------------------
# Add project root (normalize_security_logs) to Python path
# ------------------------------------------------------------------
PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from processors.normalize import Normalizer

# ------------------------------------------------------------------
# Locate Windows dataset
# ------------------------------------------------------------------
DATASET_PATH = (
    Path(__file__).resolve().parents[4]
    / "datasets"
    / "raw"
    / "windows"
    / "windows_events.csv"
)

print("=" * 70)
print("Testing Normalization Pipeline")
print("=" * 70)
print(f"Dataset Path : {DATASET_PATH}")

if not DATASET_PATH.exists():
    raise FileNotFoundError(
        f"Dataset not found:\n{DATASET_PATH}"
    )

# ------------------------------------------------------------------
# Read dataset
# ------------------------------------------------------------------
df = pd.read_csv(
    DATASET_PATH,
    low_memory=False
)

print(f"Rows Loaded : {len(df)}")
print(f"Columns     : {len(df.columns)}")

# ------------------------------------------------------------------
# Normalize dataset
# ------------------------------------------------------------------
normalized_df = Normalizer.normalize_dataframe(
    dataframe=df,
    dataset_path="windows/windows_events.csv"
)

print("\n" + "=" * 70)
print("Normalization Successful")
print("=" * 70)

print("\nFirst 5 Records:\n")
print(normalized_df.head())

print("\n" + "=" * 70)
print("Normalized Data Information")
print("=" * 70)

print(f"Rows    : {len(normalized_df)}")
print(f"Columns : {len(normalized_df.columns)}")

print("\nColumn Names:\n")
print(normalized_df.columns.tolist())

print("\nData Types:\n")
print(normalized_df.dtypes)

print("\nMissing Values:\n")
print(normalized_df.isnull().sum())

print("\n" + "=" * 70)
print("Normalization Pipeline Test Passed Successfully")
print("=" * 70)