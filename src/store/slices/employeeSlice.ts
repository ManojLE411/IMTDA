/**
 * Employee Slice
 * Manages employees state and operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '@/types/employee.types';
import { employeeStorage } from '@/api/employeeStorage';

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
 * Load employees from storage
 */
export const loadEmployees = createAsyncThunk('employee/load', async () => {
  return employeeStorage.getAll();
});

/**
 * Save employee
 */
export const saveEmployee = createAsyncThunk(
  'employee/save',
  async (employee: Employee, { dispatch }) => {
    employeeStorage.save(employee);
    dispatch(loadEmployees());
    return employee;
  }
);

/**
 * Delete employee
 */
export const deleteEmployee = createAsyncThunk(
  'employee/delete',
  async (id: string, { dispatch }) => {
    employeeStorage.delete(id);
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
        state.employees = action.payload;
      })
      .addCase(loadEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load employees';
        state.employees = [];
      })
      .addCase(saveEmployee.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save employee';
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete employee';
      });
  },
});

export const { clearError } = employeeSlice.actions;

// Selectors
export const selectEmployees = (state: { employee: EmployeeState }) => state.employee.employees;
export const selectEmployeeLoading = (state: { employee: EmployeeState }) =>
  state.employee.loading;
export const selectEmployeeError = (state: { employee: EmployeeState }) => state.employee.error;

export default employeeSlice.reducer;

