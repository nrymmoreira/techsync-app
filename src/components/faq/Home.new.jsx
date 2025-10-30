// React automatic JSX runtime in use — explicit import not required
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BookOpen, MessageCircle, Mail } from "lucide-react";
// import SearchBar from "./SearchBar";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";
import Layout from "../Layout/Layout";

const Page = styled.div`
  /* use navbar height variable so pages sit directly under the fixed navbar */
  min-height: calc(100vh - var(--navbar-height, 64px));
  padding: 24px 24px 48px; /* smaller top padding because Layout offsets by the navbar height */
  background: ${(p) => getTheme(p.$isDarkMode).colors.background};
`;

const Container = styled.div`
  max-width: var(--faq-container-max-width, 1024px);
  margin: 0 auto;
  padding: 0 16px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: rem;
  letter-spacing: -0.025em;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const SearchContainer = styled.div`
  max-width: var(--faq-search-max-width, 48rem);
  margin: 1.25rem auto 2rem;
  width: 100%;
`;

const Pills = styled.div`
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

const Pill = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid ${(p) => getTheme(p.$isDarkMode).colors.surfaceBorder};
  background: ${(p) => getTheme(p.$isDarkMode).colors.surface};
  color: ${(p) => getTheme(p.$isDarkMode).colors.textPrimary};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${(p) => getTheme(p.$isDarkMode).colors.surfaceHover};
    border-color: ${(p) => getTheme(p.$isDarkMode).colors.surfaceBorderHover};
  }
`;

const Cards = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--faq-gap, 1.5rem);

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
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
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${(p) => getTheme(p.$isDarkMode).colors.shadow};
  }
`;

const CardIcon = styled.div`
  margin-bottom: 1rem;
  display: inline-flex;
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${(p) => getTheme(p.$isDarkMode).colors.primaryLight};
  color: ${(p) => getTheme(p.$isDarkMode).colors.primary};
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
              <BookOpen size={24} />
            </CardIcon>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Base de conhecimento
            </h2>
            <p style={{ color: theme.colors.textSecondary, fontSize: "0.875rem" }}>
              Encontre artigos que abrangem tudo o que você precisa
            </p>
          </Card>

          <Card to="/faq/chat" $isDarkMode={isDarkMode}>
            <CardIcon $isDarkMode={isDarkMode}>
              <MessageCircle size={24} />
            </CardIcon>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Assistente de chat
            </h2>
            <p style={{ color: theme.colors.textSecondary, fontSize: "0.875rem" }}>
              Obtenha ajuda imediata para suas questões
            </p>
          </Card>

          <Card to="/faq/suporte" $isDarkMode={isDarkMode}>
            <CardIcon $isDarkMode={isDarkMode}>
              <Mail size={24} />
            </CardIcon>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Solicitações de suporte
            </h2>
            <p style={{ color: theme.colors.textSecondary, fontSize: "0.875rem" }}>
              Gerencie suas consultas com nossa equipe
            </p>
          </Card>
        </Cards>
      </Container>
      </Page>
    </Layout>
  );
}