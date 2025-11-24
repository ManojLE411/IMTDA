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
import { InternshipApplication } from '@/types/internship.types';

/**
 * Hook to manage internship applications
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useInternshipApplication = () => {
  const dispatch = useAppDispatch();
  const applications = useAppSelector(selectInternshipApplications) || [];
  const loading = useAppSelector(selectApplicationsLoading);

  useEffect(() => {
    dispatch(loadInternshipApplications());
  }, [dispatch]);

  return {
    applications,
    loading,
    applyForInternship: (application: InternshipApplication) => {
      dispatch(applyForInternship(application));
    },
    deleteApplication: (id: string) => {
      dispatch(deleteInternshipApplication(id));
    },
    updateApplicationStatus: (id: string, status: InternshipApplication['status']) => {
      dispatch(updateInternshipApplicationStatus({ id, status }));
    },
  };
};
