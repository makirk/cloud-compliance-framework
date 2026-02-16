# Mon.SEC.1.Private-Link-Log-Analytics: Azure Monitor Private Link Scope must be used to connect networks to Log Analytics workspaces

**Severity:** High
**Service:** Azure Monitor
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-2, FedRAMP SC-7, SOC 2 CC6.1

## Description
Azure Monitor Private Link Scope (AMPLS) must be configured to connect private endpoints to Log Analytics workspaces. This ensures that log data is accessed only through authorized private networks, preventing data exfiltration over public endpoints. Public network access should be disabled on Log Analytics workspaces once Private Link is configured. AMPLS defines the boundaries of the monitoring network by linking a private endpoint to a set of Azure Monitor resources.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/monitor-security-baseline#ns-2-secure-cloud-services-with-network-controls
