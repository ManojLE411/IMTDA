import { InternshipTrack } from '../types/internship.types';

export const DEFAULT_INTERNSHIP_TRACKS: InternshipTrack[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    duration: '2 Months',
    mode: 'Hybrid',
    skills: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    description: 'Build scalable web applications from scratch using the MERN stack.',
    image: 'https://picsum.photos/400/200?random=1'
  },
  {
    id: '2',
    title: 'AI & Machine Learning',
    duration: '2 Months',
    mode: 'Online',
    skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-Learn'],
    description: 'Dive deep into neural networks, predictive modeling, and data analysis.',
    image: 'https://picsum.photos/400/200?random=2'
  },
  {
    id: '3',
    title: 'VLSI Design & Verification',
    duration: '3 Months',
    mode: 'Offline',
    skills: ['Verilog', 'SystemVerilog', 'UVM', 'RTL Design'],
    description: 'Master the art of chip design and verification methodologies.',
    image: 'https://picsum.photos/400/200?random=3'
  },
  {
    id: '4',
    title: 'AutoCAD & Mechanical Design',
    duration: '1 Month',
    mode: 'Offline',
    skills: ['AutoCAD', 'CATIA', 'ANSYS', '3D Modeling'],
    description: 'Industrial standard training for mechanical design and simulations.',
    image: 'https://picsum.photos/400/200?random=4'
  }
];

