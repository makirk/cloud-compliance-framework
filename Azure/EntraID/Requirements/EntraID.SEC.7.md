# EntraID.SEC.7.Application-Registration-Security: Application registrations must follow least privilege and secure credential practices

**Severity:** High
**Service:** Azure Entra ID
**Applicable Standards:** Microsoft Cloud Security Benchmark IM-3, IM-8, FedRAMP IA-5, SOC 2 CC6.1

## Description
Application registrations in Entra ID must follow secure practices. Users must not be allowed to grant consent to unmanaged applications; admin consent workflow must be enabled instead. Application registrations should use managed identities where possible, or certificate-based credentials rather than client secrets. When client secrets are used, they must have a defined and short expiration period. Application permissions must follow the principle of least privilege, requesting only the minimum required API permissions. Credentials and secrets must never be embedded in application code or configuration files; Azure Key Vault must be used for secure storage. Unused or stale application registrations must be regularly identified and removed.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-identity-management#im-3-manage-application-identities-securely-and-automatically
