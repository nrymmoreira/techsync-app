import styled from 'styled-components';
import { getTheme } from '../../styles/themes';
import { fonts, breakpoints } from '../../styles/GlobalStyles';

export const SelectContainer = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 1.25rem;
  }
`;

export const SelectLabel = styled.label`
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

export const SelectButton = styled.button`
  width: 100%;
  padding: 0.875rem 1rem;
  font-family: ${fonts.secondary};
  font-size: 1rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.input.background;
  }};
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    if (props.$hasError) return theme.colors.input.borderError;
    if (props.$isOpen) return theme.colors.input.borderFocus;
    return theme.colors.input.border;
  }};
  border-radius: 8px;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;

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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  span {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9375rem;
    padding: 0.75rem 0.875rem;
  }
`;

export const SelectIcon = styled.span`
  font-size: 1.25rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  transition: transform 0.3s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  margin-left: 0.75rem;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.125rem;
    margin-left: 0.5rem;
  }
`;

export const SelectDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.input.borderFocus;
  }};
  border-radius: 8px;
  margin-top: 0.25rem;
  box-shadow: 0 4px 20px ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.shadow;
  }};
  max-height: 200px;
  overflow-y: auto;
  animation: slideDown 0.2s ease-out;
  backdrop-filter: none;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Scrollbar personalizada */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceHover;
    }};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textTertiary;
    }};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
  }
`;

export const SelectOption = styled.div`
  padding: 0.75rem 1rem;
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isSelected ? theme.colors.primary : theme.colors.textPrimary;
  }};
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    if (props.$isSelected) return theme.colors.primaryLight;
    return 'transparent';
  }};
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isSelected ? theme.colors.primary : 'transparent';
  }};

  &:hover {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return props.$isSelected ? theme.colors.primaryLight : theme.colors.surfaceHover;
    }};
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return props.$isSelected ? theme.colors.primary : theme.colors.textPrimary;
    }};
  }

  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.625rem 0.875rem;
    font-size: 0.875rem;
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