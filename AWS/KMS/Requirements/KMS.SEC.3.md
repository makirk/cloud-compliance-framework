# KMS.SEC.3.Prevent-Deletion: AWS KMS keys should not be deleted unintentionally

**Severity:** Critical
**Service:** AWS KMS
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether KMS keys are scheduled for deletion. The control fails if a KMS key is scheduled for deletion. KMS keys cannot be recovered once deleted.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/kms-controls.html#kms-3
