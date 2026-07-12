import sys
from pathlib import Path

import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from processors.windows_processor import WindowsProcessor


processor = WindowsProcessor()

df = pd.read_csv(
    "../../../evtx_data.csv",
    low_memory=False
)

normalized = processor.normalize(df)

print("=" * 60)
print("Normalized Windows Dataset")
print("=" * 60)

print(normalized.head())

print("\nColumns")

print(normalized.columns.tolist())