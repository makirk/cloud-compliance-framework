# VPC.SEC.21.NACL-No-SSH-RDP-Internet: Network ACLs should not allow ingress from 0.0.0.0/0 to port 22 or port 3389

**Severity:** Medium
**Service:** Amazon VPC
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, CIS AWS Foundations Benchmark v1.2.0

## Description
This control checks whether a network access control list (NACL) allows unrestricted access to the default ports for SSH/RDP ingress traffic. The control fails if a NACL inbound entry allows a source CIDR block of 0.0.0.0/0 or ::/0 for ports 22 or 3389.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-21
