import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import Button from '../../Button/Button';
import {
  FormContainer,
  SectionTitle,
  DangerZone,
  DangerZoneTitle,
  DangerZoneDescription,
  DangerSection,
  DangerSectionTitle,
  DangerSectionDescription,
  DangerButtonContainer
} from './SettingsForm.styles';

const SettingsForm = () => {
  const { isDarkMode } = useTheme();

  const handleDeleteAccount = () => {
    console.log('Delete account requested');
    // Aqui você mostraria um modal de confirmação
    alert('Funcionalidade de exclusão de conta seria implementada aqui');
  };

  return (
    <FormContainer $isDarkMode={isDarkMode}>
      <SectionTitle $isDarkMode={isDarkMode}>
        Configurações
      </SectionTitle>
      
      <DangerZone $isDarkMode={isDarkMode}>
        <DangerZoneTitle $isDarkMode={isDarkMode}>
          <span className="material-symbols-outlined">warning</span>
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
          <DangerButtonContainer>
            <Button
              variant="ghost"
              size="medium"
              icon="delete"
              onClick={handleDeleteAccount}
              $isDarkMode={isDarkMode}
              style={{ 
                backgroundColor: '#ef4444',
                color: 'white',
                borderColor: '#ef4444'
              }}
            >
              Excluir minha conta
            </Button>
          </DangerButtonContainer>
        </DangerSection>
      </DangerZone>
    </FormContainer>
  );
};

export default SettingsForm;