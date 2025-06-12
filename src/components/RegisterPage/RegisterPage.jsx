import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';
import Modal from '../Modal/Modal';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
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
  TermsLink,
  ThemeToggleContainer
} from './RegisterPage.styles';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleInputChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
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

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos de serviço';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      // Simulate successful registration
      localStorage.setItem('techsync-authenticated', 'true');
      localStorage.setItem('techsync-from-registration', 'true');
      navigate('/home');
    }
  };

  return (
    <RegisterContainer $isDarkMode={isDarkMode}>
      <ThemeToggleContainer>
        <ThemeToggle size="medium" />
      </ThemeToggleContainer>
      
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

            <form onSubmit={handleSubmit} noValidate>
              <Input
                id="fullName"
                label="Nome completo"
                type="text"
                placeholder="Seu nome"
                value={formData.fullName}
                onChange={handleInputChange('fullName')}
                error={errors.fullName}
                icon="person"
                required
                $isDarkMode={isDarkMode}
              />


              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={errors.email}
                icon="mail"
                required
                $isDarkMode={isDarkMode}
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
              />

              <Checkbox
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange('acceptTerms')}
                $isDarkMode={isDarkMode}
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
                <div style={{ 
                  color: '#ef4444', 
                  fontSize: '0.8125rem', 
                  marginTop: '-1rem', 
                  marginBottom: '1rem' 
                }}>
                  {errors.acceptTerms}
                </div>
              )}

              <Button 
                type="submit"
                variant="primary" 
                size="large"
                style={{ width: '100%', marginBottom: '1.5rem' }}
                $isDarkMode={isDarkMode}
              >
                Criar conta
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

      <Modal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Termos de Serviço"
        $isDarkMode={isDarkMode}
      >
        <p>Os termos de serviço serão adicionados em breve.</p>
      </Modal>

      <Modal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        title="Política de Privacidade"
        $isDarkMode={isDarkMode}
      >
        <p>A política de privacidade será adicionados em breve.</p>
      </Modal>
    </RegisterContainer>
  );
};

export default RegisterPage;
