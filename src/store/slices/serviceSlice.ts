/**
 * Service Slice
 * Manages services state and operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Service } from '@/types/service.types';
import { serviceStorage } from '@/api/serviceStorage';

interface ServiceState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  loading: true,
  error: null,
};

/**
 * Load services from storage
 */
export const loadServices = createAsyncThunk('service/load', async () => {
  return serviceStorage.getAll();
});

/**
 * Save service
 */
export const saveService = createAsyncThunk(
  'service/save',
  async (service: Service, { dispatch }) => {
    serviceStorage.save(service);
    dispatch(loadServices());
    return service;
  }
);

/**
 * Delete service
 */
export const deleteService = createAsyncThunk(
  'service/delete',
  async (id: string, { dispatch }) => {
    serviceStorage.delete(id);
    dispatch(loadServices());
    return id;
  }
);

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(loadServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load services';
        state.services = [];
      })
      .addCase(saveService.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save service';
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete service';
      });
  },
});

export const { clearError } = serviceSlice.actions;

// Selectors
export const selectServices = (state: { service: ServiceState }) => state.service.services;
export const selectServiceLoading = (state: { service: ServiceState }) =>
  state.service.loading;
export const selectServiceError = (state: { service: ServiceState }) => state.service.error;

export default serviceSlice.reducer;

