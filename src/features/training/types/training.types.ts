export interface TrainingProgram {
  id: string;
  title: string;
  category: 'Institutional' | 'Corporate' | 'Other';
  description: string; // optional tagline or sub-heading
  features: string[];
  icon?: string; // We can store icon name string or ignore for custom icons, generic for now
}

