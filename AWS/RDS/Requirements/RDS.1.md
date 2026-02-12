# RDS.1: RDS snapshot should be private

**Severity:** Critical
**Service:** Amazon RDS
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether Amazon RDS snapshots are public. The control fails if RDS snapshots are public. RDS snapshots are used to back up the data on your RDS instances at a specific point in time and can be used to restore previous states.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/rds-controls.html#rds-1
