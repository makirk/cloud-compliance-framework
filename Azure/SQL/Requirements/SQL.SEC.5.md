# SQL.SEC.5.Auditing-Enabled: SQL Server auditing must be enabled to track database activities

**Severity:** High
**Service:** Azure SQL Database
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-3, FedRAMP AU-3, SOC 2 CC7.2

## Description
Auditing must be enabled at the SQL server level to track database activities across all databases on the server. Audit logs must be saved to a storage account, Log Analytics workspace, or Event Hub for retention and analysis. Auditing tracks database events including failed and successful logins, schema changes, data access, and data modifications. Enable auditing at the server level so it filters down to all databases. Audit log retention must meet organizational and regulatory requirements, with a minimum of 90 days recommended.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-sql-security-baseline#lt-3-enable-logging-for-security-investigation
