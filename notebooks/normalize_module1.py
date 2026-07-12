"""
Module 1 - Normalization Script
Maps raw security log sources into the unified event schema.

Sources handled:
  1. CICIDS2017 (MachineLearningCVE variant) - 8 CSV files, network/IDS traffic
  2. evtx_data.csv - Windows event logs (EVTX-ATTACK-SAMPLES export)
  3. NVD CVE JSON feeds - reference/lookup data (NOT events, used later for enrichment)

Output: normalized Parquet files, one per source type, ready to upload to
        s3://yourteam-processed-security-events/normalized/<source_type>/
"""

import json
import uuid
from datetime import datetime, timezone
from pathlib import Path

import pandas as pd

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

UNIFIED_SCHEMA_COLUMNS = [
    "event_id", "timestamp", "source_type", "source_name",
    "src_ip", "dest_ip", "src_port", "dest_port", "protocol",
    "user", "host",
    "event_category", "event_action", "severity",
    "label_raw", "raw_log",
    "enrichment_status", "matched_ioc",
    "mitre_technique_id", "mitre_tactic",
    "ingested_at",
]

# Approximate date for each CICIDS2017 file, derived from filename.
# The MachineLearningCVE variant strips real timestamps, so this is the
# best available date resolution for this source (documented limitation).
CICIDS_FILENAME_DATES = {
    "Monday-WorkingHours.pcap_ISCX.csv": "2017-07-03",
    "Tuesday-WorkingHours.pcap_ISCX.csv": "2017-07-04",
    "Wednesday-workingHours.pcap_ISCX.csv": "2017-07-05",
    "Thursday-WorkingHours-Morning-WebAttacks.pcap_ISCX.csv": "2017-07-06",
    "Thursday-WorkingHours-Afternoon-Infilteration.pcap_ISCX.csv": "2017-07-06",
    "Friday-WorkingHours-Morning.pcap_ISCX.csv": "2017-07-07",
    "Friday-WorkingHours-Afternoon-PortScan.pcap_ISCX.csv": "2017-07-07",
    "Friday-WorkingHours-Afternoon-DDos.pcap_ISCX.csv": "2017-07-07",
}


def now_utc_iso():
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def new_event_id():
    return str(uuid.uuid4())


def empty_unified_df(n_rows):
    """Return a DataFrame with all unified schema columns pre-filled with None."""
    return pd.DataFrame({col: [None] * n_rows for col in UNIFIED_SCHEMA_COLUMNS})


# ---------------------------------------------------------------------------
# 1. CICIDS2017 normalizer
# ---------------------------------------------------------------------------

def normalize_cicids(path: str) -> pd.DataFrame:
    """
    Normalize a single CICIDS2017 (MachineLearningCVE variant) CSV file
    into the unified event schema.
    """
    filename = Path(path).name
    df = pd.read_csv(path, low_memory=False)

    # CICIDS2017 columns have inconsistent leading spaces - strip them all
    df.columns = df.columns.str.strip()

    n = len(df)
    out = empty_unified_df(n)

    out["event_id"] = [new_event_id() for _ in range(n)]

    # No real timestamp in this variant - use filename-derived date as a
    # best-effort placeholder. Document this limitation in the README.
    approx_date = CICIDS_FILENAME_DATES.get(filename, "1970-01-01")
    out["timestamp"] = f"{approx_date}T00:00:00Z"

    out["source_type"] = "ids_ips"
    out["source_name"] = "CICIDS2017"

    # Only Destination Port survives anonymization in this dataset variant.
    # src_ip / dest_ip / src_port / protocol are genuinely unavailable - leave null.
    if "Destination Port" in df.columns:
        out["dest_port"] = df["Destination Port"]

    out["event_category"] = "network_traffic"

    label_col = "Label" if "Label" in df.columns else None
    if label_col:
        out["label_raw"] = df[label_col]
        out["event_action"] = df[label_col].apply(
            lambda x: "normal_traffic" if str(x).strip().upper() == "BENIGN" else "attack_detected"
        )
    else:
        out["event_action"] = "unknown"

    # Keep the full original row for traceability / future feature engineering.
    # This is what Module 2 (ML) will pull flow statistics from later.
    # fillna('') first - astype(str) alone can leave real NaN floats behind,
    # which breaks ",".join() on those rows.
    out["raw_log"] = df.fillna("").astype(str).agg(",".join, axis=1)

    out["enrichment_status"] = "not_enriched"
    out["ingested_at"] = now_utc_iso()

    return out[UNIFIED_SCHEMA_COLUMNS]


