# KMS.SEC.5.No-Public-Keys: KMS keys should not be publicly accessible

**Severity:** Critical
**Service:** AWS KMS
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether the key policy for a KMS key allows public access. The control fails if the key policy allows access to principals outside of your AWS account.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/kms-controls.html#kms-5
