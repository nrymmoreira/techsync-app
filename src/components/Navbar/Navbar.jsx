import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
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
  UserName,
  UserDropdown,
  UserDropdownItem,
  MobileMenuButton,
  MobileMenu,
  MobileMenuItem,
  MobileMenuOverlay,
} from "./Navbar.styles";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("techsync-authenticated");
    navigate("/login");
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: 'dashboard',
      path: '/home'
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: 'person',
      path: '/perfil'
    },
    {
      id: 'logout',
      label: 'Sair',
      icon: 'logout',
      action: handleLogout
    }
  ];

  const handleMenuItemClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      navigate(item.path);
    }
    setIsMobileMenuOpen(false);
  };

  const handleUserDropdownClick = (action) => {
    if (action === 'profile') {
      navigate('/perfil');
    } else if (action === 'logout') {
      handleLogout();
    }
    setIsUserDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <>
      <NavbarContainer $isDarkMode={isDarkMode}>
        <NavbarContent>
          <LogoSection onClick={() => navigate('/home')}>
            <LogoIcon
              className="material-symbols-outlined"
              $isDarkMode={isDarkMode}
            >
              code
            </LogoIcon>
            <LogoText $isDarkMode={isDarkMode}>TechSync</LogoText>
          </LogoSection>

          <NavSection>
            <NavItem 
              $active={location.pathname === '/home'} 
              $isDarkMode={isDarkMode}
              onClick={() => navigate('/home')}
            >
              <NavIcon className="material-symbols-outlined">dashboard</NavIcon>
              <NavText>Home</NavText>
            </NavItem>
          </NavSection>

          <UserSection>
            <ThemeToggle size="small" />

            <NotificationButton
              aria-label="Notificações"
              $isDarkMode={isDarkMode}
            >
              <span className="material-symbols-outlined">notifications</span>
            </NotificationButton>

            <div style={{ position: 'relative' }}>
              <UserButton
                aria-label="Perfil do usuário - Gabriel"
                $isDarkMode={isDarkMode}
                onClick={toggleUserDropdown}
              >
                <UserAvatar $isDarkMode={isDarkMode}>N</UserAvatar>
                <UserName $isDarkMode={isDarkMode}>Narayana</UserName>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                  {isUserDropdownOpen ? 'expand_less' : 'expand_more'}
                </span>
              </UserButton>

              {isUserDropdownOpen && (
                <UserDropdown $isDarkMode={isDarkMode}>
                  <UserDropdownItem
                    onClick={() => handleUserDropdownClick('profile')}
                    $isDarkMode={isDarkMode}
                  >
                    <span className="material-symbols-outlined">person</span>
                    Meu Perfil
                  </UserDropdownItem>
                  <UserDropdownItem
                    onClick={() => handleUserDropdownClick('logout')}
                    $isDarkMode={isDarkMode}
                    $isLogout={true}
                  >
                    <span className="material-symbols-outlined">logout</span>
                    Sair
                  </UserDropdownItem>
                </UserDropdown>
              )}
            </div>

            <MobileMenuButton
              onClick={toggleMobileMenu}
              aria-label="Menu"
              $isDarkMode={isDarkMode}
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </MobileMenuButton>
          </UserSection>
        </NavbarContent>
      </NavbarContainer>

      {isMobileMenuOpen && (
        <>
          <MobileMenuOverlay onClick={closeMobileMenu} />
          <MobileMenu $isDarkMode={isDarkMode}>
            {menuItems.map((item) => (
              <MobileMenuItem
                key={item.id}
                onClick={() => handleMenuItemClick(item)}
                $isDarkMode={isDarkMode}
                $isLogout={item.id === 'logout'}
              >
                <span className="material-symbols-outlined">
                  {item.icon}
                </span>
                {item.label}
              </MobileMenuItem>
            ))}
          </MobileMenu>
        </>
      )}
    </>
  );
};

export default Navbar;