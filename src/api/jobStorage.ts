import { Job, JobApplication } from '@/types/job.types';
import { STORAGE_KEYS } from '@/constants';
import { BaseStorage } from './BaseStorage';
import { StorageService } from '@/services/storage';

class JobStorage extends BaseStorage<Job> {
  private applicationKey = STORAGE_KEYS.JOB_APPLICATIONS;

  constructor() {
    super(STORAGE_KEYS.JOBS);
  }

  // Applications
  getAllApplications(): JobApplication[] {
    return StorageService.get<JobApplication[]>(this.applicationKey) || [];
  }

  saveApplication(application: JobApplication): void {
    const applications = this.getAllApplications();
    const updated = [application, ...applications];
    StorageService.set(this.applicationKey, updated);
  }

  deleteApplication(id: string): void {
    const applications = this.getAllApplications();
    const filtered = applications.filter(a => a.id !== id);
    StorageService.set(this.applicationKey, filtered);
  }

  updateApplicationStatus(id: string, status: JobApplication['status']): void {
    const applications = this.getAllApplications();
    const updated = applications.map(app =>
      app.id === id ? { ...app, status } : app
    );
    StorageService.set(this.applicationKey, updated);
  }
}

export const jobStorage = new JobStorage();

