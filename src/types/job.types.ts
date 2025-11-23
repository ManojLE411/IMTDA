export type JobType = 'Full-time' | 'Part-time' | 'Contract';
export type JobLocation = 'Remote' | 'On-site' | 'Hybrid';

export interface Job {
  id: string;
  title: string;
  department: string;
  type: JobType;
  location: JobLocation;
  description?: string; // Optional job description
}

