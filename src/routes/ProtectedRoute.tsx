/**
 * ProtectedRoute Component
 * Wrapper for routes that require authentication and optionally specific user roles
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectUser, selectIsAuthenticated, selectIsLoading } from '@/store/slices/authSlice';
import { UserRole } from '@/types/auth.types';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Optional: Array of allowed roles. If provided, user must have one of these roles */
  allowedRoles?: UserRole[];
  /** Optional: Where to redirect if user doesn't have required role. Defaults to '/' */
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = '/',
}) => {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-imtda-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedRoles is specified, check if user has required role
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      // User doesn't have required role, redirect
      return <Navigate to={redirectTo} replace />;
    }
  }

  return <>{children}</>;
};
