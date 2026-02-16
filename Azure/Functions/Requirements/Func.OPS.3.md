# Func.OPS.3.Backup-Configured: Azure Functions must have regular backups configured

**Severity:** Medium
**Service:** Azure Functions
**Applicable Standards:** Microsoft Cloud Security Benchmark BR-1, FedRAMP CP-9, SOC 2 A1.2

## Description
Azure Functions running on Standard, Premium, or Isolated App Service plans must have the native backup feature configured to ensure regular automated backups of application content and configuration. Note that Azure Backup is not supported for Azure Functions; the App Service built-in backup feature must be used instead. This backup feature does not include event sources or externally linked storage, so those components must be backed up separately. Backup schedules and retention policies must be defined to meet organizational recovery point objectives (RPO) and recovery time objectives (RTO).

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/functions-security-baseline#br-1-ensure-regular-automated-backups
