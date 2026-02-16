# VM.SEC.6.Trusted-Launch-Enabled: Enable Trusted Launch with Secure Boot, vTPM, and integrity monitoring

**Severity:** High
**Service:** Azure Virtual Machines
**Applicable Standards:** Microsoft Cloud Security Benchmark PV-4, FedRAMP SI-7, SOC 2 CC7.1

## Description
Trusted Launch protects against advanced and persistent attack techniques by combining secure boot, vTPM, and integrity monitoring. All three components should be enabled to ensure the best security posture. Trusted launch is available for generation 2 VMs and requires creation of new virtual machines (cannot be enabled on existing VMs created without it).

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-machines-linux-security-baseline#pv-4-audit-and-enforce-secure-configurations-for-compute-resources
