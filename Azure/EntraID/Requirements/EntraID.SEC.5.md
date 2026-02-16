# EntraID.SEC.5.Password-Policy: Password policies must enforce strong password requirements and ban known weak passwords

**Severity:** High
**Service:** Azure Entra ID
**Applicable Standards:** Microsoft Cloud Security Benchmark IM-6, FedRAMP IA-5, SOC 2 CC6.1

## Description
Azure Entra ID password policies must enforce strong password requirements for all cloud user accounts. Azure AD Password Protection must be enabled to detect and block known weak passwords and their variants using the global banned password list and a custom banned password list specific to the organization. Passwords must not be set to expire on a periodic basis, following NIST SP 800-63B guidance. Self-service password reset (SSPR) must be enabled and configured with appropriate verification methods to reduce helpdesk burden while maintaining security. For hybrid environments, on-premises Active Directory password policies must also align with these requirements.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-identity-management#im-6-use-strong-authentication-controls
