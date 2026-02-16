# EntraID.SEC.9.Emergency-Access-Accounts: Emergency access accounts must be configured and secured

**Severity:** Critical
**Service:** Azure Entra ID
**Applicable Standards:** Microsoft Cloud Security Benchmark PA-5, FedRAMP AC-2, SOC 2 CC6.1

## Description
At least two emergency access (break-glass) accounts must be configured with Global Administrator role to prevent accidental lockout from the Entra ID tenant. Emergency access accounts must not be assigned to specific individuals and must use different authentication methods from regular administrative accounts (for example, one using a password and one using a FIDO2 key). Credentials for these accounts must be stored securely and known only to authorized individuals. Emergency access accounts must be excluded from Conditional Access policies that could block access. Sign-in and audit logs for emergency access accounts must be actively monitored and trigger alerts upon any usage.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-privileged-access#pa-5-set-up-emergency-access
