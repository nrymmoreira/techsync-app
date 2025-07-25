import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { authService } from '../../services/api';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';
import Modal from '../Modal/Modal';
import {
  RegisterContainer,
  ContentWrapper,
  TextSection,
  FormSection,
  MainTitle,
  HighlightText,
  Description,
  FormContainer,
  FormTitle,
  FormDescription,
  RegisterFooter,
  FooterText,
  FooterLink,
  TermsLink
} from './RegisterPage.styles';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    cnpj: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleInputChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    return Object.values(requirements).every(req => req);
  };

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Nome completo é obrigatório';
    if (!formData.companyName.trim()) newErrors.companyName = 'Nome da empresa é obrigatório';
    if (!String(formData.cnpj).trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
    }
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Senha não atende aos requisitos mínimos';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Você deve aceitar os termos de serviço';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const userData = {
        nome: formData.fullName,
        email: formData.email,
        senha: formData.password
      };

      const companyData = {
        nome: formData.companyName,
        cnpj: Number(String(formData.cnpj).replace(/[^\d]/g, '')),
        currency: 'BRL',
        timezone: 'GMT-3'
      };

      await authService.registerAndCreateCompany(userData, companyData);
      
      setShowSuccessModal(true);
    } catch (error) {
      const errorMessage = error.message || 'Ocorreu um erro.';
      if (errorMessage.includes('Email já cadastrado')) {
        setErrors({ email: 'Este email já está em uso. Tente outro.' });
      } else {
        setErrors({ api: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  return (
    <RegisterContainer $isDarkMode={isDarkMode}>
      <ContentWrapper>
        <TextSection>
          <Logo size="small"/>
          <MainTitle $isDarkMode={isDarkMode}>
            <HighlightText>Bem-vindo</HighlightText> ao futuro da produtividade
          </MainTitle>
          <Description $isDarkMode={isDarkMode}>
            No limiar de uma nova era, onde o trabalho ultrapassa os limites da 
            Terra e se expande para além das estrelas, o TechSync redefine a forma 
            como autônomos e pequenas equipes gerenciam suas operações.
          </Description>
        </TextSection>

        <FormSection>
          <FormContainer $isDarkMode={isDarkMode}>
            <FormTitle $isDarkMode={isDarkMode}>Criar Conta</FormTitle>
            <FormDescription $isDarkMode={isDarkMode}>
              Preencha os dados abaixo para começar sua jornada
            </FormDescription>

            {errors.api && (
              <div style={{ color: '#ef4444', fontSize: '0.8125rem', marginBottom: '1rem' }}>
                {errors.api}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <Input
                id="fullName"
                label="Seu nome completo"
                type="text"
                placeholder="Seu nome"
                value={formData.fullName}
                onChange={handleInputChange('fullName')}
                error={errors.fullName}
                icon="person"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />
              
              <Input
                id="companyName"
                label="Nome da empresa"
                type="text"
                placeholder="Nome da sua empresa ou negócio"
                value={formData.companyName}
                onChange={handleInputChange('companyName')}
                error={errors.companyName}
                icon="business"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />
              <Input
                id="cnpj"
                label="CNPJ"
                type="text"
                placeholder="00.000.000/0001-00"
                value={formData.cnpj}
                onChange={handleInputChange('cnpj')}
                error={errors.cnpj}
                icon="badge"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="email"
                label="Seu melhor email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={errors.email}
                icon="mail"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="password"
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleInputChange('password')}
                error={errors.password}
                icon="lock"
                showPasswordRequirements={true}
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="confirmPassword"
                label="Confirme sua senha"
                type="password"
                placeholder="Digite sua senha novamente"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                error={errors.confirmPassword}
                icon="lock"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Checkbox
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange('acceptTerms')}
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              >
                <span>
                  Eu concordo com os{' '}
                  <TermsLink onClick={() => setShowTermsModal(true)} $isDarkMode={isDarkMode}>
                    Termos de Serviço
                  </TermsLink>{' '}
                  e{' '}
                  <TermsLink onClick={() => setShowPrivacyModal(true)} $isDarkMode={isDarkMode}>
                    Política de Privacidade
                  </TermsLink>
                </span>
              </Checkbox>
              {errors.acceptTerms && (
                <div style={{ color: '#ef4444', fontSize: '0.8125rem', marginTop: '-1rem', marginBottom: '1rem' }}>
                  {errors.acceptTerms}
                </div>
              )}

              <Button 
                type="submit"
                variant="primary" 
                size="large"
                style={{ width: '100%', marginBottom: '1.5rem' }}
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              >
                {isLoading ? 'A criar conta...' : 'Criar conta'}
              </Button>
            </form>

            <RegisterFooter>
              <FooterText $isDarkMode={isDarkMode}>
                Já tem uma conta?{' '}
                <FooterLink onClick={() => navigate('/login')} $isDarkMode={isDarkMode}>
                  Entrar
                </FooterLink>
              </FooterText>
            </RegisterFooter>
          </FormContainer>
        </FormSection>
      </ContentWrapper>

      {/* Modais */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Registo Concluído"
        $isDarkMode={isDarkMode}
      >
        <p>A sua conta e empresa foram criadas com sucesso! Será redirecionado para a página de login.</p>
        <Button
          variant="primary"
          size="medium"
          onClick={handleSuccessModalClose}
          $isDarkMode={isDarkMode}
          style={{ marginTop: '1rem' }}
        >
          OK
        </Button>
      </Modal>
    </RegisterContainer>
  );
};

export default RegisterPage;
