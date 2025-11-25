/**
 * useInternshipApplication Hook - Redux Version
 * Compatibility hook that provides the same API as the old hook
 */

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectInternshipApplications,
  selectApplicationsLoading,
  loadInternshipApplications,
  applyForInternship,
  deleteInternshipApplication,
  updateInternshipApplicationStatus,
} from '@/store/slices/internshipSlice';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import { InternshipApplication } from '@/types/internship.types';

/**
 * Hook to manage internship applications
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useInternshipApplication = () => {
  const dispatch = useAppDispatch();
  const applications = useAppSelector(selectInternshipApplications) || [];
  const loading = useAppSelector(selectApplicationsLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadInternshipApplications());
    }
  }, [dispatch, isAuthenticated]);

  return {
    applications,
    loading,
    applyForInternship: (application: InternshipApplication, resumeFile?: File) => {
      dispatch(applyForInternship({ application, resumeFile }));
    },
    deleteApplication: (id: string) => {
      dispatch(deleteInternshipApplication(id));
    },
    updateApplicationStatus: (id: string, status: InternshipApplication['status']) => {
      dispatch(updateInternshipApplicationStatus({ id, status }));
    },
  };
};
