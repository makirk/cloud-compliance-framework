import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getStatusColor(status: string): string {
  const lower = status.toLowerCase();
  if (lower === 'compliant' || lower === 'authorized' || lower === 'in scope') {
    return 'text-green-600 bg-green-50 border-green-200';
  }
  if (lower.includes('partial')) {
    return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  }
  return 'text-red-600 bg-red-50 border-red-200';
}

export function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'text-red-700 bg-red-100 border-red-300';
    case 'high':
      return 'text-orange-700 bg-orange-100 border-orange-300';
    case 'medium':
      return 'text-yellow-700 bg-yellow-100 border-yellow-300';
    case 'low':
      return 'text-blue-700 bg-blue-100 border-blue-300';
    default:
      return 'text-gray-700 bg-gray-100 border-gray-300';
  }
}

export function getProviderColor(provider: string): string {
  switch (provider.toUpperCase()) {
    case 'AWS':
      return 'text-orange-700 bg-orange-50 border-orange-200';
    case 'AZURE':
      return 'text-blue-700 bg-blue-50 border-blue-200';
    default:
      return 'text-gray-700 bg-gray-50 border-gray-200';
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  // Fallback for older browsers
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  return new Promise((resolve, reject) => {
    document.execCommand('copy') ? resolve() : reject();
    textArea.remove();
  });
}
