import { Employee } from '../types/employee.types';
import { STORAGE_KEYS } from '@/shared/constants';
import { StorageService } from '@/shared/utils';

class EmployeeStorage {
  private key = STORAGE_KEYS.EMPLOYEES;

  getAll(): Employee[] {
    return StorageService.get<Employee[]>(this.key) || [];
  }

  save(employee: Employee): void {
    const employees = this.getAll();
    const exists = employees.some(e => e.id === employee.id);
    const updated = exists
      ? employees.map(e => e.id === employee.id ? employee : e)
      : [employee, ...employees];
    StorageService.set(this.key, updated);
  }

  delete(id: string): void {
    const employees = this.getAll();
    const filtered = employees.filter(e => e.id !== id);
    StorageService.set(this.key, filtered);
  }

  getById(id: string): Employee | null {
    const employees = this.getAll();
    return employees.find(e => e.id === id) || null;
  }
}

export const employeeStorage = new EmployeeStorage();

