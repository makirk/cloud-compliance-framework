'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

interface ComplianceChartProps {
  compliant: number;
  partialCompliant: number;
  notCompliant: number;
}

const COLORS = {
  compliant: '#22c55e',
  partialCompliant: '#eab308',
  notCompliant: '#ef4444',
};

export function ComplianceChart({
  compliant,
  partialCompliant,
  notCompliant,
}: ComplianceChartProps) {
  const data = [
    { name: 'Compliant', value: compliant, color: COLORS.compliant },
    { name: 'Partial Compliant', value: partialCompliant, color: COLORS.partialCompliant },
    { name: 'Not Compliant', value: notCompliant, color: COLORS.notCompliant },
  ].filter((item) => item.value > 0);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No compliance data available
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [value ?? 0, 'Services']}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-sm text-gray-700">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
