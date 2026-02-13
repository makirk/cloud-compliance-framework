# EC2.SEC.13.No-SSH-From-Internet: Security groups should not allow ingress from 0.0.0.0/0 to port 22

**Severity:** High
**Service:** Amazon EC2
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether an Amazon EC2 security group allows ingress from 0.0.0.0/0 or ::/0 to port 22. The control fails if the security group allows ingress from 0.0.0.0/0 or ::/0 to port 22.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-13
