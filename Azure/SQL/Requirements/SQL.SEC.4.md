# SQL.SEC.4.TDE-Encryption-Enabled: Transparent Data Encryption must be enabled on all Azure SQL Databases

**Severity:** Critical
**Service:** Azure SQL Database
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-4, FedRAMP SC-28, SOC 2 CC6.1

## Description
Transparent Data Encryption (TDE) must be enabled on all Azure SQL Databases to protect data at rest. TDE performs real-time encryption and decryption of the database, associated backups, and transaction log files at rest without requiring changes to the application. TDE is enabled by default for newly created databases, but must be verified for all existing databases. Organizations with regulatory compliance requirements should consider using customer-managed keys (CMK) via Azure Key Vault for additional control over the TDE protector key.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-sql-security-baseline#dp-4-enable-data-at-rest-encryption-by-default
