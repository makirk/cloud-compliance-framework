# SQL.OPS.2.Geo-Redundant-Backups: Geo-redundant backup storage must be configured for Azure SQL Databases

**Severity:** Medium
**Service:** Azure SQL Database
**Applicable Standards:** Microsoft Cloud Security Benchmark BR-1, FedRAMP CP-6, SOC 2 A1.2

## Description
Azure SQL Database backup storage redundancy must be configured to use geo-redundant storage (GRS) or read-access geo-redundant storage (RA-GRS) to ensure backups are replicated to a secondary region. This protects against data loss in the event of a regional outage or disaster. The backup storage redundancy option is selected at database creation time and can be configured for the long-term retention policy. For business-critical workloads, geo-redundant backups combined with active geo-replication or failover groups provide comprehensive disaster recovery capabilities.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-sql-security-baseline#br-1-ensure-regular-automated-backups
