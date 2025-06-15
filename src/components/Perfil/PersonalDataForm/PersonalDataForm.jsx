import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import {
  FormContainer,
  SectionTitle,
  FormGrid,
  SaveButtonContainer
} from './PersonalDataForm.styles';

const PersonalDataForm = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    nomeCompleto: "Gabriel Silva",
    email: "gabriel@gmail.com",
    telefone: "(11)98765-4321",
    cpf: "000.000.000-00",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    console.log("Saving personal data:", formData);
    // Aqui você implementaria a lógica de salvamento
  };

  return (
    <FormContainer $isDarkMode={isDarkMode}>
      <SectionTitle $isDarkMode={isDarkMode}>
        Informações Pessoais
      </SectionTitle>

      <FormGrid>
        <Input
          id="nomeCompleto"
          label="Nome completo"
          type="text"
          value={formData.nomeCompleto}
          onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
          placeholder="Digite seu nome completo"
          icon="person"
          required
          $isDarkMode={isDarkMode}
        />

        <Input
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Digite seu email"
          icon="mail"
          required
          $isDarkMode={isDarkMode}
        />

        <Input
          id="telefone"
          label="Telefone"
          type="tel"
          value={formData.telefone}
          onChange={(e) => handleInputChange("telefone", e.target.value)}
          placeholder="(11) 99999-9999"
          icon="phone"
          required
          $isDarkMode={isDarkMode}
        />

        <Input
          id="cpf"
          label="CPF"
          type="text"
          value={formData.cpf}
          onChange={(e) => handleInputChange("cpf", e.target.value)}
          placeholder="000.000.000-00"
          icon="badge"
          required
          $isDarkMode={isDarkMode}
        />
      </FormGrid>

      <SaveButtonContainer>
        <Button
          variant="primary"
          size="medium"
          icon="save"
          onClick={handleSaveChanges}
          $isDarkMode={isDarkMode}
        >
          Salvar alterações
        </Button>
      </SaveButtonContainer>
    </FormContainer>
  );
};

export default PersonalDataForm;