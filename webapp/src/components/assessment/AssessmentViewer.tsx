'use client';

import { Assessment } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { Calendar, ExternalLink } from 'lucide-react';

interface AssessmentViewerProps {
  assessment: Assessment;
}

export function AssessmentViewer({ assessment }: AssessmentViewerProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Calendar className="w-4 h-4" />
        <span>Last reviewed: {formatDate(assessment.lastReviewed)}</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {assessment.frameworks.map((framework) => (
          <Card key={framework.name}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>{framework.name}</CardTitle>
                <StatusBadge status={framework.status} />
              </div>
            </CardHeader>
            <CardContent>
              {framework.details.length > 0 && (
                <div className="mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-medium text-gray-600">
                          Level
                        </th>
                        <th className="text-left py-2 font-medium text-gray-600">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {framework.details.map((detail, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="py-2 text-gray-700">{detail.level}</td>
                          <td className="py-2">
                            <StatusBadge status={detail.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {framework.sourceUrl && (
                <a
                  href={framework.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  View source
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
