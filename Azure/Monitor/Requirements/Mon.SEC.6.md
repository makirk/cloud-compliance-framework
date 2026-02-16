# Mon.SEC.6.TLS-Encryption-In-Transit: TLS 1.2 or later must be enforced for all Azure Monitor data in transit

**Severity:** High
**Service:** Azure Monitor
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-3, FedRAMP SC-8, SOC 2 CC6.1

## Description
All data sent to Azure Monitor, including Log Analytics data ingestion and Application Insights telemetry, must be encrypted in transit using TLS 1.2 or later. Legacy protocols such as SSL 3.0 and TLS 1.0/1.1 must be disabled. This applies to both agent-based data collection and direct API ingestion endpoints. HTTPS must be enforced on all web applications and services sending telemetry to Azure Monitor.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/monitor-security-baseline#dp-3-encrypt-sensitive-data-in-transit
