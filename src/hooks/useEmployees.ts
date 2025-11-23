/**
 * useEmployees Hook - Redux Version
 * Compatibility hook that provides the same API as the old hook
 */

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectEmployees,
  selectEmployeeLoading,
  loadEmployees,
  saveEmployee,
  deleteEmployee,
} from '@/store/slices/employeeSlice';
import { Employee } from '@/types/employee.types';

/**
 * Hook to manage employees
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useEmployees = () => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(selectEmployees);
  const loading = useAppSelector(selectEmployeeLoading);

  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

  return {
    employees,
    loading,
    saveEmployee: (employee: Employee) => {
      dispatch(saveEmployee(employee));
    },
    deleteEmployee: (id: string) => {
      dispatch(deleteEmployee(id));
    },
  };
};
