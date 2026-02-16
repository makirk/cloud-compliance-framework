# Stor.SEC.9.Infrastructure-Encryption: Infrastructure encryption must be enabled for double encryption at rest

**Severity:** Medium
**Service:** Azure Storage
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-4, FedRAMP SC-28, SOC 2 CC6.1

## Description
Infrastructure encryption (also known as double encryption) must be enabled on Azure Storage accounts that store highly sensitive data. When infrastructure encryption is enabled, data is encrypted twice: once at the service level using Microsoft-managed or customer-managed keys, and once at the infrastructure level using a separate Microsoft-managed key and cipher. This provides defense in depth against the scenario where any single encryption algorithm or key might be compromised. Infrastructure encryption must be enabled at storage account creation time and cannot be changed afterward.

Source: https://learn.microsoft.com/en-us/azure/storage/common/infrastructure-encryption-enable
