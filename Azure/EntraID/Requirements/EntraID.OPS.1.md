# EntraID.OPS.1.Sign-In-Log-Monitoring: Sign-in logs must be continuously monitored for anomalies and security threats

**Severity:** High
**Service:** Azure Entra ID
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-1, LT-2, FedRAMP AU-6, SOC 2 CC7.2

## Description
Entra ID sign-in logs must be integrated with Microsoft Sentinel or an equivalent SIEM solution for continuous monitoring and threat detection. Analytics rules must be configured to detect and alert on anomalous sign-in activity, including excessive failed login attempts, sign-ins from unfamiliar locations, impossible travel scenarios, sign-ins from deprecated accounts, and sign-ins from known malicious IP addresses. Risky sign-in reports from Entra ID Identity Protection must be reviewed on a regular schedule. Alerts must be triaged and investigated within defined SLA timeframes. Dashboards and workbooks should provide operational visibility into authentication patterns and trends.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-logging-threat-detection#lt-2-enable-threat-detection-for-identity-and-access-management
