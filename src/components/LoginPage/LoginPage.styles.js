import styled from 'styled-components';
import { getTheme } from '../../styles/themes';
import { fonts, breakpoints } from '../../styles/GlobalStyles';

export const LoginContainer = styled.main`
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
  margin-top: 2%;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
    margin-top: 20%;
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

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  align-items: flex-start;
  position: relative;
  padding-left: 50%;

  @media (max-width: ${breakpoints.desktop}) {
    gap: 3rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 500px;
    padding-left: 0;
    justify-items: center;
  }
`;

export const TextSection = styled.div`
  animation: fadeInLeft 1s ease-out;
  position: fixed;
  max-width: 45%;
  justify-items: flex-start;

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    text-align: center;
    justify-items: center;
    position: relative;
    max-width: 80%;
  }
`;

export const FormSection = styled.div`
  animation: fadeInRight 1s ease-out;

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const MainTitle = styled.h1`
  font-family: ${fonts.primary};
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 2.25rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.75rem;
    margin-bottom: 1rem;
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
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.6;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin-bottom: 0;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 1rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.9375rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

export const FormContainer = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

export const FormTitle = styled.h2`
  font-family: ${fonts.primary};
  font-size: 1.75rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 0.5rem;
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

export const FormDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.5;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
  }
`;

export const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primary;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryHover;
    }};
  }

  &:focus-visible {
    outline: 2px solid ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    outline-offset: 2px;
    border-radius: 2px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8125rem;
  }
`;

export const LoginFooter = styled.div`
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
`;

export const FooterText = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin: 0;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.875rem;
  }
`;

export const FooterLink = styled.button`
  background: none;
  border: none;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primary;
  }};
  font-family: ${fonts.secondary};
  font-size: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryHover;
    }};
  }

  &:focus-visible {
    outline: 2px solid ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;