# SQL.SEC.9.Disable-Public-Access: Public network access must be disabled for Azure SQL Database

**Severity:** Critical
**Service:** Azure SQL Database
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-2, FedRAMP AC-4, SOC 2 CC6.1

## Description
Public network access must be disabled on Azure SQL Database servers. When public network access is set to "Deny", only connections through private endpoints are allowed. This ensures that the database is not reachable from the public internet and all connectivity is routed through private network paths. Combined with Private Link endpoints, this provides the strongest network isolation posture. Any exception to this requirement must be documented, approved, and compensated with strict firewall rules.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-sql-security-baseline#ns-2-secure-cloud-services-with-network-controls
