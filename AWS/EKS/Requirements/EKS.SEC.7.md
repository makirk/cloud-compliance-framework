# EKS.SEC.7.IDP-Tags: EKS identity provider configurations should be tagged

**Severity:** Low
**Service:** Amazon EKS
**Applicable Standards:** AWS Resource Tagging Standard

## Description
This control checks whether an Amazon EKS identity provider configuration has tags with the specific keys defined in the parameter requiredTagKeys. The control fails if the identity provider configuration doesn't have any tag keys or if it doesn't have all the keys specified in the parameter. Proper tagging of identity provider configurations ensures consistent resource management and access control.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/eks-controls.html#eks-7
