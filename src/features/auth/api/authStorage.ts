import { Student } from '../types/auth.types';
import { STORAGE_KEYS } from '@/shared/constants';
import { StorageService } from '@/shared/utils';

class AuthStorage {
  private key = STORAGE_KEYS.STUDENTS;

  getAll(): Student[] {
    return StorageService.get<Student[]>(this.key) || [];
  }

  save(student: Student): void {
    const students = this.getAll();
    const exists = students.some(s => s.id === student.id);
    const updated = exists
      ? students.map(s => s.id === student.id ? student : s)
      : [student, ...students];
    StorageService.set(this.key, updated);
  }

  findByEmail(email: string): Student | null {
    const students = this.getAll();
    return students.find(s => s.email === email) || null;
  }

  findByEmailAndPassword(email: string, password: string): Student | null {
    const students = this.getAll();
    return students.find(s => s.email === email && s.password === password) || null;
  }

  findById(id: string): Student | null {
    const students = this.getAll();
    return students.find(s => s.id === id) || null;
  }
}

export const authStorage = new AuthStorage();

