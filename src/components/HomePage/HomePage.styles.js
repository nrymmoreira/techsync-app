import styled from 'styled-components';
import { getTheme } from '../../styles/themes';
import { fonts, breakpoints } from '../../styles/GlobalStyles';

export const HomeContainer = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
`;

export const HomeContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 2rem 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1.5rem 1rem;
  }
`;

export const WelcomeSection = styled.section`
  text-align: left;
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease-out;

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
    margin-bottom: 3rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 2rem;
    text-align: center;
  }
`;

export const WelcomeTitle = styled.h1`
  font-family: ${fonts.primary};
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2.25rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const HighlightText = styled.span`
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primary;
  }};
`;

export const WelcomeDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.6;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  max-width: 600px;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 1.125rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9375rem;
    max-width: 100%;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(432px, 1fr));
  gap: 2rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

export const FeatureCard = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    box-shadow: 0 8px 32px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.shadow;
    }};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

export const CardIcon = styled.span`
  font-size: 3rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textTertiary;
  }};
  margin-bottom: 1.5rem;
  display: block;
  transition: color 0.3s ease;

  ${FeatureCard}:hover & {
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.5rem;
    margin-bottom: 1.25rem;
  }
`;

export const CardTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

export const CardDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9375rem;
    margin-bottom: 1.5rem;
  }
`;

export const CardButton = styled.button`
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isActive ? theme.colors.primary : theme.colors.surfaceHover;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isActive ? theme.colors.primary : theme.colors.surfaceBorder;
  }};
  border-radius: 8px;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isActive ? 'white' : theme.colors.textSecondary;
  }};
  font-family: ${fonts.secondary};
  font-weight: 500;
  font-size: 0.9375rem;
  cursor: ${props => props.$isActive ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;
  opacity: ${props => props.$isActive ? 1 : 0.7};

  &:hover {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return props.$isActive ? theme.colors.primaryHover : theme.colors.surface;
    }};
    transform: ${props => props.$isActive ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return props.$isActive ? `0 4px 15px ${theme.colors.primaryShadow}` : 'none';
    }};
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
  }
`;