def normalize_all_cicids(folder: str) -> pd.DataFrame:
    """Run normalize_cicids over all known CICIDS2017 files in a folder."""
    frames = []
    for filename in CICIDS_FILENAME_DATES:
        file_path = Path(folder) / filename
        if file_path.exists():
            print(f"Normalizing {filename} ...")
            frames.append(normalize_cicids(str(file_path)))
        else:
            print(f"WARNING: {filename} not found in {folder}, skipping.")
    if not frames:
        raise FileNotFoundError(f"No CICIDS2017 files found in {folder}")
    return pd.concat(frames, ignore_index=True)


# ---------------------------------------------------------------------------
# 2. evtx_data.csv (Windows event logs) normalizer
# ---------------------------------------------------------------------------

# Candidate source columns in priority order - first match wins.
# evtx_data.csv has 326 sparse columns; any single row only populates a subset.
EVTX_FIELD_CANDIDATES = {
    "timestamp":  ["SystemTime", "UtcTime", "CreationUtcTime"],
    "src_ip":     ["SourceIp", "SourceAddress", "ClientIP"],
    "dest_ip":    ["DestinationIp", "DestAddress"],
    "src_port":   ["SourcePort"],
    "dest_port":  ["DestinationPort", "DestPort", "IpPort"],
    "protocol":   ["Protocol"],
    "user":       ["TargetUserName", "SubjectUserName", "User", "username", "AccountName"],
    "host":       ["Computer", "Workstation", "WorkstationName"],
    "mitre_tactic": ["EVTX_Tactic"],
}

# Minimal EventID -> event_category mapping for common Windows security events.
# Extend this as you encounter more EventIDs in your actual data.
EVENTID_CATEGORY_MAP = {
    "4624": "authentication",   # successful logon
    "4625": "authentication",   # failed logon
    "4688": "process_execution",  # new process created
    "4720": "account_management",  # user account created
    "1": "process_execution",   # Sysmon: process creation
    "3": "network_traffic",     # Sysmon: network connection
    "11": "file_activity",      # Sysmon: file created
}


def first_available(df: pd.DataFrame, candidates: list):
    """Return the first column from `candidates` that exists in df, else None."""
    for col in candidates:
        if col in df.columns:
            return col
    return None


def normalize_evtx(path: str) -> pd.DataFrame:
    """
    Normalize evtx_data.csv (Windows event logs, EVTX-ATTACK-SAMPLES export)
    into the unified event schema.
    """
    df = pd.read_csv(path, low_memory=False)
    n = len(df)
    out = empty_unified_df(n)

    out["event_id"] = [new_event_id() for _ in range(n)]
    out["source_type"] = "windows"
    out["source_name"] = "EVTX-ATTACK-SAMPLES"

    for schema_field, candidates in EVTX_FIELD_CANDIDATES.items():
        source_col = first_available(df, candidates)
        if source_col:
            out[schema_field] = df[source_col]

    # event_category from EventID if present
    if "EventID" in df.columns:
        out["event_category"] = df["EventID"].astype(str).map(EVENTID_CATEGORY_MAP).fillna("other")
        out["event_action"] = "EventID_" + df["EventID"].astype(str)
    else:
        out["event_category"] = "other"
        out["event_action"] = "unknown"

    # label_raw: reuse the tactic tag if that's all we have, otherwise leave null
    if "EVTX_Tactic" in df.columns:
        out["label_raw"] = df["EVTX_Tactic"]

    # Keep the full original row for traceability
    # fillna('') first - astype(str) alone can leave real NaN floats behind,
    # which breaks ",".join() on those rows.
    out["raw_log"] = df.fillna("").astype(str).agg(",".join, axis=1)

    out["enrichment_status"] = "not_enriched"
    out["ingested_at"] = now_utc_iso()

    return out[UNIFIED_SCHEMA_COLUMNS]


