# EntraID.SEC.2.Conditional-Access-Policies: Conditional Access policies must be configured to enforce zero-trust access controls

**Severity:** Critical
**Service:** Azure Entra ID
**Applicable Standards:** Microsoft Cloud Security Benchmark IM-7, FedRAMP AC-2, SOC 2 CC6.1

## Description
Azure Entra ID Conditional Access policies must be configured to enforce granular access controls based on user-defined conditions as part of a zero-trust access model. Policies must cover the following common scenarios: requiring MFA for users with administrative roles, requiring MFA for Azure management tasks, blocking sign-ins from legacy authentication protocols, requiring trusted locations for MFA registration, blocking or granting access from specific locations, and blocking risky sign-in behaviors. Authentication session management should also be configured to control sign-in frequency and persistent browser sessions.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-identity-management#im-7-restrict-resource-access-based-on--conditions
