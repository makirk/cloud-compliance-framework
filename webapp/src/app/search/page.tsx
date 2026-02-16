'use client';

import { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { Button } from '@/components/ui/Button';
import { Filter, X } from 'lucide-react';
import { Requirement, Provider, Severity, ServiceInfo } from '@/types';

const DEMO_SERVICES: Record<Provider, ServiceInfo[]> = {
  AWS: [
    { provider: 'AWS', name: 'EC2', path: 'AWS/EC2', hasAssessment: true, requirementsCount: 11, codeExamplesCount: 6 },
    { provider: 'AWS', name: 'S3', path: 'AWS/S3', hasAssessment: true, requirementsCount: 5, codeExamplesCount: 0 },
    { provider: 'AWS', name: 'IAM', path: 'AWS/IAM', hasAssessment: true, requirementsCount: 9, codeExamplesCount: 0 },
  ],
  Azure: [],
};

// Demo requirements for search
const ALL_REQUIREMENTS: Requirement[] = [
  {
    id: 'EC2.1',
    title: 'EBS snapshots should not be publicly restorable',
    type: 'SEC',
    severity: 'Critical',
    service: 'EC2',
    provider: 'AWS',
    applicableStandards: ['AWS Foundational Security Best Practices v1.0.0'],
    description: 'This control checks whether Amazon Elastic Block Store (EBS) snapshots are not publicly restorable.',
    sourceUrl: 'https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-1',
  },
  {
    id: 'EC2.2',
    title: 'VPC default security groups should not allow inbound or outbound traffic',
    type: 'SEC',
    severity: 'High',
    service: 'EC2',
    provider: 'AWS',
    applicableStandards: ['AWS Foundational Security Best Practices v1.0.0'],
    description: 'This control checks that the default security group of a VPC does not allow inbound or outbound traffic.',
    sourceUrl: 'https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-2',
  },
  {
    id: 'S3.1',
    title: 'S3 general purpose buckets should have block public access settings enabled',
    type: 'SEC',
    severity: 'Medium',
    service: 'S3',
    provider: 'AWS',
    applicableStandards: ['AWS Foundational Security Best Practices v1.0.0'],
    description: 'This control checks whether an Amazon S3 general purpose bucket has block public access settings enabled.',
    sourceUrl: 'https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html#s3-1',
  },
  {
    id: 'IAM.1',
    title: 'IAM policies should not allow full administrative privileges',
    type: 'SEC',
    severity: 'High',
    service: 'IAM',
    provider: 'AWS',
    applicableStandards: ['AWS Foundational Security Best Practices v1.0.0', 'CIS AWS Foundations Benchmark'],
    description: 'This control checks whether the default version of IAM policies has administrator access.',
    sourceUrl: 'https://docs.aws.amazon.com/securityhub/latest/userguide/iam-controls.html#iam-1',
  },
  {
    id: 'IAM.2',
    title: 'IAM users should not have IAM policies attached',
    type: 'SEC',
    severity: 'Low',
    service: 'IAM',
    provider: 'AWS',
    applicableStandards: ['AWS Foundational Security Best Practices v1.0.0'],
    description: 'This control checks that none of your IAM users have policies attached.',
    sourceUrl: 'https://docs.aws.amazon.com/securityhub/latest/userguide/iam-controls.html#iam-2',
  },
];

const SEVERITY_OPTIONS: Severity[] = ['Critical', 'High', 'Medium', 'Low'];
const PROVIDER_OPTIONS: Provider[] = ['AWS', 'Azure'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [severityFilter, setSeverityFilter] = useState<Severity[]>([]);
  const [providerFilter, setProviderFilter] = useState<Provider[]>([]);

  // Set up Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(ALL_REQUIREMENTS, {
      keys: ['id', 'title', 'description', 'service', 'applicableStandards'],
      threshold: 0.3,
      includeScore: true,
    });
  }, []);

  // Filter results
  const results = useMemo(() => {
    let filtered = ALL_REQUIREMENTS;

    // Apply text search
    if (query) {
      const searchResults = fuse.search(query);
      filtered = searchResults.map((r) => r.item);
    }

    // Apply severity filter
    if (severityFilter.length > 0) {
      filtered = filtered.filter((r) => severityFilter.includes(r.severity));
    }

    // Apply provider filter
    if (providerFilter.length > 0) {
      filtered = filtered.filter((r) => providerFilter.includes(r.provider));
    }

    return filtered;
  }, [query, severityFilter, providerFilter, fuse]);

  const toggleSeverity = (severity: Severity) => {
    setSeverityFilter((prev) =>
      prev.includes(severity)
        ? prev.filter((s) => s !== severity)
        : [...prev, severity]
    );
  };

  const toggleProvider = (provider: Provider) => {
    setProviderFilter((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider]
    );
  };

  const clearFilters = () => {
    setSeverityFilter([]);
    setProviderFilter([]);
  };

  const hasFilters = severityFilter.length > 0 || providerFilter.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar services={DEMO_SERVICES} />

      <main className="lg:pl-64 pt-16">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: 'Search' }]} className="mb-6" />

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Search Requirements
            </h1>
            <p className="mt-1 text-gray-500">
              Search across all compliance requirements by ID, title, or description
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3 mb-6">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search by requirement ID, title, or keyword..."
              className="flex-1"
              autoFocus
            />
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {hasFilters && (
                <span className="ml-2 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center">
                  {severityFilter.length + providerFilter.length}
                </span>
              )}
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Filters</h3>
                {hasFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-1" />
                    Clear all
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Severity Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Severity</h4>
                  <div className="flex flex-wrap gap-2">
                    {SEVERITY_OPTIONS.map((severity) => (
                      <Button
                        key={severity}
                        variant={severityFilter.includes(severity) ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => toggleSeverity(severity)}
                      >
                        {severity}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Provider Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Provider</h4>
                  <div className="flex flex-wrap gap-2">
                    {PROVIDER_OPTIONS.map((provider) => (
                      <Button
                        key={provider}
                        variant={providerFilter.includes(provider) ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => toggleProvider(provider)}
                      >
                        {provider}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <SearchResults results={results} query={query} />
        </div>
      </main>
    </div>
  );
}
