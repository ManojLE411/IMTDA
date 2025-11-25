/**
 * Auth Slice
 * Manages authentication state, user data, and auth operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole, LoginCredentials, RegisterData, AuthToken } from '@/types/auth.types';
import { StorageService } from '@/services/storage';
import { authService } from '@/services/authService';
import { apiClient } from '@/services/apiClient';
import { authApi } from '@/services/authApi';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { AUTH_CONFIG } from '@/config';

interface AuthState {
  user: User | null;
  token: AuthToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

/**
 * Initialize auth from storage
 */
export const initializeAuth = createAsyncThunk('auth/initialize', async () => {
  const storedToken = StorageService.get<AuthToken>(STORAGE_KEYS.AUTH_TOKEN);
  const storedUser = StorageService.get<User>(STORAGE_KEYS.AUTH_USER);

  if (storedToken && storedUser) {
    // Validate token
    if (authService.validateToken(storedToken.accessToken)) {
      // Set token in API client
      apiClient.setToken(storedToken.accessToken, storedToken.expiresAt);

      // Optionally refresh user data
      try {
        const freshUser = await authApi.getCurrentUser();
        if (freshUser) {
          StorageService.set(STORAGE_KEYS.AUTH_USER, freshUser);
          return { user: freshUser, token: storedToken };
        }
      } catch (error: any) {
        // Silently handle 401 errors (token expired/invalid) - this is expected
        if (error?.status === 401 || error?.response?.status === 401) {
          // Token is invalid, clear auth
          StorageService.remove(STORAGE_KEYS.AUTH_TOKEN);
          StorageService.remove(STORAGE_KEYS.AUTH_USER);
          return null;
        }
        // Only log non-401 errors
        console.warn('Failed to refresh user data:', error);
      }

      return { user: storedUser, token: storedToken };
    }
  }

  // Clear invalid auth
  StorageService.remove(STORAGE_KEYS.AUTH_TOKEN);
  StorageService.remove(STORAGE_KEYS.AUTH_USER);
  return null;
});

/**
 * Login user (student)
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      const { user, token } = response;

      // Store in localStorage
      StorageService.set(STORAGE_KEYS.AUTH_TOKEN, token);
      StorageService.set(STORAGE_KEYS.AUTH_USER, user);
      StorageService.set(STORAGE_KEYS.CURRENT_USER, user); // Legacy support

      // Set token in API client
      apiClient.setToken(token.accessToken, token.expiresAt);

      return { user, token };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

/**
 * Admin login
 */
export const adminLogin = createAsyncThunk(
  'auth/adminLogin',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authApi.adminLogin(credentials);
      const { user, token } = response;

      // Store in localStorage
      StorageService.set(STORAGE_KEYS.AUTH_TOKEN, token);
      StorageService.set(STORAGE_KEYS.AUTH_USER, user);
      StorageService.set(STORAGE_KEYS.CURRENT_USER, user); // Legacy support

      // Set token in API client
      apiClient.setToken(token.accessToken, token.expiresAt);

      return { user, token };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Admin login failed');
    }
  }
);

/**
 * Register new user (student)
 */
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(data);
      const { user, token } = response;

      // Store in localStorage
      StorageService.set(STORAGE_KEYS.AUTH_TOKEN, token);
      StorageService.set(STORAGE_KEYS.AUTH_USER, user);
      StorageService.set(STORAGE_KEYS.CURRENT_USER, user); // Legacy support

      // Set token in API client
      apiClient.setToken(token.accessToken, token.expiresAt);

      return { user, token };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
    }
  }
);

/**
 * Refresh user data
 */
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { auth: AuthState };
    const token = state.auth.token;

    if (!token) {
      return rejectWithValue('No token available');
    }

      try {
        const freshUser = await authApi.getCurrentUser();
        if (freshUser) {
          StorageService.set(STORAGE_KEYS.AUTH_USER, freshUser);
          StorageService.set(STORAGE_KEYS.CURRENT_USER, freshUser); // Legacy
          return freshUser;
        }
        return rejectWithValue('Failed to refresh user');
      } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Failed to refresh user');
      }
  }
);

/**
 * Update user data
 */
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (updates: Partial<User>, { getState, rejectWithValue }) => {
    const state = getState() as { auth: AuthState };
    const user = state.auth.user;

    if (!user) {
      return rejectWithValue('No user logged in');
    }

    try {
      const updatedUser = await authApi.updateProfile(updates);
      StorageService.set(STORAGE_KEYS.AUTH_USER, updatedUser);
      StorageService.set(STORAGE_KEYS.CURRENT_USER, updatedUser); // Legacy
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update user');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // Clear storage
      StorageService.remove(STORAGE_KEYS.AUTH_TOKEN);
      StorageService.remove(STORAGE_KEYS.AUTH_USER);
      StorageService.remove(STORAGE_KEYS.CURRENT_USER); // Legacy

      // Redirect to home
      window.location.href = AUTH_CONFIG.HOME_ROUTE;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Initialize auth
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to initialize auth';
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Admin login
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Refresh user
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectIsAdmin = (state: { auth: AuthState }) =>
  state.auth.user?.role === UserRole.ADMIN;
export const selectIsStudent = (state: { auth: AuthState }) =>
  state.auth.user?.role === UserRole.STUDENT;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;

