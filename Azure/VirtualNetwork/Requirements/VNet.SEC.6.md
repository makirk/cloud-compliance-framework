# VNet.SEC.6.Service-Endpoints-And-Private-Link: Service Endpoints or Private Link must be used for Azure PaaS service access

**Severity:** High
**Service:** Azure Virtual Network
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-2, FedRAMP SC-7, SOC 2 CC6.6

## Description
Access to Azure PaaS services (such as Azure Storage, Azure SQL Database, Azure Key Vault) from within a Virtual Network must use Private Endpoints or Virtual Network Service Endpoints. Private Endpoints are preferred as they provide a private IP address within the VNet for the service, eliminating exposure to the public internet.

Service Endpoints may be used where Private Endpoints are not yet supported, but should be combined with service endpoint policies to restrict access to specific service instances. All PaaS services must disable public network access when Private Endpoints are configured.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-network-security-baseline
