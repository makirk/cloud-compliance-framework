# Func.OPS.1.Diagnostic-Logging-Enabled: Azure Functions must have diagnostic logging enabled

**Severity:** High
**Service:** Azure Functions
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-2, SOC 2 CC7.1

## Description
Azure Functions must have resource logs enabled and configured to send diagnostic data to a centralized data sink such as a Log Analytics workspace or storage account. Resource logs provide detailed information about operations performed on the function app and are essential for security investigation, audit compliance, and operational troubleshooting. Azure Monitor Logs should be configured to collect and retain function execution logs, HTTP request logs, and platform-level diagnostics. Log retention periods must meet organizational and regulatory requirements.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/functions-security-baseline#lt-4-enable-logging-for-security-investigation
