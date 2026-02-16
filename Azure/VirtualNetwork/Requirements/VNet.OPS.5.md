# VNet.OPS.5.Diagnostic-Logging: Diagnostic logs must be enabled for all Virtual Network resources

**Severity:** Medium
**Service:** Azure Virtual Network
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-2, SOC 2 CC7.2

## Description
Azure resource logs must be enabled for Virtual Network and associated resources including NSGs, public IP addresses, and Azure Firewall. Diagnostic settings must be configured to send logs to a Log Analytics workspace and optionally to a Storage Account for long-term retention.

Logs must be retained for a minimum of 90 days to support security investigation requirements. Key log categories to enable include VMProtectionAlerts for DDoS-protected resources and AllMetrics for network performance monitoring. Azure Policy should be used to enforce diagnostic settings across all VNet-related resources.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-network-security-baseline#lt-4-enable-logging-for-security-investigation
