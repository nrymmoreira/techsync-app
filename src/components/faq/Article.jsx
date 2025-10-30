// React automatic JSX runtime in use — explicit import not required
import { useParams, Link } from "react-router-dom";
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

export default function Article() {
  const { category, article } = useParams();
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  // Placeholder article content
  const content = {
    title: `Artigo ${article}`,
    body: `Este é o conteúdo do artigo ${article} da categoria ${category}. Aqui você teria instruções, imagens e exemplos.`,
  };

  const questions = [
    { id: "q1", text: "Como faço para X?" },
    { id: "q2", text: "Por que Y acontece?" },
  ];

  return (
    <Layout>
      <Page $isDarkMode={isDarkMode}>
      <Container>
        <h2 style={{ color: theme.colors.textPrimary }}>{content.title}</h2>
        <p style={{ color: theme.colors.textSecondary }}>Categoria: {category}</p>

        <article style={{ marginTop: 16 }}>
          <p style={{ color: theme.colors.textPrimary }}>{content.body}</p>
        </article>

        <section style={{ marginTop: 24 }}>
          <h3 style={{ color: theme.colors.textPrimary }}>Perguntas relacionadas</h3>
          <ul>
            {questions.map((q) => (
              <li key={q.id} style={{ margin: '8px 0' }}>
                <Link to={`/faq/base-conhecimento/${category}/${article}/${q.id}`} style={{ color: theme.colors.primary }}>{q.text}</Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
      </Page>
    </Layout>
  );
}
