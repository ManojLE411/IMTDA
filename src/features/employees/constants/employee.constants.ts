import { Employee } from '../types/employee.types';

export const DEFAULT_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Manoj Sharma',
    role: 'Chief Technology Officer',
    summary: 'Full-stack architect pairing cloud economics with product velocity.',
    skills: ['Full Stack', 'Cloud', 'DevOps'],
    image: 'https://picsum.photos/400/300?random=2',
  },
  {
    id: '2',
    name: 'Hemanth Reddy',
    role: 'Head of AI & Machine Learning',
    summary: 'Leading NLP, computer vision, and automation initiatives.',
    skills: ['AI/ML', 'NLP', 'Deep Learning'],
    image: 'https://picsum.photos/400/300?random=3',
  },
  {
    id: '3',
    name: 'Kiran Patel',
    role: 'Product Manager',
    summary: 'Aligns product stories with market needs and UX research.',
    skills: ['Product Strategy', 'UX/UI', 'Agile'],
    image: 'https://picsum.photos/400/300?random=4',
  },
  {
    id: '4',
    name: 'Aditya Sharma',
    role: 'Lead Developer',
    summary: 'Builds scalable React + Node.js platforms with mature pipelines.',
    skills: ['React', 'Node.js', 'TypeScript'],
    image: 'https://picsum.photos/400/300?random=5',
  },
];

