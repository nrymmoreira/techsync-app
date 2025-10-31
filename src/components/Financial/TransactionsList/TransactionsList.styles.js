import styled from "styled-components";
import { getTheme } from "../../../styles/themes";
import { fonts, breakpoints } from "../../../styles/GlobalStyles";

export const TransactionsContainer = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  background: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
`;

export const TransactionsContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const TransactionsHeader = styled.div`
  margin-bottom: 2rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const PageTitle = styled.h1`
  font-family: ${fonts.primary};
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 0.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.75rem;
  }
`;

export const PageDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 1rem;
  color: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  line-height: 1.5;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9375rem;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    justify-content: flex-end;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.75rem;

    button {
      width: 100%;
    }
  }
`;

export const FiltersSection = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0.75rem;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 300px;
  height: 48px;
  padding: 0 1rem 0 3rem;
  box-sizing: border-box;
  background: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 2px solid
    ${(props) => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceBorder;
    }};
  border-radius: 8px;
  color: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  transition: all 0.3s ease;

  background-image: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    const color = theme.colors.textSecondary.replace("#", "");
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cpath d='m21 21-4.35-4.35'%3E%3C/path%3E%3C/svg%3E")`;
  }};
  background-repeat: no-repeat;
  background-position: 1rem center;

  &::placeholder {
    color: ${(props) => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textSecondary;
    }};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    box-shadow: 0 0 0 3px
      ${(props) => {
        const theme = getTheme(props.$isDarkMode);
        return theme.colors.primaryLight;
      }};
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    min-width: unset;
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid
    ${(props) => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceBorder;
    }};

  @media (max-width: ${breakpoints.mobile}) {
    margin: 0 -1rem;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
`;

export const TransactionsTable = styled.table`
  width: 100%;
  background: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border-collapse: collapse;
  min-width: 900px;

  @media (max-width: ${breakpoints.mobile}) {
    min-width: 800px;
  }
`;

export const TableHeader = styled.thead`
  background: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border-bottom: 1px solid
    ${(props) => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceBorder;
    }};
  color: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
`;

export const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-family: ${fonts.secondary};
  font-weight: 600;
  font-size: 0.875rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0.75rem 0.5rem;
    font-size: 0.8125rem;
  }
`;

export const TableBody = styled.tbody``;

export const TransactionRow = styled.tr`
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid
    ${(props) => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceBorder;
    }};

  &:hover {
    background: ${(props) => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceHover;
    }};
  }

  &:last-child {
    border-bottom: none;
  }

  td {
    padding: 1rem;
    vertical-align: middle;
    color: ${(props) => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textSecondary;
    }};

    @media (max-width: ${breakpoints.tablet}) {
      padding: 0.75rem 0.5rem;
    }
  }
`;

export const TransactionInfo = styled.div``;

export const TransactionDescription = styled.div`
  font-family: ${fonts.secondary};
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 0.25rem;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.875rem;
  }
`;

export const TransactionCategory = styled.div`
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  color: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  padding: 0.25rem 0.75rem;
  background: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border-radius: 12px;
  display: inline-block;
`;

export const TransactionAmount = styled.div`
  font-family: ${fonts.secondary};
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return props.$type === "ENTRADA"
      ? theme.colors.success
      : theme.colors.error;
  }};
  text-align: right;

  @media (max-width: ${breakpoints.tablet}) {
    text-align: left;
    font-size: 0.9375rem;
  }
`;

export const TransactionStatus = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-family: ${fonts.secondary};
  font-size: 0.8125rem;
  font-weight: 500;

  ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    switch (props.$status) {
      case "success":
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
          border: 1px solid ${theme.colors.success}40;
        `;
      case "warning":
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
          border: 1px solid ${theme.colors.warning}40;
        `;
      case "error":
        return `
          background: ${theme.colors.error}20;
          color: ${theme.colors.error};
          border: 1px solid ${theme.colors.error}40;
        `;
      default:
        return `
          background: ${theme.colors.info}20;
          color: ${theme.colors.info};
          border: 1px solid ${theme.colors.info}40;
        `;
    }
  }}

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid
    ${(props) => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceBorder;
    }};
  border-radius: 12px;
`;

export const EmptyStateIcon = styled.span`
  font-size: 4rem;
  color: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textTertiary;
  }};
  margin-bottom: 1.5rem;
  opacity: 0.5;
`;

export const EmptyStateTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 0.5rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

export const EmptyStateDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  color: ${(props) => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  line-height: 1.5;
  max-width: 400px;
`;
