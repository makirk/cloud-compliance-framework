# Func.SEC.6.Key-Vault-Integration: Azure Functions must store secrets and keys in Azure Key Vault

**Severity:** High
**Service:** Azure Functions
**Applicable Standards:** Microsoft Cloud Security Benchmark IM-8, DP-6, FedRAMP SC-12, SOC 2 CC6.1

## Description
Azure Functions must use Azure Key Vault to store and manage all secrets, credentials, certificates, and encryption keys rather than embedding them in code or configuration files. Function app settings should reference Key Vault secrets using Key Vault references. Keys must be generated, distributed, rotated, and revoked following a defined schedule or upon compromise. Customer-managed keys (CMK) should be used for data at rest encryption when required by regulatory compliance. Certificates managed through Key Vault should follow defined standards regarding key size, validity period, and cryptographic algorithms, with automatic rotation configured where supported.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/functions-security-baseline#im-8-restrict-the-exposure-of-credential-and-secrets
