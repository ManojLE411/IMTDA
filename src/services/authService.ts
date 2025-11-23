/**
 * Auth Service
 * Handles all authentication-related API calls
 * For testing: Uses hardcoded credentials
 */

import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User,
  UserRole,
  AuthToken
} from '@/types/auth.types';

// Hardcoded test users
const HARDCODED_USERS = {
  admin: {
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@imtda.com',
    phone: '+91 98765 43210',
    role: UserRole.ADMIN,
    password: 'admin123',
  },
  student: {
    id: 'student-001',
    name: 'Test Student',
    email: 'student@imtda.com',
    phone: '+91 98765 43211',
    role: UserRole.STUDENT,
    password: 'student123',
    enrolledPrograms: [],
  },
} as const;

/**
 * Generate a mock token
 */
const generateMockToken = (userId: string): AuthToken => {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return {
    accessToken: `mock-token-${userId}-${Date.now()}`,
    expiresAt,
  };
};

/**
 * Simulate API delay
 */
const delay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

class AuthService {
  /**
   * Login user - checks against hardcoded credentials
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(500); // Simulate API delay
    
    // Check admin credentials
    if (
      credentials.email === HARDCODED_USERS.admin.email &&
      credentials.password === HARDCODED_USERS.admin.password
    ) {
      const user: User = {
        id: HARDCODED_USERS.admin.id,
        name: HARDCODED_USERS.admin.name,
        email: HARDCODED_USERS.admin.email,
        phone: HARDCODED_USERS.admin.phone,
        role: HARDCODED_USERS.admin.role,
        createdAt: new Date().toISOString(),
      };
      
      return {
        user,
        token: generateMockToken(user.id),
      };
    }
    
    // Check student credentials
    if (
      credentials.email === HARDCODED_USERS.student.email &&
      credentials.password === HARDCODED_USERS.student.password
    ) {
      const user: User = {
        id: HARDCODED_USERS.student.id,
        name: HARDCODED_USERS.student.name,
        email: HARDCODED_USERS.student.email,
        phone: HARDCODED_USERS.student.phone,
        role: HARDCODED_USERS.student.role,
        enrolledPrograms: [...HARDCODED_USERS.student.enrolledPrograms],
        createdAt: new Date().toISOString(),
      };
      
      return {
        user,
        token: generateMockToken(user.id),
      };
    }
    
    // Invalid credentials
    throw new Error('Invalid email or password');
  }

  /**
   * Register new user - for testing, just return a student user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    await delay(500); // Simulate API delay
    
    // Create a new student user
    const user: User = {
      id: `student-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: UserRole.STUDENT,
      enrolledPrograms: [],
      createdAt: new Date().toISOString(),
    };
    
    return {
      user,
      token: generateMockToken(user.id),
    };
  }

  /**
   * Get current user - returns user from token if valid
   */
  async getCurrentUser(token: string): Promise<User | null> {
    await delay(300); // Simulate API delay
    
    // Extract user ID from token (mock implementation)
    // In a real scenario, you'd decode the JWT token
    if (token.includes('admin-001')) {
      return {
        id: HARDCODED_USERS.admin.id,
        name: HARDCODED_USERS.admin.name,
        email: HARDCODED_USERS.admin.email,
        phone: HARDCODED_USERS.admin.phone,
        role: HARDCODED_USERS.admin.role,
        createdAt: new Date().toISOString(),
      };
    }
    
    if (token.includes('student-001')) {
      return {
        id: HARDCODED_USERS.student.id,
        name: HARDCODED_USERS.student.name,
        email: HARDCODED_USERS.student.email,
        phone: HARDCODED_USERS.student.phone,
        role: HARDCODED_USERS.student.role,
        enrolledPrograms: [...HARDCODED_USERS.student.enrolledPrograms],
        createdAt: new Date().toISOString(),
      };
    }
    
    return null;
  }

  /**
   * Validate token
   */
  validateToken(token: string): boolean {
    // Basic validation: check if token exists and is not empty
    // Also check if it's not expired (for mock tokens)
    if (!token || token.length === 0) {
      return false;
    }
    
    // For mock tokens, just check if they exist
    // In production, you'd decode and verify the JWT
    return token.startsWith('mock-token-');
  }

  /**
   * Update user
   */
  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    await delay(500);
    
    // Mock implementation - just return updated user
    // In real app, this would call the API
    throw new Error('Update user not implemented in mock mode');
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User | null> {
    await delay(300);
    
    if (userId === HARDCODED_USERS.admin.id) {
      return {
        id: HARDCODED_USERS.admin.id,
        name: HARDCODED_USERS.admin.name,
        email: HARDCODED_USERS.admin.email,
        phone: HARDCODED_USERS.admin.phone,
        role: HARDCODED_USERS.admin.role,
        createdAt: new Date().toISOString(),
      };
    }
    
    if (userId === HARDCODED_USERS.student.id) {
      return {
        id: HARDCODED_USERS.student.id,
        name: HARDCODED_USERS.student.name,
        email: HARDCODED_USERS.student.email,
        phone: HARDCODED_USERS.student.phone,
        role: HARDCODED_USERS.student.role,
        enrolledPrograms: [...HARDCODED_USERS.student.enrolledPrograms],
        createdAt: new Date().toISOString(),
      };
    }
    
    return null;
  }
}

export const authService = new AuthService();
export default authService;
