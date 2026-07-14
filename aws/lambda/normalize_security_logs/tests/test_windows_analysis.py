import pandas as pd

import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "..", "..", "..", "datasets", "raw", "windows", "windows_events.csv")

df = pd.read_csv(DATA_PATH, low_memory=False)

columns = [
    "User",
    "TargetUserName",
    "SourceIp",
    "DestinationIp",
    "Protocol",
    "{Event_NS}EventXML"
]

for column in columns:
    if column in df.columns:
        print(f"\n{column}")
        print(df[column].notna().sum(), "non-null values")