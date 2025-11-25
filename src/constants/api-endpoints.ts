/**
 * API Endpoints
 * Centralized endpoint definitions for all API routes
 */

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
    UPDATE_PROFILE: '/api/auth/profile',
    // Admin auth endpoints
    ADMIN_LOGIN: '/api/auth/admin/login',
    ADMIN_REGISTER: '/api/auth/admin/register',
  },

  // Blog endpoints
  BLOG: {
    BASE: '/api/blog',
    LIST: '/api/blog',
    DETAIL: (id: string) => `/api/blog/${id}`,
    CREATE: '/api/blog',
    UPDATE: (id: string) => `/api/blog/${id}`,
    DELETE: (id: string) => `/api/blog/${id}`,
  },

  // Training endpoints
  TRAINING: {
    BASE: '/api/training',
    LIST: '/api/training',
    DETAIL: (id: string) => `/api/training/${id}`,
    CREATE: '/api/training',
    UPDATE: (id: string) => `/api/training/${id}`,
    DELETE: (id: string) => `/api/training/${id}`,
  },

  // Internship endpoints
  INTERNSHIP: {
    BASE: '/api/internships',
    LIST: '/api/internships',
    DETAIL: (id: string) => `/api/internships/${id}`,
    CREATE: '/api/internships',
    UPDATE: (id: string) => `/api/internships/${id}`,
    DELETE: (id: string) => `/api/internships/${id}`,
  },

  // Employee endpoints
  EMPLOYEE: {
    BASE: '/api/employees',
    LIST: '/api/employees',
    DETAIL: (id: string) => `/api/employees/${id}`,
    CREATE: '/api/employees',
    UPDATE: (id: string) => `/api/employees/${id}`,
    DELETE: (id: string) => `/api/employees/${id}`,
  },

  // Contact endpoints
  CONTACT: {
    BASE: '/api/contact',
    SUBMIT: '/api/contact',
    LIST: '/api/contact',
    DETAIL: (id: string) => `/api/contact/${id}`,
    DELETE: (id: string) => `/api/contact/${id}`,
  },

  // User/Student endpoints
  USERS: {
    BASE: '/api/users',
    LIST: '/api/users',
    DETAIL: (id: string) => `/api/users/${id}`,
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
  },

  // Service endpoints
  SERVICE: {
    BASE: '/api/services',
    LIST: '/api/services',
    DETAIL: (id: string) => `/api/services/${id}`,
    CREATE: '/api/services',
    UPDATE: (id: string) => `/api/services/${id}`,
    DELETE: (id: string) => `/api/services/${id}`,
  },

  // Job endpoints
  JOB: {
    BASE: '/api/jobs',
    LIST: '/api/jobs',
    DETAIL: (id: string) => `/api/jobs/${id}`,
    CREATE: '/api/jobs',
    UPDATE: (id: string) => `/api/jobs/${id}`,
    DELETE: (id: string) => `/api/jobs/${id}`,
    APPLICATIONS: '/api/jobs/applications',
    APPLICATION_DETAIL: (id: string) => `/api/jobs/applications/${id}`,
    UPDATE_APPLICATION_STATUS: (id: string) => `/api/jobs/applications/${id}/status`,
  },

  // Testimonial endpoints
  TESTIMONIAL: {
    BASE: '/api/testimonials',
    LIST: '/api/testimonials',
    DETAIL: (id: string) => `/api/testimonials/${id}`,
    CREATE: '/api/testimonials',
    UPDATE: (id: string) => `/api/testimonials/${id}`,
    DELETE: (id: string) => `/api/testimonials/${id}`,
  },

  // Project endpoints
  PROJECT: {
    BASE: '/api/projects',
    LIST: '/api/projects',
    DETAIL: (id: string) => `/api/projects/${id}`,
    CREATE: '/api/projects',
    UPDATE: (id: string) => `/api/projects/${id}`,
    DELETE: (id: string) => `/api/projects/${id}`,
  },
} as const;

