/**
 * Training Slice
 * Manages training programs state and operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TrainingProgram } from '@/types/training.types';
import { trainingApi } from '@/services/trainingApi';
import { isValidObjectId } from '@/utils/validation';

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
 * Load training programs from API
 */
export const loadTrainingPrograms = createAsyncThunk('training/load', async () => {
  return trainingApi.getAll();
});

/**
 * Save training program
 */
export const saveTrainingProgram = createAsyncThunk(
  'training/save',
  async (program: TrainingProgram, { dispatch }) => {
    const { id, ...programData } = program;
    const savedProgram = id && isValidObjectId(id) ? await trainingApi.update(id, programData) : await trainingApi.create(programData);
    dispatch(loadTrainingPrograms());
    return savedProgram;
  }
);

/**
 * Delete training program
 */
export const deleteTrainingProgram = createAsyncThunk(
  'training/delete',
  async (id: string, { dispatch }) => {
    await trainingApi.delete(id);
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
        // Ensure payload is an array and has id fields
        state.programs = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(loadTrainingPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load training programs';
        console.error('Failed to load training programs:', action.error);
        // Keep existing programs on error instead of clearing
        if (state.programs.length === 0) {
          state.programs = [];
        }
      })
      .addCase(saveTrainingProgram.fulfilled, (state) => {
        // Programs are already updated via loadTrainingPrograms
      })
      .addCase(saveTrainingProgram.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save training program';
      })
      .addCase(deleteTrainingProgram.fulfilled, (state) => {
        // Programs are already updated via loadTrainingPrograms
      })
      .addCase(deleteTrainingProgram.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete training program';
      });
  },
});

export const { clearError } = trainingSlice.actions;

// Selectors
export const selectTrainingPrograms = (state: { training: TrainingState }) =>
  state.training?.programs || [];
export const selectTrainingLoading = (state: { training: TrainingState }) =>
  state.training.loading;
export const selectTrainingError = (state: { training: TrainingState }) =>
  state.training.error;

export default trainingSlice.reducer;

