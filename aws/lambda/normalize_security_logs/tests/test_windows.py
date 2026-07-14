import sys
from pathlib import Path

import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from processors.windows_processor import WindowsProcessor


processor = WindowsProcessor()

import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "..", "..", "..", "datasets", "raw", "windows", "windows_events.csv")

df = pd.read_csv(DATA_PATH, low_memory=False)

normalized = processor.normalize(df)

print("=" * 60)
print("Normalized Windows Dataset")
print("=" * 60)

print(normalized.head())

print("\nColumns")

print(normalized.columns.tolist())