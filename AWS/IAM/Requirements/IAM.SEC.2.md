# IAM.SEC.2.No-User-Policies: IAM users should not have IAM policies attached

**Severity:** Low
**Service:** AWS IAM
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether any IAM users have policies attached. Instead, IAM users must inherit permissions from IAM groups or roles.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/iam-controls.html#iam-2
