# Amazon Kinesis

## Purpose

Amazon Kinesis buffers incoming security events before they are processed.

## Data Flow

Security Sources
        │
        ▼
API Gateway
        │
        ▼
SecurityLogStream
        │
        ▼
NormalizeSecurityLogs Lambda
        │
        ▼
Amazon S3 (Raw)

## Stream Name

SecurityLogStream

## Partition Key

source

## Example Event

```json
{
    "source": "windows",
    "payload": {
        "event_id": 4625,
        "hostname": "PC01"
    }
}