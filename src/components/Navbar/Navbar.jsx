import React, { useState, useEffect } from "react"; // Adicione useEffect
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
  // --- Adicionado para armazenar os dados do usuário
  const [user, setUser] = useState(null);

  // Carrega os dados do usuário do localStorage ao montar o componente
  useEffect(() => {
    const storedUser = localStorage.getItem("techsync-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(
          "Erro ao fazer parse dos dados do usuário do localStorage:",
          e
        );
        // Opcional: Se os dados estiverem corrompidos, desloga o usuário
        handleLogout();
      }
    }
  }, []); // O array vazio garante que o useEffect rode apenas uma vez ao montar

  const handleLogout = () => {
    localStorage.removeItem("techsync-token"); // Remova o token também
    localStorage.removeItem("techsync-authenticated");
    localStorage.removeItem("techsync-user"); // Remova os dados do usuário
    setUser(null); // Limpa o estado do usuário
    navigate("/login");
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: "dashboard",
      path: "/home",
    },
    {
      id: "clients",
      label: "Clientes",
      icon: "group",
      path: "/clientes",
    },
    {
      id: "profile",
      label: "Perfil",
      icon: "person",
      path: "/perfil",
    },
    {
      id: "logout",
      label: "Sair",
      icon: "logout",
      action: handleLogout,
    },
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
    if (action === "profile") {
      navigate("/perfil");
    } else if (action === "logout") {
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

  // --- Funções para obter dados do usuário
  const getUserName = () => {
    return user ? user.nome : "Usuário"; // Retorna o nome do usuário ou um padrão
  };

  const getUserAvatarInitial = () => {
    return user && user.nome ? user.nome.charAt(0).toUpperCase() : "U"; // Pega a primeira letra do nome
  };
  // -----------------------------------

  return (
    <>
      <NavbarContainer $isDarkMode={isDarkMode}>
        <NavbarContent>
          <LogoSection onClick={() => navigate("/home")}>
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
              $active={location.pathname === "/home"}
              $isDarkMode={isDarkMode}
              onClick={() => navigate("/home")}
            >
              <NavIcon className="material-symbols-outlined">dashboard</NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem
              $active={location.pathname.startsWith("/clientes")}
              $isDarkMode={isDarkMode}
              onClick={() => navigate("/clientes")}
            >
              <NavIcon className="material-symbols-outlined">group</NavIcon>
              <NavText>Clientes</NavText>
            </NavItem>
            <NavItem
              $active={location.pathname.startsWith("/orcamentos")}
              $isDarkMode={isDarkMode}
              onClick={() => navigate("/orcamentos")}
            >
              <NavIcon className="material-symbols-outlined">
                receipt_long
              </NavIcon>
              <NavText>Orçamentos</NavText>
            </NavItem>
            <NavItem
              $active={location.pathname.startsWith("/projetos")}
              $isDarkMode={isDarkMode}
              onClick={() => navigate("/projetos")}
            >
              <NavIcon className="material-symbols-outlined">
                folder_managed
              </NavIcon>
              <NavText>Projetos</NavText>
            </NavItem>
            <NavItem
              $active={location.pathname.startsWith("/financeiro")}
              $isDarkMode={isDarkMode}
              onClick={() => navigate("/financeiro")}
            >
              <NavIcon className="material-symbols-outlined">
                account_balance_wallet
              </NavIcon>
              <NavText>Financeiro</NavText>
            </NavItem>

            <NavItem
              $active={location.pathname.startsWith("/faq")}
              $isDarkMode={isDarkMode}
              onClick={() => navigate("/faq")}
            >
              <NavIcon className="material-symbols-outlined">help</NavIcon>
              <NavText>FAQ</NavText>
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

            <div style={{ position: "relative" }}>
              <UserButton
                aria-label={`Perfil do usuário - ${getUserName()}`} // Usa o nome dinâmico
                $isDarkMode={isDarkMode}
                onClick={toggleUserDropdown}
              >
                <UserAvatar $isDarkMode={isDarkMode}>
                  {getUserAvatarInitial()}
                </UserAvatar>{" "}
                {/* Usa a inicial dinâmica */}
                <UserName $isDarkMode={isDarkMode}>
                  {getUserName()}
                </UserName>{" "}
                {/* Usa o nome dinâmico */}
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "1rem" }}
                >
                  {isUserDropdownOpen ? "expand_less" : "expand_more"}
                </span>
              </UserButton>

              {isUserDropdownOpen && (
                <UserDropdown $isDarkMode={isDarkMode}>
                  <UserDropdownItem
                    onClick={() => handleUserDropdownClick("profile")}
                    $isDarkMode={isDarkMode}
                  >
                    <span className="material-symbols-outlined">person</span>
                    Meu Perfil
                  </UserDropdownItem>
                  <UserDropdownItem
                    onClick={() => handleUserDropdownClick("logout")}
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
                {isMobileMenuOpen ? "close" : "menu"}
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
                $isLogout={item.id === "logout"}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
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
