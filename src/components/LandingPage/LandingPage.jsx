import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import {
  LandingContainer,
  HeroSection,
  ContentContainer,
  MainTitle,
  HighlightText,
  Description,
  ButtonGroup,
  FeaturesSection,
  SectionTitle,
  SectionSubtitle,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  ValuesSection,
  ValuesContainer,
  ValuesTitle,
  ValuesDescription,
  ValuesVisualization,
  ValueCircle,
  ValueLabel,
  BrandSection,
  BrandGrid,
  BrandCard,
  BrandCardIcon,
  BrandCardTitle,
  BrandCardDescription,
  MissionSection,
  MissionContent,
  MissionText,
  MissionHighlight
} from './LandingPage.styles';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  const features = [
    {
      icon: 'dashboard',
      title: 'Controle Total',
      description: 'Gerencie projetos e tarefas sem ruído, sem distrações. Foque no que realmente importa.'
    },
    {
      icon: 'auto_awesome',
      title: 'Organização Natural',
      description: 'Um ambiente onde a organização se torna natural e intuitiva, como uma extensão do seu pensamento.'
    },
    {
      icon: 'rocket_launch',
      title: 'Produtividade Amplificada',
      description: 'Uma plataforma que transcende convenções, impulsionando produtividade e inovação.'
    },
    {
      icon: 'timeline',
      title: 'Gestão Temporal',
      description: 'Domine o tempo como uma força, não apenas um recurso. Decisões instantâneas, resultados duradouros.'
    }
  ];

  const brandCards = [
    {
      icon: 'space_dashboard',
      title: 'Design Futurista',
      description: 'Inspirado na vastidão do espaço, com estética minimalista, escura e sofisticada.'
    },
    {
      icon: 'psychology',
      title: 'Experiência Intuitiva',
      description: 'Interface que se adapta ao seu fluxo de trabalho, transformando complexidade em simplicidade.'
    },
    {
      icon: 'trending_up',
      title: 'Evolução Contínua',
      description: 'Plataforma em constante evolução, sempre um passo à frente das necessidades do mercado.'
    }
  ];

  return (
    <LandingContainer $isDarkMode={isDarkMode}>
      <HeroSection>
        <ContentContainer>
          <Logo size="large" />
          
          <MainTitle $isDarkMode={isDarkMode}>
            O Futuro da Gestão <HighlightText>Começa Agora</HighlightText>
          </MainTitle>
          
          <Description $isDarkMode={isDarkMode}>
            No limiar de uma nova era, onde o trabalho ultrapassa os limites da 
            Terra e se expande para além das estrelas, o TechSync redefine a forma 
            como profissionais gerenciam suas operações.
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
      </HeroSection>

      <FeaturesSection $isDarkMode={isDarkMode}>
        <ContentContainer>
          <SectionTitle $isDarkMode={isDarkMode}>
            Uma Nave de Comando para Sua Produtividade
          </SectionTitle>
          <SectionSubtitle $isDarkMode={isDarkMode}>
            TechSync não é apenas um software – é uma nave de comando, onde cada 
            profissional pilota seu próprio futuro.
          </SectionSubtitle>
          
          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index} $isDarkMode={isDarkMode}>
                <FeatureIcon className="material-symbols-outlined" $isDarkMode={isDarkMode}>
                  {feature.icon}
                </FeatureIcon>
                <FeatureTitle $isDarkMode={isDarkMode}>{feature.title}</FeatureTitle>
                <FeatureDescription $isDarkMode={isDarkMode}>
                  {feature.description}
                </FeatureDescription>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </ContentContainer>
      </FeaturesSection>

      <ValuesSection $isDarkMode={isDarkMode}>
        <ContentContainer>
          <ValuesContainer>
            <div>
              <ValuesTitle $isDarkMode={isDarkMode}>
                Nossos Valores Fundamentais
              </ValuesTitle>
              <ValuesDescription $isDarkMode={isDarkMode}>
                Como exploradores que desafiam os limites do cosmos, nossa plataforma 
                é construída sobre três pilares fundamentais que guiam cada decisão e 
                cada linha de código.
              </ValuesDescription>
            </div>
            
            <ValuesVisualization>
              <ValueCircle $position="top" $isDarkMode={isDarkMode}>
                <ValueLabel $isDarkMode={isDarkMode}>Autonomia</ValueLabel>
              </ValueCircle>
              <ValueCircle $position="bottom-left" $isDarkMode={isDarkMode}>
                <ValueLabel $isDarkMode={isDarkMode}>Evolução</ValueLabel>
              </ValueCircle>
              <ValueCircle $position="bottom-right" $isDarkMode={isDarkMode}>
                <ValueLabel $isDarkMode={isDarkMode}>Organização</ValueLabel>
              </ValueCircle>
            </ValuesVisualization>
          </ValuesContainer>
        </ContentContainer>
      </ValuesSection>

      <BrandSection $isDarkMode={isDarkMode}>
        <ContentContainer>
          <SectionTitle $isDarkMode={isDarkMode}>
            Nossa Identidade
          </SectionTitle>
          <SectionSubtitle $isDarkMode={isDarkMode}>
            Preto, laranja e cinza não são apenas cores, mas a representação da 
            imensidão e do desconhecido – um espaço de possibilidades infinitas.
          </SectionSubtitle>
          
          <BrandGrid>
            {brandCards.map((card, index) => (
              <BrandCard key={index} $isDarkMode={isDarkMode}>
                <BrandCardIcon className="material-symbols-outlined" $isDarkMode={isDarkMode}>
                  {card.icon}
                </BrandCardIcon>
                <BrandCardTitle $isDarkMode={isDarkMode}>{card.title}</BrandCardTitle>
                <BrandCardDescription $isDarkMode={isDarkMode}>
                  {card.description}
                </BrandCardDescription>
              </BrandCard>
            ))}
          </BrandGrid>
        </ContentContainer>
      </BrandSection>

      <MissionSection $isDarkMode={isDarkMode}>
        <ContentContainer>
          <MissionContent>
            <SectionTitle $isDarkMode={isDarkMode}>
              Nossa Missão
            </SectionTitle>
            <MissionText $isDarkMode={isDarkMode}>
              Transformar a complexidade da gestão em uma experiência fluida e intuitiva, 
              permitindo que profissionais foquem no que realmente importa: 
              <MissionHighlight $isDarkMode={isDarkMode}> criar, inovar e evoluir</MissionHighlight>.
            </MissionText>
            <MissionText $isDarkMode={isDarkMode}>
              O futuro pertence àqueles que dominam a arte da gestão. TechSync é a 
              ferramenta que os levará até lá.
            </MissionText>
            <MissionHighlight $isDarkMode={isDarkMode} style={{ fontSize: '1.25rem', marginTop: '2rem' }}>
              Bem-vindo ao próximo nível da produtividade. Bem-vindo ao futuro.
            </MissionHighlight>
          </MissionContent>
        </ContentContainer>
      </MissionSection>
    </LandingContainer>
  );
};

export default LandingPage;