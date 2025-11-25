/**
 * Internship API Service
 * Handles all internship-related API calls
 */

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { InternshipTrack, InternshipApplication } from '@/types/internship.types';
import { ApiResponse, PaginatedResponse } from '@/types/common.types';

class InternshipApiService {
  /**
   * Get all internship tracks
   */
  async getAllTracks(): Promise<InternshipTrack[]> {
    try {
      const response = await apiClient.get<ApiResponse<InternshipTrack[]>>(
        API_ENDPOINTS.INTERNSHIP.LIST
      );
      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      console.warn('Internship API response format unexpected:', response);
      return [];
    } catch (error) {
      console.error('Error fetching internship tracks:', error);
      throw error;
    }
  }

  /**
   * Get paginated internship tracks
   */
  async getPaginatedTracks(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<InternshipTrack>> {
    const response = await apiClient.get<ApiResponse<InternshipTrack[]> & { pagination?: any }>(
      `${API_ENDPOINTS.INTERNSHIP.LIST}?page=${page}&pageSize=${pageSize}`
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
   * Get internship track by ID
   */
  async getTrackById(id: string): Promise<InternshipTrack> {
    const response = await apiClient.get<ApiResponse<InternshipTrack>>(
      API_ENDPOINTS.INTERNSHIP.DETAIL(id)
    );
    return response.data;
  }

  /**
   * Create new internship track
   */
  async createTrack(data: Omit<InternshipTrack, 'id'>): Promise<InternshipTrack> {
    const response = await apiClient.post<ApiResponse<InternshipTrack>>(
      API_ENDPOINTS.INTERNSHIP.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update internship track
   */
  async updateTrack(id: string, data: Partial<InternshipTrack>): Promise<InternshipTrack> {
    const response = await apiClient.put<ApiResponse<InternshipTrack>>(
      API_ENDPOINTS.INTERNSHIP.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete internship track
   */
  async deleteTrack(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.INTERNSHIP.DELETE(id));
  }

  /**
   * Get all internship applications
   */
  async getAllApplications(): Promise<InternshipApplication[]> {
    const response = await apiClient.get<ApiResponse<InternshipApplication[]>>(
      `${API_ENDPOINTS.INTERNSHIP.BASE}/applications`
    );
    return response.data;
  }

  /**
   * Submit internship application
   */
  async submitApplication(
    data: Omit<InternshipApplication, 'id' | 'date' | 'status' | 'resumeName' | 'resumePath'>,
    resumeFile?: File
  ): Promise<InternshipApplication> {
    const formData = new FormData();
    
    // Append all form fields
    if (data.internshipId) {
      formData.append('internshipId', data.internshipId);
    }
    formData.append('name', data.name || '');
    formData.append('email', data.email || '');
    formData.append('phone', data.phone || '');
    formData.append('course', data.course || '');
    formData.append('message', data.message || '');
    if (data.studentId) {
      formData.append('studentId', data.studentId);
    }
    
    // Append resume file if provided
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }
    
    // Don't set Content-Type header - browser will set it automatically with boundary for FormData
    const response = await apiClient.post<ApiResponse<InternshipApplication>>(
      `${API_ENDPOINTS.INTERNSHIP.BASE}/applications`,
      formData
    );
    return response.data;
  }

  /**
   * Update application status
   */
  async updateApplicationStatus(id: string, status: InternshipApplication['status']): Promise<InternshipApplication> {
    const response = await apiClient.patch<ApiResponse<InternshipApplication>>(
      `${API_ENDPOINTS.INTERNSHIP.BASE}/applications/${id}`,
      { status }
    );
    return response.data;
  }
}

export const internshipApi = new InternshipApiService();
export default internshipApi;

