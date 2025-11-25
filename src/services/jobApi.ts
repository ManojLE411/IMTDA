/**
 * Job API Service
 * Handles all job-related API calls
 */

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { Job, JobApplication } from '@/types/job.types';
import { ApiResponse, PaginatedResponse } from '@/types/common.types';

class JobApiService {
  /**
   * Get all jobs
   */
  async getAll(): Promise<Job[]> {
    try {
      const response = await apiClient.get<ApiResponse<Job[]>>(
        API_ENDPOINTS.JOB.LIST
      );
      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      console.warn('Job API response format unexpected:', response);
      return [];
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }

  /**
   * Get paginated jobs
   */
  async getPaginated(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Job>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Job>>>(
      `${API_ENDPOINTS.JOB.LIST}?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  /**
   * Get job by ID
   */
  async getById(id: string): Promise<Job> {
    const response = await apiClient.get<ApiResponse<Job>>(
      API_ENDPOINTS.JOB.DETAIL(id)
    );
    return response.data;
  }

  /**
   * Create new job
   */
  async create(data: Omit<Job, 'id'>): Promise<Job> {
    const response = await apiClient.post<ApiResponse<Job>>(
      API_ENDPOINTS.JOB.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update job
   */
  async update(id: string, data: Partial<Job>): Promise<Job> {
    const response = await apiClient.put<ApiResponse<Job>>(
      API_ENDPOINTS.JOB.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete job
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.JOB.DELETE(id));
  }

  /**
   * Get all job applications
   */
  async getAllApplications(): Promise<JobApplication[]> {
    const response = await apiClient.get<ApiResponse<JobApplication[]>>(
      API_ENDPOINTS.JOB.APPLICATIONS
    );
    return response.data;
  }

  /**
   * Submit job application
   */
  async submitApplication(
    data: Omit<JobApplication, 'id' | 'date' | 'status' | 'resumeName' | 'resumePath'>,
    resumeFile?: File
  ): Promise<JobApplication> {
    const formData = new FormData();
    
    // Append all form fields
    formData.append('jobId', data.jobId || '');
    formData.append('jobTitle', data.jobTitle || '');
    formData.append('name', data.name || '');
    formData.append('email', data.email || '');
    formData.append('phone', data.phone || '');
    if (data.coverLetter) {
      formData.append('coverLetter', data.coverLetter);
    }
    if (data.userId) {
      formData.append('userId', data.userId);
    }
    
    // Append resume file if provided
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }
    
    // Don't set Content-Type header - browser will set it automatically with boundary for FormData
    const response = await apiClient.post<ApiResponse<JobApplication>>(
      API_ENDPOINTS.JOB.APPLICATIONS,
      formData
    );
    return response.data;
  }

  /**
   * Update job application status
   */
  async updateApplicationStatus(id: string, status: JobApplication['status']): Promise<JobApplication> {
    const response = await apiClient.patch<ApiResponse<JobApplication>>(
      API_ENDPOINTS.JOB.UPDATE_APPLICATION_STATUS(id),
      { status }
    );
    return response.data;
  }

  /**
   * Delete job application
   */
  async deleteApplication(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.JOB.APPLICATION_DETAIL(id));
  }
}

export const jobApi = new JobApiService();
export default jobApi;

