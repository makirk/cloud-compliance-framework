# VNet.SEC.2.DDoS-Protection-Enabled: Azure DDoS Protection must be enabled on Virtual Networks

**Severity:** High
**Service:** Azure Virtual Network
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-1, FedRAMP SC-5, SOC 2 CC6.1

## Description
Azure DDoS Protection Standard must be enabled on Virtual Networks hosting public-facing workloads. DDoS Protection Standard provides enhanced DDoS mitigation capabilities including adaptive tuning, attack notification, telemetry, and cost protection against resource consumption during attacks.

All Virtual Networks with public IP addresses exposed must have DDoS Protection Standard associated either through a DDoS Protection Plan or through DDoS IP Protection on individual public IPs.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-network-security-baseline
