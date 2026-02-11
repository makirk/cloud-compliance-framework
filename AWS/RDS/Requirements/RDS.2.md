# RDS.2: RDS DB instances should prohibit public access

**Severity:** Critical
**Service:** Amazon RDS

## Description
This control checks whether RDS instances are publicly accessible by evaluating the publiclyAccessible field in the instance configuration item. The control fails if publiclyAccessible is set to true.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/rds-controls.html#rds-2
