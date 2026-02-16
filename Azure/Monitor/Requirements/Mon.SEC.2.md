# Mon.SEC.2.Customer-Managed-Key-Encryption: Customer-managed keys must be used for log data encryption at rest in dedicated clusters

**Severity:** High
**Service:** Azure Monitor
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-5, FedRAMP SC-28, SOC 2 CC6.1

## Description
For regulatory compliance scenarios, Azure Monitor Log Analytics dedicated clusters must be configured with customer-managed keys (CMK) for data at rest encryption. By default, Azure Monitor encrypts data at rest using Microsoft-managed keys. Customer-managed keys stored in Azure Key Vault provide additional control over the encryption lifecycle, including key rotation and revocation. Customer Lockbox is also available only for dedicated clusters configured with CMK.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/monitor-security-baseline#dp-5-use-customer-managed-key-option-in-data-at-rest-encryption-when-required
