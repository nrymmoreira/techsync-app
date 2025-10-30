import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import Input from "../Input/Input";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  position: relative;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  transition: color 0.2s;
  
  &:hover {
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textPrimary;
    }};
  }
  
  svg {
    display: block;
  }
`;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      navigate(`/faq/busca?q=${encodeURIComponent(q)}`);
    }
  };

  const clear = () => setQuery("");

  return (
    <form onSubmit={handleSearch} aria-label="Formulário de busca do FAQ">
      <Row>
        <Input
          id="faq-search"
          type="search"
          aria-label="Buscar no FAQ"
          placeholder="Encontrar sua resposta"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={<Search size={18} />}
          style={{ flex: 1 }}
        />

        {query && (
          <ClearButton
            type="button"
            onClick={clear}
            title="Limpar pesquisa"
            aria-label="Limpar pesquisa"
            $isDarkMode={isDarkMode}
          >
            <X size={16} />
          </ClearButton>
        )}
      </Row>
    </form>
  );
}
