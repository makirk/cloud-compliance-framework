# IAM.6: Hardware MFA should be enabled for the root user

**Severity:** Critical
**Service:** AWS IAM
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether your AWS account is enabled to use a hardware MFA device to sign in with root user credentials. The control fails if MFA is not enabled or if virtual MFA devices are permitted to sign in with root user credentials.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/iam-controls.html#iam-6
