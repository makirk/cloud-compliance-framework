# SQL.OPS.1.Long-Term-Backup-Retention: Long-term backup retention must be configured for Azure SQL Databases

**Severity:** Medium
**Service:** Azure SQL Database
**Applicable Standards:** Microsoft Cloud Security Benchmark BR-1, FedRAMP CP-9, SOC 2 A1.2

## Description
Long-term backup retention (LTR) must be configured on Azure SQL Databases to retain full database backups beyond the default short-term retention period (7-35 days). LTR policies must be set to retain weekly, monthly, and yearly backups according to organizational data retention and regulatory compliance requirements. LTR backups are stored in Azure Blob storage with geo-redundant storage (RA-GRS) to protect against regional outages. Retention periods must align with data classification and applicable regulatory requirements.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-sql-security-baseline#br-1-ensure-regular-automated-backups
