# VNet.SEC.1.NSG-On-All-Subnets: All subnets must have a Network Security Group associated

**Severity:** High
**Service:** Azure Virtual Network
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-1, FedRAMP AC-4, SOC 2 CC6.1

## Description
Every subnet within an Azure Virtual Network must have a Network Security Group (NSG) associated to control inbound and outbound traffic. NSGs contain Access Control List (ACL) rules that allow or deny network traffic to the subnet, providing a fundamental layer of network segmentation and traffic filtering.

Azure Policy built-in definition "Subnets should be associated with a Network Security Group" (policy ID: e71308d3-144b-4262-b144-efdc3cc90517) should be enforced to audit and remediate non-compliant subnets.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-network-security-baseline#ns-1-establish-network-segmentation-boundaries
