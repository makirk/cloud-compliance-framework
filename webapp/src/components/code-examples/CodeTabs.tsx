'use client';

import { useState } from 'react';
import { CodeViewer } from './CodeViewer';
import { cn } from '@/lib/utils';

interface CodeFile {
  path: string;
  content: string;
  language: string;
}

interface CodeTabsProps {
  files: CodeFile[];
}

export function CodeTabs({ files }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Group files by language/type
  const groupedFiles = files.reduce<Record<string, CodeFile[]>>((acc, file) => {
    const group = getGroupName(file.path, file.language);
    if (!acc[group]) acc[group] = [];
    acc[group].push(file);
    return acc;
  }, {});

  const groups = Object.keys(groupedFiles);

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No code examples available
      </div>
    );
  }

  const currentFile = files[activeTab];
  const fileName = currentFile.path.split('/').pop() || '';

  return (
    <div>
      {/* Tab navigation */}
      <div className="flex flex-wrap gap-1 mb-4 border-b border-gray-200">
        {files.map((file, index) => {
          const name = file.path.split('/').pop() || file.path;
          return (
            <button
              key={file.path}
              onClick={() => setActiveTab(index)}
              className={cn(
                'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
                activeTab === index
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Code viewer */}
      <CodeViewer
        code={currentFile.content}
        language={currentFile.language}
        fileName={fileName}
      />
    </div>
  );
}

function getGroupName(path: string, language: string): string {
  if (path.includes('/terraform/')) return 'Terraform';
  if (path.includes('/cdk/')) return 'AWS CDK (Python)';
  if (path.includes('/arm/')) return 'ARM Templates';

  switch (language) {
    case 'terraform':
    case 'hcl':
      return 'Terraform';
    case 'python':
      return 'Python';
    case 'json':
      return 'JSON';
    default:
      return 'Other';
  }
}
