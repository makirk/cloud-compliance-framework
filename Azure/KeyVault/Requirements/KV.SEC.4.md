# KV.SEC.4.Soft-Delete-Enabled: Azure Key Vault must have soft delete enabled

**Severity:** Critical
**Service:** Azure Key Vault
**Applicable Standards:** Microsoft Cloud Security Benchmark BR-1, FedRAMP CP-9, SOC 2 CC9.1

## Description
Soft delete must be enabled on all Azure Key Vault instances to allow recovery of deleted vaults, keys, secrets, and certificates. When soft delete is enabled, resources marked as deleted are retained for a configurable retention period (default 90 days), during which they can be recovered. This protects against accidental or malicious deletion of critical cryptographic material.

As of February 2025, soft delete is enabled by default on all new key vaults and cannot be disabled. Existing vaults must be verified to ensure soft delete is active.

Source: https://learn.microsoft.com/en-us/azure/key-vault/general/soft-delete-overview
