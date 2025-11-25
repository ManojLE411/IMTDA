/**
 * Testimonial Slice
 * Manages testimonials state and operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Testimonial } from '@/types/testimonial.types';
import { testimonialApi } from '@/services/testimonialApi';
import { isValidObjectId } from '@/utils/validation';

interface TestimonialState {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialState = {
  testimonials: [],
  loading: true,
  error: null,
};

/**
 * Load testimonials from API
 */
export const loadTestimonials = createAsyncThunk('testimonial/load', async () => {
  return testimonialApi.getAll();
});

/**
 * Save testimonial
 */
export const saveTestimonial = createAsyncThunk(
  'testimonial/save',
  async (testimonial: Testimonial, { dispatch }) => {
    const { id, ...testimonialData } = testimonial;
    const savedTestimonial = id && isValidObjectId(id) ? await testimonialApi.update(id, testimonialData) : await testimonialApi.create(testimonialData);
    dispatch(loadTestimonials());
    return savedTestimonial;
  }
);

/**
 * Delete testimonial
 */
export const deleteTestimonial = createAsyncThunk(
  'testimonial/delete',
  async (id: string, { dispatch }) => {
    await testimonialApi.delete(id);
    dispatch(loadTestimonials());
    return id;
  }
);

const testimonialSlice = createSlice({
  name: 'testimonial',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure payload is an array and has id fields
        state.testimonials = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(loadTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load testimonials';
        // Keep existing testimonials on error instead of clearing
        if (state.testimonials.length === 0) {
          state.testimonials = [];
        }
      })
      .addCase(saveTestimonial.fulfilled, (state) => {
        // Testimonials are already updated via loadTestimonials
      })
      .addCase(saveTestimonial.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save testimonial';
      })
      .addCase(deleteTestimonial.fulfilled, (state) => {
        // Testimonials are already updated via loadTestimonials
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete testimonial';
      });
  },
});

export const { clearError } = testimonialSlice.actions;

// Selectors
export const selectTestimonials = (state: { testimonial: TestimonialState }) => state.testimonial?.testimonials || [];
export const selectTestimonialLoading = (state: { testimonial: TestimonialState }) =>
  state.testimonial.loading;
export const selectTestimonialError = (state: { testimonial: TestimonialState }) => state.testimonial.error;

export default testimonialSlice.reducer;

