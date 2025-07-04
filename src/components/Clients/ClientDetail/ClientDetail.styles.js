import styled from 'styled-components';
import { getTheme } from '../../../styles/themes';
import { fonts, breakpoints } from '../../../styles/GlobalStyles';

export const DetailContainer = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
`;

export const DetailContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const DetailHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: wrap;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceHover;
    }};
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    transform: translateY(-1px);
  }

  span {
    font-size: 1.25rem;
  }
`;

export const HeaderContent = styled.div`
  flex: 1;
`;

export const ClientTitle = styled.h1`
  font-family: ${fonts.primary};
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 0.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

export const ClientSubtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};

  span {
    font-size: 1rem;
    opacity: 0.7;
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
    button {
      flex: 1;
    }
  }
`;

export const ClientInfo = styled.div`
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
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: center;
  }
`;

export const ClientAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primary;
  }};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.primary};
  font-weight: 700;
  font-size: 2rem;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.tablet}) {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    margin: 0 auto;
  }
`;

export const ClientDetails = styled.div``;

export const ClientName = styled.h2`
  font-family: ${fonts.primary};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 0.25rem;
`;

export const ClientAddress = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  line-height: 1.4;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: ${breakpoints.tablet}) {
    align-items: center;
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
`;

export const ContactIcon = styled.span`
  font-size: 1rem;
  opacity: 0.7;
`;

export const ContactsSection = styled.div`
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
  margin-bottom: 1.5rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
`;

export const SectionTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ContactCard = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ContactHeader = styled.div`
  margin-bottom: 0.75rem;
`;

export const ContactName = styled.h4`
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin: 0 0 0.25rem 0;
`;

export const ContactRole = styled.span`
  font-family: ${fonts.secondary};
  font-size: 0.8125rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
`;

export const ContactDetails = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: inherit;

  div {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  span {
    font-size: 1rem;
    opacity: 0.7;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const ObservationsSection = styled.div`
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
  margin-bottom: 1.5rem;
`;

export const ObservationsText = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  line-height: 1.6;
  margin: 0;
`;

export const TabsSection = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 12px;
  overflow: hidden;
`;

export const TabsList = styled.div`
  display: flex;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border-bottom: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 1rem 1.5rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isActive ? theme.colors.surface : 'transparent';
  }};
  border: none;
  border-bottom: 3px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isActive ? theme.colors.primary : 'transparent';
  }};
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isActive ? theme.colors.textPrimary : theme.colors.textSecondary;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surface;
    }};
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textPrimary;
    }};
  }

  @media (max-width: ${breakpoints.mobile}) {
    border-bottom: none;
    border-left: 3px solid ${props => {
      const theme = getTheme(props.$isDarkMode);
      return props.$isActive ? theme.colors.primary : 'transparent';
    }};
    text-align: left;
  }
`;

export const TabContent = styled.div`
  padding: 1.5rem;
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const ProjectCard = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.shadow;
    }};
  }
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const ProjectTitle = styled.h4`
  font-family: ${fonts.secondary};
  font-size: 1rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin: 0 0 0.5rem 0;
`;

export const ProjectStatus = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-family: ${fonts.secondary};
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => {
    const theme = getTheme(props.$isDarkMode);
    switch (props.$status) {
      case 'success':
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
        `;
      case 'warning':
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      case 'error':
        return `
          background: ${theme.colors.error}20;
          color: ${theme.colors.error};
        `;
      case 'info':
      default:
        return `
          background: ${theme.colors.info}20;
          color: ${theme.colors.info};
        `;
    }
  }}
`;

export const ProjectDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export const ProjectProgress = styled.div`
  margin-bottom: 1rem;
`;

export const ProgressBar = styled.div`
  width: 100%;
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
`;

export const ProjectDates = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-family: ${fonts.secondary};
  font-size: 0.8125rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};

  span {
    font-size: 0.875rem;
    opacity: 0.7;
  }
`;

export const ProjectActions = styled.div`
  button {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surface;
    }};
    border: 1px solid ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceBorder;
    }};
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textSecondary;
    }};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      background: ${props => {
        const theme = getTheme(props.$isDarkMode);
        return theme.colors.surfaceHover;
      }};
      border-color: ${props => {
        const theme = getTheme(props.$isDarkMode);
        return theme.colors.primary;
      }};
      color: ${props => {
        const theme = getTheme(props.$isDarkMode);
        return theme.colors.primary;
      }};
    }

    span {
      font-size: 1rem;
    }
  }
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