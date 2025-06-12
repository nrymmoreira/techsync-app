import styled from 'styled-components';
import { getTheme } from '../../styles/themes';
import { fonts, breakpoints } from '../../styles/GlobalStyles';

export const LandingContainer = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const ThemeToggleContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 10;

  @media (max-width: ${breakpoints.mobile}) {
    top: 1rem;
    right: 1rem;
  }
`;

export const ContentContainer = styled.div`
  text-align: center;
  max-width: 800px;
  width: 100%;
  animation: fadeInUp 1s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 600px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%;
  }
`;

export const MainTitle = styled.h1`
  font-family: ${fonts.primary};
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 3rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2.5rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  @media (max-width: 360px) {
    font-size: 1.75rem;
  }
`;

export const HighlightText = styled.span`
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primary;
  }};
`;

export const Description = styled.p`
  font-family: ${fonts.secondary};
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.6;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 1.125rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1rem;
    margin-bottom: 2.5rem;
    max-width: 500px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9375rem;
    margin-bottom: 2rem;
    line-height: 1.5;
    max-width: 100%;
  }

  @media (max-width: 360px) {
    font-size: 0.875rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 1.25rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 1rem;
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
      max-width: 280px;
    }
  }

  @media (max-width: 360px) {
    button {
      max-width: 100%;
    }
  }
`;