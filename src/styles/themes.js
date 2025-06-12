// Theme definitions for TechSync
export const themes = {
  dark: {
    colors: {
      primary: '#F97316',
      primaryHover: '#ea6a0a',
      primaryLight: 'rgba(249, 115, 22, 0.1)',
      primaryShadow: 'rgba(249, 115, 22, 0.3)',
      
      background: '#090909',
      backgroundSecondary: '#0a0a0a',
      backgroundTertiary: '#0d0d0d',
      
      surface: 'rgba(78, 86, 105, 0.05)',
      surfaceHover: 'rgba(78, 86, 105, 0.1)',
      surfaceBorder: 'rgba(78, 86, 105, 0.2)',
      surfaceBorderHover: 'rgba(78, 86, 105, 0.3)',
      
      textPrimary: '#F5F5F5',
      textSecondary: '#D9D9D9',
      textTertiary: '#4E5669',
      textDisabled: 'rgba(78, 86, 105, 0.5)',
      
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      overlay: 'rgba(9, 9, 9, 0.8)',
      shadow: 'rgba(0, 0, 0, 0.3)',
      
      input: {
        background: 'rgba(78, 86, 105, 0.1)',
        backgroundFocus: 'rgba(78, 86, 105, 0.15)',
        border: 'rgba(78, 86, 105, 0.3)',
        borderHover: 'rgba(78, 86, 105, 0.5)',
        borderFocus: '#F97316',
        borderError: '#ef4444'
      }
    }
  },
  
  light: {
    colors: {
      primary: '#F97316',
      primaryHover: '#ea6a0a',
      primaryLight: 'rgba(249, 115, 22, 0.1)',
      primaryShadow: 'rgba(249, 115, 22, 0.2)',
      
      background: '#FFFFFF',
      backgroundSecondary: '#F8FAFC',
      backgroundTertiary: '#F1F5F9',
      
      surface: '#FFFFFF',
      surfaceHover: '#F8FAFC',
      surfaceBorder: '#E2E8F0',
      surfaceBorderHover: '#CBD5E1',
      
      textPrimary: '#1E293B',
      textSecondary: '#475569',
      textTertiary: '#64748B',
      textDisabled: '#94A3B8',
      
      success: '#16a34a',
      warning: '#d97706',
      error: '#dc2626',
      info: '#2563eb',
      
      overlay: 'rgba(15, 23, 42, 0.8)',
      shadow: 'rgba(15, 23, 42, 0.1)',
      
      input: {
        background: '#FFFFFF',
        backgroundFocus: '#F8FAFC',
        border: '#E2E8F0',
        borderHover: '#CBD5E1',
        borderFocus: '#F97316',
        borderError: '#dc2626'
      }
    }
  }
};

export const getTheme = (isDarkMode) => {
  return isDarkMode ? themes.dark : themes.light;
};