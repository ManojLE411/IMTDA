
export enum Page {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  PROJECTS = 'projects',
  INTERNSHIPS = 'internships',
  TRAINING = 'training',
  CAREERS = 'careers',
  CONTACT = 'contact',
  BLOG = 'blog',
  ADMIN = 'admin',
  LOGIN = 'login',
  REGISTER = 'register',
  STUDENT_DASHBOARD = 'student_dashboard'
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string; // In a real app, this should be hashed
  enrolledPrograms: string[];
}

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

export interface TrainingProgram {
  id: string;
  title: string;
  category: 'Institutional' | 'Corporate' | 'Other';
  description: string; // optional tagline or sub-heading
  features: string[];
  icon?: string; // We can store icon name string or ignore for custom icons, generic for now
}

export interface Project {
  id: string;
  title: string;
  category: 'AI/ML' | 'Web' | 'VLSI' | 'IoT' | 'Data Science';
  description: string;
  techStack: string[];
  image: string;
}

export interface JobListing {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  location: 'Remote' | 'On-site' | 'Hybrid';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}
