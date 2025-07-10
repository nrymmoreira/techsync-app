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

export const CurrencySelect = styled.select`
  width: 100%;
  padding: 0.875rem 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.input.background;
  }};
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    if (props.$hasError) return theme.colors.input.borderError;
    return theme.colors.input.border;
  }};
  border-radius: 8px;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.input.borderFocus;
    }};
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.input.backgroundFocus;
    }};
    box-shadow: 0 0 0 3px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryLight;
    }};
  }

  &:hover:not(:focus) {
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.input.borderHover;
    }};
  }

  option {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surface;
    }};
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textPrimary;
    }};
    padding: 0.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9375rem;
    padding: 0.75rem 0.875rem;
  }
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