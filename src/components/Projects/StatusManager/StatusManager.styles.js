import styled from 'styled-components';
import { getTheme } from '../../../styles/themes';
import { fonts, breakpoints } from '../../../styles/GlobalStyles';

export const StatusManagerContainer = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 8px;
`;

export const StatusColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.$color};
  flex-shrink: 0;
`;

export const StatusInfo = styled.div`
  flex: 1;
`;

export const StatusName = styled.span`
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
`;

export const StatusActions = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background: transparent;
    border: 1px solid ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceBorder;
    }};
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textSecondary;
    }};
    display: flex;
    align-items: center;
    justify-content: center;
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
    }

    &:last-child:hover {
      border-color: ${props => {
        const theme = getTheme(props.$isDarkMode);
        return theme.colors.error;
      }};
      color: ${props => {
        const theme = getTheme(props.$isDarkMode);
        return theme.colors.error;
      }};
    }

    span {
      font-size: 1rem;
    }
  }
`;

export const AddStatusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: 2px dashed ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 8px;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryLight;
    }};
  }

  span {
    font-size: 1.125rem;
  }
`;

export const ColorPickerContainer = styled.div`
  margin-top: 1rem;
  
  .react-colorful {
    width: 100% !important;
    height: 200px !important;
  }
`;

export const PresetColors = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const ColorOption = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.$color};
  border: 3px solid ${props => props.$isSelected ? '#F97316' : 'transparent'};
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.$isSelected ? 'white' : 'transparent'};
    opacity: ${props => props.$isSelected ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;