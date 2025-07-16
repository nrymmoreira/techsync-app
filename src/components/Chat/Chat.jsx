import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  ChatContainer,
  ChatToggleButton,
  ChatWindow,
  ChatHeader,
  ChatTitle,
  ChatCloseButton,
  ChatMessages,
  ChatMessage,
  MessageContent,
  MessageTime,
  MessageAvatar,
  ChatInput,
  ChatInputContainer,
  ChatInputField,
  ChatSendButton,
  QuickQuestions,
  QuestionButton,
  EmptyState,
  TypingIndicator,
  TypingDots
} from './Chat.styles';

const Chat = () => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickQuestions = [
    "Como criar um novo cliente?",
    "Como gerar um orçamento?",
    "Como alterar meu perfil?",
    "Como exportar relatórios?",
    "Como configurar notificações?",
    "Como gerenciar projetos?"
  ];

  const predefinedAnswers = {
    "Como criar um novo cliente?": "Para criar um novo cliente, vá até a seção 'Clientes' no menu principal e clique em 'Adicionar Cliente'. Preencha os dados obrigatórios como nome, CNPJ e telefone.",
    "Como gerar um orçamento?": "Para gerar um orçamento, acesse 'Orçamentos' no menu e clique em 'Novo Orçamento'. Selecione o cliente, adicione os serviços e valores, e clique em 'Gerar PDF'.",
    "Como alterar meu perfil?": "Vá até 'Perfil' no menu do usuário (canto superior direito). Lá você pode editar seus dados pessoais e informações da empresa.",
    "Como exportar relatórios?": "Esta funcionalidade estará disponível em breve. Você poderá exportar relatórios de clientes, orçamentos e projetos em PDF.",
    "Como configurar notificações?": "As configurações de notificação estarão disponíveis na seção 'Configurações' do seu perfil em uma próxima atualização.",
    "Como gerenciar projetos?": "O módulo de gerenciamento de projetos está em desenvolvimento e estará disponível em breve na plataforma."
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular resposta do sistema
    setTimeout(() => {
      const response = predefinedAnswers[text.trim()] || 
        "Obrigado pela sua pergunta! Nossa equipe está trabalhando para melhorar continuamente a plataforma. Em breve teremos mais funcionalidades disponíveis.";

      const systemMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'system',
        timestamp: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      setMessages(prev => [...prev, systemMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <ChatContainer>
      <ChatToggleButton
        onClick={toggleChat}
        $isDarkMode={isDarkMode}
        $isOpen={isOpen}
        aria-label="Abrir chat de suporte"
      >
        <span className="material-symbols-outlined">
          {isOpen ? 'close' : 'chat'}
        </span>
      </ChatToggleButton>

      {isOpen && (
        <ChatWindow $isDarkMode={isDarkMode}>
          <ChatHeader $isDarkMode={isDarkMode}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#F97316',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600'
              }}>
                TS
              </div>
              <div>
                <ChatTitle $isDarkMode={isDarkMode}>TechSync Suporte</ChatTitle>
                <div style={{ 
                  fontSize: '0.75rem', 
                  opacity: 0.7,
                  color: 'inherit'
                }}>
                  Online
                </div>
              </div>
            </div>
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
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: '1rem',
                  opacity: 0.5
                }}>
                  💬
                </div>
                <h3 style={{ 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  Como posso ajudar?
                </h3>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.875rem',
                  opacity: 0.7,
                  textAlign: 'center',
                  lineHeight: '1.4'
                }}>
                  Escolha uma pergunta abaixo ou digite sua dúvida
                </p>
              </EmptyState>
            ) : (
              messages.map((message) => (
                <ChatMessage key={message.id} $sender={message.sender} $isDarkMode={isDarkMode}>
                  <MessageAvatar $sender={message.sender} $isDarkMode={isDarkMode}>
                    {message.sender === 'user' ? (
                      <span className="material-symbols-outlined">person</span>
                    ) : (
                      'TS'
                    )}
                  </MessageAvatar>
                  <div>
                    <MessageContent $sender={message.sender} $isDarkMode={isDarkMode}>
                      {message.text}
                    </MessageContent>
                    <MessageTime $isDarkMode={isDarkMode}>
                      {message.timestamp}
                    </MessageTime>
                  </div>
                </ChatMessage>
              ))
            )}

            {isTyping && (
              <ChatMessage $sender="system" $isDarkMode={isDarkMode}>
                <MessageAvatar $sender="system" $isDarkMode={isDarkMode}>
                  TS
                </MessageAvatar>
                <TypingIndicator $isDarkMode={isDarkMode}>
                  <TypingDots>
                    <span></span>
                    <span></span>
                    <span></span>
                  </TypingDots>
                </TypingIndicator>
              </ChatMessage>
            )}

            <div ref={messagesEndRef} />
          </ChatMessages>

          {messages.length === 0 && (
            <QuickQuestions $isDarkMode={isDarkMode}>
              <div style={{ 
                fontSize: '0.875rem', 
                fontWeight: '600', 
                marginBottom: '0.75rem',
                opacity: 0.8
              }}>
                Perguntas frequentes:
              </div>
              {quickQuestions.map((question, index) => (
                <QuestionButton
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  $isDarkMode={isDarkMode}
                >
                  {question}
                </QuestionButton>
              ))}
            </QuickQuestions>
          )}

          <ChatInputContainer $isDarkMode={isDarkMode}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
              <ChatInputField
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
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