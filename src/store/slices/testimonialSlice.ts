/**
 * Testimonial Slice
 * Manages testimonials state and operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Testimonial } from '@/types/testimonial.types';
import { testimonialStorage } from '@/api/testimonialStorage';

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
 * Load testimonials from storage
 */
export const loadTestimonials = createAsyncThunk('testimonial/load', async () => {
  return testimonialStorage.getAll();
});

/**
 * Save testimonial
 */
export const saveTestimonial = createAsyncThunk(
  'testimonial/save',
  async (testimonial: Testimonial, { dispatch }) => {
    testimonialStorage.save(testimonial);
    dispatch(loadTestimonials());
    return testimonial;
  }
);

/**
 * Delete testimonial
 */
export const deleteTestimonial = createAsyncThunk(
  'testimonial/delete',
  async (id: string, { dispatch }) => {
    testimonialStorage.delete(id);
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
        state.testimonials = action.payload;
      })
      .addCase(loadTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load testimonials';
        state.testimonials = [];
      })
      .addCase(saveTestimonial.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save testimonial';
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete testimonial';
      });
  },
});

export const { clearError } = testimonialSlice.actions;

// Selectors
export const selectTestimonials = (state: { testimonial: TestimonialState }) => state.testimonial.testimonials;
export const selectTestimonialLoading = (state: { testimonial: TestimonialState }) =>
  state.testimonial.loading;
export const selectTestimonialError = (state: { testimonial: TestimonialState }) => state.testimonial.error;

export default testimonialSlice.reducer;

