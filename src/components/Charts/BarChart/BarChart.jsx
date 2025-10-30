// React automatic JSX runtime in use — explicit import not required
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';
import { getTheme } from '../../../styles/themes';

const BarChart = ({ data, title, dataKey = 'value', nameKey = 'name' }) => {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

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
          <p style={{ margin: 0, fontWeight: '600' }}>{label}</p>
          <p style={{ margin: 0, color: theme.colors.textSecondary }}>
            {payload[0].value} projetos
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme.colors.surfaceBorder}
            opacity={0.3}
          />
          <XAxis 
            dataKey={nameKey}
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
          <Bar 
            dataKey={dataKey} 
            fill={theme.colors.primary}
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;