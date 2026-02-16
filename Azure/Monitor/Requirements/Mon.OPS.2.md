# Mon.OPS.2.Activity-Log-Collection: Azure Activity Logs must be collected in a centralized Log Analytics workspace

**Severity:** High
**Service:** Azure Monitor
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-3, SOC 2 CC7.2

## Description
Azure Activity Logs from all subscriptions must be forwarded to a centralized Log Analytics workspace using diagnostic settings. Activity logs provide audit-level visibility into operations performed on resources at the control plane, including resource creation, modification, and deletion events. A diagnostic setting must be configured at the subscription level to route activity log data for security investigation and compliance reporting.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/monitor-security-baseline#lt-4-enable-logging-for-security-investigation
