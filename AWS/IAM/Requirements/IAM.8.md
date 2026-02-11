# IAM.8: Unused IAM user credentials should be removed

**Severity:** Medium
**Service:** AWS IAM

## Description
This control checks whether IAM users have passwords or active access keys that have not been used for 90 days. The control fails if there are inactive credentials that exceed the specified number of days.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/iam-controls.html#iam-8
