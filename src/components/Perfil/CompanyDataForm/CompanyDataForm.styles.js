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

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border-radius: 0.5rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.875rem;

  span {
    font-size: 1rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const ErrorMessage = styled.div`
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return `${theme.colors.error}15`;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.error;
  }};
  border-radius: 0.5rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.error;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
`;

export const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;

  @media (max-width: ${breakpoints.mobile}) {
    justify-content: stretch;
    
    button {
      width: 100%;
    }
  }
`;