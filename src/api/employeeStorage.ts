import { Employee } from '@/types/employee.types';
import { STORAGE_KEYS } from '@/constants';
import { BaseStorage } from './BaseStorage';

class EmployeeStorage extends BaseStorage<Employee> {
  constructor() {
    super(STORAGE_KEYS.EMPLOYEES);
  }
}

export const employeeStorage = new EmployeeStorage();

