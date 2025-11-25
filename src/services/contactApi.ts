/**
 * Contact API Service
 * Handles all contact-related API calls
 */

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { ContactMessage } from '@/types/contact.types';
import { ApiResponse, PaginatedResponse } from '@/types/common.types';

class ContactApiService {
  /**
   * Submit contact form
   */
  async submitMessage(data: Omit<ContactMessage, 'id' | 'date' | 'status'>): Promise<ContactMessage> {
    const response = await apiClient.post<ApiResponse<ContactMessage>>(
      API_ENDPOINTS.CONTACT.SUBMIT,
      data
    );
    return response.data;
  }

  /**
   * Get all contact messages (admin only)
   */
  async getAll(): Promise<ContactMessage[]> {
    const response = await apiClient.get<ApiResponse<ContactMessage[]>>(
      API_ENDPOINTS.CONTACT.LIST
    );
    return response.data;
  }

  /**
   * Get paginated contact messages
   */
  async getPaginated(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<ContactMessage>> {
    const response = await apiClient.get<ApiResponse<ContactMessage[]> & { pagination?: any }>(
      `${API_ENDPOINTS.CONTACT.LIST}?page=${page}&pageSize=${pageSize}`
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
   * Get contact message by ID
   */
  async getById(id: string): Promise<ContactMessage> {
    const response = await apiClient.get<ApiResponse<ContactMessage>>(
      API_ENDPOINTS.CONTACT.DETAIL(id)
    );
    return response.data;
  }

  /**
   * Update contact message status
   */
  async updateStatus(id: string, status: ContactMessage['status']): Promise<ContactMessage> {
    const response = await apiClient.patch<ApiResponse<ContactMessage>>(
      API_ENDPOINTS.CONTACT.DETAIL(id),
      { status }
    );
    return response.data;
  }

  /**
   * Delete contact message
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.CONTACT.DELETE(id));
  }
}

export const contactApi = new ContactApiService();
export default contactApi;

