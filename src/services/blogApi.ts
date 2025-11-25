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
   * For admin panel, fetches all posts (with large pageSize to get all)
   */
  async getAll(): Promise<BlogPost[]> {
    try {
      const response = await apiClient.get<ApiResponse<BlogPost[]> & { pagination?: any }>(
        `${API_ENDPOINTS.BLOG.LIST}?pageSize=1000`
      );
      // Backend returns { success: true, data: BlogPost[], pagination: {...} }
      // Ensure we return the data array
      if (response && response.data && Array.isArray(response.data)) {
        return response.data;
      }
      console.warn('Blog API response format unexpected:', response);
      return [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  }

  /**
   * Get paginated blog posts
   */
  async getPaginated(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<BlogPost>> {
    const response = await apiClient.get<ApiResponse<BlogPost[]> & { pagination?: any }>(
      `${API_ENDPOINTS.BLOG.LIST}?page=${page}&pageSize=${pageSize}`
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

