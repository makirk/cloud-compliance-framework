# EntraID.SEC.4.Identity-Protection: Entra ID Identity Protection must be enabled to detect and remediate identity risks

**Severity:** High
**Service:** Azure Entra ID
**Applicable Standards:** Microsoft Cloud Security Benchmark LT-2, FedRAMP SI-4, SOC 2 CC7.2

## Description
Azure Entra ID Identity Protection must be enabled to detect and automatically remediate risks related to user accounts and sign-in behaviors. User risk policies and sign-in risk policies must be configured to detect threats such as leaked credentials, sign-ins from anonymous or malware-linked IP addresses, password spray attacks, and atypical travel patterns. Risk-based Conditional Access policies must be enforced so that high-risk sign-ins require MFA or are blocked, and high-risk users are required to change their passwords. Risky sign-in and risky user reports must be reviewed regularly.

Source: https://learn.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-logging-threat-detection#lt-2-enable-threat-detection-for-identity-and-access-management
