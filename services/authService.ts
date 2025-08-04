import { apiClient, ApiResponse } from '../lib/api';

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Auth Service
export class AuthService {
  // Sign up
  static async signup(data: SignupData): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/signup', data);
  }

  // Sign in
  static async signin(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/signin', credentials);
  }

  // Forgot password
  static async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/forgot-password', { email });
  }

  // Reset password
  static async resetPassword(token: string, password: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/reset-password', { token, password });
  }

  // Verify email
  static async verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/verify-email', { token });
  }

  // Get current user
  static async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/auth/me');
  }

  // Logout
  static async logout(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/logout');
  }

  // Refresh token
  static async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return apiClient.post<{ token: string }>('/auth/refresh');
  }
}

// Helper functions for token management
export const tokenManager = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  },

  isAuthenticated: (): boolean => {
    return !!tokenManager.getToken();
  }
};
