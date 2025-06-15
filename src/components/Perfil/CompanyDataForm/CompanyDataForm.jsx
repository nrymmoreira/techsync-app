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
    nomeEmpresa: "TechDev Solutions",
    cnpj: "12.345.678/0001-90",
    telefoneEmpresa: "(11) 3456-7890",
    site: "www.techdevsolutions.com.br",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: ""
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

  const validateURL = (url) => {
    if (!url) return true; // URL é opcional
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url);
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const fetchAddressByCep = async (cep) => {
    const cleanCep = cep.replace(/[^\d]/g, '');
    
    if (cleanCep.length !== 8) {
      setErrors(prev => ({ ...prev, cep: 'CEP deve ter 8 dígitos' }));
      return;
    }

    setIsLoadingCep(true);
    setErrors(prev => ({ ...prev, cep: '' }));

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cleanCep}`);
      
      if (!response.ok) {
        throw new Error('CEP não encontrado');
      }

      const data = await response.json();
      
      setFormData(prev => ({
        ...prev,
        endereco: data.street || '',
        bairro: data.neighborhood || '',
        cidade: data.city || '',
        estado: data.state || ''
      }));

      // Limpar erros relacionados ao endereço
      setErrors(prev => ({
        ...prev,
        endereco: '',
        bairro: '',
        cidade: '',
        estado: ''
      }));

    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        cep: error.message === 'CEP não encontrado' ? 'CEP não encontrado' : 'Erro ao buscar CEP' 
      }));
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Limpar erro quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Buscar endereço automaticamente quando CEP for preenchido
    if (field === 'cep' && value.replace(/[^\d]/g, '').length === 8) {
      fetchAddressByCep(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

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

    // Telefone
    if (formData.telefoneEmpresa && !validatePhone(formData.telefoneEmpresa)) {
      newErrors.telefoneEmpresa = 'Telefone inválido';
    }

    // Site
    if (formData.site && !validateURL(formData.site)) {
      newErrors.site = 'URL inválida';
    }

    // CEP
    if (!formData.cep.trim()) {
      newErrors.cep = 'CEP é obrigatório';
    } else if (formData.cep.replace(/[^\d]/g, '').length !== 8) {
      newErrors.cep = 'CEP deve ter 8 dígitos';
    }

    // Endereço
    if (!formData.endereco.trim()) {
      newErrors.endereco = 'Endereço é obrigatório';
    }

    // Número
    if (!formData.numero.trim()) {
      newErrors.numero = 'Número é obrigatório';
    }

    // Bairro
    if (!formData.bairro.trim()) {
      newErrors.bairro = 'Bairro é obrigatório';
    }

    // Cidade
    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
    }

    // Estado
    if (!formData.estado.trim()) {
      newErrors.estado = 'Estado é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

        <Input
          id="telefoneEmpresa"
          label="Telefone"
          type="tel"
          value={formData.telefoneEmpresa}
          onChange={(e) => handleInputChange("telefoneEmpresa", e.target.value)}
          error={errors.telefoneEmpresa}
          placeholder="(11) 3456-7890"
          icon="phone"
          $isDarkMode={isDarkMode}
        />

        <Input
          id="site"
          label="Site"
          type="url"
          value={formData.site}
          onChange={(e) => handleInputChange("site", e.target.value)}
          error={errors.site}
          placeholder="www.techdevsolutions.com.br"
          icon="language"
          $isDarkMode={isDarkMode}
        />

        <Input
          id="cep"
          label="CEP"
          type="text"
          value={formData.cep}
          onChange={(e) => handleInputChange("cep", e.target.value)}
          error={errors.cep}
          placeholder="01234-567"
          icon="location_on"
          required
          $isDarkMode={isDarkMode}
        />

        <Input
          id="endereco"
          label="Endereço"
          type="text"
          value={formData.endereco}
          onChange={(e) => handleInputChange("endereco", e.target.value)}
          error={errors.endereco}
          placeholder="Av. Paulista"
          icon="home"
          required
          disabled={isLoadingCep}
          $isDarkMode={isDarkMode}
        />

        <Input
          id="numero"
          label="Número"
          type="text"
          value={formData.numero}
          onChange={(e) => handleInputChange("numero", e.target.value)}
          error={errors.numero}
          placeholder="1000"
          icon="tag"
          required
          $isDarkMode={isDarkMode}
        />

        <Input
          id="complemento"
          label="Complemento"
          type="text"
          value={formData.complemento}
          onChange={(e) => handleInputChange("complemento", e.target.value)}
          error={errors.complemento}
          placeholder="Sala 1003"
          icon="apartment"
          $isDarkMode={isDarkMode}
        />

        <Input
          id="bairro"
          label="Bairro"
          type="text"
          value={formData.bairro}
          onChange={(e) => handleInputChange("bairro", e.target.value)}
          error={errors.bairro}
          placeholder="Bela Vista"
          icon="location_city"
          required
          disabled={isLoadingCep}
          $isDarkMode={isDarkMode}
        />

        <Input
          id="cidade"
          label="Cidade"
          type="text"
          value={formData.cidade}
          onChange={(e) => handleInputChange("cidade", e.target.value)}
          error={errors.cidade}
          placeholder="São Paulo"
          icon="location_city"
          required
          disabled={isLoadingCep}
          $isDarkMode={isDarkMode}
        />

        <Input
          id="estado"
          label="Estado"
          type="text"
          value={formData.estado}
          onChange={(e) => handleInputChange("estado", e.target.value)}
          error={errors.estado}
          placeholder="São Paulo"
          icon="map"
          required
          disabled={isLoadingCep}
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