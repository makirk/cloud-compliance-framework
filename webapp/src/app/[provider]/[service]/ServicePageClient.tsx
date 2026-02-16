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
import { exportAssessmentToPDF, exportRequirementsToCSV, exportRequirementsToPDF } from '@/lib/export';
import { useCodeExamples, useRepoTree, useRequirements, useAssessment } from '@/lib/hooks/useGitHub';

interface ServicePageClientProps {
  provider: string;
  service: string;
}

type TabType = 'assessment' | 'requirements' | 'code';

export function ServicePageClient({ provider, service }: ServicePageClientProps) {
  const providerNormalized = (provider.toLowerCase() === 'aws' ? 'AWS' : provider.charAt(0).toUpperCase() + provider.slice(1).toLowerCase()) as Provider;

  const [activeTab, setActiveTab] = useState<TabType>('assessment');

  // Fetch dynamic service list from GitHub
  const { data: repoTree } = useRepoTree();
  const services = repoTree?.services || { AWS: [], Azure: [] };

  // Find the actual service name from the repository (handles case sensitivity)
  // e.g., URL "cloudwatch" -> actual directory "CloudWatch"
  const actualServiceName = services[providerNormalized]?.find(
    (s) => s.name.toLowerCase() === service.toLowerCase()
  )?.name || service.toUpperCase();

  // Fetch dynamic assessment from GitHub
  const {
    data: assessment,
    isLoading: isLoadingAssessment,
    error: assessmentError
  } = useAssessment(providerNormalized, actualServiceName);

  // Fetch dynamic requirements from GitHub
  const {
    data: requirements = [],
    isLoading: isLoadingRequirements,
    error: requirementsError
  } = useRequirements(providerNormalized, actualServiceName);

  // Fetch dynamic code examples from GitHub
  const {
    data: codeExamples = [],
    isLoading: isLoadingCodeExamples,
    error: codeExamplesError
  } = useCodeExamples(providerNormalized, actualServiceName);

  const tabs = [
    { id: 'assessment' as const, label: 'Assessment', icon: Shield },
    { id: 'requirements' as const, label: 'Requirements', icon: FileText },
    { id: 'code' as const, label: 'Code Examples', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar services={services} />

      <main className="lg:pl-64 pt-16">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb
            items={[
              { label: providerNormalized, href: `/${provider}` },
              { label: actualServiceName },
            ]}
            className="mb-6"
          />

          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {providerNormalized} {actualServiceName}
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
                    exportRequirementsToPDF(requirements, `${providerNormalized} ${actualServiceName} Requirements`);
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
                    exportRequirementsToCSV(requirements, `${providerNormalized}-${actualServiceName}-requirements.csv`);
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

          <>
            {activeTab === 'assessment' && (
              <>
                {isLoadingAssessment ? (
                  <div className="space-y-4">
                    <CardSkeleton />
                    <CardSkeleton />
                  </div>
                ) : assessmentError ? (
                  <Card>
                    <CardContent>
                      <div className="text-center py-8 text-red-600">
                        Failed to load assessment. Please try again later.
                      </div>
                    </CardContent>
                  </Card>
                ) : !assessment ? (
                  <Card>
                    <CardContent>
                      <div className="text-center py-8 text-gray-500">
                        No assessment available
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <AssessmentViewer assessment={assessment} />
                )}
              </>
            )}

            {activeTab === 'requirements' && (
                <>
                  {isLoadingRequirements ? (
                    <div className="space-y-4">
                      <CardSkeleton />
                      <CardSkeleton />
                    </div>
                  ) : requirementsError ? (
                    <Card>
                      <CardContent>
                        <div className="text-center py-8 text-red-600">
                          Failed to load requirements. Please try again later.
                        </div>
                      </CardContent>
                    </Card>
                  ) : requirements.length === 0 ? (
                    <Card>
                      <CardContent>
                        <div className="text-center py-8 text-gray-500">
                          No requirements available
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <RequirementsList requirements={requirements} />
                  )}
                </>
              )}

              {activeTab === 'code' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Infrastructure as Code Examples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingCodeExamples ? (
                      <div className="space-y-4">
                        <CardSkeleton />
                      </div>
                    ) : codeExamplesError ? (
                      <div className="text-center py-8 text-red-600">
                        Failed to load code examples. Please try again later.
                      </div>
                    ) : (
                      <CodeTabs files={codeExamples} />
                    )}
                  </CardContent>
                </Card>
              )}
          </>
        </div>
      </main>
    </div>
  );
}
