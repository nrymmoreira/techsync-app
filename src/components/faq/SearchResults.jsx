import { useMemo, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { useToast } from "../UI/toast";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";
import Layout from "../Layout/Layout";
import helpContent from "../../data/helpContent";

import { Page, Container, HeaderTitle, HeaderDesc } from "./faq.styles";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchResults() {
  const query = useQuery();
  const q = (query.get("q") || "").trim();
  const { push } = useToast();
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  // Build dataset from helpContent
  const dataset = [];
  Object.keys(helpContent).forEach((catKey) => {
    const cat = helpContent[catKey];
    cat.articles.forEach((a) => {
      dataset.push({ type: 'article', category: catKey, title: a.title, slug: a.slug });
      if (a.questions && a.questions.length) {
        a.questions.forEach((ques, idx) => {
          dataset.push({ type: 'question', category: catKey, title: ques.question, slug: a.slug, qIndex: idx });
        });
      }
    });
  });

  const results = q
    ? dataset.filter((item) => item.title.toLowerCase().includes(q.toLowerCase()))
    : [];

  useEffect(() => {
    if (q && results.length === 0) {
      push(`Nenhum resultado encontrado para "${q}".`, { duration: 3000, variant: 'info' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, results.length]);

  return (
    <Layout>
      <Page $isDarkMode={isDarkMode}>
      <Container>
        <HeaderTitle $isDarkMode={isDarkMode}>Resultados da busca</HeaderTitle>
        <HeaderDesc $isDarkMode={isDarkMode}>Busca: <strong>{q}</strong></HeaderDesc>

        {results.length === 0 ? (
          <p style={{ color: theme.colors.textPrimary }}>Nenhum resultado encontrado.</p>
        ) : (
          <ul>
            {results.map((r, idx) => (
              <li key={idx} style={{ margin: '12px 0' }}>
                {r.type === 'article' ? (
                  <Link to={`/faq/base-conhecimento/${r.category}/${r.slug}`} style={{ color: theme.colors.primary }}>{r.title}</Link>
                ) : (
                  <Link to={`/faq/base-conhecimento/${r.category}/${r.slug}/${r.qIndex}`} style={{ color: theme.colors.primary }}>{r.title}</Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </Container>
      </Page>
    </Layout>
  );
}
