# Stor.OPS.4.Monitoring-Alerts: Monitoring alerts must be configured for storage account health and security events

**Severity:** High
**Service:** Azure Storage
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-1, FedRAMP SI-4, SOC 2 CC7.2

## Description
Azure Monitor alerts must be configured for Azure Storage accounts to detect and notify on critical operational and security events. At a minimum, alerts should be configured for: storage account availability drops below threshold, elevated anonymous access attempts, unusual data egress volumes, authorization failures exceeding threshold, and storage capacity approaching limits. Microsoft Defender for Storage should be enabled to provide advanced threat detection capabilities including detection of anomalous access patterns, suspicious data exfiltration, and potential malware uploads.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/storage-security-baseline#lt-1-enable-threat-detection-capabilities
