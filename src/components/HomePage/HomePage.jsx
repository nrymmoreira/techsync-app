import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Navbar from '../Navbar/Navbar';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import {
  HomeContainer,
  HomeContent,
  WelcomeSection,
  WelcomeTitle,
  HighlightText,
  WelcomeDescription,
  CardsGrid,
  FeatureCard,
  CardIcon,
  CardTitle,
  CardDescription,
  CardButton
} from './HomePage.styles';

const HomePage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  // Vê se o usuário veio de /cadastro
  useEffect(() => {
    const fromRegistration = localStorage.getItem('techsync-from-registration');
    if (fromRegistration === 'true') {
      setShowCompanyModal(true);
      localStorage.removeItem('techsync-from-registration');
    }
  }, []);

  const handleCompanySetup = () => {
    setShowCompanyModal(false);
    // Navegar para o perfil com a aba de dados da empresa aberta
    navigate('/perfil?tab=dados-empresa');
  };

  const features = [
    {
      id: 'clients',
      icon: 'group',
      title: 'Gerenciar Clientes',
      description: 'Acesse e gerencie seus seus clientes e históricos de interações.',
      action: () => navigate('/clientes')
    },
    {
      id: 'budgets',
      icon: 'receipt_long',
      title: 'Gerenciar Orçamentos',
      description: 'Crie e gerencie orçamentos para seus clientes de forma rápida.',
      action: () => navigate('/orcamentos')
    },
    {
      id: 'projects',
      icon: 'folder_managed',
      title: 'Gerenciar Projetos',
      description: 'Acompanhe o progresso dos projetos ativos e planeje novos.',
      action: () => navigate('/projetos')
    },
    {
      id: 'financial',
      icon: 'account_balance_wallet',
      title: 'Gerenciar Financeiro',
      description: 'Gerencie suas entradas e saídas e controle o saldo dos seus projetos.',
      action: () => navigate('/financeiro')
    }
  ];

  return (
    <>
      <Navbar />
      <HomeContainer $isDarkMode={isDarkMode}>
        <HomeContent>
          <WelcomeSection>
            <WelcomeTitle $isDarkMode={isDarkMode}>
              Bem-vindo ao <HighlightText $isDarkMode={isDarkMode}>TechSync</HighlightText>
            </WelcomeTitle>
            <WelcomeDescription $isDarkMode={isDarkMode}>
              Gerencie seus projetos, clientes e tarefas em um único lugar.
            </WelcomeDescription>
          </WelcomeSection>

          <CardsGrid>
            {features.map((feature) => (
              <FeatureCard key={feature.id} $isDarkMode={isDarkMode}>
                <CardIcon className="material-symbols-outlined" $isDarkMode={isDarkMode}>
                  {feature.icon}
                </CardIcon>
                <CardTitle $isDarkMode={isDarkMode}>{feature.title}</CardTitle>
                <CardDescription $isDarkMode={isDarkMode}>{feature.description}</CardDescription>
                <CardButton 
                  onClick={feature.action} 
                  $isDarkMode={isDarkMode}
                  $isActive={feature.id === 'clients' || feature.id === 'budgets' || feature.id === 'projects' || feature.id === 'financial'}
                >
                  {feature.id === 'clients' || feature.id === 'budgets' || feature.id === 'projects' || feature.id === 'financial' ? 'Acessar' : 'Em breve'}
                </CardButton>
              </FeatureCard>
            ))}
          </CardsGrid>
        </HomeContent>
      </HomeContainer>

      <Modal
        isOpen={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
        title="Configure sua Empresa"
        $isDarkMode={isDarkMode}
      >
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
            Para começar a usar o TechSync, você precisa configurar as informações 
            da sua empresa. Isso nos ajudará a personalizar a experiência para você.
          </p>
          <Button 
            variant="primary" 
            size="large"
            onClick={handleCompanySetup}
            style={{ width: '100%' }}
            $isDarkMode={isDarkMode}
          >
            Configurar Empresa
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default HomePage;