import styled from "styled-components";
import { Link } from "react-router-dom";
import { getTheme } from "../../styles/themes";

export const Page = styled.div`
  padding: var(--faq-page-vertical, 32px) var(--faq-page-horizontal, 24px);
`;

export const Container = styled.div`
  max-width: var(--faq-container-max-width, 980px);
  margin: 0 auto;
  padding: 0 16px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--faq-gap, 12px);
  margin-top: 16px;
`;

export const ArticleCard = styled(Link)`
  display: block;
  padding: var(--faq-card-padding, 16px);
  border-radius: 8px;
  background: ${(p) => p.$bg};
  color: inherit;
  text-decoration: none;
  transition: box-shadow 0.16s ease, transform 0.12s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(16,24,40,0.06);
    transform: translateY(-3px);
  }
  &:focus-visible {
    outline: 3px solid ${p => getTheme(p.$isDarkMode).colors.primaryLight};
    outline-offset: 2px;
  }
`;

export const IconBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  background: ${(p) => p.$bg || 'transparent'};
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  svg { display: block; }
`;

export const Pills = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

export const Pill = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid ${(p) => getTheme(p.$isDarkMode).colors.surfaceBorder};
  background: ${(p) => getTheme(p.$isDarkMode).colors.surface};
  color: ${(p) => getTheme(p.$isDarkMode).colors.textPrimary};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${(p) => getTheme(p.$isDarkMode).colors.surfaceHover};
    border-color: ${(p) => getTheme(p.$isDarkMode).colors.surfaceBorderHover};
  }
`;

export const Cards = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

/* Small components to replace inline styles in FAQ pages */
export const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: ${p => getTheme(p.$isDarkMode).colors.textPrimary};
`;

export const HeaderDesc = styled.p`
  margin: 4px 0 0 0;
  color: ${p => getTheme(p.$isDarkMode).colors.textSecondary};
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTitle = styled.strong`
  color: ${p => getTheme(p.$isDarkMode).colors.textPrimary};
  font-size: 1rem;
`;

export const CardSubtitle = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: ${p => getTheme(p.$isDarkMode).colors.textSecondary};
`;

export const SearchWrapper = styled.div`
  margin-bottom: 24px;
`;

export const Breadcrumbs = styled.nav`
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${p => getTheme(p.$isDarkMode).colors.textSecondary};
  font-size: 0.95rem;
`;

export const PrevNext = styled.div`
  margin-top: 28px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid ${p => getTheme(p.$isDarkMode).colors.surfaceBorder};
  padding-top: 20px;
`;

export const PrevNextItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${p => getTheme(p.$isDarkMode).colors.textSecondary};
  max-width: 50%;
  a { text-decoration: none; color: inherit; }
`;

export const FeedbackButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const ButtonPrimary = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: ${p => getTheme(p.$isDarkMode).colors.success};
  color: #fff;
  cursor: pointer;
  &:disabled { opacity: 0.7; cursor: default; }
`;

export const ButtonDanger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: ${p => getTheme(p.$isDarkMode).colors.error};
  color: #fff;
  cursor: pointer;
  &:disabled { opacity: 0.7; cursor: default; }
`;

export default {};
