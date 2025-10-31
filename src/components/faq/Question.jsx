// React automatic JSX runtime in use — explicit import not required
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";
import { ChevronRight, ChevronLeft, Smile, Frown } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";
import { sendFaqFeedback } from "../../services/faq";
import { useToast } from "../UI/toast";
import Layout from "../Layout/Layout";
import helpContent from "../../data/helpContent";
import SearchBar from "./SearchBar";
import { Page, Container, Breadcrumbs, PrevNext, PrevNextItem, FeedbackButtons, ButtonPrimary, ButtonDanger, SearchWrapper } from "./faq.styles";
// Page and Container are imported from faq.styles

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
  const { push } = useToast();
  const [feedbackSelection, setFeedbackSelection] = React.useState(null); // true = sim, false = nao

  const handleFeedback = async (helpful) => {
    // optimistic UI: mark selection immediately
    setFeedbackSelection(helpful);
    const res = await sendFaqFeedback({ category, article, questionIndex: qIndex, helpful });
    if (res.ok) {
      push('Obrigado pelo feedback!', { variant: 'success' });
    } else if (res.queued) {
      // Treat queued feedback as successfully accepted locally
      push('Feedback enviado', { variant: 'success' });
    } else {
      push('Não foi possível enviar o feedback.', { variant: 'error' });
    }
  };

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
        <SearchWrapper>
          <SearchBar />
        </SearchWrapper>

        <Breadcrumbs $isDarkMode={isDarkMode} aria-label="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/faq">FAQ</Link>
          <ChevronRight size={14} />
          <Link to={`/faq/base-conhecimento/${category}/${article}`}>{articleData.title}</Link>
          <ChevronRight size={14} />
          <span style={{ color: theme.colors.textPrimary }}>Pergunta</span>
        </Breadcrumbs>

        <h2 style={{ color: theme.colors.textPrimary }}>{qa.question}</h2>
        {/* <p style={{ color: theme.colors.textSecondary }}>Artigo: {articleData.title} · Categoria: {categoryData.title}</p> */}

        <div style={{ marginTop: 16, color: theme.colors.textPrimary }}>
          <ReactMarkdown>{qa.answer}</ReactMarkdown>
        </div>

        {/* Feedback Section */}
        <div style={{ marginTop: 28 }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: theme.colors.textPrimary, marginBottom: 12 }}>Este artigo foi útil?</h3>
            <FeedbackButtons>
              <ButtonPrimary
                onClick={() => handleFeedback(true)}
                disabled={feedbackSelection !== null}
                aria-pressed={feedbackSelection === true}
                $isDarkMode={isDarkMode}
              >
                <Smile color="#fff" />
                Sim
              </ButtonPrimary>

              <ButtonDanger
                onClick={() => handleFeedback(false)}
                disabled={feedbackSelection !== null}
                aria-pressed={feedbackSelection === false}
                $isDarkMode={isDarkMode}
              >
                <Frown color="#fff" />
                Não
              </ButtonDanger>
            </FeedbackButtons>
          </div>
        </div>

        {/* Navigation prev/next */}
        <PrevNext $isDarkMode={isDarkMode}>
          {prevQuestion !== null ? (
            <PrevNextItem $isDarkMode={isDarkMode}>
              <Link to={`/faq/base-conhecimento/${category}/${article}/${prevQuestion}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ChevronLeft />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', color: theme.colors.textSecondary }}>Anterior</div>
                    <div style={{ maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: theme.colors.textPrimary }}>{articleData.questions[prevQuestion].question}</div>
                  </div>
                </div>
              </Link>
            </PrevNextItem>
          ) : <div />}

          {nextQuestion !== null ? (
            <PrevNextItem $isDarkMode={isDarkMode} style={{ justifyContent: 'flex-end', textAlign: 'right' }}>
              <Link to={`/faq/base-conhecimento/${category}/${article}/${nextQuestion}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', color: theme.colors.textSecondary }}>Próximo</div>
                    <div style={{ maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: theme.colors.textPrimary }}>{articleData.questions[nextQuestion].question}</div>
                  </div>
                  <ChevronRight />
                </div>
              </Link>
            </PrevNextItem>
          ) : <div />}
        </PrevNext>
      </Container>
      </Page>
    </Layout>
  );
}
