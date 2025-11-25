/**
 * Project API Service
 * Handles all project-related API calls
 */

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { Project } from '@/types/common.types';
import { ApiResponse, PaginatedResponse } from '@/types/common.types';

class ProjectApiService {
  /**
   * Get all projects
   */
  async getAll(): Promise<Project[]> {
    try {
      const response = await apiClient.get<ApiResponse<Project[]>>(
        API_ENDPOINTS.PROJECT.LIST
      );
      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      console.warn('Project API response format unexpected:', response);
      return [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  /**
   * Get paginated projects
   */
  async getPaginated(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Project>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Project>>>(
      `${API_ENDPOINTS.PROJECT.LIST}?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  /**
   * Get project by ID
   */
  async getById(id: string): Promise<Project> {
    const response = await apiClient.get<ApiResponse<Project>>(
      API_ENDPOINTS.PROJECT.DETAIL(id)
    );
    return response.data;
  }

  /**
   * Create new project
   */
  async create(data: Omit<Project, 'id'>): Promise<Project> {
    const response = await apiClient.post<ApiResponse<Project>>(
      API_ENDPOINTS.PROJECT.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update project
   */
  async update(id: string, data: Partial<Project>): Promise<Project> {
    const response = await apiClient.put<ApiResponse<Project>>(
      API_ENDPOINTS.PROJECT.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete project
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.PROJECT.DELETE(id));
  }
}

export const projectApi = new ProjectApiService();
export default projectApi;

