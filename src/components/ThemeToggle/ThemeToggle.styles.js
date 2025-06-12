import styled from 'styled-components';
import { getTheme } from '../../styles/themes';
import { breakpoints } from '../../styles/GlobalStyles';

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 50%;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  ${props => {
    switch (props.$size) {
      case 'small':
        return `
          width: 36px;
          height: 36px;
          padding: 0.5rem;
        `;
      case 'large':
        return `
          width: 52px;
          height: 52px;
          padding: 0.875rem;
        `;
      case 'medium':
      default:
        return `
          width: 44px;
          height: 44px;
          padding: 0.75rem;
        `;
    }
  }}

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
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryShadow;
    }};
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryShadow;
    }};
  }

  &:focus-visible {
    outline: 2px solid ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    outline-offset: 2px;
  }

  /* Efeito de ondulação */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryLight;
    }};
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }

  &:active::before {
    width: 100px;
    height: 100px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    ${props => {
      switch (props.$size) {
        case 'small':
          return `
            width: 32px;
            height: 32px;
            padding: 0.375rem;
          `;
        case 'large':
          return `
            width: 48px;
            height: 48px;
            padding: 0.75rem;
          `;
        case 'medium':
        default:
          return `
            width: 40px;
            height: 40px;
            padding: 0.625rem;
          `;
      }
    }}
  }
`;

export const ToggleIcon = styled.span`
  font-size: 1.25rem;
  line-height: 1;
  z-index: 1;
  transition: transform 0.3s ease;

  ${ToggleButton}:hover & {
    transform: rotate(180deg);
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.125rem;
  }
`;