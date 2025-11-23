// Authentication and authorization types

export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  enrolledPrograms?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: AuthToken;
}

// Legacy Student interface for backward compatibility
export interface Student extends Omit<User, 'role'> {
  password: string;
  role?: UserRole;
}
