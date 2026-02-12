'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';

interface CodeViewerProps {
  code: string;
  language: string;
  fileName?: string;
  showLineNumbers?: boolean;
}

export function CodeViewer({
  code,
  language,
  fileName,
  showLineNumbers = true,
}: CodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>('');

  useEffect(() => {
    // Dynamic import shiki for syntax highlighting
    const highlightCode = async () => {
      try {
        const { codeToHtml } = await import('shiki');
        const html = await codeToHtml(code, {
          lang: language === 'terraform' ? 'hcl' : language,
          theme: 'github-light',
        });
        setHighlightedCode(html);
      } catch {
        // Fallback to plain text
        setHighlightedCode(`<pre><code>${escapeHtml(code)}</code></pre>`);
      }
    };

    highlightCode();
  }, [code, language]);

  const handleCopy = async () => {
    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          {fileName && (
            <span className="text-sm font-mono text-gray-600">{fileName}</span>
          )}
          <span className="text-xs px-2 py-0.5 bg-gray-200 rounded text-gray-600">
            {language}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-gray-500"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1 text-green-600" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Code content */}
      <div className="relative overflow-x-auto">
        {highlightedCode ? (
          <div
            className="p-4 text-sm font-mono [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <div className="p-4 flex">
            {showLineNumbers && (
              <div className="pr-4 text-right text-gray-400 text-sm font-mono select-none border-r border-gray-200 mr-4">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
            )}
            <pre className="text-sm font-mono text-gray-800 overflow-x-auto flex-1">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
