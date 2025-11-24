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

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  resumeName: string; // Storing filename to simulate upload
  coverLetter?: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  userId?: string;
}

