import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, data);
      // Store userId in localStorage
      if (response.data.user?.id) {
        localStorage.setItem('userId', response.data.user.id);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
      throw error;
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, data);
      
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Set default auth header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      // Store userId in localStorage
      if (response.data.user?.id) {
        localStorage.setItem('userId', response.data.user.id);
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  async forgotPassword(email: string): Promise<{ question: string } | { error: string }> {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to get security question');
      }
      throw error;
    }
  },

  async resetPassword(email: string, securityAnswer: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        email,
        securityAnswer,
        newPassword,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to reset password');
      }
      throw error;
    }
  },
}; 