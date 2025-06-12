import styled from 'styled-components';
import { getTheme } from '../../styles/themes';
import { fonts, breakpoints } from '../../styles/GlobalStyles';

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return `${theme.colors.background}CC`;
  }};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
`;

export const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0.875rem 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem 1rem;
  }
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LogoIcon = styled.span`
  font-size: 1.75rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primary;
  }};
`;

export const LogoText = styled.span`
  font-family: ${fonts.primary};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

export const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$active ? theme.colors.primary : 'transparent';
  }};
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$active ? theme.colors.background : theme.colors.textSecondary;
  }};

  &:hover {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return props.$active ? theme.colors.primaryHover : theme.colors.surfaceHover;
    }};
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return props.$active ? theme.colors.background : theme.colors.textPrimary;
    }};
  }
`;

export const NavIcon = styled.span`
  font-size: 1.25rem;
`;

export const NavText = styled.span`
  font-family: ${fonts.secondary};
  font-weight: 500;
  font-size: 0.9375rem;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 0.75rem;
  }
`;

export const NotificationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  transition: all 0.3s ease;

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
    transform: translateY(-1px);
  }

  span {
    font-size: 1.25rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 36px;
    height: 36px;
    
    span {
      font-size: 1.125rem;
    }
  }
`;

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 50px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceHover;
    }};
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    transform: translateY(-1px);
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 0.5rem;
    padding: 0.375rem;
  }
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primary;
  }};
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.secondary};
  font-weight: 600;
  font-size: 0.875rem;

  @media (max-width: ${breakpoints.mobile}) {
    width: 28px;
    height: 28px;
    font-size: 0.8125rem;
  }
`;

export const UserName = styled.span`
  font-family: ${fonts.secondary};
  font-weight: 500;
  font-size: 0.9375rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;