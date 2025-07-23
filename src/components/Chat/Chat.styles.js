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
    transform: translateY(-8px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #F97316, #ea6a0a);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 24px rgba(249, 115, 22, 0.4);
  transition: all 0.3s ease;
  animation: ${props => props.$isOpen ? 'none' : bounce} 3s infinite;
  position: relative;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 32px rgba(249, 115, 22, 0.5);
    background: linear-gradient(135deg, #ea6a0a, #d97706);
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }

  span {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: linear-gradient(135deg, #F97316, #ea6a0a);
    z-index: -1;
    opacity: 0.3;
    animation: pulse 2s infinite;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 52px;
    height: 52px;
    
    span {
      font-size: 1.25rem;
    }
  }
`;

export const ChatTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 0.75rem;
  padding: 0.75rem 1rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 12px;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 4px 20px ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.shadow;
  }};
  animation: ${slideUp} 0.3s ease-out;
  z-index: 1001;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 1rem;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surface;
    }};
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8125rem;
    padding: 0.625rem 0.875rem;
    right: -0.5rem;
  }
`;

export const ChatWindow = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: min(420px, calc(100vw - 2rem));
  height: min(600px, calc(100vh - 120px));
  max-width: 420px;
  max-height: 600px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 16px;
  box-shadow: 0 12px 48px ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.shadow;
  }};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: none;

  @media (max-width: ${breakpoints.tablet}) {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 1rem;
    width: calc(100vw - 2rem);
    height: calc(100vh - 100px);
    margin: 0 1rem;
    max-width: none;
    max-height: none;
    border-radius: 0;
    border: none;
  }

  @media (max-width: ${breakpoints.mobile}) {
    top: 80px;
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0.5rem;
    width: calc(100vw - 1rem);
    height: calc(100vh - 90px);
    margin: 0;
    border-radius: 0;
    border: none;
  }
`;

export const ChatHeader = styled.div`
  padding: 1.25rem 1.5rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
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
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const ChatTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
`;

export const ChatCloseButton = styled.button`
  width: 36px;
  height: 36px;
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
    transform: scale(1.05);
  }

  span {
    font-size: 1.125rem;
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
  min-height: 0;

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
  animation: ${fadeIn} 0.3s ease-out;
`;

export const MessageAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    if (props.$sender === 'user') {
      return theme.colors.primary;
    }
    return 'linear-gradient(135deg, #F97316, #ea6a0a)';
  }};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.$sender === 'user' ? '1rem' : '1rem'};
  font-weight: 600;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);

  span {
    font-size: 1.125rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 32px;
    height: 32px;
    
    span {
      font-size: 1rem;
    }
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
  padding: 0.875rem 1.125rem;
  border-radius: ${props => props.$sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px'};
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  line-height: 1.5;
  max-width: 280px;
  word-wrap: break-word;
  box-shadow: 0 2px 8px ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.shadow;
  }};

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 240px;
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
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
  opacity: 0.8;
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
  max-height: 220px;
  overflow-y: auto;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem;
    max-height: 180px;
  }
`;

export const QuestionButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.875rem 1rem;
  margin-bottom: 0.5rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 12px;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
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
    box-shadow: 0 2px 8px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.shadow;
    }};
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem 0.875rem;
    font-size: 0.8125rem;
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
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem;
  }
`;

export const ChatInputField = styled.input`
  flex: 1;
  padding: 0.875rem 1rem;
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
  font-size: 0.9375rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textSecondary;
    }};
    opacity: 0.8;
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
    box-shadow: 0 0 0 3px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryLight;
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.875rem;
    padding: 0.75rem 0.875rem;
  }
`;

export const ChatSendButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return props.disabled ? theme.colors.textTertiary : 'linear-gradient(135deg, #F97316, #ea6a0a)';
  }};
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #ea6a0a, #d97706);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    transform: none;
    box-shadow: none;
  }

  span {
    font-size: 1.125rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    
    span {
      font-size: 1rem;
    }
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
  flex: 1;
`;

export const TypingIndicator = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  padding: 0.875rem 1.125rem;
  border-radius: 18px 18px 18px 4px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.shadow;
  }};
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
      return theme.colors.primary;
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