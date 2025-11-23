/**
 * Training Slice
 * Manages training programs state and operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TrainingProgram } from '@/types/training.types';
import { trainingStorage } from '@/api/trainingStorage';

interface TrainingState {
  programs: TrainingProgram[];
  loading: boolean;
  error: string | null;
}

const initialState: TrainingState = {
  programs: [],
  loading: true,
  error: null,
};

/**
 * Load training programs from storage
 */
export const loadTrainingPrograms = createAsyncThunk('training/load', async () => {
  return trainingStorage.getAll();
});

/**
 * Save training program
 */
export const saveTrainingProgram = createAsyncThunk(
  'training/save',
  async (program: TrainingProgram, { dispatch }) => {
    trainingStorage.save(program);
    dispatch(loadTrainingPrograms());
    return program;
  }
);

/**
 * Delete training program
 */
export const deleteTrainingProgram = createAsyncThunk(
  'training/delete',
  async (id: string, { dispatch }) => {
    trainingStorage.delete(id);
    dispatch(loadTrainingPrograms());
    return id;
  }
);

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTrainingPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTrainingPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = action.payload;
      })
      .addCase(loadTrainingPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load training programs';
        state.programs = [];
      })
      .addCase(saveTrainingProgram.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save training program';
      })
      .addCase(deleteTrainingProgram.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete training program';
      });
  },
});

export const { clearError } = trainingSlice.actions;

// Selectors
export const selectTrainingPrograms = (state: { training: TrainingState }) =>
  state.training.programs;
export const selectTrainingLoading = (state: { training: TrainingState }) =>
  state.training.loading;
export const selectTrainingError = (state: { training: TrainingState }) =>
  state.training.error;

export default trainingSlice.reducer;

