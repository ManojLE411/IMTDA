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
import { JobApplication } from '@/types/job.types';

/**
 * Hook to manage job applications
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useJobApplication = () => {
  const dispatch = useAppDispatch();
  const applications = useAppSelector(selectJobApplications) || [];
  const loading = useAppSelector(selectJobApplicationsLoading);

  useEffect(() => {
    dispatch(loadJobApplications());
  }, [dispatch]);

  return {
    applications,
    loading,
    applyForJob: (application: JobApplication) => {
      dispatch(applyForJob(application));
    },
    deleteApplication: (id: string) => {
      dispatch(deleteJobApplication(id));
    },
    updateApplicationStatus: (id: string, status: JobApplication['status']) => {
      dispatch(updateJobApplicationStatus({ id, status }));
    },
  };
};

