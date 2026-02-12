# EC2.3: Attached EBS volumes should be encrypted at-rest

**Severity:** Medium
**Service:** Amazon EC2
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether the EBS volumes that are in an attached state are encrypted. To pass this control, EBS volumes must be in use and encrypted. If the EBS volume is not attached, it is not subject to this check.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-3
