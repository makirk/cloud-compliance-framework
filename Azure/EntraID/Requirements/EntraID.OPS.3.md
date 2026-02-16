# EntraID.OPS.3.Identity-Lifecycle-Management: Identity lifecycle processes must be automated using entitlement management and provisioning

**Severity:** Medium
**Service:** Azure Entra ID
**Applicable Standards:** Microsoft Cloud Security Benchmark PA-3, FedRAMP AC-2, SOC 2 CC6.2

## Description
Identity lifecycle management must be automated using Entra ID entitlement management and automated provisioning capabilities. Access request workflows must be configured with appropriate approval processes including dual or multi-stage approval for sensitive resources. Access packages must define time-bound access assignments with automatic expiration to prevent privilege accumulation. Automated user provisioning and deprovisioning must be configured for integrated SaaS applications to ensure that access is promptly granted on hire and revoked on termination or role change. HR-driven provisioning should be implemented where possible to synchronize identity lifecycle events from the authoritative HR source. Orphaned accounts must be identified and remediated through regular governance processes.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-privileged-access#pa-3-manage-lifecycle-of-identities-and-entitlements
