// React automatic JSX runtime in use — explicit import not required
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';
import { getTheme } from '../../../styles/themes';

const PieChart = ({ data, title }) => {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  const COLORS = [
    theme.colors.primary,
    theme.colors.info,
    theme.colors.success,
    theme.colors.warning,
    theme.colors.error,
    '#8b5cf6',
    '#06b6d4',
    '#84cc16'
  ];

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
          <p style={{ margin: 0, fontWeight: '600' }}>{payload[0].name}</p>
          <p style={{ margin: 0, color: theme.colors.textSecondary }}>
            {payload[0].value} ({((payload[0].value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '1rem', 
        justifyContent: 'center',
        marginTop: '1rem'
      }}>
        {payload.map((entry, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: theme.colors.textSecondary
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: entry.color
            }} />
            {entry.value}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;