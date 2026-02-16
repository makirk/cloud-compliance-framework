# KV.SEC.5.Purge-Protection-Enabled: Azure Key Vault must have purge protection enabled

**Severity:** Critical
**Service:** Azure Key Vault
**Applicable Standards:** Microsoft Cloud Security Benchmark BR-1, FedRAMP CP-9, SOC 2 CC9.1

## Description
Purge protection must be enabled on all Azure Key Vault instances to prevent permanent deletion of vaults, keys, secrets, and certificates during the soft-delete retention period. When purge protection is enabled, no user or principal, including the subscription administrator, can purge a deleted vault or its objects before the retention period expires.

This provides an additional layer of defense against insider threats and accidental permanent deletion of critical cryptographic material. Purge protection works in conjunction with soft delete and cannot be enabled without soft delete being active.

Source: https://learn.microsoft.com/en-us/azure/key-vault/general/soft-delete-overview#purge-protection
