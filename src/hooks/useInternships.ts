/**
 * useInternships Hook - Redux Version
 * Compatibility hook that provides the same API as the old hook
 */

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectInternshipTracks,
  selectInternshipLoading,
  loadInternshipTracks,
  saveInternshipTrack,
  deleteInternshipTrack,
} from '@/store/slices/internshipSlice';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import { InternshipTrack } from '@/types/internship.types';

/**
 * Hook to manage internship tracks
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useInternships = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectInternshipTracks);
  const loading = useAppSelector(selectInternshipLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadInternshipTracks());
    }
  }, [dispatch, isAuthenticated]);

  return {
    tracks,
    loading,
    saveTrack: (track: InternshipTrack) => {
      dispatch(saveInternshipTrack(track));
    },
    deleteTrack: (id: string) => {
      dispatch(deleteInternshipTrack(id));
    },
  };
};
