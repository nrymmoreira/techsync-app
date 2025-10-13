import Groq from "groq-sdk";
import { authService } from "./api";

const AI_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const groq = new Groq({ apiKey: AI_API_KEY, dangerouslyAllowBrowser: true });

const funcoesDisponiveis = [
  "getCompany",
  "getAllClients",
  "getAllProjects",
  "getAllBudgets",
  "getAllTasks",
];

async function identificarFuncoes(perguntaUsuario) {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
            Você é um assistente técnico dentro de um ERP de desenvolvimento.
            Com base na pergunta do usuário, escolha quais funções do authService chamar para
            obter os dados necessários. Use apenas as funções disponíveis.
            Responda **somente um JSON** no formato:
            { "funcoes": ["getProject", "getAllClients"]}

            Funções disponíveis: ${JSON.stringify(funcoesDisponiveis)}
      `,
      },
      { role: "user", content: perguntaUsuario },
    ],
    temperature: 0.3,
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
}

/**
 * Etapa 2: Chamar funções reais do authService
 */
async function buscarDados(
  funcoesSugeridas
) {
  const dadosAPI = {};

  for (const func of funcoesSugeridas) {
    try {
      if (typeof authService[func] === "function") {
        dadosAPI[func] = await authService[func]();
      } else {
        dadosAPI[func] = { error: "Função não existe no authService" };
      }
    } catch (err) {
      console.error(`Erro ao chamar ${func}:`, err);
      dadosAPI[func] = { error: "Falha ao buscar dados" };
    }
  }

  return dadosAPI;
}

async function gerarRespostaNatural(
  perguntaUsuario,
  dadosAPI
) {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
            Você é um assistente de ERP. Responda ao usuário em linguagem natural e educada,
            usando os dados fornecidos. Não responda em JSON. Utilize markdown para formatar a resposta.
      `,
      },
      {
        role: "user",
        content: `
            Pergunta do usuário: ${perguntaUsuario}
            Dados da API: ${JSON.stringify(dadosAPI, null, 2)}
        `,
      },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}


export async function processarPergunta(perguntaUsuario) {
  // 1️⃣ Identifica funções do authService
  const { funcoes } = await identificarFuncoes(perguntaUsuario);
  console.log("Funções sugeridas:", funcoes, "Parâmetros:");

  // 2️⃣ Chama funções reais
  const dadosAPI = await buscarDados(funcoes);

  // 3️⃣ Gera resposta natural
  const respostaFinal = await gerarRespostaNatural(perguntaUsuario, dadosAPI);

  return respostaFinal;
}