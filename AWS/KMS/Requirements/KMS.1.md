# KMS.1: IAM customer managed policies should not allow decryption actions on all KMS keys

**Severity:** Medium
**Service:** AWS KMS

## Description
This control checks whether the default version of IAM customer managed policies allows principals to use the AWS KMS decryption actions on all resources. The control fails if kms:Decrypt or kms:ReEncryptFrom actions are allowed on all KMS keys.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/kms-controls.html#kms-1
