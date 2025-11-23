import React, { useState } from 'react';
import { ExternalLink, Github, FolderOpen } from 'lucide-react';
import { Project } from '@/types/common.types';
import { Tabs, EmptyState, SectionHeader, Badge } from '@/components/ui';
import styles from './ProjectsPage.module.css';

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

export const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  
  const categories = ['All', 'AI/ML', 'Web', 'Data Science', 'IoT', 'VLSI'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <SectionHeader
          title="Our Software Solutions & Projects"
          subtitle="Delivering innovative software solutions across AI/ML, Web Development, Cloud Infrastructure, and Enterprise Applications."
          className={styles.header}
        />

        {/* Filter Tabs */}
        <Tabs
          tabs={categories.map(cat => ({ id: cat, label: cat }))}
          activeTab={filter}
          onTabChange={setFilter}
          variant="pills"
          className={styles.filterTabs}
        />

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map(project => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectImageContainer}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className={styles.projectImage}
                />
                <Badge variant="primary" className={styles.projectCategory}>
                  {project.category}
                </Badge>
              </div>
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                
                <div className={styles.projectTechStack}>
                  {project.techStack.map(tech => (
                    <Badge key={tech} variant="default" size="sm" className={styles.techTag}>
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className={styles.projectFooter}>
                   <button className={styles.viewDetailsButton}>
                     View Details <FolderOpen className={styles.viewDetailsIcon} />
                   </button>
                   <div className={styles.projectLinks}>
                     <a href="#" className={styles.projectLink}><Github size={18} /></a>
                     <a href="#" className={styles.projectLink}><ExternalLink size={18} /></a>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <EmptyState
            type="empty"
            message="No projects found in this category yet."
            className={styles.emptyState}
          />
        )}
      </div>
    </div>
  );
};

