import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { userService, authService } from '../../../services/api';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import {
  FormContainer,
  SectionTitle,
  FormGrid,
  SaveButtonContainer,
  ErrorMessage,
  SuccessMessage
} from './PersonalDataForm.styles';

const PersonalDataForm = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    cpf: "",
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');

  // Carregar dados do usuário ao montar o componente
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await userService.getProfile();
        setFormData({
          nomeCompleto: userData.name || "",
          email: userData.email || "",
          telefone: userData.phone || "",
          cpf: userData.cpf || "",
        });
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        // Se falhar, usar dados do localStorage como fallback
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setFormData(prev => ({
            ...prev,
            nomeCompleto: currentUser.name || "",
            email: currentUser.email || "",
          }));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

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

    // Limpar mensagens
    if (successMessage) setSuccessMessage('');
    if (apiError) setApiError('');
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    setApiError('');
    setSuccessMessage('');

    try {
      await userService.updatePersonalData({
        name: formData.nomeCompleto,
        email: formData.email,
        phone: formData.telefone,
        cpf: formData.cpf
      });
      
      setSuccessMessage('Dados pessoais salvos com sucesso!');
      
      // Atualizar dados do usuário no localStorage
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          name: formData.nomeCompleto,
          email: formData.email
        };
        localStorage.setItem('techsync-user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <FormContainer $isDarkMode={isDarkMode}>
        <SectionTitle $isDarkMode={isDarkMode}>
          Informações Pessoais
        </SectionTitle>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }}>
            hourglass_empty
          </span>
          <p>Carregando dados...</p>
        </div>
      </FormContainer>
    );
  }

  return (
    <FormContainer $isDarkMode={isDarkMode}>
      <SectionTitle $isDarkMode={isDarkMode}>
        Informações Pessoais
      </SectionTitle>

      {apiError && (
        <ErrorMessage $isDarkMode={isDarkMode}>
          <span className="material-symbols-outlined">error</span>
          {apiError}
        </ErrorMessage>
      )}

      {successMessage && (
        <SuccessMessage $isDarkMode={isDarkMode}>
          <span className="material-symbols-outlined">check_circle</span>
          {successMessage}
        </SuccessMessage>
      )}

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
          disabled={isSaving}
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
          disabled={isSaving}
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
          disabled={isSaving}
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
          disabled={isSaving}
          $isDarkMode={isDarkMode}
        />
      </FormGrid>

      <SaveButtonContainer>
        <Button
          variant="primary"
          size="medium"
          icon={isSaving ? "hourglass_empty" : "save"}
          onClick={handleSaveChanges}
          disabled={isSaving}
          $isDarkMode={isDarkMode}
        >
          {isSaving ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </SaveButtonContainer>
    </FormContainer>
  );
};

export default PersonalDataForm;