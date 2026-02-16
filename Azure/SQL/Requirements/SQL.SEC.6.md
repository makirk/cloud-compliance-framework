# SQL.SEC.6.Vulnerability-Assessment: SQL Vulnerability Assessment must be enabled and configured with recurring scans

**Severity:** High
**Service:** Azure SQL Database
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-1, FedRAMP RA-5, SOC 2 CC7.1

## Description
SQL Vulnerability Assessment must be enabled on all Azure SQL Database servers as part of Microsoft Defender for SQL. Recurring scans must be configured to run automatically, with scan results sent to designated administrators via email notifications. The vulnerability assessment service identifies database security misconfigurations, excessive permissions, unprotected sensitive data, and other potential vulnerabilities. Identified findings must be reviewed and remediated according to their severity within defined SLA timeframes.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-sql-security-baseline#lt-1-enable-threat-detection-capabilities
