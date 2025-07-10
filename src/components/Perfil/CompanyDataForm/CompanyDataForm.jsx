import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import {
  FormContainer,
  SectionTitle,
  FormGrid,
  SaveButtonContainer,
  LoadingMessage,
  ErrorMessage
} from './CompanyDataForm.styles';

const CompanyDataForm = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    cnpj: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const validateCNPJ = (cnpj) => {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
    if (cleanCNPJ.length !== 14) return false;
    
    // Validação básica de CNPJ
    if (/^(\d)\1+$/.test(cleanCNPJ)) return false;
    
    let sum = 0;
    let weight = 2;
    
    for (let i = 11; i >= 0; i--) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    
    let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(cleanCNPJ.charAt(12)) !== digit) return false;
    
    sum = 0;
    weight = 2;
    
    for (let i = 12; i >= 0; i--) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    
    digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return parseInt(cleanCNPJ.charAt(13)) === digit;
  };

    // Nome da empresa
    if (!formData.nomeEmpresa.trim()) {
      newErrors.nomeEmpresa = 'Nome da empresa é obrigatório';
    }

    // CNPJ
    if (!formData.cnpj.trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
    }
  };

  const handleSaveChanges = () => {
    if (validateForm()) {
      console.log("Saving company data:", formData);
      // Aqui você implementaria a lógica de salvamento
      alert('Dados da empresa salvos com sucesso!');
    }
  };

  return (
    <FormContainer $isDarkMode={isDarkMode}>
      <SectionTitle $isDarkMode={isDarkMode}>
        Dados da Empresa
      </SectionTitle>

      <FormGrid>
        <Input
          id="nomeEmpresa"
          label="Nome da empresa"
          type="text"
          value={formData.nomeEmpresa}
          onChange={(e) => handleInputChange("nomeEmpresa", e.target.value)}
          error={errors.nomeEmpresa}
          placeholder="TechDev Solutions"
          icon="business"
          required
          $isDarkMode={isDarkMode}
        />

        <Input
          id="cnpj"
          label="CNPJ"
          type="text"
          value={formData.cnpj}
          onChange={(e) => handleInputChange("cnpj", e.target.value)}
          error={errors.cnpj}
          placeholder="12.345.678/0001-90"
          icon="badge"
          required
          $isDarkMode={isDarkMode}
        />
      </FormGrid>

      {isLoadingCep && (
        <LoadingMessage $isDarkMode={isDarkMode}>
          <span className="material-symbols-outlined">hourglass_empty</span>
          Buscando endereço...
        </LoadingMessage>
      )}

      <SaveButtonContainer>
        <Button
          variant="primary"
          size="medium"
          icon="save"
          onClick={handleSaveChanges}
          disabled={isLoadingCep}
          $isDarkMode={isDarkMode}
        >
          Salvar alterações
        </Button>
      </SaveButtonContainer>
    </FormContainer>
  );
};

export default CompanyDataForm;