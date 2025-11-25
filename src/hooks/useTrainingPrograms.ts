/**
 * useTrainingPrograms Hook - Redux Version
 * Compatibility hook that provides the same API as the old hook
 */

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectTrainingPrograms,
  selectTrainingLoading,
  loadTrainingPrograms,
  saveTrainingProgram,
  deleteTrainingProgram,
} from '@/store/slices/trainingSlice';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import { TrainingProgram } from '@/types/training.types';

/**
 * Hook to manage training programs
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useTrainingPrograms = () => {
  const dispatch = useAppDispatch();
  const programs = useAppSelector(selectTrainingPrograms);
  const loading = useAppSelector(selectTrainingLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadTrainingPrograms());
    }
  }, [dispatch, isAuthenticated]);

  return {
    programs,
    loading,
    saveProgram: (program: TrainingProgram) => {
      dispatch(saveTrainingProgram(program));
    },
    deleteProgram: (id: string) => {
      dispatch(deleteTrainingProgram(id));
    },
  };
};
