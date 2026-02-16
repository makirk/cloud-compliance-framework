# Mon.OPS.3.Alert-Rules: Alert rules must be configured for critical resource and security events

**Severity:** High
**Service:** Azure Monitor
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-1, FedRAMP SI-4, SOC 2 CC7.2

## Description
Azure Monitor alert rules must be configured to detect and notify on critical operational and security events. This includes metric alerts for resource health, log search alerts for security-relevant log patterns, and activity log alerts for administrative operations. Action groups must be configured with appropriate notification channels (email, SMS, webhook) and automated response actions. Alert rules should be reviewed periodically to ensure coverage of all critical scenarios.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/monitor-security-baseline#lt-1-enable-threat-detection-capabilities
