import { Requirement, Severity, Provider, RequirementType } from '@/types';

/**
 * Extracts requirement type and ID from file path or content
 * Supports both old format (EC2.1.md) and new format (EC2.SEC.1.md or EC2.OPS.1.md)
 */
function extractTypeAndId(content: string, filePath?: string): {
  type: RequirementType;
  id: string;
} {
  // Try new format first from file path
  // Pattern: [Service].[SEC|OPS].[Number].md
  if (filePath) {
    const newFormatMatch = filePath.match(/\/([A-Z][a-zA-Z0-9]*)\.(SEC|OPS)\.(\d+)\.md$/);
    if (newFormatMatch) {
      const [, serviceName, type, number] = newFormatMatch;
      return {
        type: type as RequirementType,
        id: `${serviceName}.${type}.${number}`
      };
    }
  }

  // Fall back to extracting from heading
  const titleMatch = content.match(/^#\s+([^\n]+)/m);
  const fullTitle = titleMatch ? titleMatch[1].trim() : 'Unknown';

  // Try new format in heading: EC2.SEC.1.RequirementName or EC2.OPS.1.RequirementName
  const newHeadingMatch = fullTitle.match(/^([A-Z][a-zA-Z0-9]*)\.(SEC|OPS)\.(\d+)/);
  if (newHeadingMatch) {
    const [, serviceName, type, number] = newHeadingMatch;
    return {
      type: type as RequirementType,
      id: `${serviceName}.${type}.${number}`
    };
  }

  // Old format in heading: EC2.1
  const oldHeadingMatch = fullTitle.match(/^([A-Z0-9]+\.\d+)/);
  return {
    type: 'SEC', // Default old files to Security
    id: oldHeadingMatch ? oldHeadingMatch[1] : 'Unknown'
  };
}

export function parseRequirement(content: string, provider: Provider, service: string, filePath?: string): Requirement {
  const lines = content.split('\n');

  // Extract type and ID (supports both old and new naming conventions)
  const { type, id } = extractTypeAndId(content, filePath);

  // Extract title from first heading
  const titleMatch = content.match(/^#\s+([^\n]+)/m);
  const fullTitle = titleMatch ? titleMatch[1].trim() : 'Unknown Requirement';

  // Extract the descriptive title (after the colon)
  const title = fullTitle.includes(':')
    ? fullTitle.split(':').slice(1).join(':').trim()
    : fullTitle;

  // Extract severity
  const severityMatch = content.match(/\*\*Severity:\*\*\s*(\w+)/i);
  const severityStr = severityMatch ? severityMatch[1] : 'Medium';
  const severity = parseSeverity(severityStr);

  // Extract applicable standards
  const standardsMatch = content.match(/\*\*Applicable Standards:\*\*\s*([^\n]+)/i);
  const standardsStr = standardsMatch ? standardsMatch[1] : '';
  const applicableStandards = standardsStr
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // Extract description
  const descriptionMatch = content.match(/## Description\s*\n([\s\S]*?)(?=\n(?:Source:|##|$))/i);
  const description = descriptionMatch
    ? descriptionMatch[1].trim()
    : extractParagraph(content);

  // Extract source URL
  const sourceMatch = content.match(/Source:\s*(https?:\/\/[^\s\n]+)/i);
  const sourceUrl = sourceMatch ? sourceMatch[1] : '';

  return {
    id,
    title,
    type,
    severity,
    service,
    provider,
    applicableStandards,
    description,
    sourceUrl,
  };
}

function parseSeverity(str: string): Severity {
  const lower = str.toLowerCase();
  if (lower === 'critical') return 'Critical';
  if (lower === 'high') return 'High';
  if (lower === 'medium') return 'Medium';
  if (lower === 'low') return 'Low';
  return 'Medium';
}

function extractParagraph(content: string): string {
  const lines = content.split('\n');
  let inDescription = false;
  const descLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith('## Description') || line.startsWith('**Description')) {
      inDescription = true;
      continue;
    }

    if (inDescription) {
      if (line.startsWith('#') || line.startsWith('Source:')) {
        break;
      }
      if (line.trim()) {
        descLines.push(line.trim());
      }
    }
  }

  if (descLines.length > 0) {
    return descLines.join(' ');
  }

  // Fallback: find first paragraph after metadata
  const paragraphMatch = content.match(/\n\n([^#*\n][^\n]+)/);
  return paragraphMatch ? paragraphMatch[1].trim() : '';
}

export function parseRequirements(
  files: { path: string; content: string }[],
  provider: Provider,
  service: string
): Requirement[] {
  return files
    .filter(f => f.path.endsWith('.md'))
    .map(f => parseRequirement(f.content, provider, service, f.path))
    .sort((a, b) => {
      // Sort by type first (SEC before OPS), then by ID numerically
      if (a.type !== b.type) {
        return a.type === 'SEC' ? -1 : 1;
      }
      // Extract numeric part for sorting (handles both old and new formats)
      const aNum = parseInt(a.id.split('.').pop() || '0');
      const bNum = parseInt(b.id.split('.').pop() || '0');
      return aNum - bNum;
    });
}
