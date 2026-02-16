# VM.SEC.2.Disk-Encryption-Enabled: VMs should enable Azure Disk Encryption or EncryptionAtHost

**Severity:** High
**Service:** Azure Virtual Machines
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-4, FedRAMP SC-28, SOC 2 CC6.1

## Description
Virtual machines should encrypt temp disks, caches, and data flows between compute and storage resources. All managed disks, snapshots, images, and data written to existing managed disks must be encrypted at rest. Use Azure Disk Encryption or EncryptionAtHost to ensure all data including temp disks and data caches are encrypted.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-machines-linux-security-baseline#dp-4-enable-data-at-rest-encryption-by-default
