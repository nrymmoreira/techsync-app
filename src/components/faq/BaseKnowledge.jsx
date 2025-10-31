// React automatic JSX runtime in use — explicit import not required
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";
import Layout from "../Layout/Layout";
import helpContent from "../../data/helpContent";
import { Users, FileText, FolderKanban, DollarSign, Receipt } from "lucide-react";

const IconBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  background: ${(p) => p.$bg || 'transparent'};
`;

const Page = styled.div`
  padding: var(--faq-page-vertical, 32px) var(--faq-page-horizontal, 24px);
`;

const Container = styled.div`
  max-width: var(--faq-container-max-width, 980px);
  margin: 0 auto;
  padding: 0 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--faq-gap, 12px);
  margin-top: 16px;
`;

const ArticleCard = styled(Link)`
  display: block;
  padding: var(--faq-card-padding, 16px);
  border-radius: 8px;
  background: ${(p) => p.$bg};
  color: inherit;
`;

export default function BaseKnowledge() {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  const articles = [
    { id: 1, title: "Como cadastrar um cliente" },
    { id: 2, title: "Criar orçamentos passo a passo" },
    { id: 3, title: "Configurar integrações" },
  ];
  // Build category list from helpContent
  const categories = Object.keys(helpContent).map((key) => ({
    slug: key,
    title: helpContent[key].title,
    count: helpContent[key].articles.reduce((acc, a) => acc + (a.count || 0), 0),
  }));

  return (
    <Layout>
      <Page $isDarkMode={isDarkMode}>
        <Container>
          <h2 style={{ color: theme.colors.textPrimary }}>Base de conhecimento</h2>
          <p style={{ color: theme.colors.textSecondary }}>Artigos e guias rápidos</p>

          <Grid>
            {categories.map((c) => {
              const iconMap = {
                clientes: Users,
                orcamentos: FileText,
                projetos: FolderKanban,
                financeiro: DollarSign,
                notas: Receipt,
              };
              const Icon = iconMap[c.slug] || FileText;
              return (
                <ArticleCard key={c.slug} to={`/faq/base-conhecimento/${c.slug}`} $bg={theme.colors.surface}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <strong style={{ color: theme.colors.textPrimary }}>{c.title}</strong>
                      <div style={{ marginTop: 8, fontSize: 13, color: theme.colors.textSecondary }}>{c.count} artigos</div>
                    </div>
                    <IconBox $bg={theme.colors.primaryLight}>
                      <Icon size={20} color={theme.colors.primary} />
                    </IconBox>
                  </div>
                </ArticleCard>
              );
            })}
          </Grid>
        </Container>
      </Page>
    </Layout>
  );
}
