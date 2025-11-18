import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatBot.module.css";
import { sendMessageToN8n } from "../../service/n8nApi";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá me chamo Gabrielly, e sou sua assistente de vendas. Como posso ajudar você hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll automático para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Foca no input quando o chat abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    // Adiciona mensagem do usuário
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Envia mensagem para o n8n
      const response = await sendMessageToN8n(userMessage.text);

      // Processa a resposta do n8n
      // A resposta pode vir em diferentes formatos dependendo da configuração do workflow
      let botResponse = "";

      if (response) {
        // Se a resposta for um objeto, tenta extrair a mensagem
        if (typeof response === "object") {
          botResponse =
            response.message ||
            response.text ||
            response.response ||
            response.output ||
            JSON.stringify(response);
        } else {
          botResponse = String(response);
        }
      } else {
        botResponse =
          "Desculpe, não consegui processar sua mensagem. Tente novamente.";
      }

      // Se a resposta estiver vazia, usa uma mensagem padrão
      if (!botResponse || botResponse.trim() === "") {
        botResponse =
          "Recebi sua mensagem, mas não obtive uma resposta. Por favor, tente novamente.";
      }

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      console.error("Detalhes do erro:", error.details);

      // Mensagem de erro mais específica
      let errorText = "Desculpe, ocorreu um erro ao processar sua mensagem.";

      if (error.code === "NO_WEBHOOK_CONFIGURED") {
        errorText =
          "Erro de configuração: Webhook do n8n não configurado. Verifique o arquivo .env e configure VITE_N8N_WEBHOOK_URL.";
      } else if (error.details) {
        if (error.details.status === 404) {
          errorText =
            "Erro 404: Webhook não encontrado. Verifique se a URL do webhook está correta e se o workflow está ativo no n8n.";
        } else if (error.details.status === 500) {
          errorText =
            "Erro 500: Erro interno no n8n. Verifique os logs do n8n para mais detalhes.";
        } else if (error.details.status) {
          errorText = `Erro ${error.details.status}: ${
            error.details.message || "Erro ao comunicar com o n8n"
          }`;
        } else if (error.details.message) {
          errorText = error.details.message;
        }
      } else if (error.message) {
        errorText = `Erro: ${error.message}`;
      }

      // Adiciona sugestões de solução
      const suggestions = [];
      if (!import.meta.env.VITE_N8N_WEBHOOK_URL) {
        suggestions.push("• Configure VITE_N8N_WEBHOOK_URL no arquivo .env");
      }
      suggestions.push(
        "• Verifique se o n8n está rodando: docker ps | grep n8n"
      );
      suggestions.push("• Verifique se o workflow está ativo no n8n");
      suggestions.push(
        "• Verifique o console do navegador (F12) para mais detalhes"
      );

      const errorMessage = {
        id: Date.now() + 1,
        text: `${errorText}\n\n${suggestions.join("\n")}`,
        sender: "bot",
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Botão flutuante para abrir o chat */}
      <button
        className={styles.chatToggle}
        onClick={toggleChat}
        aria-label="Abrir chat"
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Container do chat */}
      {isOpen && (
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderInfo}>
              <div className={styles.chatAvatar}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
              <div>
                <h3 className={styles.chatTitle}>Assistente de Vendas</h3>
                <p className={styles.chatSubtitle}>Online</p>
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={toggleChat}
              aria-label="Fechar chat"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className={styles.chatMessages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage
                } ${message.isError ? styles.errorMessage : ""}`}
              >
                <div className={styles.messageContent}>
                  <p>{message.text}</p>
                  <span className={styles.messageTime}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.botMessage}`}>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className={styles.chatInput} onSubmit={handleSendMessage}>
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              disabled={isLoading}
              className={styles.inputField}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className={styles.sendButton}
              aria-label="Enviar mensagem"
            >
              {isLoading ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={styles.spinner}
                >
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
