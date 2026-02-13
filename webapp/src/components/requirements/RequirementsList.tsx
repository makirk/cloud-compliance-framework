'use client';

import { useState } from 'react';
import { Requirement, Severity, RequirementType } from '@/types';
import { RequirementCard } from './RequirementCard';
import { RequirementDetail } from './RequirementDetail';
import { Button } from '@/components/ui/Button';
import { Filter, X } from 'lucide-react';

interface RequirementsListProps {
  requirements: Requirement[];
}

const SEVERITY_ORDER: Severity[] = ['Critical', 'High', 'Medium', 'Low'];
const TYPE_ORDER: RequirementType[] = ['SEC', 'OPS'];

export function RequirementsList({ requirements }: RequirementsListProps) {
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
  const [severityFilter, setSeverityFilter] = useState<Severity[]>([]);
  const [typeFilter, setTypeFilter] = useState<RequirementType[]>([]);

  const filteredRequirements = requirements.filter((req) => {
    const matchesSeverity = severityFilter.length === 0 || severityFilter.includes(req.severity);
    const matchesType = typeFilter.length === 0 || typeFilter.includes(req.type);
    return matchesSeverity && matchesType;
  });

  const toggleSeverityFilter = (severity: Severity) => {
    setSeverityFilter((prev) =>
      prev.includes(severity)
        ? prev.filter((s) => s !== severity)
        : [...prev, severity]
    );
  };

  const toggleTypeFilter = (type: RequirementType) => {
    setTypeFilter((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSeverityFilter([]);
    setTypeFilter([]);
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
      <div className="space-y-3 mb-4">
        {/* Type filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>Type:</span>
          </div>
          {TYPE_ORDER.map((type) => (
            <Button
              key={type}
              variant={typeFilter.includes(type) ? 'primary' : 'outline'}
              size="sm"
              onClick={() => toggleTypeFilter(type)}
            >
              {type === 'SEC' ? 'Security' : 'Operational'}
            </Button>
          ))}
        </div>

        {/* Severity filter */}
        <div className="flex items-center gap-3 flex-wrap">
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
        </div>

        {/* Clear filters button */}
        {(severityFilter.length > 0 || typeFilter.length > 0) && (
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear all filters
            </Button>
          </div>
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
