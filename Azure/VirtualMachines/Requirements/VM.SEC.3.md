# VM.SEC.3.Customer-Managed-Key-Encryption: Use customer-managed keys for disk encryption when required

**Severity:** Medium
**Service:** Azure Virtual Machines
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-5, FedRAMP SC-12, SOC 2 CC6.1

## Description
When required for regulatory compliance, virtual machine disk encryption should use customer-managed keys (CMK) stored in Azure Key Vault. Server-side encryption with customer-managed keys improves on Azure Disk Encryption by enabling the use of any OS types and images by encrypting data in the Storage service.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-machines-linux-security-baseline#dp-5-use-customer-managed-key-option-in-data-at-rest-encryption-when-required
