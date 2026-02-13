# IAM.SEC.3.Rotate-Access-Keys: IAM users' access keys should be rotated every 90 days or less

**Severity:** Medium
**Service:** AWS IAM
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether the active access keys are rotated within 90 days. It checks the date when the access key was last rotated. If an access key has not been rotated within the specified period, the control fails.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/iam-controls.html#iam-3
