/**
 * Redux Provider Component
 * Wraps the app with Redux Provider and initializes auth on mount
 */

import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './index';
import { initializeAuth } from './slices/authSlice';
import type { AppDispatch } from './index';

interface ReduxProviderProps {
  children: React.ReactNode;
}

/**
 * Component to initialize auth state on mount
 * Must be inside Provider to use dispatch
 */
const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return <>{children}</>;
};

/**
 * Redux Provider wrapper
 */
export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
};

