# KV.OPS.1.Diagnostic-Logging: Azure Key Vault must have diagnostic logging enabled

**Severity:** High
**Service:** Azure Key Vault
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-2, SOC 2 CC7.2

## Description
Diagnostic logging must be enabled on all Azure Key Vault instances and resource logs must be sent to a centralized log analytics workspace or storage account. Resource logs capture key operations such as key creation, retrieval, deletion, and access policy changes. These logs are essential for security investigation, compliance auditing, and incident response.

Microsoft Defender for Key Vault should also be enabled to provide threat detection capabilities, alerting on unusual and potentially harmful access patterns or exploitation attempts against Key Vault.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/key-vault-security-baseline#lt-4-enable-logging-for-security-investigation
