export interface InternshipTrack {
  id: string;
  title: string;
  duration: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  skills: string[];
  description: string;
  image: string;
  // Detailed information for the detail page
  overview?: string;
  programFlow?: string[];
  whatYoullLearn?: string[];
  programStructure?: string[];
  whoShouldApply?: string[];
  careerOutcomes?: string[];
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

