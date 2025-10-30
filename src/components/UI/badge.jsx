// React automatic JSX runtime in use — explicit import not required
import styled from 'styled-components';
import { getTheme } from '../../styles/themes';

const BadgeRoot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(p) => getTheme(p.$isDarkMode).colors.primary || '#F97316'};
  color: ${(p) => getTheme(p.$isDarkMode).colors.background || '#fff'};
`;

export default function Badge({ children, $isDarkMode, className }) {
  return (
    <BadgeRoot $isDarkMode={$isDarkMode} className={className}>
      {children}
    </BadgeRoot>
  );
}
