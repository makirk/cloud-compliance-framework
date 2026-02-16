# Stor.OPS.1.Diagnostic-Logging: Diagnostic logging must be enabled for all storage services

**Severity:** High
**Service:** Azure Storage
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-2, SOC 2 CC7.1

## Description
Azure Storage diagnostic logging must be enabled for all sub-services (blob, file, queue, table) and sent to a Log Analytics workspace or storage account for retention. Resource logs capture detailed information about read, write, and delete operations, including authentication method used, client IP address, and request status. These logs are essential for security investigation, compliance auditing, and operational troubleshooting. Logs must be retained for a minimum of 90 days.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/storage-security-baseline#lt-4-enable-logging-for-security-investigation
