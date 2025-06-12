import React from 'react';
import { StyledButton, ButtonIcon } from './Button.styles';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  ariaLabel,
  $isDarkMode,
  ...props 
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $isDarkMode={$isDarkMode}
      disabled={disabled}
      aria-label={ariaLabel || children}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <ButtonIcon $position="left" className="material-symbols-outlined">
          {icon}
        </ButtonIcon>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <ButtonIcon $position="right" className="material-symbols-outlined">
          {icon}
        </ButtonIcon>
      )}
    </StyledButton>
  );
};

export default Button;