import { useState, useEffect } from 'react';
import { Employee } from '../types/employee.types';
import { employeeStorage } from '../api/employeeStorage';
import { DEFAULT_EMPLOYEES } from '../constants/employee.constants';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = () => {
      try {
        const stored = employeeStorage.getAll();
        setEmployees(stored.length > 0 ? stored : DEFAULT_EMPLOYEES);
      } catch (error) {
        console.error('Failed to load employees', error);
        setEmployees(DEFAULT_EMPLOYEES);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  const saveEmployee = (employee: Employee) => {
    employeeStorage.save(employee);
    setEmployees(prev => {
      const exists = prev.some(e => e.id === employee.id);
      return exists 
        ? prev.map(e => e.id === employee.id ? employee : e)
        : [employee, ...prev];
    });
  };

  const deleteEmployee = (id: string) => {
    employeeStorage.delete(id);
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  return {
    employees,
    loading,
    saveEmployee,
    deleteEmployee,
  };
};

