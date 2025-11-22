import { TrainingProgram } from '../types/training.types';

export const DEFAULT_TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: '1',
    title: 'Institutional Training',
    category: 'Institutional',
    description: 'Comprehensive training packages for colleges and universities.',
    features: ['College MoU Partnerships', 'Faculty Development Programs (FDP)', 'Guest Lectures & Workshops', 'Lab Setup Assistance']
  },
  {
    id: '2',
    title: 'Corporate Solutions',
    category: 'Corporate',
    description: 'Advanced upskilling and consultancy for businesses.',
    features: ['Employee Upskilling (AI/ML/DevOps)', 'Custom Software Development', 'Technical Consultancy', 'Workflow Automation']
  }
];

