# Stor.SEC.3.Private-Endpoints: Private endpoints must be configured for Azure Storage accounts

**Severity:** High
**Service:** Azure Storage
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-2, FedRAMP SC-7, SOC 2 CC6.1

## Description
Azure Private Link must be used to create private endpoints for Azure Storage, enabling resources within a virtual network to access storage over a private IP address. This eliminates exposure of storage data to the public internet and ensures that traffic between the virtual network and storage traverses the Microsoft backbone network. Each storage sub-resource (blob, file, queue, table, dfs) should have its own private endpoint configured.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/storage-security-baseline#ns-2-secure-cloud-services-with-network-controls
