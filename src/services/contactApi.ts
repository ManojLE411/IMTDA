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
    const response = await apiClient.get<ApiResponse<PaginatedResponse<ContactMessage>>>(
      `${API_ENDPOINTS.CONTACT.LIST}?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
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

