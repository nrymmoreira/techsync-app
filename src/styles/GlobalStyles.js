import styled, { createGlobalStyle } from 'styled-components';
import { getTheme } from './themes';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => getTheme(props.$isDarkMode).colors.background};
    color: ${props => getTheme(props.$isDarkMode).colors.textPrimary};
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
    transition: all 0.3s ease;
  }

  button:focus-visible {
    outline: 2px solid ${props => getTheme(props.$isDarkMode).colors.primary};
    outline-offset: 2px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }

  input:focus, textarea:focus, select:focus {
    outline: 2px solid ${props => getTheme(props.$isDarkMode).colors.primary};
    outline-offset: 2px;
  }

  /* Acessibilidade - Redução de movimento */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Scrollbar personalizada */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => getTheme(props.$isDarkMode).colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => getTheme(props.$isDarkMode).colors.textTertiary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => getTheme(props.$isDarkMode).colors.primary};
  }
`;

// Legacy colors for backward compatibility (will be removed gradually)
export const colors = {
  primary: '#F97316',
  background: '#090909',
  textPrimary: '#F5F5F5',
  gray: '#4E5669',
  textSecondary: '#D9D9D9'
};

export const fonts = {
  primary: "'Prompt', sans-serif",
  secondary: "'Inter', sans-serif"
};

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  large: '1200px'
};