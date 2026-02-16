# Mon.OPS.1.Log-Retention-Policies: Log retention policies must be configured on all Log Analytics workspaces

**Severity:** High
**Service:** Azure Monitor
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-11, SOC 2 CC7.2

## Description
All Log Analytics workspaces must have retention policies configured to meet organizational and regulatory requirements. Default retention should be set to a minimum of 90 days, with archive policies configured for long-term storage of up to 12 years when required by compliance frameworks. Table-level retention settings should be used for data types with different retention requirements. Retention costs and storage tiers should be reviewed periodically.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/monitor-security-baseline#lt-4-enable-logging-for-security-investigation
