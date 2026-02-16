# Stor.OPS.2.Lifecycle-Management: Lifecycle management policies must be configured for blob data

**Severity:** Medium
**Service:** Azure Storage
**Applicable Standards:** Microsoft Cloud Security Benchmark AM-2, FedRAMP SI-12, SOC 2 CC7.4

## Description
Lifecycle management policies must be configured on Azure Storage accounts to automatically manage the lifecycle of blob data. Policies should define rules to transition blobs to cooler storage tiers (Cool, Cold, Archive) based on last access or modification time, and to delete blobs after a defined retention period. This reduces storage costs, ensures data retention compliance, and prevents indefinite accumulation of stale data. Policies should be reviewed and updated at least quarterly.

Source: https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview
