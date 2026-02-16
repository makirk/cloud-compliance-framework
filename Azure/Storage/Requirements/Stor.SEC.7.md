# Stor.SEC.7.Disable-Shared-Key-Access: Shared key authorization must be disabled in favor of Azure AD authentication

**Severity:** High
**Service:** Azure Storage
**Applicable Standards:** Microsoft Cloud Security Benchmark IM-1, FedRAMP IA-2, SOC 2 CC6.1

## Description
Shared Key authorization must be disabled on Azure Storage accounts. When shared key access is disallowed, all requests must be authorized with Azure Active Directory (Azure AD) credentials. This eliminates the risk associated with storage account access keys, which can be easily compromised if not properly managed. Disabling shared key access also enables the use of Azure AD Conditional Access policies for enhanced security controls.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/storage-security-baseline#im-1-use-centralized-identity-and-authentication-system
