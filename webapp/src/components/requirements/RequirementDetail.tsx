'use client';

import { Requirement } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { SeverityBadge, Badge, ProviderBadge } from '@/components/ui/Badge';
import { ExternalLink, FileText, Shield, Tag } from 'lucide-react';

interface RequirementDetailProps {
  requirement: Requirement;
}

export function RequirementDetail({ requirement }: RequirementDetailProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-mono text-lg font-bold text-blue-600">
                {requirement.id}
              </span>
              <Badge variant={requirement.type === 'SEC' ? 'blue' : 'purple'}>
                {requirement.type === 'SEC' ? 'Security' : 'Operational'}
              </Badge>
              <SeverityBadge severity={requirement.severity} />
              <ProviderBadge provider={requirement.provider} />
            </div>
            <CardTitle className="text-xl">{requirement.title}</CardTitle>
          </div>

          {requirement.sourceUrl && (
            <a
              href={requirement.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 shrink-0"
            >
              View source
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Service */}
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-gray-500">Service</h4>
            <p className="text-gray-900">{requirement.service}</p>
          </div>
        </div>

        {/* Description */}
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
            <p className="text-gray-900 leading-relaxed">
              {requirement.description}
            </p>
          </div>
        </div>

        {/* Applicable Standards */}
        {requirement.applicableStandards.length > 0 && (
          <div className="flex items-start gap-3">
            <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Applicable Standards
              </h4>
              <div className="flex flex-wrap gap-2">
                {requirement.applicableStandards.map((std) => (
                  <Badge key={std}>{std}</Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
