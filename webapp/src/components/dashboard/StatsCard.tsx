import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const variantStyles = {
  default: {
    card: 'border-gray-200',
    icon: 'bg-gray-100 text-gray-600',
    value: 'text-gray-900',
  },
  success: {
    card: 'border-green-200',
    icon: 'bg-green-100 text-green-600',
    value: 'text-green-600',
  },
  warning: {
    card: 'border-yellow-200',
    icon: 'bg-yellow-100 text-yellow-600',
    value: 'text-yellow-600',
  },
  error: {
    card: 'border-red-200',
    icon: 'bg-red-100 text-red-600',
    value: 'text-red-600',
  },
};

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = 'default',
}: StatsCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'bg-white rounded-lg border p-6 shadow-sm',
        styles.card
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={cn('mt-2 text-3xl font-bold', styles.value)}>
            {value}
          </p>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
          {trend && (
            <p
              className={cn(
                'mt-2 text-sm',
                trend.value >= 0 ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.value >= 0 ? '+' : ''}
              {trend.value}% {trend.label}
            </p>
          )}
        </div>

        {Icon && (
          <div className={cn('p-3 rounded-lg', styles.icon)}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
}
