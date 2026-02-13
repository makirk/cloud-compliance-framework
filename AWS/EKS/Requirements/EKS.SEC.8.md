# EKS.SEC.8.Audit-Logging: EKS clusters should have audit logging enabled

**Severity:** Medium
**Service:** Amazon EKS
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, NIST SP 800-53 Rev. 5, PCI DSS v4.0.1

## Description
This control checks whether an Amazon EKS cluster has audit logging enabled. EKS control plane logging provides audit and diagnostic logs directly from the Amazon EKS control plane to CloudWatch Logs. Enabling audit logging helps capture all API requests and cluster activities for security monitoring, compliance auditing, and troubleshooting.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/eks-controls.html#eks-8
