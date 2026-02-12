import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  default: 'bg-gray-100 text-gray-700 border-gray-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-md border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const lower = status.toLowerCase();
  let variant: BadgeProps['variant'] = 'default';

  if (lower === 'compliant' || lower === 'authorized' || lower === 'in scope') {
    variant = 'success';
  } else if (lower.includes('partial')) {
    variant = 'warning';
  } else if (lower.includes('not') || lower === 'not compliant') {
    variant = 'error';
  }

  return <Badge variant={variant}>{status}</Badge>;
}

export function SeverityBadge({ severity }: { severity: string }) {
  const lower = severity.toLowerCase();
  let variant: BadgeProps['variant'] = 'default';

  switch (lower) {
    case 'critical':
      variant = 'error';
      break;
    case 'high':
      variant = 'warning';
      break;
    case 'medium':
      variant = 'info';
      break;
    case 'low':
      variant = 'success';
      break;
  }

  return <Badge variant={variant}>{severity}</Badge>;
}

export function ProviderBadge({ provider }: { provider: string }) {
  const upper = provider.toUpperCase();
  const variant: BadgeProps['variant'] = upper === 'AWS' ? 'warning' : 'info';

  return <Badge variant={variant}>{provider}</Badge>;
}
