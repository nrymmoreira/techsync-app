// React automatic JSX runtime in use — explicit import not required
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";
import { ChevronRight, ChevronLeft, Smile, Frown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Layout from "../Layout/Layout";
import helpContent from "../../data/helpContent";
import SearchBar from "./SearchBar";

const Page = styled.div`
  padding: var(--faq-page-vertical, 32px) var(--faq-page-horizontal, 24px);
`;

const Container = styled.div`
  max-width: var(--faq-container-max-width, 980px);
  margin: 0 auto;
  padding: 0 16px;
`;

export default function Question() {
  const { category, article, question } = useParams();
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

  const qIndex = Number.isNaN(Number(question)) ? null : Number(question);
  const qa = qIndex !== null && articleData.questions[qIndex] ? articleData.questions[qIndex] : null;
  const prevQuestion = qIndex > 0 ? qIndex - 1 : null;
  const nextQuestion = qIndex < articleData.questions.length - 1 ? qIndex + 1 : null;

  if (!qa) {
    return (
      <Layout>
        <Page $isDarkMode={isDarkMode}>
          <Container>
            <p style={{ color: theme.colors.textPrimary }}>Pergunta não encontrada.</p>
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
          <Link to={`/faq/base-conhecimento/${category}/${article}`} style={{ color: theme.colors.textSecondary }}>{articleData.title}</Link>
          <ChevronRight size={14} />
          <span style={{ color: theme.colors.textPrimary }}>Pergunta</span>
        </nav>

        <h2 style={{ color: theme.colors.textPrimary }}>{qa.question}</h2>
        <p style={{ color: theme.colors.textSecondary }}>Artigo: {articleData.title} · Categoria: {categoryData.title}</p>

        <div style={{ marginTop: 16 }}>
          <div style={{ color: theme.colors.textPrimary }}>
            <ReactMarkdown>{qa.answer}</ReactMarkdown>
          </div>
        </div>

        {/* Feedback Section */}
        <div style={{ marginTop: 28, borderTop: `1px solid ${theme.colors.surfaceBorder}`, paddingTop: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: theme.colors.textPrimary, marginBottom: 12 }}>Este artigo foi útil?</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 8, background: 'transparent', border: `1px solid ${theme.colors.surfaceBorder}`, color: theme.colors.textPrimary }}>
                <Smile />
                Sim
              </button>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 8, background: 'transparent', border: `1px solid ${theme.colors.surfaceBorder}`, color: theme.colors.textPrimary }}>
                <Frown />
                Não
              </button>
            </div>
          </div>
        </div>

        {/* Navigation prev/next */}
        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', gap: 16, borderTop: `1px solid ${theme.colors.surfaceBorder}`, paddingTop: 20 }}>
          {prevQuestion !== null ? (
            <Link to={`/faq/base-conhecimento/${category}/${article}/${prevQuestion}`} style={{ textDecoration: 'none', color: theme.colors.textSecondary }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ChevronLeft />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', color: theme.colors.textSecondary }}>Anterior</div>
                  <div style={{ maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: theme.colors.textPrimary }}>{articleData.questions[prevQuestion].question}</div>
                </div>
              </div>
            </Link>
          ) : <div />}

          {nextQuestion !== null ? (
            <Link to={`/faq/base-conhecimento/${category}/${article}/${nextQuestion}`} style={{ textDecoration: 'none', color: theme.colors.textSecondary }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', color: theme.colors.textSecondary }}>Próximo</div>
                  <div style={{ maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: theme.colors.textPrimary }}>{articleData.questions[nextQuestion].question}</div>
                </div>
                <ChevronRight />
              </div>
            </Link>
          ) : <div />}
        </div>
      </Container>
      </Page>
    </Layout>
  );
}
