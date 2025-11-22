export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string; // In a real app, this should be hashed
  enrolledPrograms: string[];
}

