import pandas as pd

df = pd.read_csv(
    "../../../evtx_data.csv",
    low_memory=False
)

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