"""
Amazon Kinesis Consumer

The NormalizeSecurityLogs Lambda will consume
records from the Kinesis stream.

This file is reserved for local testing and future extensions.
"""


class KinesisConsumer:

    def process(self, record):

        print(record)