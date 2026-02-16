# Func.OPS.2.Application-Insights-Configured: Azure Functions must have Application Insights enabled

**Severity:** Medium
**Service:** Azure Functions
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-6, SOC 2 CC7.1

## Description
Azure Functions must have Application Insights enabled and configured for application performance monitoring and operational visibility. Application Insights provides real-time telemetry including request rates, response times, failure rates, dependency tracking, and custom metrics. This data is critical for detecting performance anomalies, diagnosing failures, and understanding usage patterns. Application Insights should be connected to the same Log Analytics workspace used for diagnostic logs to enable correlation of application and platform-level data.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/functions-security-baseline#lt-4-enable-logging-for-security-investigation
