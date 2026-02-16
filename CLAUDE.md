# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This is a newly initialized repository. Update this file as the project structure is established.

## Build Commands

## Style:

In the assessment.md file:
 - If the Status is Compliant, make the text green
 - If the Status is Partial Compliant, make it yellow
 - If the Status Not Compliant, make the text red

<!-- Add build, test, and lint commands as they are configured -->

## Architecture



### Folder structure
.
├── [Cloud provider]
│   ├── [Cloud Service]
│      └── Assessment.md
│      └── Code example
│         └── [Coding laugauge #1]
│         └── [Coding laugauge #1]
│      └── Requirments
│         └── [Requirments #1]
│         └── [Requirments #2]
├── [Cloud provider]
│   ├── [Cloud Service]
│      └── Assessment.md
│      └── Code example
│         └── [Coding laugauge #1]
│         └── [Coding laugauge #1]
│      └── Requirments
│         └── [Requirments #1]
│         └── [Requirments #2]


### Cloud Providers in scope:
- AWS
- Azure

### Cloud core service exclutions


### Complaince assessments

If the service is not complaint with all freamworks, use the term "Partial Compliant" in the status


AWS services in scope for FedRAMP
https://aws.amazon.com/compliance/services-in-scope/FedRAMP/

AWS services in scope for SOC
https://aws.amazon.com/compliance/services-in-scope/SOC/

Azure services in scope use this pdf:
https://servicetrust.microsoft.com/DocumentPage/7adf2d9e-d7b5-4e71-bad8-713e6a183cf3

### Code Examples

Use the following coding language when creating the examples:
Terraform for all Cloud providers
ARM for Azure
CDK i python for AWS


### Requirments

Use below webiste, to collect requirment for AWS services
https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-controls-reference.html

Use below webiste, to collect requirment for Azure services:
https://learn.microsoft.com/en-us/security/benchmark/azure/security-baselines-overview


Create a .md file for each requirments, file should contain:
- Security control id and Security control
- Service
- Applicable standards
- Severity
- Description


### Naming convestion for Requirments

Use the following naming convention for Requirments for the files:

[ServiceShortname].[Type].[ID]

Use the following naming convention for Requirments in the .md files

use this naming convention: [ServiceShortname].[Type].[ID].[RequirmentName]



ServiceShortname: a short name for the service

Type: 
- OPS for operational
- SEC for Security

ID must be uniq

<!-- Document high-level architecture and key components -->
