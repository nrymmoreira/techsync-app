import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ToggleContainer, ToggleButton, ToggleIcon } from './ThemeToggle.styles';

const ThemeToggle = ({ size = 'medium', ...props }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleContainer {...props}>
      <ToggleButton
        onClick={toggleTheme}
        $size={size}
        $isDarkMode={isDarkMode}
        aria-label={isDarkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
        title={isDarkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      >
        <ToggleIcon className="material-symbols-outlined">
          {isDarkMode ? 'dark_mode' : 'light_mode'}
        </ToggleIcon>
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;