import sys
from pathlib import Path

# Add the project root to the Python path
PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from config import Config


def main():
    print("=" * 50)
    print("Testing Config Module")
    print("=" * 50)
    print(f"AWS Region       : {Config.AWS_REGION}")
    print(f"Raw Bucket       : {Config.RAW_BUCKET}")
    print(f"Processed Bucket : {Config.PROCESSED_BUCKET}")
    print(f"Log Level        : {Config.LOG_LEVEL}")
    print(f"Environment      : {Config.ENVIRONMENT}")
    print("=" * 50)


if __name__ == "__main__":
    main()