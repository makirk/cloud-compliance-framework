# Stor.SEC.4.Network-Firewall-Rules: Network firewall rules must be configured to deny access by default

**Severity:** High
**Service:** Azure Storage
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-2, FedRAMP AC-4, SOC 2 CC6.6

## Description
The default network access rule for Azure Storage accounts must be set to "Deny" rather than "Allow". Network rules should explicitly grant access only to traffic from specific virtual networks, subnets, or IP address ranges. Configuring firewall rules ensures that only authorized network locations can reach the storage account, reducing the attack surface and preventing unauthorized access to stored data.

Source: https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security?tabs=azure-portal#change-the-default-network-access-rule
