'use client';

import Link from 'next/link';
import { Requirement } from '@/types';
import { SeverityBadge, ProviderBadge } from '@/components/ui/Badge';
import { FileText, ChevronRight } from 'lucide-react';

interface SearchResultsProps {
  results: Requirement[];
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
  if (!query) {
    return (
      <div className="text-center py-12 text-gray-500">
        Enter a search term to find requirements
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No results found for "{query}"</p>
        <p className="text-sm text-gray-400 mt-1">
          Try searching by requirement ID, title, or description
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
      </p>

      <div className="space-y-2">
        {results.map((result) => (
          <Link
            key={`${result.provider}-${result.id}`}
            href={`/${result.provider.toLowerCase()}/${result.service.toLowerCase()}`}
            className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-semibold text-blue-600">
                    {result.id}
                  </span>
                  <SeverityBadge severity={result.severity} />
                  <ProviderBadge provider={result.provider} />
                </div>

                <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {highlightMatch(result.title, query)}
                </h4>

                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {highlightMatch(result.description, query)}
                </p>

                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                  <FileText className="w-3.5 h-3.5" />
                  {result.service}
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${escapeRegex(query)})`, 'gi'));

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-100 text-yellow-800 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
