import React from "react";
import { useParams } from "react-router-dom";
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

export default function Question() {
  const { category, article, question } = useParams();
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  // Placeholder question/answer
  const qa = {
    question: `Pergunta ${question}`,
    answer: `Resposta detalhada para a pergunta ${question} do artigo ${article} (categoria: ${category}).`,
  };

  return (
    <Page>
      <Container>
        <h2 style={{ color: theme.colors.textPrimary }}>{qa.question}</h2>
        <p style={{ color: theme.colors.textSecondary }}>Artigo: {article} · Categoria: {category}</p>

        <div style={{ marginTop: 18 }}>
          <p style={{ color: theme.colors.textPrimary }}>{qa.answer}</p>
        </div>
      </Container>
    </Page>
  );
}
