import styled from 'styled-components';
import { getTheme } from '../../styles/themes';
import { fonts, breakpoints } from '../../styles/GlobalStyles';

export const ProfileContainer = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
`;

export const ProfileContent = styled.div`
  max-width: 1536px;
  margin: 0 auto;
  padding: 1.5rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1rem;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (min-width: ${breakpoints.desktop}) {
    flex-direction: row;
  }
`;

export const ProfilePictureSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${breakpoints.desktop}) {
    align-items: flex-start;
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
`;

export const ProfileInfo = styled.div`
  text-align: center;

  @media (min-width: ${breakpoints.desktop}) {
    text-align: left;
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
  flex: 1;
`;

export const TabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
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
  }
`;

export const ContentSection = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border-radius: 0.75rem;
  padding: 1.5rem;
  backdrop-filter: blur(8px);
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};

  @media (min-width: ${breakpoints.desktop}) {
    padding: 2rem;
  }
`;

export const SectionTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormLabel = styled.label`
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textTertiary;
  }};
  pointer-events: none;
`;

export const FormInput = styled.input`
  // background: #131A24;
  color: black !important;
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.inputBackground;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.inputBorder;
  }};
  border-radius: 0.5rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  font-family: ${fonts.secondary};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textTertiary;
    }};
  }

  &:focus {
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.inputFocus;
    }};
    box-shadow: 0 0 0 2px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return `${theme.colors.inputFocus}20`;
    }};
  }
`;

export const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export const SaveButton = styled.button`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primary;
  }};
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-family: ${fonts.primary};
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
`;

export const PlaceholderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textTertiary;
  }};
`;

export const PlaceholderContent = styled.div`
  text-align: center;
`;

export const PlaceholderIcon = styled.div`
  margin: 0 auto 1rem;
  opacity: 0.5;
`;

export const PlaceholderText = styled.p`
  font-family: ${fonts.secondary};
  font-size: 1rem;
`;
// Danger Zone Styles
export const DangerZone = styled.div`
  border: 2px solid #FF4E4E ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.danger;
  }};
  border-radius: 0.75rem;
  padding: 1.5rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return `${theme.colors.danger}08`;
  }};

  @media (min-width: ${breakpoints.desktop}) {
    padding: 2rem;
  }
`;

export const DangerZoneTitle = styled.h4`
  font-family: ${fonts.primary};
  font-size: 1rem;
  font-weight: 600;
  color: #FF4E4E ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.danger;
  }};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const DangerZoneDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

export const DangerSection = styled.div`
  border: 1px solid #FF4E4E ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.danger;
  }};
  border-radius: 0.5rem;
  padding: 1.25rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return `${theme.colors.danger}05`;
  }};
`;

export const DangerSectionTitle = styled.h5`
  font-family: ${fonts.primary};
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 0.5rem;
`;

export const DangerSectionDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.8125rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin-bottom: 1rem;
  line-height: 1.4;
`;

export const DangerButton = styled.button`
  background: #FF4E4E ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.danger;
  }};
  color: #black;
  padding: 0.625rem 1.5rem;
  border-radius: 0.375rem;
  font-family: ${fonts.primary};
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.dangerHover;
    }};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return `${theme.colors.danger}40`;
    }};
  }

  &:active {
    transform: translateY(0);
  }
`;