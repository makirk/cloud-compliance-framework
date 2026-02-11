# IAM.1: IAM policies should not allow full "*" administrative privileges

**Severity:** High
**Service:** AWS IAM

## Description
This control checks whether the default version of IAM policies (also known as customer managed policies) has administrator access that includes a statement with "Effect": "Allow" with "Action": "*" over "Resource": "*".

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/iam-controls.html#iam-1
