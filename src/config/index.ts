/**
 * Application Configuration
 * Centralized configuration for API, authentication, and app settings
 */

// Environment detection
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
export const nodeEnv = import.meta.env.MODE || 'development';

/**
 * API Configuration
 */
export const API_CONFIG = {
  // Base URL for API requests (empty string means relative URLs)
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  
  // Request timeout in milliseconds
  TIMEOUT: 30000, // 30 seconds
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
} as const;

/**
 * Authentication Configuration
 */
export const AUTH_CONFIG = {
  // Token expiration time in milliseconds (24 hours)
  TOKEN_EXPIRATION: 24 * 60 * 60 * 1000,
  
  // Routes
  LOGIN_ROUTE: '/login',
  REGISTER_ROUTE: '/register',
  HOME_ROUTE: '/',
  
  // Token refresh threshold (refresh if expires within this time)
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes
} as const;

/**
 * External API Keys
 */
export const EXTERNAL_APIS = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '',
} as const;

/**
 * Application Settings
 */
export const APP_CONFIG = {
  // Application name
  NAME: 'IMTDA',
  
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Image upload settings
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  
  // Debounce delays (in milliseconds)
  SEARCH_DEBOUNCE: 300,
  AUTO_SAVE_DELAY: 2000,
} as const;

/**
 * Feature Flags
 */
export const FEATURES = {
  // Enable/disable features based on environment
  ENABLE_ANALYTICS: isProduction, // Enable analytics in production
  ENABLE_ERROR_REPORTING: isProduction, // Enable error reporting in production
  ENABLE_DEBUG_LOGS: isDevelopment, // Enable debug logs in development
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT: 'Request timeout. Please try again.',
  UNKNOWN: 'An unexpected error occurred.',
} as const;

/**
 * Validation Rules
 */
export const VALIDATION = {
  // Email validation regex (basic)
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Password requirements
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 128,
  
  // Name validation
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  
  // Phone validation (basic)
  PHONE_REGEX: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
} as const;

/**
 * Get full API URL for a given endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.BASE_URL.trim();
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  if (!baseUrl) {
    return path; // Relative URL
  }
  
  // Ensure base URL doesn't end with slash
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${cleanBaseUrl}${path}`;
};

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (feature: keyof typeof FEATURES): boolean => {
  return FEATURES[feature];
};

/**
 * Get error message for a given error code
 */
export const getErrorMessage = (code?: string): string => {
  switch (code) {
    case 'NETWORK_ERROR':
      return ERROR_MESSAGES.NETWORK_ERROR;
    case 'UNAUTHORIZED':
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 'FORBIDDEN':
      return ERROR_MESSAGES.FORBIDDEN;
    case 'NOT_FOUND':
      return ERROR_MESSAGES.NOT_FOUND;
    case 'TIMEOUT':
      return ERROR_MESSAGES.TIMEOUT;
    default:
      return ERROR_MESSAGES.UNKNOWN;
  }
};

// Export all configuration as a single object for convenience
export const config = {
  api: API_CONFIG,
  auth: AUTH_CONFIG,
  external: EXTERNAL_APIS,
  app: APP_CONFIG,
  features: FEATURES,
  errors: ERROR_MESSAGES,
  validation: VALIDATION,
  env: {
    isDevelopment,
    isProduction,
    nodeEnv,
  },
} as const;

export default config;

