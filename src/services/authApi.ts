/**
 * Auth API Service
 * Handles all authentication-related API calls
 */

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User 
} from '@/types/auth.types';
import { ApiResponse } from '@/types/common.types';

class AuthApiService {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME);
    return response.data;
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>(
      API_ENDPOINTS.AUTH.UPDATE_PROFILE,
      updates
    );
    return response.data;
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<{ token: string; expiresAt: number }> {
    const response = await apiClient.post<ApiResponse<{ token: string; expiresAt: number }>>(
      API_ENDPOINTS.AUTH.REFRESH
    );
    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Even if logout fails on server, we should clear local auth
      console.warn('Logout request failed, clearing local auth:', error);
    }
  }

  /**
   * Admin login
   */
  async adminLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.ADMIN_LOGIN,
      credentials
    );
    return response.data;
  }

  /**
   * Admin register
   */
  async adminRegister(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.ADMIN_REGISTER,
      data
    );
    return response.data;
  }
}

export const authApi = new AuthApiService();
export default authApi;

