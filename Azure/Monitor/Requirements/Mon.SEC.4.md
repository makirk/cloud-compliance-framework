# Mon.SEC.4.Data-Export-Restrictions: Log Analytics data export must be restricted and controlled

**Severity:** Medium
**Service:** Azure Monitor
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-2, FedRAMP AC-4, SOC 2 CC6.7

## Description
Data export from Log Analytics workspaces must be restricted to authorized destinations only. Export rules should be configured to send data only to approved Azure resources such as Storage Accounts, Event Hubs, or other Log Analytics workspaces within the same tenant. Public network access for data export should be disabled when Private Link is in use. Continuous data export should be monitored and audited to prevent unauthorized data movement.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/monitor-security-baseline#dp-2-monitor-anomalies-and-threats-targeting-sensitive-data
