# Func.SEC.2.Private-Endpoints-Enabled: Azure Functions must use Private Endpoints for inbound access

**Severity:** High
**Service:** Azure Functions
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-2, FedRAMP SC-7, SOC 2 CC6.1

## Description
Azure Functions must be configured with Azure Private Link private endpoints to establish a private access point for the function app. Public network access should be disabled in favor of private endpoint connectivity. This ensures that traffic between the function app and connected clients traverses the Microsoft backbone network rather than the public internet, significantly reducing the attack surface. Azure Functions supports Private Link but does not have a single toggle for disabling public access absent configuring private endpoints; IP ACL filtering rules or explicit configuration must be applied.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/functions-security-baseline#ns-2-secure-cloud-services-with-network-controls
