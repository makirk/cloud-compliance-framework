# VM.SEC.9.Encrypt-Data-In-Transit: Use SSH/RDP+TLS for remote management and enforce TLS 1.2+

**Severity:** Medium
**Service:** Azure Virtual Machines
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-3, FedRAMP SC-8, SOC 2 CC6.1

## Description
Enable secure transfer and enforce HTTPS with TLS v1.2 or later for all web applications and services. Use SSH (for Linux) or RDP/TLS (for Windows) for remote management instead of unencrypted protocols. Legacy versions such as SSL 3.0 and TLS v1.0 should be disabled.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-machines-linux-security-baseline#dp-3-encrypt-sensitive-data-in-transit
