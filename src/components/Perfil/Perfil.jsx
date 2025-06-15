import Navbar from "../Navbar/Navbar";
import React, { useState } from "react";
import { useTheme } from '../../contexts/ThemeContext';
import { User, Mail, Phone, FileText, Building2, Settings, Camera, AlertTriangle, Trash2 } from 'lucide-react';
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
  SectionTitle,
  FormGrid,
  FormField,
  FormLabel,
  InputContainer,
  InputIcon,
  FormInput,
  SaveButtonContainer,
  SaveButton,
  PlaceholderSection,
  PlaceholderContent,
  PlaceholderIcon,
  PlaceholderText,
  DangerZone,
  DangerZoneTitle,
  DangerZoneDescription,
  DangerSection,
  DangerSectionTitle,
  DangerSectionDescription,
  DangerButton,
} from './Perfil.styles.js';

const Perfil = () => {
  const [activeTab, setActiveTab] = useState("dados-pessoais");
  const [formData, setFormData] = useState({
    nomeCompleto: "Gabriel Silva",
    email: "gabriel@gmail.com",
    telefone: "(11)98765-4321",
    cpf: "000.000.000-00",
  });

  const tabs = [
    { id: "dados-pessoais", label: "Dados Pessoais", icon: <User size={16} /> },
    {
      id: "dados-empresa",
      label: "Dados da Empresa",
      icon: <Building2 size={16} />,
    },
    {
      id: "configuracoes",
      label: "Configurações",
      icon: <Settings size={16} />,
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", formData);
  };
  const { isDarkMode } = useTheme();
  
    const handleDeleteAccount = () => {
    console.log('Delete account requested');
    // Here you would typically show a confirmation modal
    alert('Funcionalidade de exclusão de conta seria implementada aqui');
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
                    <User size={48} />
                  </ProfilePictureGradient>
                </ProfilePicture>
                <CameraButton $isDarkMode={isDarkMode}>
                  <Camera size={20} />
                </CameraButton>
              </ProfilePictureContainer>
              <ProfileInfo>
                <ProfileName $isDarkMode={isDarkMode}>
                  Gabriel Silva
                </ProfileName>
                <ProfileEmail $isDarkMode={isDarkMode}>
                  gabriel@email.com
                </ProfileEmail>
              </ProfileInfo>
            </ProfilePictureSection>

            <TabNavigation>
              <TabList>
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    $isActive={activeTab === tab.id}
                    $isDarkMode={isDarkMode}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    {tab.label}
                  </TabButton>
                ))}
              </TabList>
            </TabNavigation>
          </ProfileHeader>

          {activeTab === "dados-pessoais" && (
            <ContentSection $isDarkMode={isDarkMode}>
              <SectionTitle $isDarkMode={isDarkMode}>
                Informações Pessoais
              </SectionTitle>

              <FormGrid>
                <FormField>
                  <FormLabel $isDarkMode={isDarkMode}>Nome completo</FormLabel>
                  <InputContainer>
                    <InputIcon $isDarkMode={isDarkMode}>
                      <User size={18} />
                    </InputIcon>
                    <FormInput
                      type="text"
                      value={formData.nomeCompleto}
                      onChange={(e) =>
                        handleInputChange("nomeCompleto", e.target.value)
                      }
                      placeholder="Digite seu nome completo"
                      $isDarkMode={isDarkMode}
                    />
                  </InputContainer>
                </FormField>

                <FormField>
                  <FormLabel $isDarkMode={isDarkMode}>Email</FormLabel>
                  <InputContainer>
                    <InputIcon $isDarkMode={isDarkMode}>
                      <Mail size={18} />
                    </InputIcon>
                    <FormInput
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Digite seu email"
                      $isDarkMode={isDarkMode}
                    />
                  </InputContainer>
                </FormField>

                <FormField>
                  <FormLabel $isDarkMode={isDarkMode}>Telefone</FormLabel>
                  <InputContainer>
                    <InputIcon $isDarkMode={isDarkMode}>
                      <Phone size={18} />
                    </InputIcon>
                    <FormInput
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) =>
                        handleInputChange("telefone", e.target.value)
                      }
                      placeholder="(11) 99999-9999"
                      $isDarkMode={isDarkMode}
                    />
                  </InputContainer>
                </FormField>

                <FormField>
                  <FormLabel $isDarkMode={isDarkMode}>CPF</FormLabel>
                  <InputContainer>
                    <InputIcon $isDarkMode={isDarkMode}>
                      <FileText size={18} />
                    </InputIcon>
                    <FormInput
                      type="text"
                      value={formData.cpf}
                      onChange={(e) => handleInputChange("cpf", e.target.value)}
                      placeholder="000.000.000-00"
                      $isDarkMode={isDarkMode}
                    />
                  </InputContainer>
                </FormField>
              </FormGrid>

              <SaveButtonContainer>
                <SaveButton
                  $isDarkMode={isDarkMode}
                  onClick={handleSaveChanges}
                >
                  <FileText size={18} />
                  Salvar alterações
                </SaveButton>
              </SaveButtonContainer>
            </ContentSection>
          )}

              {activeTab === "dados-empresa" && (
      <ContentSection $isDarkMode={isDarkMode}>
        <SectionTitle $isDarkMode={isDarkMode}>Dados da Empresa</SectionTitle>

        <FormGrid>
          <FormField>
            <FormLabel $isDarkMode={isDarkMode}>Nome da empresa</FormLabel>
            <FormInput
              type="text"
              value={formData.nomeEmpresa}
              onChange={(e) => handleInputChange("nomeEmpresa", e.target.value)}
              placeholder="TechDev Solutions"
              $isDarkMode={isDarkMode}
            />
          </FormField>

          <FormField>
            <FormLabel $isDarkMode={isDarkMode}>CNPJ</FormLabel>
            <FormInput
              type="text"
              value={formData.cnpj}
              onChange={(e) => handleInputChange("cnpj", e.target.value)}
              placeholder="12.345.678/0001-90"
              $isDarkMode={isDarkMode}
            />
          </FormField>

          <FormField>
            <FormLabel $isDarkMode={isDarkMode}>Telefone</FormLabel>
            <FormInput
              type="text"
              value={formData.telefoneEmpresa}
              onChange={(e) => handleInputChange("telefoneEmpresa", e.target.value)}
              placeholder="(11) 3456-7890"
              $isDarkMode={isDarkMode}
            />
          </FormField>

          <FormField>
            <FormLabel $isDarkMode={isDarkMode}>Site</FormLabel>
            <FormInput
              type="text"
              value={formData.site}
              onChange={(e) => handleInputChange("site", e.target.value)}
              placeholder="www.techdevsolutions.com.br"
              $isDarkMode={isDarkMode}
            />
          </FormField>

          <FormField>
            <FormLabel $isDarkMode={isDarkMode}>CEP</FormLabel>
            <FormInput
              type="text"
              value={formData.cep}
              onChange={(e) => handleInputChange("cep", e.target.value)}
              placeholder="07024-167"
              $isDarkMode={isDarkMode}
            />
          </FormField>

          <FormField>
            <FormLabel $isDarkMode={isDarkMode}>Endereço</FormLabel>
            <FormInput
              type="text"
              value={formData.endereco}
              onChange={(e) => handleInputChange("endereco", e.target.value)}
              placeholder="Av. Paulista"
              $isDarkMode={isDarkMode}
            />
          </FormField>

          <FormField>
            <FormLabel $isDarkMode={isDarkMode}>Número</FormLabel>
            <FormInput
              type="text"
              value={formData.numero}
              onChange={(e) => handleInputChange("numero", e.target.value)}
              placeholder="1000"
              $isDarkMode={isDarkMode}
            />
          </FormField>

          <FormField>
            <FormLabel $isDarkMode={isDarkMode}>Complemento</FormLabel>
            <FormInput
              type="text"
              value={formData.complemento}
              onChange={(e) => handleInputChange("complemento", e.target.value)}
              placeholder="Sala 1003"
              $isDarkMode={isDarkMode}
            />
          </FormField>

          <FormField>
            <FormLabel $isDarkMode={isDarkMode}>Bairro</FormLabel>
            <FormInput
              type="text"
              value={formData.bairro}
              onChange={(e) => handleInputChange("bairro", e.target.value)}
              placeholder="Bela Vista"
              $isDarkMode={isDarkMode}
            />
          </FormField>

          <FormField>
            <FormLabel $isDarkMode={isDarkMode}>Cidade</FormLabel>
            <FormInput
              type="text"
              value={formData.cidade}
              onChange={(e) => handleInputChange("cidade", e.target.value)}
              placeholder="São Paulo"
              $isDarkMode={isDarkMode}
            />
          </FormField>

          <FormField>
            <FormLabel $isDarkMode={isDarkMode}>Estado</FormLabel>
            <FormInput
              type="text"
              value={formData.estado}
              onChange={(e) => handleInputChange("estado", e.target.value)}
              placeholder="São Paulo"
              $isDarkMode={isDarkMode}
            />
          </FormField>
        </FormGrid>

        <SaveButtonContainer>
          <SaveButton $isDarkMode={isDarkMode} onClick={handleSaveChanges}>
            <FileText size={18} />
            Salvar alterações
          </SaveButton>
        </SaveButtonContainer>
      </ContentSection>
    )}

 {activeTab === 'configuracoes' && (
          <ContentSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>Configurações</SectionTitle>
            
            <DangerZone $isDarkMode={isDarkMode}>
              <DangerZoneTitle $isDarkMode={isDarkMode}>
                <AlertTriangle size={20} />
                Zona de Perigo
              </DangerZoneTitle>
              <DangerZoneDescription $isDarkMode={isDarkMode}>
                Ações nesta seção são permanentes e não podem ser desfeitas.
              </DangerZoneDescription>
              
              <DangerSection $isDarkMode={isDarkMode}>
                <DangerSectionTitle $isDarkMode={isDarkMode}>
                  Excluir minha conta
                </DangerSectionTitle>
                <DangerSectionDescription $isDarkMode={isDarkMode}>
                  Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
                </DangerSectionDescription>
                <DangerButton $isDarkMode={isDarkMode} onClick={handleDeleteAccount}>
                  <Trash2 size={16} />
                  Excluir minha conta
                </DangerButton>
              </DangerSection>
            </DangerZone>
          </ContentSection>
        )}
        </ProfileContent>
      </ProfileContainer>
  );
};

export default Perfil;
