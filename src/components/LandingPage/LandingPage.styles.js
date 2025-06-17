import styled, { keyframes } from 'styled-components';
import { getTheme } from '../../styles/themes';
import { fonts, breakpoints } from '../../styles/GlobalStyles';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const LandingContainer = styled.main`
  min-height: 100vh;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
  position: relative;
  overflow-x: hidden;
`;

export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const ContentContainer = styled.div`
  text-align: center;
  max-width: 1200px;
  width: 100%;
  animation: ${fadeInUp} 1s ease-out;
  position: relative;
  z-index: 1;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 800px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%;
  }
`;

export const MainTitle = styled.h1`
  font-family: ${fonts.primary};
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 3.5rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 3rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  @media (max-width: 360px) {
    font-size: 2rem;
  }
`;

export const HighlightText = styled.span`
  color: #F97316;
  background: linear-gradient(135deg, #F97316, #ea6a0a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Description = styled.p`
  font-family: ${fonts.secondary};
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 1.6;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 1.25rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.125rem;
    margin-bottom: 2.5rem;
    max-width: 600px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 2rem;
    line-height: 1.5;
    max-width: 100%;
  }

  @media (max-width: 360px) {
    font-size: 0.9375rem;
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
      max-width: 320px;
    }
  }

  @media (max-width: 360px) {
    button {
      max-width: 100%;
    }
  }
`;

export const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 3rem 1rem;
  }
`;

export const SectionTitle = styled.h2`
  font-family: ${fonts.primary};
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2.25rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const SectionSubtitle = styled.p`
  font-family: ${fonts.secondary};
  font-size: 1.125rem;
  text-align: center;
  margin-bottom: 4rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1rem;
    margin-bottom: 3rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9375rem;
    margin-bottom: 2rem;
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
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
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    border-color: #F97316;
    box-shadow: 0 12px 40px ${props => {
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
    background: linear-gradient(90deg, #F97316, #ea6a0a);
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

export const FeatureIcon = styled.span`
  font-size: 3rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textTertiary;
  }};
  margin-bottom: 1.5rem;
  display: block;
  transition: all 0.3s ease;

  ${FeatureCard}:hover & {
    color: #F97316;
    animation: ${float} 2s ease-in-out infinite;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.5rem;
    margin-bottom: 1.25rem;
  }
`;

export const FeatureTitle = styled.h3`
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

export const FeatureDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9375rem;
  }
`;

export const ValuesSection = styled.section`
  padding: 6rem 2rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 3rem 1rem;
  }
`;

export const ValuesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

export const ValuesTitle = styled.h2`
  font-family: ${fonts.primary};
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2.25rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const ValuesDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9375rem;
  }
`;

export const ValuesVisualization = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.tablet}) {
    width: 350px;
    height: 350px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 300px;
    height: 300px;
  }
`;

export const ValueCircle = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textTertiary;
  }};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  ${props => {
    switch (props.$position) {
      case 'top':
        return `
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        `;
      case 'bottom-left':
        return `
          bottom: 0;
          left: 0;
        `;
      case 'bottom-right':
        return `
          bottom: 0;
          right: 0;
        `;
      default:
        return '';
    }
  }}

  &:hover {
    border-color: #F97316;
    transform: ${props => {
      switch (props.$position) {
        case 'top':
          return 'translateX(-50%) scale(1.05)';
        case 'bottom-left':
        case 'bottom-right':
          return 'scale(1.05)';
        default:
          return 'scale(1.05)';
      }
    }};
    box-shadow: 0 0 30px rgba(249, 115, 22, 0.3);
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 175px;
    height: 175px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 150px;
    height: 150px;
  }
`;

export const ValueLabel = styled.span`
  font-family: ${fonts.primary};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const BrandSection = styled.section`
  padding: 6rem 2rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 3rem 1rem;
  }
`;

export const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const BrandCard = styled.div`
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
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    border-color: #F97316;
    box-shadow: 0 8px 32px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.shadow;
    }};
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

export const BrandCardIcon = styled.span`
  font-size: 2.5rem;
  color: #F97316;
  margin-bottom: 1.5rem;
  display: block;
  transition: transform 0.3s ease;

  ${BrandCard}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 1.25rem;
  }
`;

export const BrandCardTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1.375rem;
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

export const BrandCardDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9375rem;
  }
`;

export const MissionSection = styled.section`
  padding: 6rem 2rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 3rem 1rem;
  }
`;

export const MissionContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

export const MissionText = styled.p`
  font-family: ${fonts.secondary};
  font-size: 1.25rem;
  line-height: 1.7;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin-bottom: 1.5rem;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.125rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const MissionHighlight = styled.span`
  color: #F97316;
  font-weight: 600;
  background: linear-gradient(135deg, #F97316, #ea6a0a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;