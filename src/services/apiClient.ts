/**
 * API Client with Axios
 * Configured with interceptors for authentication and error handling
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from '@/types/common.types';
import { API_CONFIG, AUTH_CONFIG, ERROR_MESSAGES, getErrorMessage } from '@/config';

// Storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.DEFAULT_HEADERS,
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor - Add auth token to requests
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle errors globally
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized - Clear auth and redirect to login
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          this.clearAuth();
          
          // Only redirect if not already on login page
          if (window.location.pathname !== AUTH_CONFIG.LOGIN_ROUTE) {
            window.location.href = AUTH_CONFIG.LOGIN_ROUTE;
          }
          
          return Promise.reject(error);
        }

        // Handle network errors
        if (!error.response) {
          const networkError: ApiError = {
            message: ERROR_MESSAGES.NETWORK_ERROR,
            code: 'NETWORK_ERROR',
          };
          return Promise.reject(networkError);
        }

        // Handle API errors
        const errorCode = error.response.data?.code;
        const apiError: ApiError = {
          message: error.response.data?.message || error.message || getErrorMessage(errorCode),
          code: errorCode,
          status: error.response.status,
        };

        return Promise.reject(apiError);
      }
    );
  }

  /**
   * Get auth token from storage
   */
  private getToken(): string | null {
    try {
      const tokenData = localStorage.getItem(TOKEN_KEY);
      if (!tokenData) return null;
      
      const parsed = JSON.parse(tokenData);
      // Check if token is expired
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        this.clearAuth();
        return null;
      }
      return parsed.accessToken;
    } catch {
      return null;
    }
  }

  /**
   * Clear authentication data
   */
  private clearAuth(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  /**
   * Set authentication token
   */
  setToken(token: string, expiresAt?: number): void {
    const tokenData = {
      accessToken: token,
      expiresAt: expiresAt || Date.now() + AUTH_CONFIG.TOKEN_EXPIRATION,
    };
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
  }

  /**
   * Get API client instance
   */
  getClient(): AxiosInstance {
    return this.client;
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
