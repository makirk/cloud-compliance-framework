# Func.SEC.3.Managed-Identity-Required: Azure Functions must use Managed Identities for authentication

**Severity:** High
**Service:** Azure Functions
**Applicable Standards:** Microsoft Cloud Security Benchmark IM-3, FedRAMP IA-2, SOC 2 CC6.1

## Description
Azure Functions must use Azure Managed Identities instead of service principals or hard-coded credentials when authenticating to Azure services and resources that support Azure Active Directory (Azure AD) authentication. Managed identity credentials are fully managed, rotated, and protected by the platform, eliminating the risk of hard-coded credentials in source code or configuration files. Basic authentication (publishing credentials) should be disabled in favor of Azure AD-based authentication. The Azure Policy "App Service apps should use managed identity" can be used to audit and enforce this requirement.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/functions-security-baseline#im-3-manage-application-identities-securely-and-automatically
