import styled from 'styled-components';
import { getTheme } from '../../styles/themes';
import { fonts, breakpoints } from '../../styles/GlobalStyles';

export const ProfileContainer = styled.main`
  min-height: 100vh;
  padding: 100px 3rem 3rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};

   @media (max-width: ${breakpoints.mobile}) {
    padding: 80px 1rem 40px; 
  }
`;

export const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  width: 100%;
  align-items: flex-start;
  position: relative;
  padding-left: 18%;

  @media (max-width: ${breakpoints.tablet}) {
    padding-left: 0;
    padding-right: 0;
    justify-items: center;
    gap: 0;
  
  }


  @media (max-width: ${breakpoints.tablet}) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const ProfileHeader = styled.div`
  position: fixed;
  max-width: 18%;
  display: flex;
  justify-items: flex-start;
  flex-direction: row;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    justify-content: center;
    position: relative;
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const ProfilePictureSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${breakpoints.desktop}) {
    align-items: center;
  }
`;

export const ProfilePictureContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const ProfilePicture = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border: 4px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${breakpoints.desktop}) {
    width: 10rem;
    height: 10rem;
  }
`;

export const ProfilePictureGradient = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }}, ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }});
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textTertiary;
  }};
`;

export const CameraButton = styled.button`
  position: absolute;
  bottom: -0.5rem;
  right: -0.5rem;
  width: 3rem;
  height: 3rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primary;
  }};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.shadow;
  }};

  &:hover {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryHover;
    }};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.shadow;
    }};
  }

  span {
    font-size: 1.25rem;
  }
`;

export const ProfileInfo = styled.div`
  text-align: center;

  @media (min-width: ${breakpoints.desktop}) {
    text-align: center;
  }
`;

export const ProfileName = styled.h2`
  font-family: ${fonts.primary};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
`;

export const ProfileEmail = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textTertiary;
  }};
`;

export const TabNavigation = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;


export const TabList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-family: ${fonts.primary};
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isActive ? theme.colors.primary : theme.colors.surface;
  }};
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isActive ? 'white' : theme.colors.textSecondary;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isActive ? theme.colors.primary : theme.colors.surfaceBorder;
  }};
  box-shadow: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isActive ? `0 4px 12px ${theme.colors.shadow}` : 'none';
  }};

  &:hover {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return props.$isActive ? theme.colors.primaryHover : theme.colors.surfaceHover;
    }};
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return props.$isActive ? 'white' : theme.colors.textPrimary;
    }};
    transform: translateY(-1px);
  }

  span {
    font-size: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    width: 100%;    
    span {
      font-size: 0.875rem;
    }
  }
`;

export const ContentSection = styled.div`
  width: 100%;
`;