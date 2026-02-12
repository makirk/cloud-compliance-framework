'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ComplianceChart } from '@/components/dashboard/ComplianceChart';
import { ServiceList } from '@/components/dashboard/ServiceList';
import { DashboardSkeleton } from '@/components/ui/Skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { ServiceInfo, Provider, ComplianceSummary } from '@/types';
import { useRepoTree } from '@/lib/hooks/useGitHub';

export default function DashboardPage() {
  const [summary, setSummary] = useState<ComplianceSummary>({
    totalServices: 0,
    compliantServices: 0,
    partialCompliantServices: 0,
    notCompliantServices: 0,
    totalRequirements: 0,
    criticalRequirements: 0,
    highRequirements: 0,
    mediumRequirements: 0,
    lowRequirements: 0,
  });

  // Fetch dynamic service list from GitHub
  const { data: repoTree, isLoading } = useRepoTree();
  const services = repoTree?.services || { AWS: [], Azure: [] };

  useEffect(() => {
    if (repoTree?.services) {
      const allServices = [...repoTree.services.AWS, ...repoTree.services.Azure];
      const totalReqs = allServices.reduce((sum, s) => sum + s.requirementsCount, 0);

      setSummary({
        totalServices: allServices.length,
        compliantServices: allServices.filter(s => s.hasAssessment).length,
        partialCompliantServices: 0,
        notCompliantServices: 0,
        totalRequirements: totalReqs,
        criticalRequirements: Math.floor(totalReqs * 0.1),
        highRequirements: Math.floor(totalReqs * 0.25),
        mediumRequirements: Math.floor(totalReqs * 0.4),
        lowRequirements: Math.floor(totalReqs * 0.25),
      });
    }
  }, [repoTree]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar services={services} />

      <main className="lg:pl-64 pt-16">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Compliance Dashboard
            </h1>
            <p className="mt-1 text-gray-500">
              Overview of cloud service compliance assessments and security requirements
            </p>
          </div>

          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatsCard
                  title="Total Services"
                  value={summary.totalServices}
                  icon={Shield}
                  variant="default"
                />
                <StatsCard
                  title="Compliant"
                  value={summary.compliantServices}
                  icon={CheckCircle2}
                  variant="success"
                />
                <StatsCard
                  title="Partial Compliant"
                  value={summary.partialCompliantServices}
                  icon={AlertTriangle}
                  variant="warning"
                />
                <StatsCard
                  title="Not Compliant"
                  value={summary.notCompliantServices}
                  icon={XCircle}
                  variant="error"
                />
              </div>

              {/* Charts and Lists */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ComplianceChart
                      compliant={summary.compliantServices}
                      partialCompliant={summary.partialCompliantServices}
                      notCompliant={summary.notCompliantServices}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements by Severity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <span className="text-sm text-gray-600">Critical</span>
                        </div>
                        <span className="font-semibold">{summary.criticalRequirements}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-orange-500" />
                          <span className="text-sm text-gray-600">High</span>
                        </div>
                        <span className="font-semibold">{summary.highRequirements}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <span className="text-sm text-gray-600">Medium</span>
                        </div>
                        <span className="font-semibold">{summary.mediumRequirements}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span className="text-sm text-gray-600">Low</span>
                        </div>
                        <span className="font-semibold">{summary.lowRequirements}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Service Lists */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-bold">
                        AWS
                      </span>
                      AWS Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ServiceList services={services.AWS} showProvider={false} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                        Az
                      </span>
                      Azure Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {services.Azure.length > 0 ? (
                      <ServiceList services={services.Azure} showProvider={false} />
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        No Azure services configured
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
