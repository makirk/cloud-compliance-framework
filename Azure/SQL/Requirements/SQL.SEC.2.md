# SQL.SEC.2.Firewall-Rules-Configured: Azure SQL Database server-level firewall rules must restrict access to authorized IP ranges only

**Severity:** High
**Service:** Azure SQL Database
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-1, FedRAMP AC-4, SOC 2 CC6.1

## Description
Azure SQL Database server-level firewall rules must be configured to restrict access to only known and authorized IP address ranges. The "Allow Azure services and resources to access this server" setting should be disabled unless explicitly required and documented. Virtual network rules using service endpoints should be used to further restrict access to specific subnets. All firewall rules must be reviewed periodically and any rules permitting broad access (e.g., 0.0.0.0 - 255.255.255.255) are strictly prohibited.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-sql-security-baseline#ns-1-establish-network-segmentation-boundaries
