# Mon.SEC.3.RBAC-Workspace-Access: Role-Based Access Control must be enforced on Log Analytics workspace access

**Severity:** High
**Service:** Azure Monitor
**Applicable Standards:** Microsoft Cloud Security Benchmark PA-7, FedRAMP AC-6, SOC 2 CC6.3

## Description
Azure Role-Based Access Control (Azure RBAC) must be used to manage access to Azure Monitor data plane actions, including Log Analytics workspaces. Follow the principle of least privilege by assigning only the minimum permissions required. Use built-in roles such as Log Analytics Reader and Log Analytics Contributor rather than granting broad permissions. Table-level and resource-context RBAC should be used where granular access control is needed.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/monitor-security-baseline#pa-7-follow-just-enough-administration-least-privilege-principle
