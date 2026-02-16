# VNet.SEC.3.Firewall-Or-NVA-Required: Azure Firewall or Network Virtual Appliance must be deployed for centralized traffic inspection

**Severity:** Critical
**Service:** Azure Virtual Network
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-4, FedRAMP AC-4, SOC 2 CC6.6

## Description
All Virtual Networks must route traffic through Azure Firewall or an approved Network Virtual Appliance (NVA) for centralized traffic inspection and filtering. User-Defined Routes (UDRs) must be configured to direct traffic to the firewall or NVA, especially for internet-bound traffic and cross-VNet traffic.

Azure Firewall Premium or an equivalent NVA with TLS inspection capabilities should be used for workloads handling sensitive data. Centralized firewall management enables consistent enforcement of network security policies across the environment.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-network-security-baseline
