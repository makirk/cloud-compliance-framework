'use client';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ServiceList } from '@/components/dashboard/ServiceList';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Cloud, FileText, Code } from 'lucide-react';
import { ServiceInfo, Provider } from '@/types';
import { useRepoTree } from '@/lib/hooks/useGitHub';

interface ProviderPageClientProps {
  provider: string;
}

export function ProviderPageClient({ provider }: ProviderPageClientProps) {
  const providerNormalized = (provider.toLowerCase() === 'aws' ? 'AWS' : provider.charAt(0).toUpperCase() + provider.slice(1).toLowerCase()) as Provider;

  // Fetch dynamic service list from GitHub
  const { data: repoTree } = useRepoTree();
  const allServices = repoTree?.services || { AWS: [], Azure: [] };
  const services = allServices[providerNormalized] || [];

  const totalRequirements = services.reduce((sum, s) => sum + s.requirementsCount, 0);
  const totalCodeExamples = services.reduce((sum, s) => sum + s.codeExamplesCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar services={allServices} />

      <main className="lg:pl-64 pt-16">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb
            items={[{ label: providerNormalized }]}
            className="mb-6"
          />

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Cloud className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                {providerNormalized}
              </h1>
            </div>
            <p className="text-gray-500">
              Compliance assessments and security requirements for {providerNormalized} services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <Cloud className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{services.length}</p>
                    <p className="text-sm text-gray-500">Services</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{totalRequirements}</p>
                    <p className="text-sm text-gray-500">Requirements</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <Code className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{totalCodeExamples}</p>
                    <p className="text-sm text-gray-500">Code Examples</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {services.length > 0 ? (
                <ServiceList services={services} showProvider={false} />
              ) : (
                <div className="py-12 text-center text-gray-500">
                  No services available for {providerNormalized}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
