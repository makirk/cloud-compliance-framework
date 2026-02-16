# SQL.OPS.4.Auto-Tuning: Automatic tuning should be enabled for Azure SQL Databases

**Severity:** Low
**Service:** Azure SQL Database
**Applicable Standards:** Microsoft Cloud Security Benchmark AM-2, FedRAMP SI-2, SOC 2 CC7.1

## Description
Automatic tuning should be enabled on Azure SQL Databases to continuously monitor and optimize database performance. Azure SQL Database automatic tuning provides three key capabilities: automatic plan correction (FORCE_PLAN), automatic index management (CREATE_INDEX and DROP_INDEX). When enabled, auto-tuning identifies performance regressions caused by query plan changes and automatically applies the last known good plan. It also identifies missing indexes that may improve performance and removes redundant indexes. Tuning recommendations and actions should be monitored and reviewed regularly to ensure expected performance improvements.

Source: https://learn.microsoft.com/en-us/azure/azure-sql/database/automatic-tuning-overview
