# KV.OPS.2.Key-Expiration-Monitoring: Azure Key Vault keys and secrets must have expiration dates set and monitored

**Severity:** High
**Service:** Azure Key Vault
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-6, FedRAMP SC-12, SOC 2 CC6.1

## Description
All cryptographic keys and secrets stored in Azure Key Vault must have a defined expiration date. Keys and secrets that are valid indefinitely provide an attacker with an unlimited window to compromise the material. Expiration dates must be set according to organizational cryptographic policy.

Azure Policy should be used to audit and enforce that keys and secrets have expiration dates configured. Azure Monitor alerts or Event Grid notifications must be configured to notify operations teams before keys and secrets approach their expiration date, allowing timely rotation or renewal.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/key-vault-security-baseline#dp-6-use-a-secure-key-management-process
