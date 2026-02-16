# VNet.SEC.7.DNS-Security: Virtual Networks must use secure and controlled DNS resolution

**Severity:** Medium
**Service:** Azure Virtual Network
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-6, FedRAMP SC-20, SOC 2 CC6.1

## Description
Virtual Networks must be configured with Azure Private DNS Zones or custom DNS servers that are centrally managed and secured. Default Azure-provided DNS should only be used where custom DNS is not required.

DNS resolution for Private Endpoints must use Azure Private DNS Zones linked to the appropriate Virtual Networks. DNS query logging should be enabled for security monitoring. Azure DNS Private Resolver should be used for hybrid environments requiring conditional forwarding between on-premises and Azure DNS.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-network-security-baseline
