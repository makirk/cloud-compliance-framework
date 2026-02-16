# Func.SEC.5.Disable-Basic-Auth: Azure Functions must disable basic authentication and publishing credentials

**Severity:** High
**Service:** Azure Functions
**Applicable Standards:** Microsoft Cloud Security Benchmark IM-1, FedRAMP IA-2, SOC 2 CC6.1

## Description
Azure Functions must have basic authentication (publishing credentials) disabled. Deployment credentials are created by default and must be explicitly disabled. Azure Active Directory (Azure AD) should be configured as the default authentication method for data plane access including deployment operations and developer tools. Local authentication methods and accounts should be disabled wherever possible in favor of Azure AD-based authentication. Some runtime operations may rely on administrative keys that cannot currently be disabled; these keys should be stored in Azure Key Vault and regenerated regularly.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/functions-security-baseline#im-1-use-centralized-identity-and-authentication-system
