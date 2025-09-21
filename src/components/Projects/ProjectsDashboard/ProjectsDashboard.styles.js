import styled from 'styled-components';
import { getTheme } from '../../../styles/themes';
import { fonts, breakpoints } from '../../../styles/GlobalStyles';

export const DashboardContainer = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
`;

export const DashboardContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const DashboardHeader = styled.div`
  margin-bottom: 2rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const PageTitle = styled.h1`
  font-family: ${fonts.primary};
  font-size: 2rem;
  font-weight: 700;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 0.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.75rem;
  }
`;

export const PageDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 1rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  line-height: 1.5;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9375rem;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    justify-content: flex-end;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.75rem;

    button {
      width: 100%;
    }
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
`;

export const MetricCard = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.shadow;
    }};
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1.25rem;
  }
`;

export const MetricIcon = styled.span`
  font-size: 2.5rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    switch (props.$color) {
      case 'primary':
        return theme.colors.primary;
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      case 'error':
        return theme.colors.error;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.textTertiary;
    }
  }};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const MetricContent = styled.div`
  flex: 1;
`;

export const MetricValue = styled.div`
  font-family: ${fonts.primary};
  font-size: 2rem;
  font-weight: 700;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  line-height: 1;
  margin-bottom: 0.25rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.75rem;
  }
`;

export const MetricLabel = styled.div`
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  font-weight: 500;
`;

export const MetricTrend = styled.div`
  font-family: ${fonts.secondary};
  font-size: 0.8125rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isPositive ? theme.colors.success : theme.colors.error;
  }};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;
`;

export const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 12px;
  padding: 1.5rem;
`;

export const ChartTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 1rem;
`;

export const ChartContent = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  font-family: ${fonts.secondary};
`;

export const RecentProjectsSection = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 12px;
  padding: 1.5rem;
`;

export const SectionTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 1.5rem;
`;

export const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProjectItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 12px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.shadow;
    }};
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    text-align: center;
  }
`;

export const ProjectInfo = styled.div``;

export const ProjectName = styled.h4`
  font-family: ${fonts.secondary};
  font-size: 1rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin: 0 0 0.25rem 0;
`;

export const ProjectClient = styled.span`
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
`;

export const ProjectStatus = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-family: ${fonts.secondary};
  font-size: 0.8125rem;
  font-weight: 500;
  
  ${props => {
    const theme = getTheme(props.$isDarkMode);
    switch (props.$status) {
      case 'success':
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
          border: 1px solid ${theme.colors.success}40;
        `;
      case 'warning':
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
          border: 1px solid ${theme.colors.warning}40;
        `;
      case 'info':
        return `
          background: ${theme.colors.info}20;
          color: ${theme.colors.info};
          border: 1px solid ${theme.colors.info}40;
        `;
      case 'error':
        return `
          background: ${theme.colors.error}20;
          color: ${theme.colors.error};
          border: 1px solid ${theme.colors.error}40;
        `;
      default:
        return `
          background: ${theme.colors.textTertiary}20;
          color: ${theme.colors.textTertiary};
          border: 1px solid ${theme.colors.textTertiary}40;
        `;
    }
  }}
`;

export const ProjectProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 120px;

  @media (max-width: ${breakpoints.tablet}) {
    justify-content: center;
    min-width: auto;
  }
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 3px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.info;
  }};
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
`;

export const ProgressText = styled.span`
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  min-width: 35px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
`;

export const EmptyStateIcon = styled.span`
  font-size: 3rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textTertiary;
  }};
  margin-bottom: 1rem;
  opacity: 0.5;
`;

export const EmptyStateTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 0.5rem;
`;

export const EmptyStateDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  line-height: 1.5;
  max-width: 400px;
`;