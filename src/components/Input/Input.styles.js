import styled from 'styled-components';
import { getTheme } from '../../styles/themes';
import { fonts, breakpoints } from '../../styles/GlobalStyles';

export const InputContainer = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 1.25rem;
  }
`;

export const InputLabel = styled.label`
  display: block;
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 0.5rem;
  
  span {
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8125rem;
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: ${props => props.$hasIcon ? '0.875rem 1rem 0.875rem 3rem' : '0.875rem 1rem'};
  padding-right: ${props => props.$isPasswordType ? '3rem' : '1rem'};
  font-family: ${fonts.secondary};
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
  transition: all 0.3s ease;

  &::placeholder {
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textSecondary;
    }};
    opacity: 0.7;
  }

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

  &[aria-invalid="true"] {
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.input.borderError;
    }};
    
    &:focus {
      border-color: ${props => {
        const theme = getTheme(props.$isDarkMode);
        return theme.colors.input.borderError;
      }};
      box-shadow: 0 0 0 3px ${props => {
        const theme = getTheme(props.$isDarkMode);
        return 'rgba(239, 68, 68, 0.1)';
      }};
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9375rem;
    padding: ${props => props.$hasIcon ? '0.75rem 0.875rem 0.75rem 2.75rem' : '0.75rem 0.875rem'};
    padding-right: ${props => props.$isPasswordType ? '2.75rem' : '0.875rem'};
  }
`;

export const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  font-size: 1.25rem;
  pointer-events: none;
  z-index: 1;

  @media (max-width: ${breakpoints.mobile}) {
    left: 0.875rem;
    font-size: 1.125rem;
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textPrimary;
    }};
  }

  &:focus-visible {
    outline: 2px solid ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    outline-offset: 2px;
  }

  span {
    font-size: 1.25rem;
    line-height: 1;
  }

  @media (max-width: ${breakpoints.mobile}) {
    right: 0.875rem;
    
    span {
      font-size: 1.125rem;
    }
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 0.5rem;
  font-family: ${fonts.secondary};
  font-size: 0.8125rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.error;
  }};
  display: flex;
  align-items: center;
  gap: 0.375rem;

  &::before {
    content: 'error';
    font-family: 'Material Symbols Outlined';
    font-size: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`;

export const PasswordRequirements = styled.div`
  margin-top: 0.75rem;
  padding: 0.875rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border-radius: 6px;
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
`;

export const RequirementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${fonts.secondary};
  font-size: 0.8125rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isValid ? theme.colors.success : theme.colors.textSecondary;
  }};
  margin-bottom: 0.375rem;
  transition: color 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }

  span {
    font-size: 1rem;
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return props.$isValid ? theme.colors.success : theme.colors.textSecondary;
    }};
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.75rem;
    
    span {
      font-size: 0.9375rem;
    }
  }
`;