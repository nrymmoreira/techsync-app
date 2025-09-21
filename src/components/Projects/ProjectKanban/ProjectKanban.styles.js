import styled from 'styled-components';
import { getTheme } from '../../../styles/themes';
import { fonts, breakpoints } from '../../../styles/GlobalStyles';

export const KanbanContainer = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
`;

export const KanbanContent = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const KanbanHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: wrap;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;

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
`;

export const HeaderContent = styled.div`
  flex: 1;
`;

export const ProjectTitle = styled.h1`
  font-family: ${fonts.primary};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin: 0 0 0.25rem 0;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

export const ProjectClient = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    
    button {
      flex: 1;
    }
  }
`;

export const KanbanBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  flex: 1;
  min-height: 0;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const Column = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const ColumnHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

export const ColumnTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.$color || props.theme.colors.textPrimary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.$color};
  }
`;

export const ColumnCount = styled.span`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const AddTaskButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  margin: 1rem;
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
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  flex-shrink: 0;

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
    font-size: 1rem;
  }
`;

export const TasksList = styled.div`
  flex: 1;
  padding: 0 1rem 1rem;
  overflow-y: auto;
  min-height: 200px;
  background: ${props => props.$isDraggingOver ? 
    (props.$isDarkMode ? 'rgba(249, 115, 22, 0.05)' : 'rgba(249, 115, 22, 0.05)') : 
    'transparent'
  };
  border-radius: ${props => props.$isDraggingOver ? '8px' : '0'};
  transition: all 0.3s ease;

  /* Scrollbar personalizada */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceHover;
    }};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textTertiary;
    }};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
  }
`;

export const TaskCard = styled.div`
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

export const TaskPriority = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => `${props.$color}20`};
  color: ${props => props.$color};
  width: fit-content;
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

export const TaskDueDate = styled.div`
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

export const EmptyColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-align: center;
  min-height: 200px;
`;

export const EmptyColumnIcon = styled.span`
  font-size: 2rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textTertiary;
  }};
  margin-bottom: 0.5rem;
  opacity: 0.5;
`;

export const EmptyColumnText = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin: 0;
`;

export const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  font-family: ${fonts.secondary};

  span {
    font-size: 3rem;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.error;
  }};
  font-family: ${fonts.secondary};
  text-align: center;

  span {
    font-size: 3rem;
  }
`;

export const KanbanActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.75rem;

    button {
      width: 100%;
    }
  }
`;

export const StatusManagerSection = styled.div`
  margin-bottom: 2rem;
`;