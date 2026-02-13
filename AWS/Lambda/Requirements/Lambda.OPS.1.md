# Lambda.OPS.1.Reserved-Concurrency: Lambda functions should use reserved concurrency for critical workloads

**Severity:** High
**Service:** AWS Lambda
**Applicable Standards:** AWS Operational Best Practices, AWS Well-Architected Framework

## Description
This operational control checks whether critical Lambda functions have reserved concurrency configured. Reserved concurrency ensures that a specified number of concurrent executions are always available for a function, preventing throttling during peak loads and ensuring predictable performance for business-critical applications. This is particularly important for functions that handle time-sensitive operations or serve production traffic.

Source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html
