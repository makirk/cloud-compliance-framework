# VM.SEC.4.Azure-AD-Authentication: Use Azure AD authentication instead of local accounts for VM access

**Severity:** Medium
**Service:** Azure Virtual Machines
**Applicable Standards:** Microsoft Cloud Security Benchmark IM-1, FedRAMP IA-2, SOC 2 CC6.1

## Description
Use Azure Active Directory (Azure AD) as the default authentication method to control data plane access. Local administrator accounts created during initial VM deployment should be avoided wherever possible. Azure AD with OpenSSH certificate-based authentication enables organizations to manage access with Azure RBAC and Conditional Access policies.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-machines-linux-security-baseline#im-1-use-centralized-identity-and-authentication-system
