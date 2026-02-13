# EKS.SEC.3.Encrypted-Secrets: EKS clusters should use encrypted Kubernetes secrets

**Severity:** Medium
**Service:** Amazon EKS
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, NIST SP 800-53 Rev. 5, PCI DSS v4.0.1

## Description
This control checks whether an Amazon EKS cluster uses encrypted Kubernetes secrets. Kubernetes secrets should be encrypted at rest using AWS KMS envelope encryption to protect sensitive configuration data such as credentials, tokens, and API keys stored in the cluster.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/eks-controls.html#eks-3
