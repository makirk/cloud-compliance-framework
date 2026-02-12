# EC2.2: VPC default security groups should not allow inbound or outbound traffic

**Severity:** High
**Service:** Amazon EC2
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether the default security group of a VPC allows inbound or outbound traffic. The control fails if the security group allows inbound or outbound traffic. The rules for the default security group allow all outbound and inbound traffic from network interfaces (and their associated instances) that are assigned to the same security group.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-2
