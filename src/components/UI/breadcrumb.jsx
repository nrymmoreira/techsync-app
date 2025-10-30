// React automatic JSX runtime in use — explicit import not required
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getTheme } from '../../styles/themes';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: ${(p) => getTheme(p.$isDarkMode).colors.textSecondary || 'rgba(0,0,0,0.6)'};
`;

const Crumb = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const Separator = styled.span`
  color: rgba(0,0,0,0.35);
`;

export default function Breadcrumb({ items = [], $isDarkMode }) {
  // items: [{ label, to? }]
  return (
    <Nav aria-label="breadcrumb" $isDarkMode={$isDarkMode}>
      {items.map((it, idx) => (
        <Crumb key={idx}>
          {it.to ? <Link to={it.to}>{it.label}</Link> : <span>{it.label}</span>}
          {idx < items.length - 1 && <Separator aria-hidden>›</Separator>}
        </Crumb>
      ))}
    </Nav>
  );
}
