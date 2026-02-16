# Func.SEC.4.HTTPS-Only-Enforced: Azure Functions must enforce HTTPS-only traffic

**Severity:** Critical
**Service:** Azure Functions
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-3, FedRAMP SC-8, SOC 2 CC6.1

## Description
Azure Functions must be configured to accept only HTTPS traffic, ensuring all data in transit is encrypted. HTTPS is not required for incoming requests by default; it must be enabled via configuration. When enabled, any HTTP request is automatically redirected to HTTPS. The minimum TLS version must be set to 1.2 or later; legacy versions such as SSL 3.0 and TLS 1.0 must be disabled. The Azure Policy "App Service apps should only be accessible over HTTPS" should be applied to audit and enforce this requirement.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/functions-security-baseline#dp-3-encrypt-sensitive-data-in-transit
