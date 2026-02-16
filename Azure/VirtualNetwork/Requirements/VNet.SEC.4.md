# VNet.SEC.4.Network-Segmentation: Virtual Networks must implement proper network segmentation

**Severity:** High
**Service:** Azure Virtual Network
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-1, FedRAMP SC-7, SOC 2 CC6.1

## Description
Virtual Networks must be segmented into subnets based on workload function, sensitivity level, and security zone. Each subnet should have appropriate NSG rules that restrict traffic to only what is required for the workload to function.

Network segmentation must separate at minimum: web-facing tiers, application tiers, data tiers, and management subnets. Inter-subnet traffic must be explicitly allowed through NSG rules following the principle of least privilege. Default deny-all rules should be applied, with specific allow rules added as needed.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-network-security-baseline#ns-1-establish-network-segmentation-boundaries
