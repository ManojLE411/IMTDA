/**
 * useJobs Hook - Redux Version
 * Compatibility hook that provides the same API as the old hook
 */

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectJobs,
  selectJobLoading,
  loadJobs,
  saveJob,
  deleteJob,
} from '@/store/slices/jobSlice';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import { Job } from '@/types/job.types';

/**
 * Hook to manage job positions
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useJobs = () => {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(selectJobs);
  const loading = useAppSelector(selectJobLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadJobs());
    }
  }, [dispatch, isAuthenticated]);

  return {
    jobs,
    loading,
    saveJob: (job: Job) => {
      dispatch(saveJob(job));
    },
    deleteJob: (id: string) => {
      dispatch(deleteJob(id));
    },
  };
};

