# IAM.SEC.4.No-Root-Access-Keys: IAM root user access key should not exist

**Severity:** Critical
**Service:** AWS IAM
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether the root user access key is available. The root account is the most privileged user in an AWS account. AWS access keys provide programmatic access to a given account. The control fails if the root user has access keys configured.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/iam-controls.html#iam-4
