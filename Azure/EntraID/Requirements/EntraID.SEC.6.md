# EntraID.SEC.6.External-Identity-Governance: External identities and guest access must be governed through B2B policies

**Severity:** High
**Service:** Azure Entra ID
**Applicable Standards:** Microsoft Cloud Security Benchmark PA-3, FedRAMP AC-2, SOC 2 CC6.2

## Description
External identity access must be governed through Entra ID B2B collaboration policies and Entra ID External Identities configuration. Cross-tenant access settings must restrict which external organizations can collaborate and what level of access external users receive. Guest user access must be limited to their own directory objects and assigned resources only. Invitation policies must be configured to restrict who can invite external users, and external collaboration must be limited to specific allowed domains where applicable. Entitlement management access packages must be used for structured external access with automatic expiration and periodic access reviews.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-privileged-access#pa-3-manage-lifecycle-of-identities-and-entitlements
