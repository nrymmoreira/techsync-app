import styled from 'styled-components';
import { getTheme } from '../../../styles/themes';
import { fonts, breakpoints } from '../../../styles/GlobalStyles';

export const TaskModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TaskModalGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TaskDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TaskDescriptionLabel = styled.label`
  display: block;
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8125rem;
  }
`;

export const TaskDescriptionTextarea = styled.textarea`
  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.input.border;
  }};
  background-color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.input.background;
  }};
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  resize: vertical;
  min-height: 80px;
  user-select: text;
  -webkit-user-select: text;
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
`;

export const TaskModalActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;