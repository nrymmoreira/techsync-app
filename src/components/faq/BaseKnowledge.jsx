// React automatic JSX runtime in use — explicit import not required
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";
import Layout from "../Layout/Layout";
import helpContent from "../../data/helpContent";
import { Users, FileText, FolderKanban, DollarSign, Receipt } from "lucide-react";
import { Page, Container, Grid, ArticleCard, IconBox, HeaderTitle, HeaderDesc, CardContent, CardTitle, CardSubtitle } from "./faq.styles";

export default function BaseKnowledge() {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  const articles = [
    { id: 1, title: "Como cadastrar um cliente" },
    { id: 2, title: "Criar orçamentos passo a passo" },
    { id: 3, title: "Configurar integrações" },
  ];
  // Build category list from helpContent
  // Count articles per category (number of articles) — original source used per-article `count` which represented
  // number of questions and led to confusing labels. Show article count instead.
  const categories = Object.keys(helpContent).map((key) => ({
    slug: key,
    title: helpContent[key].title,
    count: Array.isArray(helpContent[key].articles) ? helpContent[key].articles.length : 0,
  }));

  return (
    <Layout>
      <Page $isDarkMode={isDarkMode}>
        <Container>
          <HeaderTitle $isDarkMode={isDarkMode}>Base de conhecimento</HeaderTitle>
          <HeaderDesc $isDarkMode={isDarkMode}>Artigos e guias rápidos</HeaderDesc>

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
                <ArticleCard key={c.slug} to={`/faq/base-conhecimento/${c.slug}`} $bg={theme.colors.surface} $isDarkMode={isDarkMode}>
                  <CardContent>
                    <div>
                      <CardTitle $isDarkMode={isDarkMode}>{c.title}</CardTitle>
                      <CardSubtitle $isDarkMode={isDarkMode}>{c.count} artigos</CardSubtitle>
                    </div>
                    <IconBox $bg={theme.colors.primaryLight}>
                      <Icon size={20} color={theme.colors.primary} />
                    </IconBox>
                  </CardContent>
                </ArticleCard>
              );
            })}
          </Grid>
        </Container>
      </Page>
    </Layout>
  );
}
