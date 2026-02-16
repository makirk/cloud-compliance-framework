# KV.OPS.3.Backup-Recovery: Azure Key Vault keys, secrets, and certificates must have backup and recovery procedures

**Severity:** High
**Service:** Azure Key Vault
**Applicable Standards:** Microsoft Cloud Security Benchmark BR-1, FedRAMP CP-9, SOC 2 CC9.1

## Description
Regular backups of Azure Key Vault keys, secrets, and certificates must be performed using the native Key Vault backup feature. Backup procedures must be documented and tested to ensure recoverability in disaster scenarios. Backups should be stored securely and access to backup data must be restricted.

Note that Azure Key Vault does not support Azure Backup integration. The native backup capability creates an encrypted blob that can only be restored to a Key Vault within the same Azure subscription and geography. Soft delete and purge protection must be enabled as complementary recovery mechanisms.

Backup and restore procedures must be tested periodically to validate recovery time and recovery point objectives.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/key-vault-security-baseline#br-1-ensure-regular-automated-backups
