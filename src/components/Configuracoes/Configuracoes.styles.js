import styled from 'styled-components';
import { getTheme } from '../../styles/themes';
import { fonts, breakpoints } from '../../styles/GlobalStyles';

export const ConfiguracoesContainer = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
`;

export const ConfiguracoesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const PageTitle = styled.h1`
  font-family: ${fonts.primary};
  font-size: 2rem;
  font-weight: 700;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.75rem;
  }
`;

export const PageDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 1rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  line-height: 1.5;
`;