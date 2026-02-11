# KMS.3: AWS KMS keys should not be deleted unintentionally

**Severity:** Critical
**Service:** AWS KMS

## Description
This control checks whether KMS keys are scheduled for deletion. The control fails if a KMS key is scheduled for deletion. KMS keys cannot be recovered once deleted.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/kms-controls.html#kms-3
