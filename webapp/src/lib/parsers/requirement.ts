import { Requirement, Severity, Provider } from '@/types';

export function parseRequirement(content: string, provider: Provider, service: string): Requirement {
  const lines = content.split('\n');

  // Extract title from first heading
  const titleMatch = content.match(/^#\s+([^\n]+)/m);
  const fullTitle = titleMatch ? titleMatch[1].trim() : 'Unknown Requirement';

  // Extract ID from title (e.g., "EC2.1: EBS snapshots..." -> "EC2.1")
  const idMatch = fullTitle.match(/^([A-Z0-9]+\.\d+)/);
  const id = idMatch ? idMatch[1] : 'Unknown';

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
    .map(f => parseRequirement(f.content, provider, service))
    .sort((a, b) => {
      // Sort by ID numerically (EC2.1, EC2.2, EC2.10, etc.)
      const aNum = parseInt(a.id.split('.')[1] || '0');
      const bNum = parseInt(b.id.split('.')[1] || '0');
      return aNum - bNum;
    });
}
