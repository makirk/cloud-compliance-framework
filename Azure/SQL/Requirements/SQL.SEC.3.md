# SQL.SEC.3.Azure-AD-Authentication: Azure Active Directory authentication must be provisioned for Azure SQL Database

**Severity:** High
**Service:** Azure SQL Database
**Applicable Standards:** Microsoft Cloud Security Benchmark IM-1, FedRAMP AC-2, SOC 2 CC6.1

## Description
An Azure Active Directory administrator must be provisioned for every Azure SQL Database server to enable centralized identity management and Azure AD authentication. Azure AD authentication should be used as the default authentication method for data plane access. SQL authentication with local accounts should be restricted and avoided wherever possible. Azure AD provides centralized identity management, MFA support, conditional access policies, and simplified permission management for database users.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-sql-security-baseline#im-1-use-centralized-identity-and-authentication-system
