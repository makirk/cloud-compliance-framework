# KV.SEC.3.RBAC-Access-Model: Azure Key Vault must use Azure RBAC for data plane access control

**Severity:** High
**Service:** Azure Key Vault
**Applicable Standards:** Microsoft Cloud Security Benchmark PA-7, FedRAMP AC-6, SOC 2 CC6.3

## Description
Azure Key Vault must use Azure Role-Based Access Control (RBAC) as the permission model for data plane access instead of vault access policies. Azure RBAC provides fine-grained access management through built-in roles such as Key Vault Secrets Officer, Key Vault Crypto Officer, and Key Vault Reader. This follows the principle of least privilege by allowing precise assignment of permissions to users, groups, service principals, and managed identities at various scopes.

Vault access policies should be migrated to Azure RBAC to benefit from centralized access management, conditional access integration, and audit capabilities.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/key-vault-security-baseline#pa-7-follow-just-enough-administration-least-privilege-principle
