# SQL.OPS.3.Diagnostic-Logging: Diagnostic logging must be enabled and sent to a centralized log analytics workspace

**Severity:** Medium
**Service:** Azure SQL Database
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-6, SOC 2 CC7.2

## Description
Azure SQL Database diagnostic settings must be configured to send resource logs and metrics to a Log Analytics workspace for centralized monitoring and analysis. At minimum, the following log categories should be enabled: SQLInsights, AutomaticTuning, QueryStoreRuntimeStatistics, QueryStoreWaitStatistics, Errors, DatabaseWaitStatistics, Timeouts, Blocks, and Deadlocks. Diagnostic data must be retained for a minimum of 90 days. These logs are essential for performance monitoring, troubleshooting, security investigation, and compliance reporting.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-sql-security-baseline#lt-4-enable-logging-for-security-investigation
