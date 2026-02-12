'use client';

import { Requirement } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { SeverityBadge, Badge } from '@/components/ui/Badge';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RequirementCardProps {
  requirement: Requirement;
  onClick?: () => void;
  compact?: boolean;
}

export function RequirementCard({
  requirement,
  onClick,
  compact = false,
}: RequirementCardProps) {
  return (
    <Card
      hover={!!onClick}
      onClick={onClick}
      className={cn('transition-all', onClick && 'cursor-pointer')}
    >
      <CardContent className={compact ? 'py-3' : 'py-4'}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-sm font-semibold text-blue-600">
                {requirement.id}
              </span>
              <SeverityBadge severity={requirement.severity} />
            </div>

            <h4 className="font-medium text-gray-900 mb-1">
              {requirement.title}
            </h4>

            {!compact && (
              <>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {requirement.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {requirement.applicableStandards.slice(0, 3).map((std) => (
                    <Badge key={std} size="sm">
                      {std}
                    </Badge>
                  ))}
                  {requirement.applicableStandards.length > 3 && (
                    <Badge size="sm">
                      +{requirement.applicableStandards.length - 3} more
                    </Badge>
                  )}
                </div>
              </>
            )}
          </div>

          {onClick ? (
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          ) : requirement.sourceUrl ? (
            <a
              href={requirement.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
