import React, { useState } from 'react';
import { Project } from '../utils/types';
import { ExternalLink, Github, FolderOpen } from 'lucide-react';

const projectsData: Project[] = [
  {
    id: '1',
    title: 'Smart Traffic Management',
    category: 'AI/ML',
    description: 'A computer vision system to analyze traffic flow and optimize signal timings in real-time.',
    techStack: ['Python', 'OpenCV', 'YOLOv8'],
    image: 'https://picsum.photos/500/300?random=10'
  },
  {
    id: '2',
    title: 'Enterprise E-Learning Platform',
    category: 'Web',
    description: 'A scalable SaaS platform with video streaming, real-time analytics, and automated assessments for educational institutions.',
    techStack: ['React', 'Node.js', 'AWS S3', 'PostgreSQL', 'Redis'],
    image: 'https://picsum.photos/500/300?random=11'
  },
  {
    id: '3',
    title: 'Low Power ALU Design',
    category: 'VLSI',
    description: 'Designed a 16-bit ALU with optimized power consumption using Verilog.',
    techStack: ['Verilog', 'Xilinx Vivado'],
    image: 'https://picsum.photos/500/300?random=12'
  },
  {
    id: '4',
    title: 'Crop Disease Detection',
    category: 'AI/ML',
    description: 'Mobile-ready model to detect plant diseases from leaf images for farmers.',
    techStack: ['TensorFlow Lite', 'Android'],
    image: 'https://picsum.photos/500/300?random=13'
  },
  {
    id: '5',
    title: 'Smart Surveillance System',
    category: 'IoT',
    description: 'IoT based intrusion detection system with automated alerts.',
    techStack: ['Raspberry Pi', 'Python', 'Sensors'],
    image: 'https://picsum.photos/500/300?random=14'
  },
  {
    id: '6',
    title: 'Cloud-Based Analytics Dashboard',
    category: 'Data Science',
    description: 'Real-time business intelligence platform with interactive dashboards and automated reporting for enterprise clients.',
    techStack: ['Python', 'React', 'PostgreSQL', 'AWS', 'Docker'],
    image: 'https://picsum.photos/500/300?random=15'
  },
  {
    id: '7',
    title: 'Microservices E-Commerce Platform',
    category: 'Web',
    description: 'High-performance e-commerce solution built with microservices architecture, supporting millions of transactions.',
    techStack: ['Node.js', 'React', 'MongoDB', 'Kubernetes', 'Redis'],
    image: 'https://picsum.photos/500/300?random=16'
  },
  {
    id: '8',
    title: 'Automated Workflow Management System',
    category: 'Web',
    description: 'Enterprise workflow automation platform that streamlines business processes and reduces operational overhead.',
    techStack: ['Django', 'React', 'Celery', 'PostgreSQL', 'RabbitMQ'],
    image: 'https://picsum.photos/500/300?random=17'
  }
];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  
  const categories = ['All', 'AI/ML', 'Web', 'Data Science', 'IoT', 'VLSI'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Software Solutions & Projects</h1>
          <p className="text-gray-600">Delivering innovative software solutions across AI/ML, Web Development, Cloud Infrastructure, and Enterprise Applications.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === cat 
                  ? 'bg-imtda-primary text-white shadow-lg transform scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden h-48">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-imtda-primary transition-colors">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded border">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                   <button className="flex items-center text-sm text-imtda-primary font-semibold hover:underline">
                     View Details <FolderOpen size={16} className="ml-1" />
                   </button>
                   <div className="flex gap-3">
                     <a href="#" className="text-gray-400 hover:text-gray-900"><Github size={18} /></a>
                     <a href="#" className="text-gray-400 hover:text-gray-900"><ExternalLink size={18} /></a>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p>No projects found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
