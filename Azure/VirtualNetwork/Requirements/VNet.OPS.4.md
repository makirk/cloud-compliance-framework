# VNet.OPS.4.VNet-Peering-Monitoring: Virtual Network peering connections must be monitored and audited

**Severity:** Medium
**Service:** Azure Virtual Network
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP CA-7, SOC 2 CC7.1

## Description
All Virtual Network peering connections must be monitored for status changes and audited for unauthorized modifications. Azure Activity Log alerts should be configured to notify on peering creation, deletion, or modification events.

Peering connections must be reviewed periodically to ensure they align with the approved network architecture. Unused or unauthorized peering connections must be removed. Gateway transit and remote gateway usage settings must be documented and approved. Metrics on peering data transfer should be monitored to detect unusual cross-network traffic volumes.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-network-security-baseline
