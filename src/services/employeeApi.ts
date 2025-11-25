/**
 * Employee API Service
 * Handles all employee-related API calls
 */

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { Employee } from '@/types/employee.types';
import { ApiResponse } from '@/types/common.types';

class EmployeeApiService {
  /**
   * Get all employees
   */
  async getAll(): Promise<Employee[]> {
    try {
      const response = await apiClient.get<ApiResponse<Employee[]>>(
        API_ENDPOINTS.EMPLOYEE.LIST
      );
      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      console.warn('Employee API response format unexpected:', response);
      return [];
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }

  /**
   * Get employee by ID
   */
  async getById(id: string): Promise<Employee> {
    const response = await apiClient.get<ApiResponse<Employee>>(
      API_ENDPOINTS.EMPLOYEE.DETAIL(id)
    );
    return response.data;
  }

  /**
   * Create new employee
   */
  async create(data: Omit<Employee, 'id'>): Promise<Employee> {
    const response = await apiClient.post<ApiResponse<Employee>>(
      API_ENDPOINTS.EMPLOYEE.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update employee
   */
  async update(id: string, data: Partial<Employee>): Promise<Employee> {
    const response = await apiClient.put<ApiResponse<Employee>>(
      API_ENDPOINTS.EMPLOYEE.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete employee
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.EMPLOYEE.DELETE(id));
  }
}

export const employeeApi = new EmployeeApiService();
export default employeeApi;

