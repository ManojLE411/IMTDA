/**
 * useAuth Hook - Redux Version
 * Compatibility hook that provides the same API as the old Context-based useAuth
 * This allows gradual migration without breaking existing code
 */

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectUser,
  selectToken,
  selectIsAuthenticated,
  selectIsLoading,
  selectIsAdmin,
  selectIsStudent,
  selectAuthError,
  loginUser,
  adminLogin,
  registerUser,
  logout,
  refreshUser,
  updateUser,
  clearError,
} from '@/store/slices/authSlice';
import { LoginCredentials, RegisterData, User } from '@/types/auth.types';

/**
 * Auth hook with same API as old Context version
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const isAdmin = useAppSelector(selectIsAdmin);
  const isStudent = useAppSelector(selectIsStudent);
  const error = useAppSelector(selectAuthError);

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    isAdmin,
    isStudent,
    error,

    // Actions
    login: async (credentials: LoginCredentials) => {
      await dispatch(loginUser(credentials)).unwrap();
    },
    adminLogin: async (credentials: LoginCredentials) => {
      await dispatch(adminLogin(credentials)).unwrap();
    },
    register: async (data: RegisterData) => {
      await dispatch(registerUser(data)).unwrap();
    },
    logout: () => {
      dispatch(logout());
    },
    refreshUser: async () => {
      await dispatch(refreshUser()).unwrap();
    },
    updateUser: async (updates: Partial<User>) => {
      await dispatch(updateUser(updates)).unwrap();
    },
    clearError: () => {
      dispatch(clearError());
    },
  };
};
