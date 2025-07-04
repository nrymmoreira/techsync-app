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

  // Verificar se há uma tab específica na URL
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
        return <PersonalDataForm />;
      case "dados-empresa":
        return <CompanyDataForm />;
      case "configuracoes":
        return <SettingsForm />;
      default:
        return <PersonalDataForm />;
    }
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
                  <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>
                    person
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
                Narayana Moreira
              </ProfileName>
              <ProfileEmail $isDarkMode={isDarkMode}>
                narayanamoreira27@email.com
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