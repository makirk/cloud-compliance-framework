# CloudWatch.15: CloudWatch alarms should have an action configured

**Severity:** High
**Service:** Amazon CloudWatch
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether a CloudWatch alarm has at least one action configured. The control fails if the alarm does not have an action configured for ALARM, INSUFFICIENT_DATA, or OK states.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-15
