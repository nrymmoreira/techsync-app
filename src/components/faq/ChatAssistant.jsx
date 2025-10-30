import { useState } from "react";
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

export default function ChatAssistant() {
  const [message, setMessage] = useState("");
  const { push } = useToast();
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      push("Digite uma mensagem antes de enviar.", { duration: 2500, variant: 'warning' });
      return;
    }

    // placeholder: envio para back-end do assistente
    push("Mensagem enviada ao assistente.", { duration: 3000, variant: 'success' });
    setMessage("");
  };

  return (
    <Layout>
      <Page $isDarkMode={isDarkMode}>
      <Container>
        <h2 style={{ color: theme.colors.textPrimary }}>Assistente de chat</h2>
        <p style={{ color: theme.colors.textSecondary }}>Converse com nosso assistente para obter respostas rápidas.</p>

  <div style={{ marginTop: 16 }}>
          <div style={{ padding: 16, borderRadius: 8, background: theme.colors.surface }}>
            <p style={{ color: theme.colors.textPrimary }}><strong>Assistente:</strong> Olá! Como posso ajudar?</p>
          </div>

          <form style={{ marginTop: 16, display: 'flex', gap: 8 }} onSubmit={handleSend}>
            <input value={message} onChange={(e) => setMessage(e.target.value)} style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: `1px solid ${theme.colors.surfaceBorder}` }} placeholder="Digite sua dúvida..." />
            <button type="submit" style={{ padding: '10px 12px', borderRadius: 8, background: theme.colors.primary, color: theme.colors.background }}>Enviar</button>
          </form>
        </div>
      </Container>
      </Page>
    </Layout>
  );
}
