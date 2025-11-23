import { TrainingProgram } from '@/types/training.types';
import { STORAGE_KEYS } from '@/constants';
import { BaseStorage } from './BaseStorage';

class TrainingStorage extends BaseStorage<TrainingProgram> {
  constructor() {
    super(STORAGE_KEYS.TRAINING);
  }
}

export const trainingStorage = new TrainingStorage();

