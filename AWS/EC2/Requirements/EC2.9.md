# EC2.9: EC2 instances should not have a public IPv4 address

**Severity:** High
**Service:** Amazon EC2
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether EC2 instances have a public IP address. The control fails if the publicIp field is present in the EC2 instance configuration item. This control applies to IPv4 addresses only.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-9
