# EC2.8: EC2 instances should use IMDSv2

**Severity:** High
**Service:** Amazon EC2

## Description
This control checks whether your Amazon EC2 instance metadata version is configured with Instance Metadata Service Version 2 (IMDSv2). The control passes if HttpTokens is set to required for IMDSv2. The control fails if HttpTokens is set to optional.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-8
