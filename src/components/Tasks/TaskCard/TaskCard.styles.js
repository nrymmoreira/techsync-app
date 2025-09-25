import styled from 'styled-components';
import { getTheme } from '../../../styles/themes';
import { fonts, breakpoints } from '../../../styles/GlobalStyles';

export const TaskCardContainer = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isDragging ? theme.colors.surfaceHover : theme.colors.background;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$isDragging ? theme.colors.primary : theme.colors.surfaceBorder;
  }};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$isDragging ? 
    '0 8px 25px rgba(0, 0, 0, 0.15)' : 
    '0 1px 3px rgba(0, 0, 0, 0.1)'
  };
  transform: ${props => props.$isDragging ? 'rotate(5deg)' : 'rotate(0deg)'};
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;

  &:hover {
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.shadow;
    }};
    
    .task-edit-button {
      opacity: 1 !important;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TaskTitle = styled.h4`
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
`;

export const TaskDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.8125rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
`;

export const TaskMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
`;

export const TaskAssignee = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;

  span {
    font-size: 0.875rem;
    pointer-events: none;
  }
`;

export const TaskDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;

  span {
    font-size: 0.875rem;
    pointer-events: none;
  }
`;

export const TaskActions = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: auto;
  display: flex;
  gap: 0.25rem;
`;

export const ActionButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${props => {
    if (props.$variant === 'delete') {
      return props.$isDarkMode ? 'rgba(239, 68, 68, 0.8)' : 'rgba(239, 68, 68, 0.9)';
    }
    return props.$isDarkMode ? 'rgba(78, 86, 105, 0.8)' : 'rgba(255, 255, 255, 0.9)';
  }};
  border: none;
  color: ${props => {
    if (props.$variant === 'delete') {
      return 'white';
    }
    return props.$isDarkMode ? '#F5F5F5' : '#1E293B';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  span {
    font-size: 0.75rem;
  }
`;