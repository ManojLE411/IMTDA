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
import { Job } from '@/types/job.types';

/**
 * Hook to manage job positions
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useJobs = () => {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(selectJobs);
  const loading = useAppSelector(selectJobLoading);

  useEffect(() => {
    // Load jobs for all users (public page)
    dispatch(loadJobs());
  }, [dispatch]);

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

