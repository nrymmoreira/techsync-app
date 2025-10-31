// React automatic JSX runtime in use — explicit import not required
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";
import Layout from "../Layout/Layout";
import helpContent from "../../data/helpContent";
import { ChevronRight } from "lucide-react";
import SearchBar from "./SearchBar";

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
        <div className="mb-8">
          <SearchBar />
        </div>
        <nav style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center', color: theme.colors.textSecondary }}>
          <Link to="/" style={{ color: theme.colors.textSecondary }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/faq" style={{ color: theme.colors.textSecondary }}>FAQ</Link>
          <ChevronRight size={14} />
          <Link to="/faq/base-conhecimento" style={{ color: theme.colors.textSecondary }}>Base de conhecimento</Link>
          <ChevronRight size={14} />
          <span style={{ color: theme.colors.textPrimary }}>{articleData.title}</span>
        </nav>

        <h2 style={{ color: theme.colors.textPrimary }}>{articleData.title}</h2>
        <p style={{ color: theme.colors.textSecondary }}>Categoria: {categoryData.title}</p>

        <article style={{ marginTop: 16 }}>
          <p style={{ color: theme.colors.textPrimary }}>{articleData.questions && articleData.questions.length > 0 ? articleData.questions[0].answer : 'Nenhum conteúdo disponível.'}</p>
        </article>

        <section style={{ marginTop: 24 }}>
          <h3 style={{ color: theme.colors.textPrimary }}>Perguntas relacionadas</h3>
          <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
            {articleData.questions.map((q, idx) => (
              <Link key={idx} to={`/faq/base-conhecimento/${category}/${article}/${idx}`} style={{ textDecoration: 'none' }}>
                <div style={{ padding: 16, borderRadius: 8, background: theme.colors.surface, border: `1px solid ${theme.colors.surfaceBorder}`, color: theme.colors.textPrimary }}>
                  {q.question}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>
      </Page>
    </Layout>
  );
}
