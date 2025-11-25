/**
 * useTestimonials Hook - Redux Version
 * Compatibility hook that provides the same API as the old hook
 */

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectTestimonials,
  selectTestimonialLoading,
  loadTestimonials,
  saveTestimonial,
  deleteTestimonial,
} from '@/store/slices/testimonialSlice';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import { Testimonial } from '@/types/testimonial.types';

/**
 * Hook to manage testimonials
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useTestimonials = () => {
  const dispatch = useAppDispatch();
  const testimonials = useAppSelector(selectTestimonials);
  const loading = useAppSelector(selectTestimonialLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadTestimonials());
    }
  }, [dispatch, isAuthenticated]);

  return {
    testimonials,
    loading,
    saveTestimonial: (testimonial: Testimonial) => {
      dispatch(saveTestimonial(testimonial));
    },
    deleteTestimonial: (id: string) => {
      dispatch(deleteTestimonial(id));
    },
  };
};

