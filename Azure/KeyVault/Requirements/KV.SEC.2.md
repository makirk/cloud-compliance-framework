# KV.SEC.2.Firewall-Rules-Enabled: Azure Key Vault must have firewall rules enabled to restrict network access

**Severity:** High
**Service:** Azure Key Vault
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-2, FedRAMP SC-7, SOC 2 CC6.1

## Description
Azure Key Vault firewall must be enabled so that the key vault is not accessible by default from any public IP address. Specific IP ranges and virtual network subnets should be explicitly configured to limit access to only authorized networks. The default action should be set to "Deny" to block all traffic that does not match a configured network rule.

Disabling public network access entirely is recommended when private endpoints are in use. If public access is required, firewall IP filtering rules must be configured to restrict access to known IP ranges.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/key-vault-security-baseline#ns-2-secure-cloud-services-with-network-controls
