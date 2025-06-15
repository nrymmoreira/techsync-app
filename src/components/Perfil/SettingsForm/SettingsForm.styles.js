import styled from 'styled-components';
import { getTheme } from '../../../styles/themes';
import { fonts, breakpoints } from '../../../styles/GlobalStyles';

export const FormContainer = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border-radius: 0.75rem;
  padding: 1.5rem;
  backdrop-filter: blur(8px);
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};

  @media (min-width: ${breakpoints.desktop}) {
    padding: 2rem;
  }
`;

export const SectionTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
`;

export const DangerZone = styled.div`
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.error;
  }};
  border-radius: 0.75rem;
  padding: 1.5rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return `${theme.colors.error}08`;
  }};

  @media (min-width: ${breakpoints.desktop}) {
    padding: 2rem;
  }
`;

export const DangerZoneTitle = styled.h4`
  font-family: ${fonts.primary};
  font-size: 1rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.error;
  }};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 1.25rem;
  }
`;

export const DangerZoneDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

export const DangerSection = styled.div`
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.error;
  }};
  border-radius: 0.5rem;
  padding: 1.25rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return `${theme.colors.error}05`;
  }};
`;

export const DangerSectionTitle = styled.h5`
  font-family: ${fonts.primary};
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 0.5rem;
`;

export const DangerSectionDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.8125rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin-bottom: 1rem;
  line-height: 1.4;
`;

export const DangerButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (max-width: ${breakpoints.mobile}) {
    justify-content: stretch;
    
    button {
      width: 100%;
    }
  }
`;