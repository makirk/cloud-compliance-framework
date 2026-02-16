# VNet.OPS.3.Traffic-Analytics: Traffic Analytics must be enabled for all NSG flow logs

**Severity:** Medium
**Service:** Azure Virtual Network
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-6, SOC 2 CC7.2

## Description
Traffic Analytics must be enabled for all NSG flow logs to provide visibility into traffic patterns, identify security threats, and understand network utilization. Traffic Analytics processes NSG flow log data and provides dashboards showing traffic distribution, top talkers, and security insights.

Traffic Analytics should be configured with a processing interval of 10 minutes for near-real-time visibility. The Log Analytics workspace used for Traffic Analytics must be in a supported region and should be centrally managed. Alerts should be configured for anomalous traffic patterns.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-network-security-baseline#lt-4-enable-logging-for-security-investigation
