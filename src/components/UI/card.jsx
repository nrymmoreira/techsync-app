// React automatic JSX runtime in use — explicit import not required
import styled from 'styled-components';
import { getTheme } from '../../styles/themes';

const CardRoot = styled.div`
  background: ${(props) => getTheme(props.$isDarkMode).colors.cardBackground || 'transparent'};
  color: ${(props) => getTheme(props.$isDarkMode).colors.textPrimary};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.06);
  padding: 0.75rem 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
`;

const CardHeaderRoot = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
const CardTitleRoot = styled.div`
  font-weight: 600;
`;
const CardDescriptionRoot = styled.div`
  color: rgba(0,0,0,0.6);
  font-size: 0.9rem;
`;
const CardActionRoot = styled.div`
  margin-left: auto;
`;
const CardContentRoot = styled.div`
  padding: 0 1rem 0.75rem 1rem;
`;
const CardFooterRoot = styled.div`
  padding: 0.75rem 1rem;
  border-top: 1px solid rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export function Card({ children, className, ...props }) {
  return (
    <CardRoot className={className} {...props}>{children}</CardRoot>
  );
}

export function CardHeader(props) {
  return <CardHeaderRoot {...props} />;
}

export function CardTitle(props) {
  return <CardTitleRoot {...props} />;
}

export function CardDescription(props) {
  return <CardDescriptionRoot {...props} />;
}

export function CardAction(props) {
  return <CardActionRoot {...props} />;
}

export function CardContent(props) {
  return <CardContentRoot {...props} />;
}

export function CardFooter(props) {
  return <CardFooterRoot {...props} />;
}

export default Card;
