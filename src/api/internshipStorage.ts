import { InternshipTrack, InternshipApplication } from '@/types/internship.types';
import { STORAGE_KEYS } from '@/constants';
import { BaseStorage } from './BaseStorage';
import { StorageService } from '@/services/storage';

class InternshipStorage extends BaseStorage<InternshipTrack> {
  private applicationKey = STORAGE_KEYS.APPLICATIONS;

  constructor() {
    super(STORAGE_KEYS.INTERNSHIPS);
  }

  // Applications
  getAllApplications(): InternshipApplication[] {
    return StorageService.get<InternshipApplication[]>(this.applicationKey) || [];
  }

  saveApplication(application: InternshipApplication): void {
    const applications = this.getAllApplications();
    const updated = [application, ...applications];
    StorageService.set(this.applicationKey, updated);
  }

  deleteApplication(id: string): void {
    const applications = this.getAllApplications();
    const filtered = applications.filter(a => a.id !== id);
    StorageService.set(this.applicationKey, filtered);
  }
}

export const internshipStorage = new InternshipStorage();

