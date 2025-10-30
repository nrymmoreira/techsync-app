import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useToast } from "../UI/toast";
import { useTheme } from "../../contexts/ThemeContext";
import { getTheme } from "../../styles/themes";

const Page = styled.div`
  padding: 32px 24px;
`;

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

export default function Support() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const { push } = useToast();
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      push("Por favor, preencha o assunto e a descrição.", { duration: 3500 });
      return;
    }

    // Aqui enviaríamos para a API; por enquanto mostramos um toast de sucesso
    push("Solicitação enviada com sucesso!", { duration: 4000 });
    setSubject("");
    setDescription("");
  };

  return (
    <Page>
      <Container>
        <h2 style={{ color: theme.colors.textPrimary }}>Solicitações de suporte</h2>
        <p style={{ color: theme.colors.textSecondary }}>Abra um chamado ou veja o status das solicitações</p>

        <form onSubmit={handleSubmit} style={{ marginTop: 20, maxWidth: 720 }}>
          <div style={{ marginBottom: 12 }}>
            <Input
              id="support-subject"
              label="Assunto"
              placeholder="Resuma o problema"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              $isDarkMode={isDarkMode}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <Input
              id="support-desc"
              label="Descrição"
              as="textarea"
              placeholder="Descreva o problema com detalhes"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              $isDarkMode={isDarkMode}
            />
          </div>

          <div>
            <Button type="submit" $isDarkMode={isDarkMode}>Enviar solicitação</Button>
          </div>
        </form>
      </Container>
    </Page>
  );
}
