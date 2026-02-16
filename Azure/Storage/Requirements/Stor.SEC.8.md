# Stor.SEC.8.Minimum-TLS-1-2: Minimum TLS version must be set to 1.2

**Severity:** Critical
**Service:** Azure Storage
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-3, FedRAMP SC-8, SOC 2 CC6.7

## Description
Azure Storage accounts must be configured with a minimum Transport Layer Security (TLS) version of 1.2. Older TLS versions (1.0 and 1.1) contain known vulnerabilities and do not provide adequate security for data in transit. Setting the minimum TLS version to 1.2 ensures that all client connections use modern cryptographic protocols, protecting against protocol downgrade attacks and known cipher suite weaknesses.

Source: https://learn.microsoft.com/en-us/azure/storage/common/transport-layer-security-configure-minimum-version?tabs=portal
