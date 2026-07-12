"""
Amazon Kinesis Producer

Publishes security events to the SecurityLogStream.
"""

import json
import boto3


class KinesisProducer:
    """
    Producer for Amazon Kinesis Data Streams.
    """

    def __init__(self, stream_name: str, region_name: str = "eu-north-1"):
        self.stream_name = stream_name
        self.client = boto3.client(
            "kinesis",
            region_name=region_name
        )

    def publish(self, source: str, payload: dict):

        event = {
            "source": source,
            "payload": payload
        }

        response = self.client.put_record(
            StreamName=self.stream_name,
            Data=json.dumps(event),
            PartitionKey=source
        )

        return response