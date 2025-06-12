import styled from 'styled-components';
import { getTheme } from '../../styles/themes';
import { fonts, breakpoints } from '../../styles/GlobalStyles';

export const StyledButton = styled.button`
  font-family: ${fonts.secondary};
  font-weight: 600;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  text-transform: none;
  letter-spacing: 0.025em;
  position: relative;
  overflow: hidden;

  /* Tamanhos */
  ${props => {
    switch (props.$size) {
      case 'small':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          min-height: 36px;
        `;
      case 'large':
        return `
          padding: 1rem 2rem;
          font-size: 1.125rem;
          min-height: 52px;
        `;
      case 'medium':
      default:
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          min-height: 44px;
        `;
    }
  }}

  /* Variantes */
  ${props => {
    const theme = getTheme(props.$isDarkMode);
    
    switch (props.$variant) {
      case 'secondary':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};

          &:hover:not(:disabled) {
            background: ${theme.colors.primary};
            color: ${theme.colors.background};
            transform: translateY(-2px);
            box-shadow: 0 8px 25px ${theme.colors.primaryShadow};
          }

          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 4px 15px ${theme.colors.primaryShadow};
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.textSecondary};
          border: 2px solid ${theme.colors.textTertiary};

          &:hover:not(:disabled) {
            color: ${theme.colors.textPrimary};
            border-color: ${theme.colors.textPrimary};
            transform: translateY(-2px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'primary':
      default:
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.background};
          border: 2px solid ${theme.colors.primary};

          &:hover:not(:disabled) {
            background: ${theme.colors.primaryHover};
            border-color: ${theme.colors.primaryHover};
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
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
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }

  &:active:not(:disabled)::before {
    width: 300px;
    height: 300px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    ${props => {
      switch (props.$size) {
        case 'small':
          return `
            padding: 0.5rem 0.875rem;
            font-size: 0.8125rem;
            min-height: 34px;
          `;
        case 'large':
          return `
            padding: 0.875rem 1.75rem;
            font-size: 1rem;
            min-height: 48px;
          `;
        case 'medium':
        default:
          return `
            padding: 0.625rem 1.25rem;
            font-size: 0.9375rem;
            min-height: 40px;
          `;
      }
    }}
  }

  @media (max-width: ${breakpoints.mobile}) {
    ${props => {
      switch (props.$size) {
        case 'small':
          return `
            padding: 0.4375rem 0.75rem;
            font-size: 0.75rem;
            min-height: 32px;
          `;
        case 'large':
          return `
            padding: 0.75rem 1.5rem;
            font-size: 0.9375rem;
            min-height: 44px;
          `;
        case 'medium':
        default:
          return `
            padding: 0.5625rem 1rem;
            font-size: 0.875rem;
            min-height: 36px;
          `;
      }
    }}
  }
`;

export const ButtonIcon = styled.span`
  font-size: 1.25em;
  line-height: 1;
  
  ${props => props.$position === 'left' && `
    margin-right: -0.125rem;
  `}
  
  ${props => props.$position === 'right' && `
    margin-left: -0.125rem;
  `}

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.125em;
  }
`;