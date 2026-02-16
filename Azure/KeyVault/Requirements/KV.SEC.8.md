# KV.SEC.8.Network-Restrictions: Azure Key Vault must restrict access to authorized networks only

**Severity:** High
**Service:** Azure Key Vault
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-1, FedRAMP AC-4, SOC 2 CC6.1

## Description
Azure Key Vault must be deployed with network segmentation controls to restrict access to authorized virtual networks and subnets only. Virtual network service endpoints and private endpoints must be used to limit network-level access. The default network rule must deny access from all networks unless explicitly allowed.

Network security groups (NSGs) should be applied to subnets hosting resources that access Key Vault to restrict traffic by port, protocol, and source IP address. Trusted Azure services bypass rules should be evaluated and enabled only when required by the architecture.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/key-vault-security-baseline#ns-1-establish-network-segmentation-boundaries
