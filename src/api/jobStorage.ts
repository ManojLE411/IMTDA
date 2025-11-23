import { Job } from '@/types/job.types';
import { STORAGE_KEYS } from '@/constants';
import { BaseStorage } from './BaseStorage';

class JobStorage extends BaseStorage<Job> {
  constructor() {
    super(STORAGE_KEYS.JOBS);
  }
}

export const jobStorage = new JobStorage();

