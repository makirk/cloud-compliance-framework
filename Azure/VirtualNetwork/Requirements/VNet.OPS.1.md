# VNet.OPS.1.NSG-Flow-Logs: NSG flow logs must be enabled on all Network Security Groups

**Severity:** High
**Service:** Azure Virtual Network
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-3, SOC 2 CC7.2

## Description
NSG flow logs must be enabled on all Network Security Groups to capture information about IP traffic flowing through the NSG. Flow logs should be configured with Version 2 format to capture additional fields including bytes and packets.

Flow logs must be retained for a minimum of 90 days in a storage account, and should also be sent to a Log Analytics workspace for querying and analysis. Azure Policy "Network Security Groups should have flow logs configured" should be enforced to ensure compliance.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-network-security-baseline#lt-4-enable-logging-for-security-investigation
