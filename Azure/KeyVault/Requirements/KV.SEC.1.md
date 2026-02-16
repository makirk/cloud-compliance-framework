# KV.SEC.1.Private-Endpoints-Required: Azure Key Vault must use private endpoints for network access

**Severity:** High
**Service:** Azure Key Vault
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-2, FedRAMP SC-7, SOC 2 CC6.1

## Description
Azure Key Vault instances must be configured with Azure Private Link private endpoints to establish a private access point. Private endpoints ensure that traffic between the virtual network and the Key Vault service traverses the Microsoft backbone network, eliminating exposure to the public internet. This reduces the risk of data exfiltration and unauthorized access to cryptographic keys and secrets.

When private endpoints are enabled, clients connect to Key Vault over a private IP address within the virtual network, rather than over the public endpoint.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/key-vault-security-baseline#ns-2-secure-cloud-services-with-network-controls
