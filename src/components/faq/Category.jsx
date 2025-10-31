// React automatic JSX runtime in use — explicit import not required
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";
import Layout from "../Layout/Layout";
import helpContent from "../../data/helpContent";
import { Page, Container, HeaderTitle, HeaderDesc, SearchWrapper } from "./faq.styles";
import { ChevronRight } from "lucide-react";
import SearchBar from "./SearchBar";

// Page and Container are imported from ./faq.styles

const Item = styled(Link)`
  display: block;
  padding: var(--faq-card-padding, 12px);
  border-radius: 8px;
  background: ${(p) => p.$bg};
  margin-bottom: 8px;
  color: inherit;
`;

export default function Category() {
  const { category } = useParams();
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  // Placeholder data
  const categoryKey = category;
  const data = helpContent[categoryKey];

  const articles = data ? data.articles : [];

  return (
    <Layout>
      <Page $isDarkMode={isDarkMode}>
      <Container>
        <SearchWrapper>
          <SearchBar />
        </SearchWrapper>
        <nav style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center', color: theme.colors.textSecondary }}>
          <Link to="/" style={{ color: theme.colors.textSecondary }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/faq" style={{ color: theme.colors.textSecondary }}>FAQ</Link>
          <ChevronRight size={14} />
          <span style={{ color: theme.colors.textPrimary }}>{data ? data.title : category}</span>
        </nav>

        <HeaderTitle $isDarkMode={isDarkMode}>{data ? data.title : `Categoria: ${category}`}</HeaderTitle>
        <HeaderDesc $isDarkMode={isDarkMode}>Artigos nesta categoria</HeaderDesc>

        <div style={{ marginTop: 16 }}>
          {articles.length === 0 ? (
            <p style={{ color: theme.colors.textPrimary }}>Categoria não encontrada.</p>
          ) : (
            articles.map((a) => (
              <Item key={a.slug} to={`/faq/base-conhecimento/${category}/${a.slug}`} $bg={theme.colors.surface}>
                <strong style={{ color: theme.colors.textPrimary }}>{a.title}</strong>
              </Item>
            ))
          )}
        </div>
      </Container>
      </Page>
    </Layout>
  );
}
