'use client';

import Link from 'next/link';
import { ChevronRight, FileText, Code } from 'lucide-react';
import { ServiceInfo } from '@/types';
import { StatusBadge, ProviderBadge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ServiceListProps {
  services: ServiceInfo[];
  showProvider?: boolean;
}

export function ServiceList({ services, showProvider = true }: ServiceListProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No services found
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {services.map((service) => (
        <Link
          key={`${service.provider}-${service.name}`}
          href={`/${service.provider.toLowerCase()}/${service.name.toLowerCase()}`}
          className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-center gap-4">
            {showProvider && <ProviderBadge provider={service.provider} />}

            <div>
              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {service.name}
              </h4>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  {service.requirementsCount} requirements
                </span>
                {service.codeExamplesCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Code className="w-3.5 h-3.5" />
                    {service.codeExamplesCount} examples
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {service.hasAssessment && (
              <StatusBadge status="Has Assessment" />
            )}
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </Link>
      ))}
    </div>
  );
}
