'use client';

import { useState } from 'react';
import { Requirement, Severity } from '@/types';
import { RequirementCard } from './RequirementCard';
import { RequirementDetail } from './RequirementDetail';
import { Button } from '@/components/ui/Button';
import { Filter, X } from 'lucide-react';

interface RequirementsListProps {
  requirements: Requirement[];
}

const SEVERITY_ORDER: Severity[] = ['Critical', 'High', 'Medium', 'Low'];

export function RequirementsList({ requirements }: RequirementsListProps) {
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
  const [severityFilter, setSeverityFilter] = useState<Severity[]>([]);

  const filteredRequirements = requirements.filter((req) => {
    if (severityFilter.length === 0) return true;
    return severityFilter.includes(req.severity);
  });

  const toggleSeverityFilter = (severity: Severity) => {
    setSeverityFilter((prev) =>
      prev.includes(severity)
        ? prev.filter((s) => s !== severity)
        : [...prev, severity]
    );
  };

  const clearFilters = () => {
    setSeverityFilter([]);
  };

  if (selectedRequirement) {
    return (
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedRequirement(null)}
          className="mb-4"
        >
          <X className="w-4 h-4 mr-1" />
          Back to list
        </Button>
        <RequirementDetail requirement={selectedRequirement} />
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Filter className="w-4 h-4" />
          <span>Severity:</span>
        </div>
        {SEVERITY_ORDER.map((severity) => (
          <Button
            key={severity}
            variant={severityFilter.includes(severity) ? 'primary' : 'outline'}
            size="sm"
            onClick={() => toggleSeverityFilter(severity)}
          >
            {severity}
          </Button>
        ))}
        {severityFilter.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear
          </Button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredRequirements.length} of {requirements.length} requirements
      </p>

      {/* Requirements list */}
      <div className="space-y-3">
        {filteredRequirements.map((req) => (
          <RequirementCard
            key={req.id}
            requirement={req}
            onClick={() => setSelectedRequirement(req)}
          />
        ))}
      </div>

      {filteredRequirements.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No requirements match the selected filters
        </div>
      )}
    </div>
  );
}
