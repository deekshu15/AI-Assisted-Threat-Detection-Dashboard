"""
Test Amazon Kinesis Producer
"""

from producer import KinesisProducer


producer = KinesisProducer(
    stream_name="SecurityLogStream"
)

event = {
    "hostname": "PC01",
    "event_id": 4625,
    "username": "Administrator"
}

response = producer.publish(
    "windows",
    event
)

print(response)