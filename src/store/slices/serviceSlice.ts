/**
 * Service Slice
 * Manages services state and operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Service } from '@/types/service.types';
import { serviceApi } from '@/services/serviceApi';
import { isValidObjectId } from '@/utils/validation';

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
 * Load services from API
 */
export const loadServices = createAsyncThunk('service/load', async () => {
  return serviceApi.getAll();
});

/**
 * Save service
 */
export const saveService = createAsyncThunk(
  'service/save',
  async (service: Service, { dispatch }) => {
    const { id, ...serviceData } = service;
    const savedService = id && isValidObjectId(id) ? await serviceApi.update(id, serviceData) : await serviceApi.create(serviceData);
    dispatch(loadServices());
    return savedService;
  }
);

/**
 * Delete service
 */
export const deleteService = createAsyncThunk(
  'service/delete',
  async (id: string, { dispatch }) => {
    await serviceApi.delete(id);
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
        // Ensure payload is an array and has id fields
        state.services = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(loadServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load services';
        // Keep existing services on error instead of clearing
        if (state.services.length === 0) {
          state.services = [];
        }
      })
      .addCase(saveService.fulfilled, (state) => {
        // Services are already updated via loadServices
      })
      .addCase(saveService.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save service';
      })
      .addCase(deleteService.fulfilled, (state) => {
        // Services are already updated via loadServices
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete service';
      });
  },
});

export const { clearError } = serviceSlice.actions;

// Selectors
export const selectServices = (state: { service: ServiceState }) => state.service?.services || [];
export const selectServiceLoading = (state: { service: ServiceState }) =>
  state.service.loading;
export const selectServiceError = (state: { service: ServiceState }) => state.service.error;

export default serviceSlice.reducer;

