# VNet.SEC.5.Deny-Public-IP-On-NIC: Public IP addresses must not be directly assigned to network interfaces

**Severity:** High
**Service:** Azure Virtual Network
**Applicable Standards:** Microsoft Cloud Security Benchmark NS-1, FedRAMP AC-4, SOC 2 CC6.1

## Description
Public IP addresses must not be directly associated with network interfaces attached to virtual machines or other compute resources. All inbound traffic from the internet must be routed through a load balancer, Application Gateway, Azure Firewall, or other approved ingress point.

Azure Policy should be used to deny the association of public IP addresses with network interfaces. Exceptions must be documented and approved through a formal exception process. Resources requiring internet connectivity should use NAT Gateway or Azure Firewall for outbound access.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-network-security-baseline
