import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';
import { getTheme } from '../../../styles/themes';

const LineChart = ({ data, title, lines = [] }) => {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  const defaultLines = [
    { dataKey: 'receitas', stroke: theme.colors.success, name: 'Receitas' },
    { dataKey: 'despesas', stroke: theme.colors.error, name: 'Despesas' },
    { dataKey: 'lucro', stroke: theme.colors.primary, name: 'Lucro' }
  ];

  const chartLines = lines.length > 0 ? lines : defaultLines;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: theme.colors.surface,
          border: `1px solid ${theme.colors.surfaceBorder}`,
          borderRadius: '8px',
          padding: '0.75rem',
          boxShadow: `0 4px 20px ${theme.colors.shadow}`,
          color: theme.colors.textPrimary
        }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              margin: 0, 
              color: entry.color,
              fontSize: '0.875rem'
            }}>
              {entry.name}: R$ {entry.value?.toLocaleString('pt-BR')}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme.colors.surfaceBorder}
            opacity={0.3}
          />
          <XAxis 
            dataKey="name"
            tick={{ fill: theme.colors.textSecondary, fontSize: 12 }}
            axisLine={{ stroke: theme.colors.surfaceBorder }}
            tickLine={{ stroke: theme.colors.surfaceBorder }}
          />
          <YAxis 
            tick={{ fill: theme.colors.textSecondary, fontSize: 12 }}
            axisLine={{ stroke: theme.colors.surfaceBorder }}
            tickLine={{ stroke: theme.colors.surfaceBorder }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              color: theme.colors.textSecondary,
              fontSize: '0.875rem'
            }}
          />
          {chartLines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              strokeWidth={2}
              dot={{ fill: line.stroke, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: line.stroke, strokeWidth: 2 }}
              name={line.name}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;