# ---------------------------------------------------------------------------
# 3. NVD CVE JSON -> flat reference table (NOT part of the event schema)
# ---------------------------------------------------------------------------

def extract_cve_reference(path: str) -> pd.DataFrame:
    """
    Flatten an NVD CVE JSON feed file into a lookup table used later
    for enrichment (Day 4). This is reference data, not an event stream.
    """
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    rows = []
    for item in data.get("vulnerabilities", []):
        cve = item.get("cve", {})
        cve_id = cve.get("id")

        # description: prefer English
        description = None
        for d in cve.get("descriptions", []):
            if d.get("lang") == "en":
                description = d.get("value")
                break

        # CVSS score/severity: try v3.1, then v3.0, then v2 as fallback
        score, severity = None, None
        metrics = cve.get("metrics", {})
        for key in ["cvssMetricV31", "cvssMetricV30", "cvssMetricV2"]:
            if key in metrics and metrics[key]:
                cvss_data = metrics[key][0].get("cvssData", {})
                score = cvss_data.get("baseScore")
                severity = cvss_data.get("baseSeverity") or metrics[key][0].get("baseSeverity")
                break

        rows.append({
            "cve_id": cve_id,
            "published": cve.get("published"),
            "cvss_score": score,
            "severity": severity,
            "description": description,
        })

    return pd.DataFrame(rows)


def build_cve_reference(json_paths: list) -> pd.DataFrame:
    """Combine multiple NVD JSON feed files into one reference table, deduped by cve_id."""
    frames = [extract_cve_reference(p) for p in json_paths if Path(p).exists()]
    combined = pd.concat(frames, ignore_index=True)
    combined = combined.drop_duplicates(subset="cve_id", keep="last")
    return combined


# ---------------------------------------------------------------------------
# Main - run everything and write outputs
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    # ---- EDIT THESE PATHS to match where your files actually are ----
    CICIDS_FOLDER = "./MachineLearningCVE"
    EVTX_FILE = "./evtx_data.csv"
    NVD_FILES = [
        "./nvdcve-2.0-2025.json",
        "./nvdcve-2.0-2026.json",
        "./nvdcve-2.0-recent.json",
    ]
    OUTPUT_DIR = Path("./normalized_output")
    OUTPUT_DIR.mkdir(exist_ok=True)

    # 1. CICIDS2017
    if Path(CICIDS_FOLDER).exists():
        cicids_df = normalize_all_cicids(CICIDS_FOLDER)
        cicids_df.to_parquet(OUTPUT_DIR / "normalized_ids_ips.parquet", index=False)
        print(f"CICIDS2017 normalized: {len(cicids_df)} rows -> normalized_ids_ips.parquet")
    else:
        print(f"SKIP: {CICIDS_FOLDER} not found")

    # 2. Windows EVTX
    if Path(EVTX_FILE).exists():
        evtx_df = normalize_evtx(EVTX_FILE)
        evtx_df.to_parquet(OUTPUT_DIR / "normalized_windows.parquet", index=False)
        print(f"evtx_data.csv normalized: {len(evtx_df)} rows -> normalized_windows.parquet")
    else:
        print(f"SKIP: {EVTX_FILE} not found")

    # 3. NVD CVE reference table (for Day 4 enrichment, not an event stream)
    cve_ref = build_cve_reference(NVD_FILES)
    if not cve_ref.empty:
        cve_ref.to_parquet(OUTPUT_DIR / "cve_reference.parquet", index=False)
        print(f"CVE reference table built: {len(cve_ref)} unique CVEs -> cve_reference.parquet")
    else:
        print("SKIP: no NVD CVE files found")

    print("\nDone. Check ./normalized_output/ for Parquet files ready to upload to S3.")