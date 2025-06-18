import axios from 'axios';

// Configuração base da API
const API_BASE_URL = 'http://localhost:8080';

// Criar instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para adicionar token de autorização automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('techsync-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se o token expirou ou é inválido, redirecionar para login
    if (error.response?.status === 401) {
      localStorage.removeItem('techsync-token');
      localStorage.removeItem('techsync-authenticated');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      
      // Salvar token e dados do usuário
      if (response.data.token) {
        localStorage.setItem('techsync-token', response.data.token);
        localStorage.setItem('techsync-authenticated', 'true');
        localStorage.setItem('techsync-user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },

  // Registro
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', {
        name: userData.fullName,
        email: userData.email,
        password: userData.password
      });
      
      // Salvar token e dados do usuário
      if (response.data.token) {
        localStorage.setItem('techsync-token', response.data.token);
        localStorage.setItem('techsync-authenticated', 'true');
        localStorage.setItem('techsync-user', JSON.stringify(response.data.user));
        localStorage.setItem('techsync-from-registration', 'true');
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar conta');
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Limpar dados locais independente do resultado da API
      localStorage.removeItem('techsync-token');
      localStorage.removeItem('techsync-authenticated');
      localStorage.removeItem('techsync-user');
      localStorage.removeItem('techsync-from-registration');
    }
  },

  // Verificar se está autenticado
  isAuthenticated: () => {
    const token = localStorage.getItem('techsync-token');
    const authenticated = localStorage.getItem('techsync-authenticated');
    return !!(token && authenticated === 'true');
  },

  // Obter dados do usuário
  getCurrentUser: () => {
    const userStr = localStorage.getItem('techsync-user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

// Serviços de usuário
export const userService = {
  // Obter perfil do usuário
  getProfile: async () => {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar perfil');
    }
  },

  // Atualizar dados pessoais
  updatePersonalData: async (userData) => {
    try {
      const response = await api.put('/user/personal-data', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar dados pessoais');
    }
  },

  // Atualizar dados da empresa
  updateCompanyData: async (companyData) => {
    try {
      const response = await api.put('/user/company-data', companyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar dados da empresa');
    }
  }
};

// Serviço para buscar CEP
export const cepService = {
  fetchAddress: async (cep) => {
    try {
      const cleanCep = cep.replace(/[^\d]/g, '');
      
      if (cleanCep.length !== 8) {
        throw new Error('CEP deve ter 8 dígitos');
      }

      const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cleanCep}`);
      
      return {
        street: response.data.street || '',
        neighborhood: response.data.neighborhood || '',
        city: response.data.city || '',
        state: response.data.state || ''
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('CEP não encontrado');
      }
      throw new Error('Erro ao buscar CEP');
    }
  }
};

export default api;