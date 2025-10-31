// React automatic JSX runtime in use — explicit import not required
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";
import Layout from "../Layout/Layout";
import helpContent from "../../data/helpContent";
import { Page, Container, HeaderTitle, HeaderDesc, SearchWrapper, Breadcrumbs } from "./faq.styles";
import { ChevronRight } from "lucide-react";
import SearchBar from "./SearchBar";

// Page and Container provided by ./faq.styles

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
        <SearchWrapper>
          <SearchBar />
        </SearchWrapper>

        <Breadcrumbs $isDarkMode={isDarkMode} aria-label="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/faq">FAQ</Link>
          <ChevronRight size={14} />
          <Link to="/faq/base-conhecimento">Base de conhecimento</Link>
          <ChevronRight size={14} />
          <span style={{ color: theme.colors.textPrimary }}>{articleData.title}</span>
        </Breadcrumbs>

        <HeaderTitle $isDarkMode={isDarkMode}>{articleData.title}</HeaderTitle>
        {/* <HeaderDesc $isDarkMode={isDarkMode}>Categoria: {categoryData.title}</HeaderDesc> */}

        <article style={{ marginTop: 50 }}>
          <p style={{ color: theme.colors.textPrimary }}>{articleData.questions && articleData.questions.length > 0 ? articleData.questions[0].answer : 'Nenhum conteúdo disponível.'}</p>
        </article>

        <section style={{ marginTop: 25 }}>
          <h3 style={{ color: theme.colors.textPrimary }}>Perguntas relacionadas</h3>
          <div style={{ marginTop: 22, display: 'grid', gap: 14 }}>
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
