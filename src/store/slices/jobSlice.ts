/**
 * Job Slice
 * Manages job positions state and operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Job, JobApplication } from '@/types/job.types';
import { jobStorage } from '@/api/jobStorage';

interface JobState {
  jobs: Job[];
  applications: JobApplication[];
  loading: boolean;
  applicationsLoading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  applications: [],
  loading: true,
  applicationsLoading: true,
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

/**
 * Load job applications from storage
 */
export const loadJobApplications = createAsyncThunk(
  'job/loadApplications',
  async () => {
    return jobStorage.getAllApplications();
  }
);

/**
 * Apply for job
 */
export const applyForJob = createAsyncThunk(
  'job/apply',
  async (application: JobApplication, { dispatch }) => {
    jobStorage.saveApplication(application);
    dispatch(loadJobApplications());
    return application;
  }
);

/**
 * Delete job application
 */
export const deleteJobApplication = createAsyncThunk(
  'job/deleteApplication',
  async (id: string, { dispatch }) => {
    jobStorage.deleteApplication(id);
    dispatch(loadJobApplications());
    return id;
  }
);

/**
 * Update job application status
 */
export const updateJobApplicationStatus = createAsyncThunk(
  'job/updateApplicationStatus',
  async ({ id, status }: { id: string; status: JobApplication['status'] }, { dispatch }) => {
    jobStorage.updateApplicationStatus(id, status);
    dispatch(loadJobApplications());
    return { id, status };
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
      // Load jobs
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
      // Load applications
      .addCase(loadJobApplications.pending, (state) => {
        state.applicationsLoading = true;
        state.error = null;
      })
      .addCase(loadJobApplications.fulfilled, (state, action) => {
        state.applicationsLoading = false;
        state.applications = action.payload;
      })
      .addCase(loadJobApplications.rejected, (state, action) => {
        state.applicationsLoading = false;
        state.error = action.error.message || 'Failed to load applications';
      })
      // Save/delete job errors
      .addCase(saveJob.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save job';
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete job';
      })
      // Application errors
      .addCase(applyForJob.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to submit application';
      })
      .addCase(deleteJobApplication.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete application';
      })
      .addCase(updateJobApplicationStatus.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update application status';
      });
  },
});

export const { clearError } = jobSlice.actions;

// Selectors
export const selectJobs = (state: { job: JobState }) => state.job?.jobs || [];
export const selectJobLoading = (state: { job: JobState }) =>
  state.job?.loading ?? true;
export const selectJobApplications = (state: { job: JobState }) =>
  state.job?.applications || [];
export const selectJobApplicationsLoading = (state: { job: JobState }) =>
  state.job?.applicationsLoading ?? true;
export const selectJobError = (state: { job: JobState }) => state.job?.error || null;

export default jobSlice.reducer;

