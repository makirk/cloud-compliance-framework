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

Use below website, to collect controls for AWS for each requreiment
https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-controls-reference.html
Create a .md file for each requirments, file should contain:
- Security control and Security control tit
- Service
- Applicable standards
- Severity
- Description



<!-- Document high-level architecture and key components -->
