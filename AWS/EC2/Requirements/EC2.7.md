# EC2.7: EBS default encryption should be enabled

**Severity:** Medium
**Service:** Amazon EC2
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether account-level encryption is enabled by default for Amazon EBS. The control fails if the account level encryption is not enabled. When encryption is enabled for your account, Amazon EBS volumes and snapshot copies are encrypted at rest.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-7
