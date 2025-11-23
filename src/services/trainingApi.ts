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
    const response = await apiClient.get<ApiResponse<TrainingProgram[]>>(
      API_ENDPOINTS.TRAINING.LIST
    );
    return response.data;
  }

  /**
   * Get paginated training programs
   */
  async getPaginated(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<TrainingProgram>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<TrainingProgram>>>(
      `${API_ENDPOINTS.TRAINING.LIST}?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
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

