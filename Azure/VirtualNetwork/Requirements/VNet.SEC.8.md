# VNet.SEC.8.Flow-Log-Encryption: NSG flow logs must be encrypted at rest using customer-managed keys

**Severity:** Medium
**Service:** Azure Virtual Network
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-5, FedRAMP SC-28, SOC 2 CC6.1

## Description
NSG flow logs and VNet flow logs stored in Azure Storage accounts must be encrypted at rest. Storage accounts used for flow log retention must be configured with customer-managed keys (CMK) for encryption where required by organizational policy or regulatory requirements.

The storage accounts used for flow log data must also have network access restricted to authorized networks only, and must have soft delete and versioning enabled to protect against data loss.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-network-security-baseline
