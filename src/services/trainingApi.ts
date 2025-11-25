/**
 * Training API Service
 * Handles all training program-related API calls
 */

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { TrainingProgram } from '@/types/training.types';
import { ApiResponse, PaginatedResponse } from '@/types/common.types';

class TrainingApiService {
  /**
   * Get all training programs
   */
  async getAll(): Promise<TrainingProgram[]> {
    try {
      const response = await apiClient.get<ApiResponse<TrainingProgram[]>>(
        API_ENDPOINTS.TRAINING.LIST
      );
      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      console.warn('Training API response format unexpected:', response);
      return [];
    } catch (error) {
      console.error('Error fetching training programs:', error);
      throw error;
    }
  }

  /**
   * Get paginated training programs
   */
  async getPaginated(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<TrainingProgram>> {
    const response = await apiClient.get<ApiResponse<TrainingProgram[]> & { pagination?: any }>(
      `${API_ENDPOINTS.TRAINING.LIST}?page=${page}&pageSize=${pageSize}`
    );
    // Backend returns { data: T[], pagination: {...} }
    // Frontend expects { data: T[], total, page, pageSize, totalPages }
    if (response.pagination) {
      return {
        data: response.data,
        total: response.pagination.total,
        page: response.pagination.page,
        pageSize: response.pagination.pageSize,
        totalPages: response.pagination.totalPages,
      };
    }
    // Fallback if no pagination info
    return {
      data: response.data,
      total: response.data.length,
      page,
      pageSize,
      totalPages: 1,
    };
  }

  /**
   * Get training program by ID
   */
  async getById(id: string): Promise<TrainingProgram> {
    const response = await apiClient.get<ApiResponse<TrainingProgram>>(
      API_ENDPOINTS.TRAINING.DETAIL(id)
    );
    return response.data;
  }

  /**
   * Create new training program
   */
  async create(data: Omit<TrainingProgram, 'id'>): Promise<TrainingProgram> {
    const response = await apiClient.post<ApiResponse<TrainingProgram>>(
      API_ENDPOINTS.TRAINING.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update training program
   */
  async update(id: string, data: Partial<TrainingProgram>): Promise<TrainingProgram> {
    const response = await apiClient.put<ApiResponse<TrainingProgram>>(
      API_ENDPOINTS.TRAINING.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete training program
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.TRAINING.DELETE(id));
  }
}

export const trainingApi = new TrainingApiService();
export default trainingApi;

