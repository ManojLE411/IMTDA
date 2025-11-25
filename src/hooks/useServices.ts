/**
 * useServices Hook - Redux Version
 * Compatibility hook that provides the same API as the old hook
 */

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectServices,
  selectServiceLoading,
  loadServices,
  saveService,
  deleteService,
} from '@/store/slices/serviceSlice';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import { Service } from '@/types/service.types';

/**
 * Hook to manage services
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useServices = () => {
  const dispatch = useAppDispatch();
  const services = useAppSelector(selectServices);
  const loading = useAppSelector(selectServiceLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadServices());
    }
  }, [dispatch, isAuthenticated]);

  return {
    services,
    loading,
    saveService: (service: Service) => {
      dispatch(saveService(service));
    },
    deleteService: (id: string) => {
      dispatch(deleteService(id));
    },
  };
};

