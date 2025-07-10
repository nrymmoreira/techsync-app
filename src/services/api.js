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
  register: async (userData) => {
    try {
      const response = await api.post('/api/usuarios', {
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar conta');
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post('/api/usuarios/login', {
        email,
        senha: password
      });
      if (response.data.token) {
        localStorage.setItem('techsync-token', response.data.token);
        localStorage.setItem('techsync-authenticated', 'true');
        localStorage.setItem('techsync-user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao fazer login: Credenciais inválidas.');
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

  getCompany: async (id) => { // Buscar empresa pelo ID (que é o ID do usuário)
    try {
      const response = await api.get(`/api/empresa/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
          throw new Error('404'); 
      }
      throw new Error(error.response?.data?.error || 'Erro ao buscar dados da empresa.');
    }
  },

  // Este método será chamado para criar uma nova empresa (o ID será atribuído no backend)
  createCompany: async (companyData) => {
    try {
      const response = await api.post('/api/empresa', companyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar empresa.');
    }
  },

  // Este método será chamado para atualizar uma empresa existente
  updateCompany: async (id, companyData) => { // ID é o ID da empresa (que é o ID do usuário)
    try {
      const response = await api.put(`/api/empresa/${id}`, companyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao atualizar empresa.');
    }
  }
};

export default api;