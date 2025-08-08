import { apiClient, ApiResponse } from '../lib/api';

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
}

export interface VerifyEmailData {
  token: string;
}

export interface ResetPasswordData {
  token: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  onboardingCompletion: number;
  hasProfile: boolean;
  isVerified?: boolean;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    token?: string;
    user?: User;
  };
  error?: {
    code: string;
    message: string;
    details: any[];
  };
}

// Auth Service
export class AuthService {
  // Sign up - matches backend /api/auth/register endpoint
  static async signup(data: SignupData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/api/auth/register', data);
  }

  // Sign in - matches backend /api/auth/login endpoint
  static async signin(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/api/auth/login', credentials);
  }

  // Verify email - matches backend /api/auth/verify-email endpoint
  static async verifyEmail(data: VerifyEmailData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/api/auth/verify-email', data);
  }

  // Resend verification email - matches backend /api/auth/resend-verification-email endpoint
  static async resendVerificationEmail(email: string): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/api/auth/resend-verification-email', { email });
  }

  // Request account recovery - matches backend /api/auth/request-recovery endpoint
  static async requestAccountRecovery(email: string): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/api/auth/request-recovery', { email });
  }

  // Reset password - matches backend /api/auth/reset-password endpoint
  static async resetPassword(data: ResetPasswordData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/api/auth/reset-password', data);
  }

  // Get current user - matches backend /api/auth/me endpoint
  static async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/api/auth/me');
  }

  // Logout (placeholder - not implemented in backend yet)
  static async logout(): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/logout');
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
