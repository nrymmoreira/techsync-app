import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { authService } from '../../services/api'; // Ajuste o caminho conforme necessário
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';
import {
  LoginContainer,
  ContentWrapper,
  TextSection,
  FormSection,
  MainTitle,
  HighlightText,
  Description,
  FormContainer,
  FormTitle,
  FormDescription,
  ForgotPasswordLink,
  LoginFooter,
  FooterText,
  FooterLink
} from './LoginPage.styles';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await authService.login(formData.email, formData.password);
      navigate('/home');
    } catch (error) {
      setErrors({ api: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Esqueceu a senha');
    // Implementar lógica de recuperação de senha no futuro
  };

  return (
    <LoginContainer $isDarkMode={isDarkMode}>
      <ContentWrapper>
        <TextSection>
          <Logo size="small" />
          
          <MainTitle $isDarkMode={isDarkMode}>
            <HighlightText>Controle total</HighlightText> sobre seus projetos
          </MainTitle>
          
          <Description $isDarkMode={isDarkMode}>
            Assim como os exploradores que desafiam os limites do cosmos, nossa 
            plataforma transforma a complexidade da gestão em uma experiência 
            fluída e intuitiva.
          </Description>
        </TextSection>

        <FormSection>
          <FormContainer $isDarkMode={isDarkMode}>
            <FormTitle $isDarkMode={isDarkMode}>Entrar</FormTitle>
            <FormDescription $isDarkMode={isDarkMode}>
              Entre com seus dados para acessar sua conta
            </FormDescription>

            {errors.api && (
              <div style={{ 
                color: '#ef4444', 
                fontSize: '0.8125rem', 
                marginBottom: '1rem' 
              }}>
                {errors.api}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
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
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange('rememberMe')}
                  $isDarkMode={isDarkMode}
                  disabled={isLoading}
                >
                  Lembrar de mim
                </Checkbox>

                <ForgotPasswordLink onClick={handleForgotPassword} $isDarkMode={isDarkMode}>
                  Esqueceu a senha?
                </ForgotPasswordLink>
              </div>

              <Button 
                type="submit"
                variant="primary" 
                size="large"
                style={{ width: '100%', marginBottom: '1.5rem' }}
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              >
                {isLoading ? 'Carregando...' : 'Entrar'}
              </Button>
            </form>

            <LoginFooter>
              <FooterText $isDarkMode={isDarkMode}>
                Não tem uma conta?{' '}
                <FooterLink onClick={() => navigate('/cadastro')} $isDarkMode={isDarkMode}>
                  Criar conta
                </FooterLink>
              </FooterText>
            </LoginFooter>
          </FormContainer>
        </FormSection>
      </ContentWrapper>
    </LoginContainer>
  );
};

export default LoginPage;