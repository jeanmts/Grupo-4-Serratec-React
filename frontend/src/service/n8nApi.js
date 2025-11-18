import axios from "axios";

// Configuração da API do n8n
const n8nApi = axios.create({
  baseURL: import.meta.env.VITE_N8N_URL || "http://localhost:5678",
  timeout: 30000, // 30 segundos para dar tempo ao agente processar
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Envia uma mensagem para o workflow do n8n via webhook
 * @param {string} message - Mensagem do usuário
 * @param {string} workflowId - ID do workflow (opcional, se usar webhook direto)
 * @returns {Promise} Resposta do n8n
 */
export const sendMessageToN8n = async (message, workflowId = null) => {
  try {
    // Opção 1: Via webhook (se configurado no n8n)
    // Você precisa criar um webhook no workflow do n8n e usar a URL gerada
    const webhookUrl = "http://localhost:5678/webhook/4ec7f5f5-21c9-4080-8df5-0def8dabc190";

    if (webhookUrl) {
      console.log("Enviando mensagem para webhook:", webhookUrl);
      console.log("Mensagem:", message);

      const response = await axios.post(webhookUrl, {
        termo: message,
        timestamp: new Date().toISOString(),
      }, {
        timeout: 30000,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Resposta do n8n:", response.data);
      return response.data;
    }

    // Opção 2: Via API REST do n8n (requer autenticação)
    // Primeiro, você precisa obter o workflow ID do n8n
    if (workflowId) {
      console.log("Executando workflow:", workflowId);
      const response = await n8nApi.post(`/api/v1/workflows/${workflowId}/execute`, {
        data: {
          message: message,
        },
      });
      return response.data;
    }

    // Opção 3: Via webhook genérico (mais comum)
    // O n8n gera uma URL de webhook quando você adiciona um nó "Webhook"
    // Exemplo: http://localhost:5678/webhook/abc123
    const error = new Error(
      "Configure VITE_N8N_WEBHOOK_URL no arquivo .env ou forneça o workflowId"
    );
    error.code = "NO_WEBHOOK_CONFIGURED";
    throw error;
  } catch (error) {
    console.error("Erro ao enviar mensagem para n8n:", error);

    // Melhorar informações do erro
    if (error.response) {
      // Erro de resposta do servidor
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      error.details = {
        status: error.response.status,
        data: error.response.data,
        message: `Erro ${error.response.status}: ${error.response.statusText}`,
      };
    } else if (error.request) {
      // Erro de requisição (sem resposta)
      console.error("Sem resposta do servidor");
      error.details = {
        message: "Não foi possível conectar ao n8n. Verifique se está rodando.",
        suggestion: "Verifique se o n8n está rodando: docker ps | grep n8n",
      };
    } else {
      // Outro tipo de erro
      error.details = {
        message: error.message || "Erro desconhecido",
      };
    }

    throw error;
  }
};

/**
 * Executa um workflow específico do n8n
 * @param {string} workflowId - ID do workflow
 * @param {object} data - Dados para enviar ao workflow
 * @returns {Promise} Resposta do n8n
 */
export const executeN8nWorkflow = async (workflowId, data) => {
  try {
    const response = await n8nApi.post(`/api/v1/workflows/${workflowId}/execute`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao executar workflow do n8n:", error);
    throw error;
  }
};

export default n8nApi;