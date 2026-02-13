# EC2.SEC.19.No-High-Risk-Ports: Security groups should not allow unrestricted access to ports with high risk

**Severity:** Critical
**Service:** Amazon EC2
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether unrestricted incoming traffic for the security groups is accessible to the specified ports that have the highest risk. This control passes when none of the rules in a security group allow ingress traffic from 0.0.0.0/0 for high risk ports.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-19
