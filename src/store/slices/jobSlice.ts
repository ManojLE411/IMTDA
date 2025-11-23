/**
 * Job Slice
 * Manages job positions state and operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Job } from '@/types/job.types';
import { jobStorage } from '@/api/jobStorage';

interface JobState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  loading: true,
  error: null,
};

/**
 * Load jobs from storage
 */
export const loadJobs = createAsyncThunk('job/load', async () => {
  return jobStorage.getAll();
});

/**
 * Save job
 */
export const saveJob = createAsyncThunk(
  'job/save',
  async (job: Job, { dispatch }) => {
    jobStorage.save(job);
    dispatch(loadJobs());
    return job;
  }
);

/**
 * Delete job
 */
export const deleteJob = createAsyncThunk(
  'job/delete',
  async (id: string, { dispatch }) => {
    jobStorage.delete(id);
    dispatch(loadJobs());
    return id;
  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(loadJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load jobs';
        state.jobs = [];
      })
      .addCase(saveJob.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save job';
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete job';
      });
  },
});

export const { clearError } = jobSlice.actions;

// Selectors
export const selectJobs = (state: { job: JobState }) => state.job.jobs;
export const selectJobLoading = (state: { job: JobState }) =>
  state.job.loading;
export const selectJobError = (state: { job: JobState }) => state.job.error;

export default jobSlice.reducer;

