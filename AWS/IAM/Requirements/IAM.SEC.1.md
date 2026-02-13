# IAM.SEC.1.No-Admin-Wildcard: IAM policies should not allow full "*" administrative privileges

**Severity:** High
**Service:** AWS IAM
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether the default version of IAM policies (also known as customer managed policies) has administrator access that includes a statement with "Effect": "Allow" with "Action": "*" over "Resource": "*".

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/iam-controls.html#iam-1
