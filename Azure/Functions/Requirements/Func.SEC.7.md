# Func.SEC.7.RBAC-Least-Privilege: Azure Functions must enforce least privilege access using Azure RBAC

**Severity:** Medium
**Service:** Azure Functions
**Applicable Standards:** Microsoft Cloud Security Benchmark PA-7, FedRAMP AC-6, SOC 2 CC6.3

## Description
Azure Functions must use Azure Role-Based Access Control (Azure RBAC) to manage access following the principle of least privilege. RBAC roles should be assigned to users, groups, service principals, and managed identities with only the minimum permissions necessary. For data plane actions, the Kudu/SCM/deployment endpoints require permission over the Microsoft.Web/sites/publish/Action operation. Customer Lockbox must be enabled for scenarios where Microsoft support needs to access customer data, requiring explicit approval for each data access request.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/functions-security-baseline#pa-7-follow-just-enough-administration-least-privilege-principle
