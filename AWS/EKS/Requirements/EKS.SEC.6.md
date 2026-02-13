# EKS.SEC.6.Cluster-Tags: EKS clusters should be tagged

**Severity:** Low
**Service:** Amazon EKS
**Applicable Standards:** AWS Resource Tagging Standard

## Description
This control checks whether an Amazon EKS cluster has tags with the specific keys defined in the parameter requiredTagKeys. The control fails if the cluster doesn't have any tag keys or if it doesn't have all the keys specified in the parameter. Tags help you identify and organize your AWS resources for cost allocation, management, and access control purposes.

Source: https://docs.aws.amazon.com/securityhub/latest/userguide/eks-controls.html#eks-6
