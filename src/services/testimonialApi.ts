/**
 * Testimonial API Service
 * Handles all testimonial-related API calls
 */

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { Testimonial } from '@/types/testimonial.types';
import { ApiResponse, PaginatedResponse } from '@/types/common.types';

class TestimonialApiService {
  /**
   * Get all testimonials
   */
  async getAll(): Promise<Testimonial[]> {
    try {
      const response = await apiClient.get<ApiResponse<Testimonial[]>>(
        API_ENDPOINTS.TESTIMONIAL.LIST
      );
      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      console.warn('Testimonial API response format unexpected:', response);
      return [];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  }

  /**
   * Get paginated testimonials
   */
  async getPaginated(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Testimonial>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Testimonial>>>(
      `${API_ENDPOINTS.TESTIMONIAL.LIST}?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  /**
   * Get testimonial by ID
   */
  async getById(id: string): Promise<Testimonial> {
    const response = await apiClient.get<ApiResponse<Testimonial>>(
      API_ENDPOINTS.TESTIMONIAL.DETAIL(id)
    );
    return response.data;
  }

  /**
   * Create new testimonial
   */
  async create(data: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    const response = await apiClient.post<ApiResponse<Testimonial>>(
      API_ENDPOINTS.TESTIMONIAL.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update testimonial
   */
  async update(id: string, data: Partial<Testimonial>): Promise<Testimonial> {
    const response = await apiClient.put<ApiResponse<Testimonial>>(
      API_ENDPOINTS.TESTIMONIAL.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete testimonial
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.TESTIMONIAL.DELETE(id));
  }
}

export const testimonialApi = new TestimonialApiService();
export default testimonialApi;

