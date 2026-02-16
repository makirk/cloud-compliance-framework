# SQL.SEC.1.Private-Endpoints-Required: Azure SQL Database must use Private Link endpoints for network connectivity

**Severity:** High
**Service:** Azure SQL Database
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-2, FedRAMP AC-4, SOC 2 CC6.1

## Description
All Azure SQL Database instances must be configured with Azure Private Link endpoints to establish private connectivity from virtual networks. Private endpoints assign a private IP address from the VNet to the SQL Database, ensuring traffic between the VNet and the service traverses the Microsoft backbone network and does not traverse the public internet. This eliminates exposure to the public internet and reduces the attack surface.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-sql-security-baseline#ns-2-secure-cloud-services-with-network-controls
