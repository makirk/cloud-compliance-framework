# EKS.2: EKS clusters should run on a supported Kubernetes version

**Severity:** High
**Service:** Amazon EKS
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, NIST SP 800-53 Rev. 5, PCI DSS v4.0.1

## Description
This control checks whether an Amazon EKS cluster is running on a supported Kubernetes version. Running unsupported Kubernetes versions means the cluster will not receive security patches and bug fixes, leaving it vulnerable to known security issues.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/eks-controls.html#eks-2
