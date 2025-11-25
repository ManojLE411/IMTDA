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
        // If FormData is being sent, remove Content-Type header to let browser set it with boundary
        if (config.data instanceof FormData && config.headers) {
          delete config.headers['Content-Type'];
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
          
          // Only redirect if not already on login page and not during initialization
          // Skip redirect for /auth/me endpoint during app initialization
          const isAuthMeEndpoint = originalRequest.url?.includes('/auth/me');
          if (!isAuthMeEndpoint && window.location.pathname !== AUTH_CONFIG.LOGIN_ROUTE) {
            window.location.href = AUTH_CONFIG.LOGIN_ROUTE;
          }
          
          return Promise.reject(error);
        }

        // Handle 403 Forbidden - Log and provide helpful message
        if (error.response?.status === 403) {
          const backendError = error.response.data as any;
          const errorMessage = backendError?.error?.message || backendError?.message || error.message;
          console.error('403 Forbidden:', {
            url: originalRequest.url,
            message: errorMessage,
            hint: 'This may be a CORS issue or insufficient permissions. Check backend CORS configuration and user role.',
          });
          return Promise.reject(error);
        }

        // Handle 429 Too Many Requests - Log but don't redirect
        if (error.response?.status === 429) {
          console.warn('Rate limit exceeded. Please wait a moment before making more requests.');
          return Promise.reject(error);
        }

        // Handle network errors (including ERR_NETWORK_CHANGED, ECONNREFUSED, etc.)
        if (!error.response) {
          // Check for specific network error codes
          const errorCode = (error.code || error.message || '').toUpperCase();
          let errorMessage: string = ERROR_MESSAGES.NETWORK_ERROR;
          
          if (errorCode.includes('NETWORK_CHANGED') || errorCode.includes('ERR_NETWORK')) {
            errorMessage = 'Connection interrupted. The server may have restarted. Please refresh the page or wait a moment and try again.';
          } else if (errorCode.includes('ECONNREFUSED') || errorCode.includes('CONNREFUSED')) {
            errorMessage = 'Cannot connect to server. Please ensure the backend server is running on port 5000.';
          } else if (errorCode.includes('TIMEOUT') || errorCode.includes('ETIMEDOUT')) {
            errorMessage = ERROR_MESSAGES.TIMEOUT;
          } else if (errorCode.includes('ABORTED') || errorCode.includes('CANCELED')) {
            errorMessage = 'Request was cancelled.';
          }
          
          const networkError: ApiError = {
            message: errorMessage,
            code: 'NETWORK_ERROR',
          };
          return Promise.reject(networkError);
        }

        // Handle API errors
        // Backend returns { success: false, error: { code, message } }
        const backendError = error.response.data as any;
        const errorCode = backendError?.error?.code || backendError?.code;
        const errorMessage = backendError?.error?.message || backendError?.message || error.message || getErrorMessage(errorCode);
        
        const apiError: ApiError = {
          message: errorMessage,
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
