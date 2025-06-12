import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import {
  NavbarContainer,
  NavbarContent,
  LogoSection,
  LogoIcon,
  LogoText,
  NavSection,
  NavItem,
  NavIcon,
  NavText,
  UserSection,
  NotificationButton,
  UserButton,
  UserAvatar,
  UserName
} from './Navbar.styles';

const Navbar = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('techsync-authenticated');
    navigate('/login');
  };

  return (
    <NavbarContainer $isDarkMode={isDarkMode}>
      <NavbarContent>
        <LogoSection>
          <LogoIcon className="material-symbols-outlined" $isDarkMode={isDarkMode}>code</LogoIcon>
          <LogoText $isDarkMode={isDarkMode}>TechSync</LogoText>
        </LogoSection>

        <NavSection>
          <NavItem $active={true} $isDarkMode={isDarkMode}>
            <NavIcon className="material-symbols-outlined">dashboard</NavIcon>
            <NavText>Home</NavText>
          </NavItem>
        </NavSection>

        <UserSection>
          <ThemeToggle size="small" />
          
          <NotificationButton aria-label="Notificações" $isDarkMode={isDarkMode}>
            <span className="material-symbols-outlined">notifications</span>
          </NotificationButton>

          <UserButton aria-label="Perfil do usuário - Gabriel" $isDarkMode={isDarkMode}>
            <UserAvatar $isDarkMode={isDarkMode}>G</UserAvatar>
            <UserName $isDarkMode={isDarkMode}>Gabriel</UserName>
          </UserButton>
        </UserSection>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;