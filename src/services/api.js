import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('techsync-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginOrRegisterPath = error.config.url.includes('/api/usuarios/login') || error.config.url.includes('/api/usuarios');

    if (error.response?.status === 401 && !isLoginOrRegisterPath) {
      localStorage.removeItem('techsync-token');
      localStorage.removeItem('techsync-authenticated');
      localStorage.removeItem('techsync-user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // --- NOVA FUNÇÃO QUE ORQUESTRA O REGISTO COMPLETO ---
  registerAndCreateCompany: async (userData, companyData) => {
    try {
      // Passo 1: Registar o utilizador (endpoint público)
      await api.post('/api/usuarios', userData);

      // Passo 2: Fazer login para obter o token e o ID do novo utilizador
      const loginResponse = await api.post('/api/usuarios/login', {
        email: userData.email,
        senha: userData.senha,
      });

      const userId = loginResponse.data.user?.id;
      const token = loginResponse.data.token; // Capturar o token

      // Validar se obtivemos os dados necessários
      if (userId == null || !token) {
        throw new Error('Falha ao obter dados de autenticação após o registo.');
      }

      // Passo 3: Criar a empresa, associando-a ao ID do utilizador
      const companyPayload = {
        ...companyData,
        usuario: { id: userId },
      };

      // Adiciona manualmente o token de autenticação ao cabeçalho
      // para esta requisição específica, pois ainda não está no localStorage.
      await api.post('/api/empresa', companyPayload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return { success: true };

    } catch (error) {
      console.error("Erro no processo de registo:", error);
      throw new Error(error.response?.data?.error || 'Erro no processo de registo.');
    }
  },

  login: async (email, password) => {
    try {
      const loginResponse = await api.post('/api/usuarios/login', { email, senha: password });

      if (loginResponse.data.token) {
        localStorage.setItem('techsync-token', loginResponse.data.token);
        localStorage.setItem('techsync-authenticated', 'true');

        const basicUser = loginResponse.data.user;
        if (!basicUser || basicUser.id == null) {
            throw new Error("Dados do utilizador não retornados no login.");
        }

        let companyData = null;
        try {
            const companyResponse = await api.get(`/api/empresa/usuario/${basicUser.id}`);
            companyData = companyResponse.data;
        } catch (companyError) {
            if (companyError.response?.status !== 404) {
                console.error("Erro ao buscar dados da empresa durante o login:", companyError);
            }
        }

        const completeUser = { ...basicUser, empresa: companyData };
        localStorage.setItem('techsync-user', JSON.stringify(completeUser));
      }
      return loginResponse.data;
    } catch (error) {
      localStorage.removeItem('techsync-token');
      localStorage.removeItem('techsync-authenticated');
      localStorage.removeItem('techsync-user');
      throw new Error(error.response?.data?.error || 'Erro ao fazer login: Credenciais inválidas.');
    }
  },
  
  // ... (restante das funções)
  getUserById: async (id) => {
    try {
      const response = await api.get(`/api/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar dados do usuário');
    }
  },
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/api/usuarios/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao atualizar dados do usuário');
    }
  },
  getCompany: async (usuarioId) => {
    try {
      const response = await api.get(`/api/empresa/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) { return null; }
      throw new Error(error.response?.data?.error || 'Erro ao buscar dados da empresa.');
    }
  },
  createCompany: async (companyData) => {
    try {
      const response = await api.post('/api/empresa', companyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar empresa.');
    }
  },
  updateCompany: async (id, companyData) => {
    try {
      const response = await api.put(`/api/empresa/${id}`, companyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao atualizar empresa.');
    }
  },
  getAllClients: async () => {
    try {
      const response = await api.get('/api/cliente');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar clientes.');
    }
  },
  deleteClient: async (id) => {
    try {
      await api.delete(`/api/cliente/${id}`);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao excluir cliente.');
    }
  },
  getClientById: async (id) => {
    try {
      const response = await api.get(`/api/cliente/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar dados do cliente.');
    }
  },
  createClient: async (clientData) => {
    try {
      const response = await api.post('/api/cliente', clientData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar cliente.');
    }
  },
  updateClient: async (id, clientData) => {
    try {
      const response = await api.put(`/api/cliente/${id}`, clientData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao atualizar cliente.');
    }
  },
  // ===================== ORCAMENTOS =====================
  getAllBudgets: async () => {
    try {
      const response = await api.get('/api/orcamentos');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar orçamentos.');
    }
  },
  getBudgetById: async (id) => {
    try {
      const response = await api.get(`/api/orcamentos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar dados do orçamento.');
    }
  },
  createBudget: async (budgetData) => {
    try {
      const response = await api.post('/api/orcamentos', budgetData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar orçamento.');
    }
  },
  updateBudget: async (id, budgetData) => {
    try {
      const response = await api.put(`/api/orcamentos/${id}`, budgetData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao atualizar orçamento.');
    }
  },
  deleteBudget: async (id) => {
    try {
      await api.delete(`/api/orcamentos/${id}`);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao excluir orçamento.');
    }
  },
  generateBudgetPdf: async (id) => {
    try {
      const response = await api.get(`/api/orcamentos/${id}/pdf`, { responseType: 'blob' });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao gerar PDF do orçamento.');
    }
  }
};

export default api;