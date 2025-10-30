// React automatic JSX runtime in use — explicit import not required
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BookOpen, MessageCircle, Mail } from "lucide-react";
import SearchBar from "./SearchBar";
import Layout from "../Layout/Layout";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";

const Page = styled.div`
  /* use navbar height variable so pages sit directly under the fixed navbar */
  min-height: calc(100vh - var(--navbar-height, 64px));
  padding: 24px 20px 48px; /* smaller top padding because Layout already offsets by navbar height */
  background: ${(p) => getTheme(p.$isDarkMode).colors.background};
`;

const Container = styled.div`
  max-width: var(--faq-container-max-width, 1120px);
  margin: 0 auto;
  padding: 0 16px;
`;

const Title = styled.h1`
  padding: 90px 0 20px;
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const SearchContainer = styled.div`
  max-width: 50rem;
  margin: 1.25rem auto 2rem;
  width: 100%;
`;

const Pills = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 2.5rem;
  overflow-x: auto;
  padding: 0.25rem 4px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.08);
    border-radius: 999px;
  }
  @media (min-width: 640px) {
    justify-content: center;
    flex-wrap: wrap;
    overflow: visible;
  }
`;

const Pill = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid ${(p) => getTheme(p.$isDarkMode).colors.surfaceBorder};
  background: ${(p) => getTheme(p.$isDarkMode).colors.surface};
  color: ${(p) => getTheme(p.$isDarkMode).colors.textPrimary};
  font-size: 0.900rem;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    background: ${(p) => getTheme(p.$isDarkMode).colors.surfaceHover};
    border-color: ${(p) => getTheme(p.$isDarkMode).colors.surfaceBorderHover};
  }
`;

const Cards = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--faq-gap, 1.25rem);
  align-items: start;
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--faq-card-padding, 1.5rem);
  border-radius: 0.75rem;
  background: ${(p) => getTheme(p.$isDarkMode).colors.surface};
  border: 1px solid ${(p) => getTheme(p.$isDarkMode).colors.surfaceBorder};
  text-align: center;
  color: ${(p) => getTheme(p.$isDarkMode).colors.textPrimary};
  transition: transform 0.28s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 30px ${(p) => getTheme(p.$isDarkMode).colors.shadow};
  }

  h3 { margin: 8px 0 6px; }
  p { margin: 0; font-size: 0.9rem; }
`;

const CardIcon = styled.div`
  margin-bottom: 0.75rem;
  display: inline-flex;
  padding: 1.5rem;
  border-radius: 0.6rem;
  background: ${(p) => getTheme(p.$isDarkMode).colors.primaryLight};
  color: ${(p) => getTheme(p.$isDarkMode).colors.primary};
  align-items: center;
  justify-content: center;
`;

export default function FAQHome() {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);
  const categories = [
    "Categorias populares",
    "Clientes",
    "Orçamentos",
    "Projetos",
    "Financeiro",
    "Notas Fiscais",
  ];

  const getCategoryUrl = (category) => {
    if (category === "Categorias populares") return "/faq/base-conhecimento";

    const slugMap = {
      Clientes: "clientes",
      Orçamentos: "orcamentos",
      Projetos: "projetos",
      Financeiro: "financeiro",
      "Notas Fiscais": "notas-fiscais",
    };

    return `/faq/base-conhecimento/${slugMap[category]}`;
  };

  return (
    <Layout>
      <Page $isDarkMode={isDarkMode}>
      <Container>
        <Title style={{ color: theme.colors.textPrimary }}>Central de Ajuda</Title>

        <SearchContainer>
          <SearchBar />
        </SearchContainer>

        <Pills>
          {categories.map((category) => (
            <Pill key={category} to={getCategoryUrl(category)} $isDarkMode={isDarkMode}>
              {category}
            </Pill>
          ))}
        </Pills>

        <Cards>
          <Card to="/faq/base-conhecimento" $isDarkMode={isDarkMode}>
            <CardIcon $isDarkMode={isDarkMode}>
              <BookOpen size={22} />
            </CardIcon>
            <h3 style={{ marginBottom: 6, color: theme.colors.textPrimary }}>Base de conhecimento</h3>
            <p style={{ fontSize: 13, color: theme.colors.textSecondary }}>Encontre artigos que abrangem tudo o que você precisa</p>
          </Card>

          <Card to="/faq/chat-assistente" $isDarkMode={isDarkMode}>
            <CardIcon $isDarkMode={isDarkMode}>
              <MessageCircle size={22} />
            </CardIcon>
            <h3 style={{ marginBottom: 6, color: theme.colors.textPrimary }}>Assistente de chat</h3>
            <p style={{ fontSize: 13, color: theme.colors.textSecondary }}>Obtenha ajuda imediata para suas questões</p>
          </Card>

          <Card to="/faq/suporte" $isDarkMode={isDarkMode}>
            <CardIcon $isDarkMode={isDarkMode}>
              <Mail size={22} />
            </CardIcon>
            <h3 style={{ marginBottom: 6, color: theme.colors.textPrimary }}>Solicitações de suporte</h3>
            <p style={{ fontSize: 13, color: theme.colors.textSecondary }}>Gerencie suas consultas com nossa equipe</p>
          </Card>
        </Cards>
      </Container>
      </Page>
    </Layout>
  );
}
