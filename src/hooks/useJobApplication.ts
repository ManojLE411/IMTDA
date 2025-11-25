/**
 * useJobApplication Hook - Redux Version
 * Compatibility hook that provides the same API as the old hook
 */

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectJobApplications,
  selectJobApplicationsLoading,
  loadJobApplications,
  applyForJob,
  deleteJobApplication,
  updateJobApplicationStatus,
} from '@/store/slices/jobSlice';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import { JobApplication } from '@/types/job.types';

/**
 * Hook to manage job applications
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useJobApplication = () => {
  const dispatch = useAppDispatch();
  const applications = useAppSelector(selectJobApplications) || [];
  const loading = useAppSelector(selectJobApplicationsLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadJobApplications());
    }
  }, [dispatch, isAuthenticated]);

  return {
    applications,
    loading,
    applyForJob: (application: JobApplication, resumeFile?: File) => {
      dispatch(applyForJob({ application, resumeFile }));
    },
    deleteApplication: (id: string) => {
      dispatch(deleteJobApplication(id));
    },
    updateApplicationStatus: (id: string, status: JobApplication['status']) => {
      dispatch(updateJobApplicationStatus({ id, status }));
    },
  };
};

