# KV.SEC.6.Key-Rotation-Policy: Azure Key Vault keys must have a rotation policy configured

**Severity:** High
**Service:** Azure Key Vault
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-6, FedRAMP SC-12, SOC 2 CC6.1

## Description
All cryptographic keys stored in Azure Key Vault must have an automated rotation policy configured. Key rotation limits the window of exposure if a key is compromised and ensures compliance with organizational and regulatory requirements for cryptographic key lifecycle management.

The rotation policy should define the rotation interval, expiration time, and notification settings. Azure Key Vault supports automatic key rotation, which generates a new key version at a defined schedule. Applications using Key Vault key references (without version pinning) will automatically use the latest key version after rotation.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/key-vault-security-baseline#dp-6-use-a-secure-key-management-process
