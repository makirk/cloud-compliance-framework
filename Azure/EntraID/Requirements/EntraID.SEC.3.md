# EntraID.SEC.3.Privileged-Identity-Management: Privileged Identity Management must be enabled for all administrative roles

**Severity:** Critical
**Service:** Azure Entra ID
**Applicable Standards:** Microsoft Cloud Security Benchmark PA-1, PA-2, FedRAMP AC-6, SOC 2 CC6.3

## Description
Azure Entra ID Privileged Identity Management (PIM) must be enabled to govern all privileged and administrative roles. Standing privileged access must be eliminated in favor of just-in-time (JIT) access where users receive temporary permissions to perform privileged tasks. The number of Global Administrator and Privileged Role Administrator accounts must be strictly limited. PIM must be configured to generate security alerts when suspicious or unsafe activity is detected, such as excessive administrator account creation or stale privileged accounts. All privileged role activations must require approval workflows and MFA verification.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-privileged-access#pa-2-avoid-standing-access-for-user-accounts-and-permissions
