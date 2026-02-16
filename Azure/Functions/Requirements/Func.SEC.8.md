# Func.SEC.8.Defender-Enabled: Microsoft Defender for App Service must be enabled for Azure Functions

**Severity:** Medium
**Service:** Azure Functions
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-1, FedRAMP SI-4, SOC 2 CC7.2

## Description
Microsoft Defender for App Service must be enabled to provide threat detection capabilities for Azure Functions. Defender for App Service includes coverage for Azure Functions; when enabled, function apps under the enablement scope are automatically included in monitoring. Alerts from Defender should be investigated and responded to promptly. Azure Policy should be configured to audit and enforce configurations, and Azure Monitor should be used to create alerts when configuration deviations are detected.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/functions-security-baseline#lt-1-enable-threat-detection-capabilities
