// Common shared types

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Project {
  id: string;
  title: string;
  category: 'AI/ML' | 'Web' | 'VLSI' | 'IoT' | 'Data Science';
  description: string;
  techStack: string[];
  image: string;
}

export interface JobListing {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  location: 'Remote' | 'On-site' | 'Hybrid';
}