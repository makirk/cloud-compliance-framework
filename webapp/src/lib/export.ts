import { jsPDF } from 'jspdf';
import { Assessment, Requirement } from '@/types';

export function exportRequirementsToCSV(requirements: Requirement[], filename = 'requirements.csv'): void {
  const headers = ['ID', 'Type', 'Title', 'Severity', 'Service', 'Provider', 'Applicable Standards', 'Description', 'Source URL'];

  const rows = requirements.map(req => [
    req.id,
    req.type === 'SEC' ? 'Security' : 'Operational',
    `"${req.title.replace(/"/g, '""')}"`,
    req.severity,
    req.service,
    req.provider,
    `"${req.applicableStandards.join(', ')}"`,
    `"${req.description.replace(/"/g, '""')}"`,
    req.sourceUrl,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
}

export function exportAssessmentToPDF(assessment: Assessment): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;

  // Title
  doc.setFontSize(20);
  doc.text(`${assessment.provider} ${assessment.service} Compliance Assessment`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Last reviewed
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Last Reviewed: ${assessment.lastReviewed}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Frameworks
  doc.setTextColor(0);
  assessment.frameworks.forEach((framework) => {
    // Framework name
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(framework.name, 20, yPosition);
    yPosition += 8;

    // Status
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const statusColor = getStatusColorRGB(framework.status);
    doc.setTextColor(statusColor.r, statusColor.g, statusColor.b);
    doc.text(`Status: ${framework.status}`, 20, yPosition);
    doc.setTextColor(0);
    yPosition += 10;

    // Details table
    if (framework.details.length > 0) {
      framework.details.forEach((detail) => {
        doc.setFontSize(10);
        doc.text(`• ${detail.level}: ${detail.status}`, 25, yPosition);
        yPosition += 6;
      });
      yPosition += 5;
    }

    // Source URL
    if (framework.sourceUrl) {
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 255);
      doc.text(`Source: ${framework.sourceUrl}`, 20, yPosition);
      doc.setTextColor(0);
      yPosition += 15;
    }

    // Check for page break
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
  });

  doc.save(`${assessment.provider}-${assessment.service}-assessment.pdf`);
}

export function exportRequirementsToPDF(requirements: Requirement[], title = 'Requirements'): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;

  // Title
  doc.setFontSize(18);
  doc.text(title, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Requirements
  requirements.forEach((req, index) => {
    // Check for page break
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // ID, Type, and Severity
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(req.id, 20, yPosition);

    // Type
    const typeColor = req.type === 'SEC' ? { r: 59, g: 130, b: 246 } : { r: 147, g: 51, b: 234 };
    doc.setTextColor(typeColor.r, typeColor.g, typeColor.b);
    doc.setFontSize(9);
    doc.text(`[${req.type === 'SEC' ? 'Security' : 'Operational'}]`, 45, yPosition);

    // Severity
    const severityColor = getSeverityColorRGB(req.severity);
    doc.setTextColor(severityColor.r, severityColor.g, severityColor.b);
    doc.text(`[${req.severity}]`, 85, yPosition);
    doc.setTextColor(0);
    yPosition += 6;

    // Title
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const titleLines = doc.splitTextToSize(req.title, pageWidth - 40);
    doc.text(titleLines, 20, yPosition);
    yPosition += titleLines.length * 5;

    // Description
    doc.setFontSize(9);
    doc.setTextColor(80);
    const descLines = doc.splitTextToSize(req.description, pageWidth - 40);
    const maxDescLines = descLines.slice(0, 3);
    doc.text(maxDescLines, 20, yPosition);
    yPosition += maxDescLines.length * 4 + 8;
    doc.setTextColor(0);
  });

  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function getStatusColorRGB(status: string): { r: number; g: number; b: number } {
  const lower = status.toLowerCase();
  if (lower === 'compliant' || lower === 'authorized' || lower === 'in scope') {
    return { r: 34, g: 197, b: 94 }; // green
  }
  if (lower.includes('partial')) {
    return { r: 234, g: 179, b: 8 }; // yellow
  }
  return { r: 239, g: 68, b: 68 }; // red
}

function getSeverityColorRGB(severity: string): { r: number; g: number; b: number } {
  switch (severity.toLowerCase()) {
    case 'critical':
      return { r: 239, g: 68, b: 68 }; // red
    case 'high':
      return { r: 249, g: 115, b: 22 }; // orange
    case 'medium':
      return { r: 234, g: 179, b: 8 }; // yellow
    case 'low':
      return { r: 59, g: 130, b: 246 }; // blue
    default:
      return { r: 107, g: 114, b: 128 }; // gray
  }
}
