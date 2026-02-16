# EntraID.SEC.8.Audit-Logging: Entra ID audit and sign-in logs must be enabled and retained

**Severity:** High
**Service:** Azure Entra ID
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-3, LT-6, FedRAMP AU-3, SOC 2 CC7.2

## Description
Azure Entra ID audit logs and sign-in logs must be enabled and exported to a centralized log management solution. Audit logs must capture all changes made to resources within Entra ID, including user management, group management, role assignments, application changes, and policy modifications. Sign-in logs must record all authentication activity including interactive and non-interactive sign-ins, service principal sign-ins, and managed identity sign-ins. Logs must be routed to Azure Monitor Log Analytics, Azure Storage, or Azure Event Hubs via diagnostic settings. Log retention must meet compliance requirements, with a minimum of 90 days in active storage and up to 1 year or longer in archival storage as required by applicable regulations.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-logging-threat-detection#lt-3-enable-logging-for-security-investigation
