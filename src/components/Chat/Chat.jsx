import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import {
  ChatContainer,
  ChatToggleButton,
  ChatTooltip,
  ChatWindow,
  ChatHeader,
  ChatTitle,
  ChatCloseButton,
  ChatMessages,
  ChatMessage,
  MessageContent,
  MessageTime,
  MessageAvatar,
  ChatInputContainer,
  ChatInputField,
  ChatSendButton,
  QuickQuestions,
  QuestionButton,
  EmptyState,
  TypingIndicator,
  TypingDots,
} from "./Chat.styles";
import { Radius } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { processarPergunta } from "../../services/chat";

const Chat = () => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const tooltipTimeoutRef = useRef(null);

  // Verificar se o usuário está logado
  const isAuthenticated = () => {
    return localStorage.getItem("techsync-authenticated") === "true";
  };

  // Se não estiver logado, não renderizar o chat
  if (!isAuthenticated()) {
    return null;
  }

  const quickQuestions = [
    "Como criar um  cliente?",
    "Como gerar orçamento?",
    "Como alterar meu perfil?",
    "Como exportar relatórios?",
    "Como gerenciar projetos?",
  ];

  const predefinedAnswers = {
    "Como criar um novo cliente?":
      "Para criar um novo cliente, vá até a seção 'Clientes' no menu principal e clique em 'Adicionar Cliente'. Preencha os dados obrigatórios como nome, CNPJ e telefone.",
    "Como gerar um orçamento?":
      "Para gerar um orçamento, acesse 'Orçamentos' no menu e clique em 'Novo Orçamento'. Selecione o cliente, adicione os serviços e valores, e clique em 'Gerar PDF'.",
    "Como alterar meu perfil?":
      "Vá até 'Perfil' no menu do usuário (canto superior direito). Lá você pode editar seus dados pessoais e informações da empresa.",
    "Como exportar relatórios?":
      "Esta funcionalidade estará disponível em breve. Você poderá exportar relatórios de clientes, orçamentos e projetos em PDF.",
    "Como gerenciar projetos?":
      "O módulo de gerenciamento de projetos está em desenvolvimento e estará disponível em breve na plataforma.",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  const handleMouseEnter = () => {
    if (!isOpen) {
      tooltipTimeoutRef.current = setTimeout(() => {
        setShowTooltip(true);
      }, 500);
    }
  };

  const handleMouseLeave = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setShowTooltip(false);
  };

  const sendMessage = async (text) => {
  if (!text.trim()) return;

  const userMessage = {
    id: Date.now(),
    text: text.trim(),
    sender: "user",
    timestamp: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputValue("");
  setIsTyping(true);

  try {
    // const response = await fetch("http://localhost:8080/chat", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ user_input: text }),
    // });

    // const data = await response.json();

   
    processarPergunta(text).then((data) => {
      const systemMessage = {
        id: Date.now() + 1,
        text:
          data ||
          "Desculpe, não consegui entender sua pergunta.",
        sender: "system",
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, systemMessage]);
    });
  } catch (error) {
    console.error(error);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        text: "Ocorreu um erro ao buscar a resposta. Tente novamente mais tarde.",
        sender: "system",
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  } finally {
    setIsTyping(false);
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };
  
  const handleNewChat = () =>{
    setMessages([])
  }

  return (
    <ChatContainer>
      <div style={{ position: "relative" }}>
        <ChatToggleButton
          onClick={toggleChat}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          $isDarkMode={isDarkMode}
          $isOpen={isOpen}
          aria-label="Abrir chat da Athena"
        >
          <span className="material-symbols-outlined">
            {isOpen ? "close" : "smart_toy"}
          </span>
        </ChatToggleButton>

        {showTooltip && !isOpen && (
          <ChatTooltip $isDarkMode={isDarkMode}>
            Em que posso te ajudar?
          </ChatTooltip>
        )}
      </div>

      {isOpen && (
        <ChatWindow $isDarkMode={isDarkMode}>
          <ChatHeader $isDarkMode={isDarkMode}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #F97316, #ea6a0a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  boxShadow: "0 2px 8px rgba(249, 115, 22, 0.3)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "1.25rem" }}
                >
                  smart_toy
                </span>
              </div>
              <div>
                <ChatTitle $isDarkMode={isDarkMode}>Athena</ChatTitle>
                <div
                  style={{
                    fontSize: "0.75rem",
                    opacity: 0.8,
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#22c55e",
                      animation: "pulse 2s infinite",
                    }}
                  ></div>
                  Online
                </div>
              </div>
            </div>
          <button onClick={handleNewChat} style={{
            background:'linear-gradient(135deg, #F97316, #ea6a0a)',
            color:'white',
            padding:'0.7rem',
            borderRadius:'10px'
          }}>Novo chat</button>
            <ChatCloseButton
              onClick={toggleChat}
              $isDarkMode={isDarkMode}
              aria-label="Fechar chat"
            >
              <span className="material-symbols-outlined">close</span>
            </ChatCloseButton>
          </ChatHeader>

          <ChatMessages $isDarkMode={isDarkMode}>
            {messages.length === 0 ? (
              <EmptyState $isDarkMode={isDarkMode}>
                <div
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "1rem",
                    background: "linear-gradient(135deg, #F97316, #ea6a0a)",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    margin: "0 auto 1rem auto",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "2rem" }}
                  >
                    smart_toy
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0 0 0.5rem 0",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                  }}
                >
                  Olá! Sou a Athena 👋
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    opacity: 0.8,
                    textAlign: "center",
                    lineHeight: "1.4",
                  }}
                >
                  Sua assistente virtual do TechSync. Como posso ajudar você
                  hoje?
                </p>

                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    marginTop: '1rem',
                    opacity: 0.9,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "1rem"
                     }}
                  >
                    help
                  </span>
                  Perguntas frequentes:
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {quickQuestions.map((question, index) => (
                    <QuestionButton
                      style={{
                        fontSize: "0.72rem",
                        padding: "12px",
                        width: "100%",
                      }}
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      $isDarkMode={isDarkMode}
                    >
                      {question}
                    </QuestionButton>
                  ))}
                </div>
              </EmptyState>
            ) : (
              messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  $sender={message.sender}
                  $isDarkMode={isDarkMode}
                >
                  <MessageAvatar
                    $sender={message.sender}
                    $isDarkMode={isDarkMode}
                  >
                    {message.sender === "user" ? (
                      <span className="material-symbols-outlined">person</span>
                    ) : (
                      <span className="material-symbols-outlined">
                        smart_toy
                      </span>
                    )}
                  </MessageAvatar>
                  <div>
                    <MessageContent
                      $sender={message.sender}
                      $isDarkMode={isDarkMode}
                    >
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </MessageContent>
                    <MessageTime
                      $isDarkMode={isDarkMode}
                      $sender={message.sender}
                    >
                      {message.timestamp}
                    </MessageTime>
                  </div>
                </ChatMessage>
              ))
            )}

            {isTyping && (
              <ChatMessage $sender="system" $isDarkMode={isDarkMode}>
                <MessageAvatar $sender="system" $isDarkMode={isDarkMode}>
                  <span className="material-symbols-outlined">smart_toy</span>
                </MessageAvatar>
                <TypingIndicator $isDarkMode={isDarkMode}>
                  <TypingDots>
                    <span></span>
                    <span></span>
                    <span></span>
                  </TypingDots>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      marginLeft: "0.5rem",
                      opacity: 0.7,
                    }}
                  >
                    Athena está digitando...
                  </span>
                </TypingIndicator>
              </ChatMessage>
            )}

            <div ref={messagesEndRef} />
          </ChatMessages>

          <ChatInputContainer $isDarkMode={isDarkMode}>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", gap: "0.5rem" }}
            >
              <ChatInputField
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem para a Athena..."
                $isDarkMode={isDarkMode}
                disabled={isTyping}
              />
              <ChatSendButton
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                $isDarkMode={isDarkMode}
                aria-label="Enviar mensagem"
              >
                <span className="material-symbols-outlined">send</span>
              </ChatSendButton>
            </form>
          </ChatInputContainer>
        </ChatWindow>
      )}
    </ChatContainer>
  );
};

export default Chat;
