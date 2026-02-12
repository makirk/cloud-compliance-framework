'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AssessmentViewer } from '@/components/assessment/AssessmentViewer';
import { RequirementsList } from '@/components/requirements/RequirementsList';
import { CodeTabs } from '@/components/code-examples/CodeTabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { FileText, Code, Shield, Download, FileDown } from 'lucide-react';
import { ServiceInfo, Provider, Assessment, Requirement } from '@/types';
import { parseAssessment } from '@/lib/parsers/assessment';
import { exportAssessmentToPDF, exportRequirementsToCSV, exportRequirementsToPDF } from '@/lib/export';

const DEMO_SERVICES: Record<Provider, ServiceInfo[]> = {
  AWS: [
    { provider: 'AWS', name: 'EC2', path: 'AWS/EC2', hasAssessment: true, requirementsCount: 11, codeExamplesCount: 6 },
    { provider: 'AWS', name: 'S3', path: 'AWS/S3', hasAssessment: true, requirementsCount: 5, codeExamplesCount: 0 },
    { provider: 'AWS', name: 'IAM', path: 'AWS/IAM', hasAssessment: true, requirementsCount: 9, codeExamplesCount: 0 },
    { provider: 'AWS', name: 'RDS', path: 'AWS/RDS', hasAssessment: true, requirementsCount: 7, codeExamplesCount: 0 },
    { provider: 'AWS', name: 'Lambda', path: 'AWS/Lambda', hasAssessment: true, requirementsCount: 4, codeExamplesCount: 0 },
    { provider: 'AWS', name: 'KMS', path: 'AWS/KMS', hasAssessment: true, requirementsCount: 5, codeExamplesCount: 0 },
    { provider: 'AWS', name: 'VPC', path: 'AWS/VPC', hasAssessment: true, requirementsCount: 1, codeExamplesCount: 0 },
    { provider: 'AWS', name: 'CloudWatch', path: 'AWS/CloudWatch', hasAssessment: true, requirementsCount: 3, codeExamplesCount: 0 },
  ],
  Azure: [],
};

const DEMO_ASSESSMENT = `# Amazon EC2 Compliance Assessment

**Last Reviewed:** 2026-02-11

## FedRAMP

**Status:** <span style="color:green">Compliant</span>

| Authorization Level | Status |
|---------------------|--------|
| FedRAMP Moderate (East/West) | Authorized |
| FedRAMP High (GovCloud) | Authorized |

Source: https://aws.amazon.com/compliance/services-in-scope/FedRAMP/

## SOC

**Status:** <span style="color:green">Compliant</span>

| Certification | Status |
|---------------|--------|
| SOC 1, 2, 3 | In Scope |

Source: https://aws.amazon.com/compliance/services-in-scope/SOC/
`;

const DEMO_REQUIREMENTS: Requirement[] = [
  {
    id: 'EC2.1',
    title: 'EBS snapshots should not be publicly restorable',
    severity: 'Critical',
    service: 'EC2',
    provider: 'AWS',
    applicableStandards: ['AWS Foundational Security Best Practices v1.0.0', 'CIS AWS Foundations Benchmark v1.2.0'],
    description: 'This control checks whether Amazon Elastic Block Store (EBS) snapshots are not publicly restorable.',
    sourceUrl: 'https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-1',
  },
  {
    id: 'EC2.2',
    title: 'VPC default security groups should not allow inbound or outbound traffic',
    severity: 'High',
    service: 'EC2',
    provider: 'AWS',
    applicableStandards: ['AWS Foundational Security Best Practices v1.0.0'],
    description: 'This control checks that the default security group of a VPC does not allow inbound or outbound traffic.',
    sourceUrl: 'https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-2',
  },
  {
    id: 'EC2.3',
    title: 'Attached Amazon EBS volumes should be encrypted at rest',
    severity: 'Medium',
    service: 'EC2',
    provider: 'AWS',
    applicableStandards: ['AWS Foundational Security Best Practices v1.0.0'],
    description: 'This control checks whether the EBS volumes that are in an attached state are encrypted.',
    sourceUrl: 'https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-3',
  },
];

const DEMO_CODE_EXAMPLES = [
  {
    path: 'AWS/EC2/Code Example/terraform/main.tf',
    language: 'terraform',
    content: `# EC2 Compliant Terraform Template

resource "aws_ebs_encryption_by_default" "enabled" {
  enabled = true
}

resource "aws_instance" "main" {
  ami           = var.ami_id
  instance_type = var.instance_type

  # EC2.8: Require IMDSv2
  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"
  }

  # EC2.3: EBS encrypted
  root_block_device {
    encrypted = true
  }
}`,
  },
  {
    path: 'AWS/EC2/Code Example/cdk/ec2_stack.py',
    language: 'python',
    content: `from aws_cdk import aws_ec2 as ec2, Stack
from constructs import Construct

class Ec2CompliantStack(Stack):
    def __init__(self, scope: Construct, id: str, **kwargs):
        super().__init__(scope, id, **kwargs)

        instance = ec2.Instance(
            self, "Instance",
            instance_type=ec2.InstanceType.of(
                ec2.InstanceClass.T3,
                ec2.InstanceSize.MICRO,
            ),
            machine_image=ec2.MachineImage.latest_amazon_linux2023(),
            require_imdsv2=True,  # EC2.8
        )`,
  },
];

interface ServicePageClientProps {
  provider: string;
  service: string;
}

type TabType = 'assessment' | 'requirements' | 'code';

export function ServicePageClient({ provider, service }: ServicePageClientProps) {
  const providerUpper = provider.toUpperCase() as Provider;
  const serviceUpper = service.toUpperCase();

  const [activeTab, setActiveTab] = useState<TabType>('assessment');
  const [isLoading, setIsLoading] = useState(true);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const parsedAssessment = parseAssessment(DEMO_ASSESSMENT, providerUpper, serviceUpper);
      setAssessment(parsedAssessment);
      setRequirements(DEMO_REQUIREMENTS);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [providerUpper, serviceUpper]);

  const tabs = [
    { id: 'assessment' as const, label: 'Assessment', icon: Shield },
    { id: 'requirements' as const, label: 'Requirements', icon: FileText },
    { id: 'code' as const, label: 'Code Examples', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar services={DEMO_SERVICES} />

      <main className="lg:pl-64 pt-16">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb
            items={[
              { label: providerUpper, href: `/${provider}` },
              { label: serviceUpper },
            ]}
            className="mb-6"
          />

          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {providerUpper} {serviceUpper}
              </h1>
              <p className="mt-1 text-gray-500">
                Compliance assessment and security requirements
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (activeTab === 'assessment' && assessment) {
                    exportAssessmentToPDF(assessment);
                  } else if (activeTab === 'requirements') {
                    exportRequirementsToPDF(requirements, `${providerUpper} ${serviceUpper} Requirements`);
                  }
                }}
                disabled={activeTab === 'code'}
              >
                <FileDown className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (activeTab === 'requirements') {
                    exportRequirementsToCSV(requirements, `${providerUpper}-${serviceUpper}-requirements.csv`);
                  }
                }}
                disabled={activeTab !== 'requirements'}
              >
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
            </div>
          </div>

          <div className="flex gap-1 mb-6 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (
            <>
              {activeTab === 'assessment' && assessment && (
                <AssessmentViewer assessment={assessment} />
              )}

              {activeTab === 'requirements' && (
                <RequirementsList requirements={requirements} />
              )}

              {activeTab === 'code' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Infrastructure as Code Examples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeTabs files={DEMO_CODE_EXAMPLES} />
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
