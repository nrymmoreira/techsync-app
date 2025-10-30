import { createContext, useContext, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { getTheme } from '../../styles/themes';
import { useTheme } from '../../contexts/ThemeContext';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

const slideIn = keyframes`
  from { transform: translateY(12px); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
`;

const ToastWrap = styled.div`
  position: fixed;
  ${(p) => (p.position && p.position.includes('bottom') ? 'bottom: 16px;' : 'top: 16px;')}
  ${(p) => (p.position && p.position.includes('right') ? 'right: 16px;' : 'left: 16px;')}
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9999;
  align-items: ${(p) => (p.position && p.position.includes('right') ? 'flex-end' : 'flex-start')};
`;

const ToastItem = styled.div`
  min-width: 220px;
  max-width: 420px;
  padding: 12px 14px;
  border-radius: 8px;
  background: ${(p) => {
    const theme = getTheme(p.$isDarkMode);
    if (p.variant === 'success') return theme.colors.success;
    if (p.variant === 'error') return theme.colors.error;
    if (p.variant === 'warning') return theme.colors.warning;
    if (p.variant === 'info') return theme.colors.info;
    return theme.colors.surface;
  }};
  color: ${(p) => {
    const theme = getTheme(p.$isDarkMode);
    if (p.variant) return '#ffffff';
    return theme.colors.textPrimary;
  }};
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  animation: ${slideIn} 180ms ease-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Message = styled.div`
  margin-right: 12px;
  flex: 1 1 auto;
`;

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  &:hover { opacity: 0.85 }
`;

export function ToastProvider({ children, position = 'top-right' }) {
  const [toasts, setToasts] = useState([]);
  const { isDarkMode } = useTheme();

  const push = useCallback((message, options = {}) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, ...options }]);
    if (!options.sticky) {
      const ttl = options.duration || 4000;
      setTimeout(() => {
        setToasts((cur) => cur.filter((x) => x.id !== id));
      }, ttl);
    }
    return id;
  }, []);

  // convenience methods
  const success = useCallback((message, options = {}) => push(message, { ...options, variant: 'success' }), [push]);
  const error = useCallback((message, options = {}) => push(message, { ...options, variant: 'error' }), [push]);
  const info = useCallback((message, options = {}) => push(message, { ...options, variant: 'info' }), [push]);
  const warning = useCallback((message, options = {}) => push(message, { ...options, variant: 'warning' }), [push]);

  const remove = useCallback((id) => {
    setToasts((cur) => cur.filter((x) => x.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ push, remove, success, error, info, warning }}>
      {children}
      <ToastWrap position={position} aria-live="polite" aria-atomic="true">
        {toasts.map((t) => {
          let Icon = null;
          if (t.variant === 'success') Icon = <CheckCircle size={18} />;
          else if (t.variant === 'error') Icon = <XCircle size={18} />;
          else if (t.variant === 'info') Icon = <Info size={18} />;
          else if (t.variant === 'warning') Icon = <AlertTriangle size={18} />;

          return (
            <ToastItem key={t.id} $isDarkMode={isDarkMode} variant={t.variant} role="status">
              {Icon && <IconWrap>{Icon}</IconWrap>}
              <Message>{t.message}</Message>
              <CloseBtn aria-label="Fechar" onClick={() => remove(t.id)}>✕</CloseBtn>
            </ToastItem>
          );
        })}
      </ToastWrap>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
