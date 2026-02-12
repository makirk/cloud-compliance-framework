import { Assessment, Framework, ComplianceStatus, Provider, FrameworkDetail } from '@/types';

export function parseAssessment(content: string, provider: Provider, service: string): Assessment {
  const lines = content.split('\n');
  const frameworks: Framework[] = [];

  // Extract last reviewed date
  const lastReviewedMatch = content.match(/\*\*Last Reviewed:\*\*\s*(\d{4}-\d{2}-\d{2})/);
  const lastReviewed = lastReviewedMatch ? lastReviewedMatch[1] : new Date().toISOString().split('T')[0];

  // Parse frameworks (FedRAMP, SOC, etc.)
  let currentFramework: Partial<Framework> | null = null;
  let inTable = false;
  let tableHeaders: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect framework header (## FedRAMP, ## SOC, etc.)
    if (line.startsWith('## ') && !line.toLowerCase().includes('description')) {
      if (currentFramework?.name) {
        frameworks.push(currentFramework as Framework);
      }

      currentFramework = {
        name: line.replace('## ', ''),
        status: 'Not Compliant',
        details: [],
        sourceUrl: '',
      };
      inTable = false;
      tableHeaders = [];
    }

    // Detect status line
    if (line.includes('**Status:**') && currentFramework) {
      currentFramework.status = extractStatus(line);
    }

    // Detect source URL
    if (line.startsWith('Source:') && currentFramework) {
      currentFramework.sourceUrl = line.replace('Source:', '').trim();
    }

    // Parse table
    if (line.startsWith('|') && currentFramework) {
      const cells = line.split('|').map(c => c.trim()).filter(c => c);

      if (line.includes('---')) {
        inTable = true;
        continue;
      }

      if (!inTable && cells.length >= 2) {
        tableHeaders = cells;
      } else if (inTable && cells.length >= 2 && currentFramework.details) {
        const detail: FrameworkDetail = {
          level: cells[0],
          status: cells[1],
        };
        currentFramework.details.push(detail);
      }
    }
  }

  // Push last framework
  if (currentFramework?.name) {
    frameworks.push(currentFramework as Framework);
  }

  return {
    provider,
    service,
    lastReviewed,
    frameworks,
  };
}

function extractStatus(line: string): ComplianceStatus {
  const lowerLine = line.toLowerCase();

  if (lowerLine.includes('color:green') || lowerLine.includes('compliant</span>')) {
    if (lowerLine.includes('partial')) {
      return 'Partial Compliant';
    }
    return 'Compliant';
  }

  if (lowerLine.includes('color:yellow') || lowerLine.includes('partial')) {
    return 'Partial Compliant';
  }

  if (lowerLine.includes('color:red') || lowerLine.includes('not compliant')) {
    return 'Not Compliant';
  }

  // Default based on text content
  if (lowerLine.includes('compliant') && !lowerLine.includes('not') && !lowerLine.includes('partial')) {
    return 'Compliant';
  }

  return 'Not Compliant';
}

export function getOverallStatus(assessment: Assessment): ComplianceStatus {
  const statuses = assessment.frameworks.map(f => f.status);

  if (statuses.every(s => s === 'Compliant')) {
    return 'Compliant';
  }

  if (statuses.some(s => s === 'Not Compliant')) {
    return 'Not Compliant';
  }

  return 'Partial Compliant';
}
