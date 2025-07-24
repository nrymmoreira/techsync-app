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
  registerAndCreateCompany: async (userData, companyData) => {
    try {
      await api.post('/api/usuarios', userData);
      const loginResponse = await api.post('/api/usuarios/login', {
        email: userData.email,
        senha: userData.senha,
      });
      const userId = loginResponse.data.user?.id;
      if (userId == null) {
        throw new Error('Falha ao obter ID do usuário após o cadastro.');
      }
      const companyPayload = { ...companyData, usuario: { id: userId } };
      await api.post('/api/empresa', companyPayload);
      return { success: true };
    } catch (error) {
      console.error("Erro no processo de cadastro:", error);
      throw new Error(error.response?.data?.error || 'Erro no processo de cadastro.');
    }
  },

  // --- FUNÇÃO DE LOGIN CORRIGIDA E ROBUSTA ---
  login: async (email, password) => {
    try {
      // Passo 1: Fazer o login para obter o token e os dados básicos do usuário
      const loginResponse = await api.post('/api/usuarios/login', { email, senha: password });

      if (loginResponse.data.token) {
        localStorage.setItem('techsync-token', loginResponse.data.token);
        localStorage.setItem('techsync-authenticated', 'true');

        const basicUser = loginResponse.data.user;
        if (!basicUser || basicUser.id == null) {
            throw new Error("Dados do usuário não retornados no login.");
        }

        // Passo 2: Usar o ID do usuário para buscar os dados completos da empresa.
        let companyData = null;
        try {
            // Chamada direta da API para garantir que os dados mais recentes sejam obtidos
            const companyResponse = await api.get(`/api/empresa/usuario/${basicUser.id}`);
            companyData = companyResponse.data;
        } catch (companyError) {
            // Se a empresa não for encontrada (404), isso é um estado válido. Outros erros são registrados.
            if (companyError.response?.status !== 404) {
                console.error("Erro ao buscar dados da empresa durante o login:", companyError);
            }
        }

        // Passo 3: Combinar os dados e salvar o objeto completo no localStorage
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
      if (error.response?.status === 404) {
        return null; 
      }
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

  updateCompanyLogo: async (id, logoFile) => {
    const formData = new FormData();
    formData.append('logo', logoFile);
    try {
      const response = await api.put(`/api/empresa/logo/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
       throw new Error(error.response?.data?.error || 'Erro ao atualizar logo da empresa.');
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
  }
};

export default api;