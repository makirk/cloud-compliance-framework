# EC2.18: Security groups should only allow unrestricted incoming traffic for authorized ports

**Severity:** High
**Service:** Amazon EC2

## Description
This control checks whether the security groups in use allow unrestricted incoming traffic. The control uses the parameter authorizedTcpPorts to determine which ports should be allowed unrestricted access. If no parameters are provided, the control fails if there are any unrestricted inbound traffic rules.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-18
