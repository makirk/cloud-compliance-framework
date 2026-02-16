# Stor.OPS.3.Blob-Versioning: Blob versioning must be enabled to maintain previous versions of data

**Severity:** Medium
**Service:** Azure Storage
**Applicable Standards:** Microsoft Cloud Security Benchmark BR-1, FedRAMP CP-9, SOC 2 CC7.4

## Description
Blob versioning must be enabled on Azure Storage accounts to automatically maintain previous versions of blobs when they are modified or deleted. Versioning provides a recovery mechanism for accidental overwrites and deletions without relying on external backup solutions. When combined with soft delete and lifecycle management policies, versioning provides a comprehensive data protection strategy. Old versions should be managed through lifecycle policies to control storage costs.

Source: https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview
