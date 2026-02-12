# RDS.2: RDS DB instances should prohibit public access

**Severity:** Critical
**Service:** Amazon RDS
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether RDS instances are publicly accessible by evaluating the publiclyAccessible field in the instance configuration item. The control fails if publiclyAccessible is set to true.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/rds-controls.html#rds-2
