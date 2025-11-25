/**
 * Employee Slice
 * Manages employees state and operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '@/types/employee.types';
import { employeeApi } from '@/services/employeeApi';
import { isValidObjectId } from '@/utils/validation';

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: true,
  error: null,
};

/**
 * Load employees from API
 */
export const loadEmployees = createAsyncThunk('employee/load', async () => {
  return employeeApi.getAll();
});

/**
 * Save employee
 */
export const saveEmployee = createAsyncThunk(
  'employee/save',
  async (employee: Employee, { dispatch }) => {
    const { id, ...employeeData } = employee;
    // Only update if ID exists and is a valid MongoDB ObjectId
    // Timestamp-based IDs (from Date.now()) are not valid ObjectIds
    const savedEmployee = id && isValidObjectId(id) 
      ? await employeeApi.update(id, employeeData) 
      : await employeeApi.create(employeeData);
    dispatch(loadEmployees());
    return savedEmployee;
  }
);

/**
 * Delete employee
 */
export const deleteEmployee = createAsyncThunk(
  'employee/delete',
  async (id: string, { dispatch }) => {
    await employeeApi.delete(id);
    dispatch(loadEmployees());
    return id;
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadEmployees.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure payload is an array and has id fields
        state.employees = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(loadEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load employees';
        console.error('Failed to load employees:', action.error);
        // Keep existing employees on error instead of clearing
        if (state.employees.length === 0) {
          state.employees = [];
        }
      })
      .addCase(saveEmployee.fulfilled, (state) => {
        // Employees are already updated via loadEmployees
      })
      .addCase(saveEmployee.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save employee';
      })
      .addCase(deleteEmployee.fulfilled, (state) => {
        // Employees are already updated via loadEmployees
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete employee';
      });
  },
});

export const { clearError } = employeeSlice.actions;

// Selectors
export const selectEmployees = (state: { employee: EmployeeState }) => state.employee?.employees || [];
export const selectEmployeeLoading = (state: { employee: EmployeeState }) =>
  state.employee.loading;
export const selectEmployeeError = (state: { employee: EmployeeState }) => state.employee.error;

export default employeeSlice.reducer;

