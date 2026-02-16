# KV.SEC.7.HSM-Backed-Keys: Cryptographic keys requiring high assurance must use HSM-backed protection

**Severity:** Medium
**Service:** Azure Key Vault
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-5, FedRAMP SC-12, SOC 2 CC6.1

## Description
For workloads requiring high-assurance key protection, cryptographic keys must be stored in Hardware Security Module (HSM)-backed key vaults. HSM-protected keys are generated and stored within FIPS 140-2 Level 2 (Key Vault Standard) or FIPS 140-2 Level 3 (Key Vault Premium and Managed HSM) validated hardware security modules, ensuring the key material never leaves the HSM boundary.

Azure Key Vault Premium tier or Azure Key Vault Managed HSM should be used for keys that protect sensitive data, including customer-managed encryption keys (CMK) and signing keys. Software-protected keys are acceptable only for non-critical or development workloads.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/key-vault-security-baseline#dp-5-use-customer-managed-key-option-in-data-at-rest-encryption-when-required
