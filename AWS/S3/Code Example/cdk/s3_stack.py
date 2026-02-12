"""
S3 Compliant CDK Stack
This stack implements AWS Security Hub controls for S3 buckets
"""

from aws_cdk import (
    Stack,
    RemovalPolicy,
    aws_s3 as s3,
    aws_kms as kms,
    aws_iam as iam,
)
from constructs import Construct


class S3CompliantStack(Stack):
    """CDK Stack for creating a compliant S3 bucket"""

    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        bucket_name: str,
        logging_bucket: s3.IBucket,
        encryption_key: kms.IKey,
        **kwargs
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create compliant S3 bucket
        self.bucket = s3.Bucket(
            self,
            "CompliantBucket",
            bucket_name=bucket_name,
            # S3.1: Server-side encryption with KMS
            encryption=s3.BucketEncryption.KMS,
            encryption_key=encryption_key,
            bucket_key_enabled=True,
            # S3.8, S3.2, S3.3: Block all public access
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
            # S3.5: Enforce SSL/TLS
            enforce_ssl=True,
            # Enable versioning for data protection
            versioned=True,
            # Enable access logging
            server_access_logs_bucket=logging_bucket,
            server_access_logs_prefix=f"s3-logs/{bucket_name}/",
            # Lifecycle rules for cost optimization
            lifecycle_rules=[
                s3.LifecycleRule(
                    id="transition-old-versions",
                    enabled=True,
                    noncurrent_version_transitions=[
                        s3.NoncurrentVersionTransition(
                            storage_class=s3.StorageClass.INFREQUENT_ACCESS,
                            transition_after=cdk.Duration.days(30),
                        ),
                        s3.NoncurrentVersionTransition(
                            storage_class=s3.StorageClass.GLACIER,
                            transition_after=cdk.Duration.days(90),
                        ),
                    ],
                    noncurrent_version_expiration=cdk.Duration.days(365),
                )
            ],
            # Recommended: Use a removal policy for production
            removal_policy=RemovalPolicy.RETAIN,
        )

        # Add additional bucket policy to explicitly deny insecure transport
        # S3.5: Require SSL/TLS for all requests
        self.bucket.add_to_resource_policy(
            iam.PolicyStatement(
                sid="DenyInsecureTransport",
                effect=iam.Effect.DENY,
                principals=[iam.AnyPrincipal()],
                actions=["s3:*"],
                resources=[
                    self.bucket.bucket_arn,
                    f"{self.bucket.bucket_arn}/*",
                ],
                conditions={
                    "Bool": {"aws:SecureTransport": "false"}
                },
            )
        )


class S3CompliantBucketConstruct(Construct):
    """
    Reusable CDK construct for creating compliant S3 buckets
    This can be used across multiple stacks
    """

    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        bucket_name: str,
        encryption_key: kms.IKey,
        logging_bucket: s3.IBucket,
        **kwargs
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        self.bucket = s3.Bucket(
            self,
            "Bucket",
            bucket_name=bucket_name,
            encryption=s3.BucketEncryption.KMS,
            encryption_key=encryption_key,
            bucket_key_enabled=True,
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
            enforce_ssl=True,
            versioned=True,
            server_access_logs_bucket=logging_bucket,
            server_access_logs_prefix=f"s3-logs/{bucket_name}/",
            removal_policy=RemovalPolicy.RETAIN,
        )
