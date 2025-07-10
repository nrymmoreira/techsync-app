import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';
import { authService } from '../../../services/api';
import {
  FormContainer,
  SectionTitle,
  FormGrid,
  SaveButtonContainer,
  LoadingMessage,
  ErrorMessage,
  CurrencySelect
} from './CompanyDataForm.styles';

const CompanyDataForm = ({ currentUser, onUpdateUser }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    cnpj: "",
    currency: "BRL"
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoadingCompany, setIsLoadingCompany] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadCompanyData();
    }
  }, [currentUser]);

  const loadCompanyData = async () => {
    if (!currentUser?.id) return;
    
    setIsLoadingCompany(true);
    try {
      const companyData = await authService.getCompany(currentUser.id);
      setFormData({
        nomeEmpresa: companyData.nomeEmpresa || '',
        cnpj: companyData.cnpj || '',
        currency: companyData.currency || 'BRL'
      });
    } catch (error) {
      if (error.message === '404') {
        // Empresa não existe ainda, mantém campos vazios
        setFormData({
          nomeEmpresa: "",
          cnpj: "",
          currency: "BRL"
        });
      } else {
        setApiError('Erro ao carregar dados da empresa.');
      }
    } finally {
      setIsLoadingCompany(false);
    }
  };

  const validateCNPJ = (cnpj) => {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
    if (cleanCNPJ.length !== 14) return false;
    
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nomeEmpresa.trim()) {
      newErrors.nomeEmpresa = 'Nome da empresa é obrigatório';
    }

    if (!formData.cnpj.trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
    }

    if (!formData.currency) {
      newErrors.currency = 'Moeda é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    setApiError('');
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      setApiError('Preencha os campos corretamente para salvar.');
      return;
    }

    setIsLoading(true);
    setApiError('');

    const dataToSave = {
      usuarioId: currentUser.id,
      nomeEmpresa: formData.nomeEmpresa,
      cnpj: formData.cnpj,
      currency: formData.currency
    };

    try {
      // Primeiro tenta buscar se a empresa já existe
      let savedCompany;
      try {
        await authService.getCompany(currentUser.id);
        // Se chegou aqui, a empresa existe, então atualiza
        savedCompany = await authService.updateCompany(currentUser.id, dataToSave);
      } catch (error) {
        if (error.message === '404') {
          // Empresa não existe, então cria
          savedCompany = await authService.createCompany(dataToSave);
        } else {
          throw error;
        }
      }

      // Atualiza o usuário no localStorage com os dados da empresa
      const updatedUser = {
        ...currentUser,
        empresa: savedCompany
      };
      localStorage.setItem('techsync-user', JSON.stringify(updatedUser));

      if (onUpdateUser) {
        onUpdateUser(updatedUser);
      }

      setShowSuccessModal(true);
    } catch (error) {
      const errorMessage = error.message || 'Erro ao salvar dados da empresa. Tente novamente.';
      setApiError(errorMessage);
      console.error('Erro ao salvar dados da empresa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  if (isLoadingCompany) {
    return (
      <FormContainer $isDarkMode={isDarkMode}>
        <LoadingMessage $isDarkMode={isDarkMode}>
          <span className="material-symbols-outlined">hourglass_empty</span>
          Carregando dados da empresa...
        </LoadingMessage>
      </FormContainer>
    );
  }

  return (
    <FormContainer $isDarkMode={isDarkMode}>
      <SectionTitle $isDarkMode={isDarkMode}>
        Dados da Empresa
      </SectionTitle>

      {apiError && (
        <ErrorMessage $isDarkMode={isDarkMode}>
          {apiError}
        </ErrorMessage>
      )}

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
          disabled={isLoading}
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
          disabled={isLoading}
        />

        <div>
          <label htmlFor="currency" style={{ 
            display: 'block',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: isDarkMode ? '#F5F5F5' : '#1E293B',
            marginBottom: '0.5rem'
          }}>
            Moeda <span style={{ color: '#F97316' }}>*</span>
          </label>
          <CurrencySelect
            id="currency"
            value={formData.currency}
            onChange={(e) => handleInputChange("currency", e.target.value)}
            $isDarkMode={isDarkMode}
            $hasError={!!errors.currency}
            disabled={isLoading}
          >
            <option value="BRL">Real Brasileiro (BRL)</option>
            <option value="USD">Dólar Americano (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">Libra Esterlina (GBP)</option>
          </CurrencySelect>
          {errors.currency && (
            <div style={{ 
              marginTop: '0.5rem',
              fontSize: '0.8125rem',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>error</span>
              {errors.currency}
            </div>
          )}
        </div>
      </FormGrid>

      <SaveButtonContainer>
        <Button
          variant="primary"
          size="medium"
          icon="save"
          onClick={handleSaveChanges}
          disabled={isLoading}
          $isDarkMode={isDarkMode}
        >
          {isLoading ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </SaveButtonContainer>

      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Sucesso!"
        $isDarkMode={isDarkMode}
      >
        <p>Os dados da empresa foram salvos com sucesso!</p>
        <Button
          variant="primary"
          size="medium"
          onClick={handleSuccessModalClose}
          $isDarkMode={isDarkMode}
          style={{ marginTop: '1rem' }}
        >
          Ok
        </Button>
      </Modal>
    </FormContainer>
  );
};

export default CompanyDataForm;