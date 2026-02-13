# KMS.SEC.2.No-Inline-Decrypt-All: IAM principals should not have IAM inline policies that allow decryption actions on all KMS keys

**Severity:** Medium
**Service:** AWS KMS
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether the inline policies embedded in IAM identities (role, user, or group) allow the AWS KMS decryption actions on all KMS keys. The control fails if kms:Decrypt or kms:ReEncryptFrom actions are allowed on all KMS keys.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/kms-controls.html#kms-2
