import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";

const Page = styled.div`
  padding: 32px 24px;
`;

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

const Item = styled(Link)`
  display: block;
  padding: 12px;
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
  const articles = [
    { id: "1", title: "Como usar a funcionalidade X" },
    { id: "2", title: "Melhores práticas para Y" },
    { id: "3", title: "Resolução de problemas comuns" },
  ];

  return (
    <Page>
      <Container>
        <h2 style={{ color: theme.colors.textPrimary }}>Categoria: {category}</h2>
        <p style={{ color: theme.colors.textSecondary }}>Artigos nesta categoria</p>

        <div style={{ marginTop: 16 }}>
          {articles.map((a) => (
            <Item key={a.id} to={`/faq/base-conhecimento/${category}/${a.id}`} $bg={theme.colors.surface}>
              <strong style={{ color: theme.colors.textPrimary }}>{a.title}</strong>
            </Item>
          ))}
        </div>
      </Container>
    </Page>
  );
}
