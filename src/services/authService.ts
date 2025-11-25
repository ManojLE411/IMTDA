/**
 * Auth Service
 * Handles all authentication-related API calls
 * Uses the real API via authApi
 */

import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User,
  AuthToken
} from '@/types/auth.types';
import { authApi } from './authApi';
import { apiClient } from './apiClient';

class AuthService {
  /**
   * Login user (student)
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return authApi.login(credentials);
  }

  /**
   * Admin login
   */
  async adminLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    return authApi.adminLogin(credentials);
  }

  /**
   * Register new user (student)
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    return authApi.register(data);
  }

  /**
   * Admin register
   */
  async adminRegister(data: RegisterData): Promise<AuthResponse> {
    return authApi.adminRegister(data);
  }

  /**
   * Get current user
   */
  async getCurrentUser(token?: string): Promise<User | null> {
    try {
      // If token provided, set it temporarily
      if (token) {
        apiClient.setToken(token, Date.now() + 24 * 60 * 60 * 1000);
      }
      
      const user = await authApi.getCurrentUser();
      return user;
    } catch (error) {
      console.warn('Failed to get current user:', error);
      return null;
    }
  }

  /**
   * Validate token
   * For JWT tokens, we check expiration via the API
   */
  validateToken(token: string): boolean {
    if (!token || token.length === 0) {
      return false;
    }
    
    // For JWT tokens, we can't validate without the secret
    // So we just check if it exists and has a reasonable format
    // Actual validation happens on the server
    return token.length > 20; // JWT tokens are typically longer
  }

  /**
   * Update user profile
   */
  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    return authApi.updateProfile(updates);
  }

  /**
   * Get user by ID (not used in auth flow, but kept for compatibility)
   */
  async getUserById(userId: string): Promise<User | null> {
    try {
      // This would require a separate API endpoint
      // For now, return null or use getCurrentUser
      return null;
    } catch (error) {
      return null;
    }
  }
}

export const authService = new AuthService();
export default authService;
