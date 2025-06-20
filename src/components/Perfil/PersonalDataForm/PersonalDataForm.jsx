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
    nomeCompleto: "Narayana Moreira",
    email: "narayanamoreira27@gmail.com",
    telefone: "",
    cpf: "",
  });

  const [errors, setErrors] = useState({});

  const validateCPF = (cpf) => {
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    if (cleanCPF.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cleanCPF)) return false;
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    if (parseInt(cleanCPF.charAt(9)) !== digit) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    return parseInt(cleanCPF.charAt(10)) === digit;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validateForm = () => {
    const newErrors = {};

    // Nome completo
    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = 'Nome completo é obrigatório';
    } else if (formData.nomeCompleto.trim().split(' ').length < 2) {
      newErrors.nomeCompleto = 'Digite seu nome completo';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Telefone
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido';
    }

    // CPF
    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Limpar erro quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSaveChanges = () => {
    if (validateForm()) {
      console.log("Saving personal data:", formData);
      // Aqui você implementaria a lógica de salvamento
      alert('Dados pessoais salvos com sucesso!');
    }
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
          error={errors.nomeCompleto}
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
          error={errors.email}
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
          error={errors.telefone}
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
          error={errors.cpf}
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