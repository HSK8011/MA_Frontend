import axios from 'axios';
import { API_URL } from '../config';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface ForgotPasswordResponse {
  message: string;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      authService.logout();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      console.log('🔑 [Auth] Attempting login for:', email);
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token) {
        console.log('✅ [Auth] Login successful');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Set auth header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ [Auth] Login failed:', error);
      throw error;
    }
  },

  signup: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      console.log('📝 [Auth] Attempting signup for:', email);
      const response = await api.post('/auth/register', { name, email, password });
      
      if (response.data.token) {
        console.log('✅ [Auth] Signup successful');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Set auth header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ [Auth] Signup failed:', error);
      throw error;
    }
  },

  logout: () => {
    console.log('🚪 [Auth] Logging out user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    
    // Remove auth header
    delete api.defaults.headers.common['Authorization'];
    
    // Redirect to home
    window.location.href = '/';
  },

  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('❌ [Auth] Error getting current user:', error);
      return null;
    }
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    return isAuth && !!token;
  },

  // Initialize auth state from storage
  initializeAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
};

// Initialize auth headers on service import
authService.initializeAuth(); 