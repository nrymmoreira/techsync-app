import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 segundos de timeout
});

// Interceptor para adicionar token de autorização
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

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
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
        nome: userData.fullName,
        email: userData.email,
        senha: userData.password
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
      throw new Error(error.response?.data?.error || 'Erro ao fazer login');
    }
  }
};

export default api;