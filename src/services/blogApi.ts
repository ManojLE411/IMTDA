/**
 * Blog API Service
 * Handles all blog-related API calls
 */

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { BlogPost } from '@/types/blog.types';
import { ApiResponse, PaginatedResponse } from '@/types/common.types';

class BlogApiService {
  /**
   * Get all blog posts
   */
  async getAll(): Promise<BlogPost[]> {
    const response = await apiClient.get<ApiResponse<BlogPost[]>>(
      API_ENDPOINTS.BLOG.LIST
    );
    return response.data;
  }

  /**
   * Get paginated blog posts
   */
  async getPaginated(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<BlogPost>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<BlogPost>>>(
      `${API_ENDPOINTS.BLOG.LIST}?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  /**
   * Get blog post by ID
   */
  async getById(id: string): Promise<BlogPost> {
    const response = await apiClient.get<ApiResponse<BlogPost>>(
      API_ENDPOINTS.BLOG.DETAIL(id)
    );
    return response.data;
  }

  /**
   * Create new blog post
   */
  async create(data: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost> {
    const response = await apiClient.post<ApiResponse<BlogPost>>(
      API_ENDPOINTS.BLOG.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update blog post
   */
  async update(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    const response = await apiClient.put<ApiResponse<BlogPost>>(
      API_ENDPOINTS.BLOG.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete blog post
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.BLOG.DELETE(id));
  }
}

export const blogApi = new BlogApiService();
export default blogApi;

