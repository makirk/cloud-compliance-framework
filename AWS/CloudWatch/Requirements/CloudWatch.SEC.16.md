# CloudWatch.SEC.16.Log-Retention-1-Year: CloudWatch log groups should be retained for at least 1 year

**Severity:** Medium
**Service:** Amazon CloudWatch
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether a CloudWatch log group has a retention period of at least 365 days. The control fails if the retention period is less than 365 days.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-16
