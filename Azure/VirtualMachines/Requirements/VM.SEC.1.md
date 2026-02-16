# VM.SEC.1.Network-Security-Groups-Required: All VM subnets must have Network Security Groups applied

**Severity:** High
**Service:** Azure Virtual Machines
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-1, FedRAMP AC-4, SOC 2 CC6.1

## Description
All deployed subnets hosting virtual machines must have a Network Security Group (NSG) applied with network access controls specific to the application's trusted ports and sources. NSG inbound rules should not allow access from 'Any' or 'Internet' ranges. Management ports must not be accessible from untrusted networks.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-machines-linux-security-baseline#ns-1-establish-network-segmentation-boundaries
