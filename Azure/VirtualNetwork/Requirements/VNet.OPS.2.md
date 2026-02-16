# VNet.OPS.2.Network-Watcher-Enabled: Azure Network Watcher must be enabled in all regions with deployed Virtual Networks

**Severity:** High
**Service:** Azure Virtual Network
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-6, SOC 2 CC7.2

## Description
Azure Network Watcher must be enabled in every Azure region where Virtual Networks are deployed. Network Watcher provides network monitoring, diagnostic, and analytics capabilities essential for maintaining visibility into the network infrastructure.

Network Watcher enables capabilities including NSG flow logs, connection troubleshooting, packet capture, VPN diagnostics, and network topology visualization. Azure Policy "Network Watcher should be enabled" should be enforced to ensure Network Watcher is provisioned in all active regions.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-network-security-baseline#lt-4-enable-logging-for-security-investigation
