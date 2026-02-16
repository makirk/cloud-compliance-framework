# Mon.SEC.5.Managed-Identity: Managed identities must be used for Azure Monitor Agent authentication

**Severity:** High
**Service:** Azure Monitor
**Applicable Standards:** Microsoft Cloud Security Benchmark IM-3, FedRAMP IA-2, SOC 2 CC6.1

## Description
Azure Monitor Agent must authenticate using managed identities rather than service principals or shared keys. Managed identity must be enabled on Azure virtual machines prior to installing Azure Monitor Agent. System-assigned or user-assigned managed identities eliminate the need for hard-coded credentials in source code or configuration files. Application Insights should also be configured to enforce Microsoft Entra authentication.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/monitor-security-baseline#im-3-manage-application-identities-securely-and-automatically
