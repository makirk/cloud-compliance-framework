#!/usr/bin/env python3
"""
CDK Application for S3 Compliant Infrastructure
"""

import aws_cdk as cdk
from aws_cdk import aws_kms as kms, aws_s3 as s3
from s3_stack import S3CompliantStack, S3CompliantBucketConstruct


app = cdk.App()

# Create the S3 stack
# In a real scenario, you would reference existing KMS keys and logging buckets
S3CompliantStack(
    app,
    "S3CompliantStack",
    bucket_name="my-compliant-bucket",
    logging_bucket=s3.Bucket.from_bucket_name(
        app, "LoggingBucket", "my-logging-bucket"
    ),
    encryption_key=kms.Key.from_key_arn(
        app,
        "EncryptionKey",
        "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012",
    ),
    env=cdk.Environment(
        account="123456789012",
        region="us-east-1",
    ),
)

app.synth()
