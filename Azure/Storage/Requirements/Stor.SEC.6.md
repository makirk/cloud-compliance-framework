# Stor.SEC.6.Soft-Delete-Enabled: Soft delete must be enabled for blobs and containers

**Severity:** Medium
**Service:** Azure Storage
**Applicable Standards:** Microsoft Cloud Security Benchmark BR-1, FedRAMP CP-9, SOC 2 CC7.4

## Description
Soft delete must be enabled for both blobs and containers on all Azure Storage accounts. Blob soft delete protects individual blobs, snapshots, and versions from accidental deletes or overwrites by maintaining the deleted data for a specified retention period. Container soft delete protects a container and its contents from accidental deletion. The retention period should be set to a minimum of 7 days to allow sufficient time for recovery of accidentally deleted data.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/storage-security-baseline#br-1-ensure-regular-automated-backups
