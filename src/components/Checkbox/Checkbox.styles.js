import styled from 'styled-components';
import { getTheme } from '../../styles/themes';
import { fonts, breakpoints } from '../../styles/GlobalStyles';

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 0.625rem;
    margin-bottom: 1.25rem;
  }
`;

export const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:focus-visible + label > div {
    outline: 2px solid ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    outline-offset: 2px;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$disabled ? theme.colors.textDisabled : theme.colors.textPrimary;
  }};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  line-height: 1.5;
  user-select: none;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8125rem;
    gap: 0.625rem;
  }
`;

export const CheckboxIcon = styled.div`
  width: 20px;
  height: 20px;
  min-width: 20px;
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    if (props.$disabled) return theme.colors.textDisabled;
    if (props.$checked) return theme.colors.primary;
    return theme.colors.textTertiary;
  }};
  border-radius: 4px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    if (props.$disabled) return theme.colors.surfaceHover;
    if (props.$checked) return theme.colors.primary;
    return 'transparent';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin-top: 0.125rem;

  span {
    font-size: 0.875rem;
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.background;
    }};
    line-height: 1;
  }

  &:hover {
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      if (props.$disabled) return theme.colors.textDisabled;
      return theme.colors.primary;
    }};
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 18px;
    height: 18px;
    min-width: 18px;
    
    span {
      font-size: 0.8125rem;
    }
  }
`;