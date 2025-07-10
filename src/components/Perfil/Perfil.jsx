// src/components/pages/Perfil/Perfil.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from '../../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import PersonalDataForm from './PersonalDataForm/PersonalDataForm';
import CompanyDataForm from './CompanyDataForm/CompanyDataForm';
import SettingsForm from './SettingsForm/SettingsForm';
import {
  ProfileContainer,
  ProfileContent,
  ProfileHeader,
  ProfilePictureSection,
  ProfilePictureContainer,
  ProfilePicture,
  ProfilePictureGradient,
  CameraButton,
  ProfileInfo,
  ProfileName,
  ProfileEmail,
  TabNavigation,
  TabList,
  TabButton,
  ContentSection,
} from './Perfil.styles.js';

const Perfil = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dados-pessoais");
  const [currentUser, setCurrentUser] = useState(null);

  const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('techsync-user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Erro ao fazer parse dos dados do usuário do localStorage:", e);
      }
    } else {
        setCurrentUser(null);
    }
  };

  useEffect(() => {
    loadUserFromLocalStorage();
  }, []);

  const handleUserUpdate = (updatedUserData) => {
    setCurrentUser(updatedUserData);
  
    loadUserFromLocalStorage();
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [location]);

  const tabs = [
    {
      id: "dados-pessoais",
      label: "Dados Pessoais",
      icon: "person"
    },
    {
      id: "dados-empresa",
      label: "Dados da Empresa",
      icon: "business",
    },
    {
      id: "configuracoes",
      label: "Configurações",
      icon: "settings",
    },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dados-pessoais":
        return <PersonalDataForm currentUser={currentUser} onUpdateSuccess={handleUserUpdate} />;
      case "dados-empresa":
        // Passa currentUser e a função para atualizar o usuário
        return <CompanyDataForm currentUser={currentUser} onUpdateUser={handleUserUpdate} />;
      case "configuracoes":
        return <SettingsForm />;
      default:
        return <PersonalDataForm currentUser={currentUser} onUpdateSuccess={handleUserUpdate} />;
    }
  };

  const getProfileName = () => {
    // Se tem empresa cadastrada, mostra o nome da empresa, senão mostra o nome do usuário
    if (currentUser?.empresa?.nomeEmpresa) {
      return currentUser.empresa.nomeEmpresa;
    }
    return currentUser ? currentUser.nome : 'Carregando...';
  };

  const getProfileEmail = () => {
    return currentUser ? currentUser.email : 'carregando@email.com';
  };

  const getProfilePictureInitial = () => {
    // Se tem empresa cadastrada, usa a inicial da empresa, senão usa a do usuário
    if (currentUser?.empresa?.nomeEmpresa) {
      return currentUser.empresa.nomeEmpresa.charAt(0).toUpperCase();
    }
    return currentUser && currentUser.nome ? currentUser.nome.charAt(0).toUpperCase() : '?';
  };

  return (
    <ProfileContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <ProfileContent>
        <ProfileHeader>
          <ProfilePictureSection>
            <ProfilePictureContainer>
              <ProfilePicture $isDarkMode={isDarkMode}>
                <ProfilePictureGradient $isDarkMode={isDarkMode}>
                  <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                    {getProfilePictureInitial()}
                  </span>
                </ProfilePictureGradient>
              </ProfilePicture>
              <CameraButton $isDarkMode={isDarkMode}>
                <span className="material-symbols-outlined">
                  photo_camera
                </span>
              </CameraButton>
            </ProfilePictureContainer>
            <ProfileInfo>
              <ProfileName $isDarkMode={isDarkMode}>
                {getProfileName()}
              </ProfileName>
              <ProfileEmail $isDarkMode={isDarkMode}>
                {getProfileEmail()}
              </ProfileEmail>
            </ProfileInfo>
          </ProfilePictureSection>
        </ProfileHeader>

        <ContentSection>
          <TabNavigation>
            <TabList>
              {tabs.map((tab) => (
               <TabButton
                 key={tab.id}
                 $isActive={activeTab === tab.id}
                 $isDarkMode={isDarkMode}
                 onClick={() => setActiveTab(tab.id)}
               >
                 <span className="material-symbols-outlined">
                   {tab.icon}
                 </span>
                 {tab.label}
               </TabButton>
              ))}
            </TabList>
          </TabNavigation>
          {renderActiveTab()}
        </ContentSection>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Perfil;