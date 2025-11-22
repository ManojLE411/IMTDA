import { InternshipTrack, InternshipApplication } from '../types/internship.types';
import { STORAGE_KEYS } from '@/shared/constants';
import { StorageService } from '@/shared/utils';

class InternshipStorage {
  private key = STORAGE_KEYS.INTERNSHIPS;
  private applicationKey = STORAGE_KEYS.APPLICATIONS;

  getAll(): InternshipTrack[] {
    return StorageService.get<InternshipTrack[]>(this.key) || [];
  }

  save(track: InternshipTrack): void {
    const tracks = this.getAll();
    const exists = tracks.some(t => t.id === track.id);
    const updated = exists
      ? tracks.map(t => t.id === track.id ? track : t)
      : [track, ...tracks];
    StorageService.set(this.key, updated);
  }

  delete(id: string): void {
    const tracks = this.getAll();
    const filtered = tracks.filter(t => t.id !== id);
    StorageService.set(this.key, filtered);
  }

  getById(id: string): InternshipTrack | null {
    const tracks = this.getAll();
    return tracks.find(t => t.id === id) || null;
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

