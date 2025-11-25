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
  internshipId?: string; // ID of the internship track
  name: string;
  email: string;
  phone: string;
  course: string;
  resumeName?: string; // Storing filename to simulate upload
  resumePath?: string; // Path to uploaded resume file
  message: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  studentId?: string;
}

