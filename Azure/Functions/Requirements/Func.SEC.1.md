# Func.SEC.1.VNet-Integration-Required: Azure Functions must be integrated with a Virtual Network

**Severity:** High
**Service:** Azure Functions
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-1, FedRAMP AC-4, SOC 2 CC6.1

## Description
Azure Functions must be deployed with Virtual Network (VNet) integration enabled. This establishes network segmentation boundaries and allows the function app to access resources within the virtual network while restricting public internet exposure. By default, public network access is allowed; VNet integration must be explicitly configured by the customer. Network Security Groups (NSGs) should also be applied to the integrated subnet to restrict or monitor traffic by port, protocol, and source/destination IP address.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/functions-security-baseline#ns-1-establish-network-segmentation-boundaries
