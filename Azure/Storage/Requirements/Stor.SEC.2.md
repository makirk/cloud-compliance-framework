# Stor.SEC.2.Require-Secure-Transfer: Secure transfer (HTTPS) must be required for all storage account operations

**Severity:** High
**Service:** Azure Storage
**Applicable Standards:** Microsoft Cloud Security Benchmark DP-3, FedRAMP SC-8, SOC 2 CC6.1

## Description
The "Secure transfer required" option must be enabled on all Azure Storage accounts. When enabled, all requests to the storage account must be made over HTTPS. Any requests made over HTTP will be rejected. This ensures that data in transit is encrypted and protected against man-in-the-middle attacks. Azure Storage supports HTTPS by default, and this setting enforces it as the only accepted protocol.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/storage-security-baseline#dp-3-encrypt-sensitive-data-in-transit
