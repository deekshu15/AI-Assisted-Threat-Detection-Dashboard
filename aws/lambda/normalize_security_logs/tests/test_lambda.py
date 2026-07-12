"""
Local Lambda Test
"""

import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from lambda_function import lambda_handler

event = {
    "Records": [
        {
            "s3": {
                "bucket": {
                    "name": "ai-threat-raw-logs-deekshitha"
                },
                "object": {
                    "key": "windows/windows_events.csv"
                }
            }
        }
    ]
}

response = lambda_handler(event, None)

print(response)