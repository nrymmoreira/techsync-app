// React automatic JSX runtime in use — explicit import not required
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";
import Layout from "../Layout/Layout";
import helpContent from "../../data/helpContent";

const Page = styled.div`
  padding: var(--faq-page-vertical, 32px) var(--faq-page-horizontal, 24px);
`;

const Container = styled.div`
  max-width: var(--faq-container-max-width, 980px);
  margin: 0 auto;
  padding: 0 16px;
`;

export default function Article() {
  const { category, article } = useParams();
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  const categoryData = helpContent[category];

  if (!categoryData) {
    return (
      <Layout>
        <Page $isDarkMode={isDarkMode}>
          <Container>
            <p style={{ color: theme.colors.textPrimary }}>Categoria não encontrada.</p>
          </Container>
        </Page>
      </Layout>
    );
  }

  const articleData = categoryData.articles.find((a) => a.slug === article);

  if (!articleData) {
    return (
      <Layout>
        <Page $isDarkMode={isDarkMode}>
          <Container>
            <p style={{ color: theme.colors.textPrimary }}>Artigo não encontrado.</p>
          </Container>
        </Page>
      </Layout>
    );
  }

  return (
    <Layout>
      <Page $isDarkMode={isDarkMode}>
      <Container>
        <h2 style={{ color: theme.colors.textPrimary }}>{content.title}</h2>
        <p style={{ color: theme.colors.textSecondary }}>Categoria: {category}</p>

        <article style={{ marginTop: 16 }}>
          <p style={{ color: theme.colors.textPrimary }}>{articleData.questions && articleData.questions.length > 0 ? articleData.questions[0].answer : 'Nenhum conteúdo disponível.'}</p>
        </article>

        <section style={{ marginTop: 24 }}>
          <h3 style={{ color: theme.colors.textPrimary }}>Perguntas relacionadas</h3>
          <ul>
            {articleData.questions.map((q, idx) => (
              <li key={idx} style={{ margin: '8px 0' }}>
                <Link to={`/faq/base-conhecimento/${category}/${article}/${idx}`} style={{ color: theme.colors.primary }}>{q.question}</Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
      </Page>
    </Layout>
  );
}
