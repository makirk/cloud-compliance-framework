# VM.OPS.3.Azure-Monitor-Agent-Installed: Install Azure Monitor agent and configure log collection

**Severity:** Medium
**Service:** Azure Virtual Machines
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-4, FedRAMP AU-2, SOC 2 CC7.2

## Description
Install the Azure Monitor agent to collect logs and performance data from the guest operating system. Azure Monitor automatically collects metric data for the VM host, but the agent is required for guest OS telemetry. Configure collection using VM insights or by creating a data collection rule. Network traffic data collection agent should also be installed for advanced network protection features.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/virtual-machines-linux-security-baseline#lt-4-enable-logging-for-security-investigation
