# IAM.3: IAM users' access keys should be rotated every 90 days or less

**Severity:** Medium
**Service:** AWS IAM

## Description
This control checks whether the active access keys are rotated within 90 days. It checks the date when the access key was last rotated. If an access key has not been rotated within the specified period, the control fails.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/iam-controls.html#iam-3
