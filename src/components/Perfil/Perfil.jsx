import React, { useState, useEffect, useRef } from "react";
import { useTheme } from '../../contexts/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import PersonalDataForm from './PersonalDataForm/PersonalDataForm';
import CompanyDataForm from './CompanyDataForm/CompanyDataForm';
import SettingsForm from './SettingsForm/SettingsForm';
import { authService } from "../../services/api.js";
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dados-pessoais");
  
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const storedUser = localStorage.getItem('techsync-user');
      if (!storedUser) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const user = JSON.parse(storedUser);
        
        const [userData, companyData] = await Promise.all([
          authService.getUserById(user.id),
          authService.getCompany(user.id)
        ]);

        const combinedData = { ...userData, empresa: companyData };
        setProfileData(combinedData);
        
        localStorage.setItem('techsync-user', JSON.stringify(combinedData));
        
      } catch (err) {
        console.error("Erro ao buscar dados do perfil:", err);
        setError("Não foi possível carregar os dados do perfil. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleDataUpdate = (updatedData) => {
    setProfileData(prevData => {
        const newData = { ...prevData, ...updatedData };
        localStorage.setItem('techsync-user', JSON.stringify(newData));
        return newData;
    });
  };
  
  const handlePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file || !profileData?.id) return;

    try {
      setLoading(true);
      const updatedCompany = await authService.updateCompanyLogo(profileData.id, file);
      
      handleDataUpdate({ empresa: updatedCompany });

    } catch (err) {
      console.error("Erro ao fazer upload da logo:", err);
      setError("Falha no upload da logo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) setActiveTab(tabFromUrl);
  }, [location]);

  const tabs = [
    { id: "dados-pessoais", label: "Dados Pessoais", icon: "person" },
    { id: "dados-empresa", label: "Dados da Empresa", icon: "business" },
    { id: "configuracoes", label: "Configurações", icon: "settings" },
  ];

  const renderActiveTab = () => {
    if (loading) return <div>Carregando...</div>;
    if (!profileData) return <div>{error || "Nenhum dado de usuário encontrado."}</div>;

    switch (activeTab) {
      case "dados-pessoais":
        return <PersonalDataForm currentUser={profileData} onUpdateSuccess={handleDataUpdate} />;
      case "dados-empresa":
        return <CompanyDataForm currentUser={profileData} onUpdateSuccess={handleDataUpdate} />;
      case "configuracoes":
        return <SettingsForm />;
      default:
        return <PersonalDataForm currentUser={profileData} onUpdateSuccess={handleDataUpdate} />;
    }
  };

  const getProfileName = () => {
    if (loading) return "Carregando...";
    return profileData?.empresa?.nome || "(Nome da Empresa)";
  };

  const getProfileEmail = () => {
    if (loading) return "carregando@email.com";
    return profileData?.email || "Email não encontrado";
  };
  
  return (
    <ProfileContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <ProfileContent>
        <ProfileHeader>
          <ProfilePictureSection>
            <ProfilePictureContainer>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif"
              />
              <ProfilePicture $isDarkMode={isDarkMode}>
                {profileData?.empresa?.logo ? (
                  <img src={profileData.empresa.logo} alt="Logo da Empresa" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                ) : (
                  <ProfilePictureGradient $isDarkMode={isDarkMode}>
                    <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                      {profileData?.empresa?.nome ? profileData.empresa.nome.charAt(0).toUpperCase() : 'E'}
                    </span>
                  </ProfilePictureGradient>
                )}
              </ProfilePicture>
              <CameraButton $isDarkMode={isDarkMode} onClick={handlePictureClick}>
                <span className="material-symbols-outlined">photo_camera</span>
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