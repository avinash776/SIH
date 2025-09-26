import { apiClient } from './api';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  preferred_language: string;
  is_admin: boolean;
  created_at: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  full_name?: string;
  preferred_language?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_id: number;
  username: string;
  preferred_language: string;
}

// Auth Service
export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    apiClient.setToken(response.access_token);
    return response;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    apiClient.setToken(response.access_token);
    return response;
  }

  async logout(): Promise<void> {
    apiClient.clearToken();
  }

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  }

  async updateProfile(updates: Partial<User>): Promise<{ message: string }> {
    return apiClient.put('/auth/me', updates);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}

export const authService = new AuthService();