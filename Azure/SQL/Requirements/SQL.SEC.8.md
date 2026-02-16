# SQL.SEC.8.Minimum-TLS-Version: Azure SQL Database must enforce TLS 1.2 or higher for all connections

**Severity:** High
**Service:** Azure SQL Database
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-3, FedRAMP SC-8, SOC 2 CC6.1

## Description
Azure SQL Database must be configured with a minimum TLS version of 1.2 to ensure all data in transit is encrypted using modern and secure transport layer protocols. TLS versions 1.0 and 1.1 are deprecated and contain known vulnerabilities. Setting the minimal TLS version to 1.2 ensures that clients connecting with older, insecure protocol versions are rejected. This setting is configured at the server level and applies to all databases hosted on the server.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-sql-security-baseline#dp-3-encrypt-sensitive-data-in-transit
