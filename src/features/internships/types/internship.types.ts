export interface InternshipTrack {
  id: string;
  title: string;
  duration: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  skills: string[];
  description: string;
  image: string;
}

export interface InternshipApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  resumeName: string; // Storing filename to simulate upload
  message: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  studentId?: string;
}

