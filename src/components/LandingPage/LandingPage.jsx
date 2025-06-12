import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import {
  LandingContainer,
  ContentContainer,
  MainTitle,
  HighlightText,
  Description,
  ButtonGroup,
  ThemeToggleContainer
} from './LandingPage.styles';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  return (
    <LandingContainer $isDarkMode={isDarkMode}>
      <ThemeToggleContainer>
        <ThemeToggle size="medium" />
      </ThemeToggleContainer>
      
      <ContentContainer>
        <Logo size="small" />
        
        <MainTitle $isDarkMode={isDarkMode}>
          O Futuro da Gestão <HighlightText>Começa Agora</HighlightText>
        </MainTitle>
        
        <Description $isDarkMode={isDarkMode}>
          Transforme a complexidade da gestão em uma experiência fluida e 
          intuitiva. Bem-vindo ao próximo nível da produtividade.
        </Description>
        
        <ButtonGroup>
          <Button 
            variant="primary" 
            size="large"
            icon="login"
            onClick={() => navigate('/login')}
            ariaLabel="Entrar na plataforma TechSync"
            $isDarkMode={isDarkMode}
          >
            Entrar
          </Button>
          
          <Button 
            variant="secondary" 
            size="large"
            icon="person_add"
            onClick={() => navigate('/cadastro')}
            ariaLabel="Criar nova conta no TechSync"
            $isDarkMode={isDarkMode}
          >
            Criar conta
          </Button>
        </ButtonGroup>
      </ContentContainer>
    </LandingContainer>
  );
};

export default LandingPage;