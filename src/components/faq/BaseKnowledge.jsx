// React automatic JSX runtime in use — explicit import not required
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";
import Layout from "../Layout/Layout";

const Page = styled.div`
  padding: var(--faq-page-vertical, 32px) var(--faq-page-horizontal, 24px);
`;

const Container = styled.div`
  max-width: var(--faq-container-max-width, 980px);
  margin: 0 auto;
  padding: 0 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--faq-gap, 12px);
  margin-top: 16px;
`;

const ArticleCard = styled(Link)`
  display: block;
  padding: var(--faq-card-padding, 16px);
  border-radius: 8px;
  background: ${(p) => p.$bg};
  color: inherit;
`;

export default function BaseKnowledge() {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  const articles = [
    { id: 1, title: "Como cadastrar um cliente" },
    { id: 2, title: "Criar orçamentos passo a passo" },
    { id: 3, title: "Configurar integrações" },
  ];

  return (
    <Layout>
      <Page $isDarkMode={isDarkMode}>
      <Container>
        <h2 style={{ color: theme.colors.textPrimary }}>Base de conhecimento</h2>
        <p style={{ color: theme.colors.textSecondary }}>Artigos e guias rápidos</p>

        <Grid>
          {articles.map((a) => (
            <ArticleCard key={a.id} to={`/faq/base-conhecimento/${a.id}`} $bg={theme.colors.surface}>
              <strong style={{ color: theme.colors.textPrimary }}>{a.title}</strong>
              <p style={{ marginTop: 8, fontSize: 13, color: theme.colors.textSecondary }}>Resumo breve do artigo</p>
            </ArticleCard>
          ))}
        </Grid>
      </Container>
      </Page>
    </Layout>
  );
}
