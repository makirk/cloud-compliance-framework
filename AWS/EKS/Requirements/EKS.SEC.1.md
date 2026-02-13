# EKS.SEC.1.Private-Endpoints: EKS cluster endpoints should not be publicly accessible

**Severity:** High
**Service:** Amazon EKS
**Applicable Standards:** AWS Foundational Security Best Practices v1.0.0, NIST SP 800-53 Rev. 5, PCI DSS v4.0.1

## Description
This control checks whether an Amazon EKS cluster endpoint is publicly accessible. EKS cluster endpoints should not be exposed to the public internet to prevent unauthorized access. The cluster API server endpoint should be configured to be accessible only from within the VPC or through authorized networks.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/eks-controls.html#eks-1
