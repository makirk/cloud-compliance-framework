# Stor.SEC.5.Customer-Managed-Key-Encryption: Customer-managed keys must be used for data at rest encryption where required by compliance

**Severity:** Medium
**Service:** Azure Storage
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-5, FedRAMP SC-12, SOC 2 CC6.1

## Description
For storage accounts containing data subject to regulatory compliance requirements, customer-managed keys (CMK) stored in Azure Key Vault must be used for encryption at rest instead of the default Microsoft-managed keys. This provides full control over the encryption keys, including the ability to rotate, revoke, and audit key usage. The key vault used for CMK storage must have soft delete and purge protection enabled.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/storage-security-baseline#dp-5-use-customer-managed-key-option-in-data-at-rest-encryption-when-required
