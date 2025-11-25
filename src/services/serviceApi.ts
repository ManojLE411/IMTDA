/**
 * Service API Service
 * Handles all service-related API calls
 */

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { Service } from '@/types/service.types';
import { ApiResponse, PaginatedResponse } from '@/types/common.types';

class ServiceApiService {
  /**
   * Get all services
   */
  async getAll(): Promise<Service[]> {
    try {
      const response = await apiClient.get<ApiResponse<Service[]>>(
        API_ENDPOINTS.SERVICE.LIST
      );
      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      console.warn('Service API response format unexpected:', response);
      return [];
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  /**
   * Get paginated services
   */
  async getPaginated(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Service>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Service>>>(
      `${API_ENDPOINTS.SERVICE.LIST}?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  /**
   * Get service by ID
   */
  async getById(id: string): Promise<Service> {
    const response = await apiClient.get<ApiResponse<Service>>(
      API_ENDPOINTS.SERVICE.DETAIL(id)
    );
    return response.data;
  }

  /**
   * Create new service
   */
  async create(data: Omit<Service, 'id'>): Promise<Service> {
    const response = await apiClient.post<ApiResponse<Service>>(
      API_ENDPOINTS.SERVICE.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update service
   */
  async update(id: string, data: Partial<Service>): Promise<Service> {
    const response = await apiClient.put<ApiResponse<Service>>(
      API_ENDPOINTS.SERVICE.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete service
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.SERVICE.DELETE(id));
  }
}

export const serviceApi = new ServiceApiService();
export default serviceApi;

