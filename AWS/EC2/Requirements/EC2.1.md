# EC2.1: EBS snapshots should not be publicly restorable

**Severity:** Critical
**Service:** Amazon EC2

## Description
This control checks whether Amazon Elastic Block Store (EBS) snapshots are not publicly restorable. EBS snapshots should not be publicly restorable by everyone unless you explicitly allow it, to avoid accidental exposure of your company's sensitive data.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-1
