import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { authService } from '../../services/api'; // Ajuste o caminho conforme necessário
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await authService.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      setShowSuccessModal(true);
    } catch (error) {
      setErrors({ api: error.message });
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
                disabled={isLoading}
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
                disabled={isLoading}
              >
                {isLoading ? 'Carregando...' : 'Criar conta'}
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
        <p>Bem-vindo ao TechSync! Ao utilizar nossa plataforma, você concorda com os seguintes Termos de Serviço. Por favor, leia atentamente.</p>

        <h3>1. Aceitação dos Termos</h3>
        <p>Ao acessar ou usar o TechSync, você declara que leu, entendeu e concorda em cumprir estes Termos de Serviço e nossa Política de Privacidade. Se você não concordar com estes termos, não utilize nossa plataforma.</p>

        <h3>2. Uso da Plataforma</h3>
        <ul>
          <li><strong>Elegibilidade</strong>: Você deve ter pelo menos 18 anos ou a idade legal em sua jurisdição para usar o TechSync.</li>
          <li><strong>Conta de Usuário</strong>: Você é responsável por manter a confidencialidade de sua conta e senha, bem como por todas as atividades realizadas sob sua conta.</li>
          <li><strong>Conduta Proibida</strong>: É proibido usar o TechSync para atividades ilegais, fraudulentas ou que violem os direitos de terceiros. Isso inclui, mas não se limita a, envio de spam, hacking ou disseminação de conteúdo ofensivo.</li>
        </ul>

        <h3>3. Propriedade Intelectual</h3>
        <p>Todo o conteúdo, design, logotipos e tecnologia do TechSync são protegidos por direitos autorais e outras leis de propriedade intelectual. Você não pode copiar, modificar ou distribuir nosso conteúdo sem autorização expressa.</p>

        <h3>4. Limitação de Responsabilidade</h3>
        <p>O TechSync é fornecido "como está", sem garantias de qualquer tipo. Não nos responsabilizamos por danos diretos, indiretos ou incidentais decorrentes do uso da plataforma.</p>

        <h3>5. Alterações nos Termos</h3>
        <p>Podemos atualizar estes Termos de Serviço periodicamente. Notificaremos você sobre mudanças significativas por e-mail ou por meio de um aviso em nossa plataforma. O uso contínuo após as alterações implica aceitação dos novos termos.</p>

        <h3>6. Contato</h3>
        <p>Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco em <a href="mailto:suporte@techsync.com">suporte@techsync.com</a>.</p>
      </Modal>

      <Modal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        title="Política de Privacidade"
        $isDarkMode={isDarkMode}
      >
        <p>No TechSync, valorizamos sua privacidade e estamos comprometidos em proteger suas informações pessoais. Esta Política de Privacidade explica como coletamos, usamos e protegemos seus dados.</p>

        <h3>1. Informações que Coletamos</h3>
        <ul>
          <li><strong>Dados de Cadastro</strong>: Nome, e-mail e senha fornecidos durante o registro.</li>
          <li><strong>Dados de Uso</strong>: Informações sobre como você interage com a plataforma, como páginas visitadas e ações realizadas.</li>
          <li><strong>Dados Técnicos</strong>: Endereço IP, tipo de navegador, dispositivo e sistema operacional.</li>
        </ul>

        <h3>2. Como Usamos Suas Informações</h3>
        <p>Utilizamos seus dados para:</p>
        <ul>
          <li>Fornecer e melhorar os serviços do TechSync.</li>
          <li>Personalizar sua experiência na plataforma.</li>
          <li>Enviar comunicações, como atualizações e notificações.</li>
          <li>Garantir a segurança e prevenir fraudes.</li>
        </ul>

        <h3>3. Compartilhamento de Dados</h3>
        <p>Não vendemos nem compartilhamos seus dados pessoais com terceiros, exceto:</p>
        <ul>
          <li>Com sua permissão explícita.</li>
          <li>Para cumprir obrigações legais.</li>
          <li>Com provedores de serviços que nos auxiliam (ex.: hospedagem, análises), sob acordos de confidencialidade.</li>
        </ul>

        <h3>4. Segurança dos Dados</h3>
        <p>Implementamos medidas de segurança, como criptografia e controles de acesso, para proteger seus dados. No entanto, nenhum sistema é 100% seguro, e não garantimos segurança absoluta.</p>

        <h3>5. Seus Direitos</h3>
        <p>Você tem direito a:</p>
        <ul>
          <li>Acessar, corrigir ou excluir seus dados pessoais.</li>
          <li>Solicitar a portabilidade de seus dados.</li>
          <li>Optar por não receber comunicações de marketing.</li>
        </ul>
        <p>Para exercer esses direitos, entre em contato em <a href="mailto:suporte@techsync.com">suporte@techsync.com</a>.</p>

        <h3>6. Alterações na Política</h3>
        <p>Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas por e-mail ou por meio de um aviso na plataforma.</p>

        <h3>7. Contato</h3>
        <p>Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco em <a href="mailto:suporte@techsync.com">suporte@techsync.com</a>.</p>
      </Modal>

      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Cadastro Concluído"
        $isDarkMode={isDarkMode}
      >
        <p>Cadastro realizado com sucesso! Você será redirecionado para a página de login.</p>
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