# Stor.SEC.1.Disable-Public-Blob-Access: Public blob access must be disabled on all storage accounts

**Severity:** High
**Service:** Azure Storage
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-2, FedRAMP AC-4, SOC 2 CC6.1

## Description
Public network access to Azure Storage accounts must be disabled or restricted to specific virtual networks and IP addresses. Disabling public blob access ensures that containers and blobs cannot be accessed anonymously from the internet, reducing the risk of data exposure. Storage accounts should have the "Allow Blob public access" setting set to Disabled.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/storage-security-baseline#ns-2-secure-cloud-services-with-network-controls
