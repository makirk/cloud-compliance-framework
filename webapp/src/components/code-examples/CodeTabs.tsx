'use client';

import { useState } from 'react';
import { CodeViewer } from './CodeViewer';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, Folder, FileCode } from 'lucide-react';

interface CodeFile {
  path: string;
  content: string;
  language: string;
}

interface CodeTabsProps {
  files: CodeFile[];
}

export function CodeTabs({ files }: CodeTabsProps) {
  // Group files by language/type
  const groupedFiles = files.reduce<Record<string, CodeFile[]>>((acc, file) => {
    const group = getGroupName(file.path, file.language);
    if (!acc[group]) acc[group] = [];
    acc[group].push(file);
    return acc;
  }, {});

  const groups = Object.keys(groupedFiles);

  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(
    files.length > 0 ? files[0] : null
  );
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(groups)
  );

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No code examples available
      </div>
    );
  }

  const toggleGroup = (group: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(group)) {
      newExpanded.delete(group);
    } else {
      newExpanded.add(group);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <div className="flex gap-4 border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* File Explorer Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-gray-50">
        <div className="p-3 border-b border-gray-200 bg-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Code Examples</h3>
        </div>
        <div className="p-2 overflow-y-auto max-h-[600px]">
          {groups.map((group) => {
            const isExpanded = expandedGroups.has(group);
            const groupFiles = groupedFiles[group];

            return (
              <div key={group} className="mb-1">
                {/* Language/Framework folder */}
                <button
                  onClick={() => toggleGroup(group)}
                  className="flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-gray-200 rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  )}
                  <Folder className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="font-medium text-gray-700 truncate">{group}</span>
                  <span className="ml-auto text-xs text-gray-500">{groupFiles.length}</span>
                </button>

                {/* Files in this group */}
                {isExpanded && (
                  <div className="ml-6 mt-1 space-y-0.5">
                    {groupFiles.map((file) => {
                      const fileName = file.path.split('/').pop() || file.path;
                      const isSelected = selectedFile?.path === file.path;

                      return (
                        <button
                          key={file.path}
                          onClick={() => setSelectedFile(file)}
                          className={cn(
                            'flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded transition-colors',
                            isSelected
                              ? 'bg-blue-100 text-blue-700'
                              : 'hover:bg-gray-200 text-gray-700'
                          )}
                        >
                          <FileCode className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{fileName}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Code Preview */}
      <div className="flex-1 min-w-0">
        {selectedFile ? (
          <>
            {/* File header */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {selectedFile.path.split('/').pop()}
                </span>
                <span className="text-xs text-gray-500 ml-auto">
                  {getGroupName(selectedFile.path, selectedFile.language)}
                </span>
              </div>
            </div>
            {/* Code viewer */}
            <div className="p-4">
              <CodeViewer
                code={selectedFile.content}
                language={selectedFile.language}
                fileName={selectedFile.path.split('/').pop() || ''}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a file to preview
          </div>
        )}
      </div>
    </div>
  );
}

function getGroupName(path: string, language: string): string {
  // Check path first for more accurate grouping
  if (path.includes('/terraform/')) return 'Terraform';
  if (path.includes('/cdk/')) return 'AWS CDK';
  if (path.includes('/arm/')) return 'ARM Templates';

  // Check by file extension
  if (path.endsWith('.tf')) return 'Terraform';
  if (path.endsWith('.json') && path.includes('/arm/')) return 'ARM Templates';
  if (path.endsWith('.py') && path.includes('/cdk/')) return 'AWS CDK';

  // Fallback to language detection
  switch (language.toLowerCase()) {
    case 'terraform':
    case 'hcl':
      return 'Terraform';
    case 'python':
      // If Python is in a CDK context, label it as AWS CDK
      if (path.includes('cdk') || path.includes('stack')) return 'AWS CDK';
      return 'Python';
    case 'json':
      // If JSON is in ARM context
      if (path.includes('arm') || path.includes('template')) return 'ARM Templates';
      return 'JSON';
    case 'yaml':
    case 'yml':
      return 'CloudFormation';
    default:
      return 'Other';
  }
}
