/**
 * Internship Slice
 * Manages internship tracks and applications state
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { InternshipTrack, InternshipApplication } from '@/types/internship.types';
import { internshipStorage } from '@/api/internshipStorage';

interface InternshipState {
  tracks: InternshipTrack[];
  applications: InternshipApplication[];
  loading: boolean;
  applicationsLoading: boolean;
  error: string | null;
}

const initialState: InternshipState = {
  tracks: [],
  applications: [],
  loading: true,
  applicationsLoading: true,
  error: null,
};

/**
 * Load internship tracks from storage
 */
export const loadInternshipTracks = createAsyncThunk('internship/loadTracks', async () => {
  return internshipStorage.getAll();
});

/**
 * Load internship applications from storage
 */
export const loadInternshipApplications = createAsyncThunk(
  'internship/loadApplications',
  async () => {
    return internshipStorage.getAllApplications();
  }
);

/**
 * Save internship track
 */
export const saveInternshipTrack = createAsyncThunk(
  'internship/saveTrack',
  async (track: InternshipTrack, { dispatch }) => {
    internshipStorage.save(track);
    dispatch(loadInternshipTracks());
    return track;
  }
);

/**
 * Delete internship track
 */
export const deleteInternshipTrack = createAsyncThunk(
  'internship/deleteTrack',
  async (id: string, { dispatch }) => {
    internshipStorage.delete(id);
    dispatch(loadInternshipTracks());
    return id;
  }
);

/**
 * Apply for internship
 */
export const applyForInternship = createAsyncThunk(
  'internship/apply',
  async (application: InternshipApplication, { dispatch }) => {
    internshipStorage.saveApplication(application);
    dispatch(loadInternshipApplications());
    return application;
  }
);

/**
 * Delete internship application
 */
export const deleteInternshipApplication = createAsyncThunk(
  'internship/deleteApplication',
  async (id: string, { dispatch }) => {
    internshipStorage.deleteApplication(id);
    dispatch(loadInternshipApplications());
    return id;
  }
);

const internshipSlice = createSlice({
  name: 'internship',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load tracks
      .addCase(loadInternshipTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadInternshipTracks.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload;
      })
      .addCase(loadInternshipTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load internship tracks';
        state.tracks = [];
      })
      // Load applications
      .addCase(loadInternshipApplications.pending, (state) => {
        state.applicationsLoading = true;
        state.error = null;
      })
      .addCase(loadInternshipApplications.fulfilled, (state, action) => {
        state.applicationsLoading = false;
        state.applications = action.payload;
      })
      .addCase(loadInternshipApplications.rejected, (state, action) => {
        state.applicationsLoading = false;
        state.error = action.error.message || 'Failed to load applications';
      })
      // Save/delete track errors
      .addCase(saveInternshipTrack.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save internship track';
      })
      .addCase(deleteInternshipTrack.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete internship track';
      })
      // Application errors
      .addCase(applyForInternship.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to submit application';
      })
      .addCase(deleteInternshipApplication.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete application';
      });
  },
});

export const { clearError } = internshipSlice.actions;

// Selectors
export const selectInternshipTracks = (state: { internship: InternshipState }) =>
  state.internship.tracks;
export const selectInternshipApplications = (state: { internship: InternshipState }) =>
  state.internship.applications;
export const selectInternshipLoading = (state: { internship: InternshipState }) =>
  state.internship.loading;
export const selectApplicationsLoading = (state: { internship: InternshipState }) =>
  state.internship.applicationsLoading;
export const selectInternshipError = (state: { internship: InternshipState }) =>
  state.internship.error;

export default internshipSlice.reducer;

