# Mon.OPS.4.Diagnostic-Settings: Diagnostic settings must be enabled for all Azure resources

**Severity:** High
**Service:** Azure Monitor
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-2, SOC 2 CC7.1

## Description
Diagnostic settings must be configured on all Azure resources to send platform logs and metrics to a Log Analytics workspace. Resource logs provide detailed diagnostic and auditing information for operations performed within each resource. An Azure Policy should be deployed to enforce diagnostic settings at scale, ensuring new resources automatically forward logs to the centralized monitoring infrastructure. All log categories relevant to security and operations should be enabled.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/monitor-security-baseline#lt-4-enable-logging-for-security-investigation
