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
    const response = await apiClient.get<ApiResponse<InternshipTrack[]>>(
      API_ENDPOINTS.INTERNSHIP.LIST
    );
    return response.data;
  }

  /**
   * Get paginated internship tracks
   */
  async getPaginatedTracks(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<InternshipTrack>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<InternshipTrack>>>(
      `${API_ENDPOINTS.INTERNSHIP.LIST}?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
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
  async submitApplication(data: Omit<InternshipApplication, 'id' | 'date' | 'status'>): Promise<InternshipApplication> {
    const response = await apiClient.post<ApiResponse<InternshipApplication>>(
      `${API_ENDPOINTS.INTERNSHIP.BASE}/applications`,
      data
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

