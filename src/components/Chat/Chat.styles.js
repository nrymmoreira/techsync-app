import styled, { keyframes } from 'styled-components';
import { getTheme } from '../../styles/themes';
import { fonts, breakpoints } from '../../styles/GlobalStyles';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-3px);
  }
  60% {
    transform: translateY(-2px);
  }
`;

const typing = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`;

export const ChatContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;

  @media (max-width: ${breakpoints.mobile}) {
    bottom: 1rem;
    right: 1rem;
  }
`;

export const ChatToggleButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primary;
  }};
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primaryShadow;
  }};
  transition: all 0.3s ease;
  animation: ${props => props.$isOpen ? 'none' : bounce} 2s infinite;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryShadow;
    }};
  }

  &:active {
    transform: translateY(0);
  }

  span {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 50px;
    height: 50px;
    
    span {
      font-size: 1.25rem;
    }
  }
`;

export const ChatWindow = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 400px;
  height: 600px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 16px;
  box-shadow: 0 8px 32px ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.shadow;
  }};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: ${breakpoints.tablet}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    border: none;
  }

  @media (max-width: ${breakpoints.mobile}) {
    bottom: 70px;
    width: calc(100vw - 2rem);
    height: calc(100vh - 140px);
    right: 1rem;
    border-radius: 12px;
    border: 1px solid ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceBorder;
    }};
  }
`;

export const ChatHeader = styled.div`
  padding: 1rem 1.5rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border-bottom: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const ChatTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
`;

export const ChatCloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
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

  span {
    font-size: 1rem;
  }

  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* Scrollbar personalizada */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceHover;
    }};
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

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem;
  }
`;

export const ChatMessage = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  ${props => props.$sender === 'user' && `
    flex-direction: row-reverse;
  `}
`;

export const MessageAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.$sender === 'user' ? theme.colors.primary : theme.colors.success;
  }};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.$sender === 'user' ? '1rem' : '0.75rem'};
  font-weight: 600;
  flex-shrink: 0;

  span {
    font-size: 1rem;
  }
`;

export const MessageContent = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    if (props.$sender === 'user') {
      return theme.colors.primary;
    }
    return theme.colors.surfaceHover;
  }};
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    if (props.$sender === 'user') {
      return 'white';
    }
    return theme.colors.textPrimary;
  }};
  padding: 0.75rem 1rem;
  border-radius: ${props => props.$sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px'};
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  line-height: 1.4;
  max-width: 280px;
  word-wrap: break-word;

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 220px;
    font-size: 0.8125rem;
  }
`;

export const MessageTime = styled.div`
  font-size: 0.75rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textTertiary;
  }};
  margin-top: 0.25rem;
  text-align: ${props => props.$sender === 'user' ? 'right' : 'left'};
`;

export const QuickQuestions = styled.div`
  padding: 1rem;
  border-top: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  max-height: 200px;
  overflow-y: auto;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem;
  }
`;

export const QuestionButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 8px;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.8125rem;
  line-height: 1.4;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryLight;
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

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ChatInputContainer = styled.div`
  padding: 1rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border-top: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem;
  }
`;

export const ChatInputField = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.input.background;
  }};
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.input.border;
  }};
  border-radius: 24px;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textSecondary;
    }};
  }

  &:focus {
    outline: none;
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.input.backgroundFocus;
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ChatSendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.disabled ? theme.colors.textTertiary : theme.colors.primary;
  }};
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryHover;
    }};
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  span {
    font-size: 1rem;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  font-family: ${fonts.secondary};
`;

export const TypingIndicator = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  padding: 0.75rem 1rem;
  border-radius: 16px 16px 16px 4px;
  display: flex;
  align-items: center;
`;

export const TypingDots = styled.div`
  display: flex;
  gap: 0.25rem;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textTertiary;
    }};
    animation: ${typing} 1.4s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
`;