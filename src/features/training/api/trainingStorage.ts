import { TrainingProgram } from '../types/training.types';
import { STORAGE_KEYS } from '@/shared/constants';
import { StorageService } from '@/shared/utils';

class TrainingStorage {
  private key = STORAGE_KEYS.TRAINING;

  getAll(): TrainingProgram[] {
    return StorageService.get<TrainingProgram[]>(this.key) || [];
  }

  save(program: TrainingProgram): void {
    const programs = this.getAll();
    const exists = programs.some(p => p.id === program.id);
    const updated = exists
      ? programs.map(p => p.id === program.id ? program : p)
      : [program, ...programs];
    StorageService.set(this.key, updated);
  }

  delete(id: string): void {
    const programs = this.getAll();
    const filtered = programs.filter(p => p.id !== id);
    StorageService.set(this.key, filtered);
  }

  getById(id: string): TrainingProgram | null {
    const programs = this.getAll();
    return programs.find(p => p.id === id) || null;
  }
}

export const trainingStorage = new TrainingStorage();

