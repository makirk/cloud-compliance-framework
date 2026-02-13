# Lambda.SEC.5.Multi-AZ: VPC Lambda functions should operate in multiple Availability Zones

**Severity:** Medium
**Service:** AWS Lambda
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether a VPC-connected Lambda function operates in multiple Availability Zones. The control fails if the function is connected to only one Availability Zone.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/lambda-controls.html#lambda-5
