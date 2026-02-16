# EntraID.SEC.1.MFA-Enforcement: Multi-factor authentication must be enforced for all users

**Severity:** Critical
**Service:** Azure Entra ID
**Applicable Standards:** Microsoft Cloud Security Benchmark IM-6, FedRAMP IA-2, SOC 2 CC6.1

## Description
All users must be required to complete multi-factor authentication (MFA) for access to cloud resources. Strong authentication controls such as passwordless methods (Windows Hello for Business, FIDO2 security keys, Microsoft Authenticator) or MFA must be enforced as the default authentication method. Password-only authentication is considered legacy and does not adequately protect against common attack methods such as password spray, credential stuffing, and phishing. Legacy authentication protocols that cannot support MFA (IMAP, SMTP, POP3, older Office clients) must be blocked via Conditional Access policies.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-identity-management#im-6-use-strong-authentication-controls
