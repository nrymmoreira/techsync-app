import { useMemo, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { useToast } from "../UI/toast";
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

  // Small in-memory dataset to simulate a search index
  const dataset = [
    { id: 1, title: "Como cadastrar um cliente", category: "clientes" },
    { id: 2, title: "Criar orçamentos passo a passo", category: "orcamentos" },
    { id: 3, title: "Configurar integrações", category: "integracoes" },
    { id: 4, title: "Gerenciar projetos e tarefas", category: "projetos" },
    { id: 5, title: "Emitir notas fiscais", category: "notas-fiscais" },
  ];

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
        <h2 style={{ color: theme.colors.textPrimary }}>Resultados da busca</h2>
        <p style={{ color: theme.colors.textSecondary }}>Busca: <strong>{q}</strong></p>

        {results.length === 0 ? (
          <p style={{ color: theme.colors.textPrimary }}>Nenhum resultado encontrado.</p>
        ) : (
          <ul>
            {results.map((r) => (
              <li key={r.id} style={{ margin: '12px 0' }}>
                <Link to={`/faq/base-conhecimento/${r.category}/${r.id}`} style={{ color: theme.colors.primary }}>{r.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
      </Page>
    </Layout>
  );
}
