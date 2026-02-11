# Lambda.3: Lambda functions should be in a VPC

**Severity:** Low
**Service:** AWS Lambda

## Description
This control checks whether a Lambda function is deployed within a VPC. The control fails if the Lambda function is not deployed in a VPC. This control does not evaluate VPC subnet routing configuration to determine public reachability.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/lambda-controls.html#lambda-3
