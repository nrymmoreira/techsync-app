import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import { authService } from '../../../services/api'; // Importar o serviço da API
import {
  FormContainer,
  FormContent,
  FormHeader,
  BackButton,
  HeaderContent,
  PageTitle,
  PageDescription,
  FormSection,
  SectionTitle,
  SectionDescription,
  FormGrid,
  FormActions,
  SaveButton,
  CancelButton
} from './ClientForm.styles';

const ClientForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    telefone: '',
    email: '',
    endereco: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(isEditing); // Inicia carregando se estiver editando

  // Busca os dados do cliente se estiver no modo de edição
  useEffect(() => {
    if (isEditing) {
      const fetchClientData = async () => {
        try {
          const clientData = await authService.getClientById(id);
          setFormData({
            nome: clientData.nome || '',
            cnpj: String(clientData.cnpj || ''),
            telefone: String(clientData.telefone || ''),
            email: clientData.email || '',
            endereco: clientData.endereco || '',
          });
        } catch (error) {
          console.error("Erro ao buscar cliente:", error);
          setErrors({ api: 'Não foi possível carregar os dados do cliente.' });
        } finally {
          setIsLoading(false);
        }
      };
      fetchClientData();
    }
  }, [id, isEditing]);

  const validateCNPJ = (cnpj) => {
    const cleanCNPJ = String(cnpj).replace(/[^\d]/g, '');
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const cleanPhone = String(phone).replace(/[^\d]/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!String(formData.cnpj).trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
    }
    if (!String(formData.telefone).trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido';
    }
    
    // CORREÇÃO: Validação de email agora é obrigatória
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const storedUser = JSON.parse(localStorage.getItem('techsync-user'));
    if (storedUser?.empresa?.id == null) {
        setErrors({ api: 'ID da sua empresa não encontrado. Faça login novamente.' });
        setIsLoading(false);
        return;
    }

    const clientPayload = {
        nome: formData.nome,
        cnpj: Number(String(formData.cnpj).replace(/[^\d]/g, '')),
        telefone: Number(String(formData.telefone).replace(/[^\d]/g, '')),
        email: formData.email,
        endereco: formData.endereco,
        status: 'ATIVO', // Status padrão ao criar/editar
        empresa: {
            id: storedUser.empresa.id
        }
    };

    try {
      if (isEditing) {
        await authService.updateClient(id, clientPayload);
      } else {
        await authService.createClient(clientPayload);
      }
      navigate('/clientes');
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      setErrors({ api: error.message || 'Erro ao salvar cliente. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/clientes');
  };

  return (
    <FormContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <FormContent>
        <FormHeader>
          <BackButton onClick={() => navigate('/clientes')} $isDarkMode={isDarkMode}>
            <span className="material-symbols-outlined">arrow_back</span>
          </BackButton>
          <HeaderContent>
            <PageTitle $isDarkMode={isDarkMode}>
              {isEditing ? 'Editar Cliente' : 'Adicionar Cliente'}
            </PageTitle>
            <PageDescription $isDarkMode={isDarkMode}>
              {isEditing ? 'Atualize as informações do cliente' : 'Preencha os dados do novo cliente'}
            </PageDescription>
          </HeaderContent>
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>Informações Básicas</SectionTitle>
            <SectionDescription $isDarkMode={isDarkMode}>
              Dados principais do cliente
            </SectionDescription>

            {errors.api && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.api}</p>}

            <FormGrid>
              <Input
                id="nome"
                label="Nome"
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                error={errors.nome}
                placeholder="Nome da empresa ou pessoa"
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
                onChange={(e) => handleInputChange('cnpj', e.target.value)}
                error={errors.cnpj}
                placeholder="00.000.000/0000-00"
                icon="badge"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="telefone"
                label="Telefone"
                type="tel"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                error={errors.telefone}
                placeholder="(00) 00000-0000"
                icon="phone"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="email"
                // CORREÇÃO: Campo agora é obrigatório
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                placeholder="email@exemplo.com"
                icon="mail"
                required // CORREÇÃO
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <div style={{ gridColumn: '1 / -1' }}>
                <Input
                  id="endereco"
                  label="Endereço (Opcional)"
                  type="text"
                  value={formData.endereco}
                  onChange={(e) => handleInputChange('endereco', e.target.value)}
                  error={errors.endereco}
                  placeholder="Endereço completo"
                  icon="location_on"
                  $isDarkMode={isDarkMode}
                  disabled={isLoading}
                />
              </div>
            </FormGrid>
          </FormSection>

          <FormActions>
            <CancelButton
              type="button"
              onClick={handleCancel}
              $isDarkMode={isDarkMode}
              disabled={isLoading}
            >
              Cancelar
            </CancelButton>
            <SaveButton
              type="submit"
              $isDarkMode={isDarkMode}
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Salvar Cliente')}
            </SaveButton>
          </FormActions>
        </form>
      </FormContent>
    </FormContainer>
  );
};

export default ClientForm;
