# VM.SEC.5.System-Assigned-Managed-Identity: VMs should use system-assigned managed identities for service authentication

**Severity:** Medium
**Service:** Azure Virtual Machines
**Applicable Standards:** Microsoft Cloud Security Benchmark IM-3, FedRAMP IA-5, SOC 2 CC6.1

## Description
Virtual machines should use Azure managed identities instead of service principals when authenticating to Azure services that support Azure AD authentication. Managed identity credentials are fully managed, rotated, and protected by the platform, avoiding hard-coded credentials in source code or configuration files. The Guest Configuration extension requires a system-assigned managed identity.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-machines-linux-security-baseline#im-3-manage-application-identities-securely-and-automatically
