# Mon.OPS.5.Data-Collection-Rules: Data Collection Rules must be used for all agent-based log collection

**Severity:** Medium
**Service:** Azure Monitor
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-3, SOC 2 CC7.1

## Description
Data Collection Rules (DCRs) must be used with Azure Monitor Agent to define what data is collected from virtual machines and other compute resources. DCRs provide centralized, declarative configuration for data collection, enabling filtering and transformation of log data before ingestion. All legacy agents (Log Analytics Agent / MMA) must be migrated to Azure Monitor Agent with DCR-based configuration. DCRs should be scoped appropriately using Data Collection Rule Associations (DCRAs) and reviewed for correctness periodically.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/monitor-security-baseline#lt-4-enable-logging-for-security-investigation
