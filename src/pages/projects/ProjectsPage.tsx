import React, { useState } from 'react';
import { ExternalLink, Github, FolderOpen, ArrowLeft, Code, Rocket, Send, Calendar } from 'lucide-react';
import { Project } from '@/types/common.types';
import { Tabs, EmptyState, SectionHeader, Badge, Loading } from '@/components/ui';
import { Page } from '@/constants';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
import styles from './ProjectsPage.module.css';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const categories = ['All', 'AI/ML', 'Web', 'Data Science', 'IoT', 'VLSI'];
  
  const projectsData = projects || [];

  // Helper function to get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI/ML':
        return <Code size={24} />;
      case 'Web':
        return <Rocket size={24} />;
      case 'VLSI':
        return <Code size={24} />;
      case 'IoT':
        return <Rocket size={24} />;
      case 'Data Science':
        return <Code size={24} />;
      default:
        return <FolderOpen size={24} />;
    }
  };

  // Helper function to handle navigation
  const handleNavigate = (page: Page) => {
    const route = `/${page}`;
    if (navigate) {
      navigate(route);
    }
  };

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  if (loading) {
    return <Loading text="Loading projects..." fullScreen />;
  }

  // Scroll to top when viewing project
  const handleViewProject = (project: Project) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedProject(project);
  };

  const handleBackToList = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedProject(null);
  };

  // If a project is selected, show detail view
  if (selectedProject) {
    return (
      <div className={styles.projectDetail}>
        <div className={styles.projectDetailContent}>
          <button 
            onClick={handleBackToList}
            className={styles.backButton}
          >
            <ArrowLeft size={20} className={styles.backIcon} /> Back to Projects
          </button>

          <div className={styles.projectHeader}>
            <span className={styles.projectCategoryBadge}>
              {selectedProject.category}
            </span>
            <div className={styles.projectTitleSection}>
              <div className={styles.projectIconContainer}>
                {getCategoryIcon(selectedProject.category)}
              </div>
              <h1 className={styles.projectDetailTitle}>
                {selectedProject.title}
              </h1>
            </div>
            <p className={styles.projectDetailDescription}>
              {selectedProject.description}
            </p>
            <div className={styles.projectMeta}>
              <span className={styles.projectMetaItem}>
                <Code size={16} /> {selectedProject.techStack.length} Technologies
              </span>
              <span className={styles.projectMetaItem}>
                <FolderOpen size={16} /> {selectedProject.category} Project
              </span>
            </div>
          </div>

          <div className={styles.projectImage}>
            <img 
              src={selectedProject.image} 
              alt={selectedProject.title} 
            />
          </div>

          <div className={styles.projectContent}>
            <h2 className={styles.projectTechStackTitle}>Technology Stack & Tools</h2>
            <p className={styles.projectTechStackIntro}>
              This project leverages the following technologies and tools to deliver innovative solutions:
            </p>
            <div className={styles.projectTechStackGrid}>
              {selectedProject.techStack.map((tech, idx) => (
                <div key={idx} className={styles.techStackCard}>
                  <div className={styles.techStackIcon}>
                    <Code size={18} />
                  </div>
                  <span className={styles.techStackName}>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.projectCta}>
            <h3 className={styles.projectCtaTitle}>Interested in This Project?</h3>
            <p className={styles.projectCtaDescription}>
              Let's discuss how we can help bring your vision to life with similar innovative solutions.
            </p>
            <div className={styles.projectCtaButtons}>
              <button
                onClick={() => handleNavigate(Page.CONTACT)}
                className={styles.projectCtaPrimary}
              >
                <Send size={16} /> Get in Touch
              </button>
              <button
                onClick={handleBackToList}
                className={styles.projectCtaSecondary}
              >
                View All Projects
              </button>
            </div>
            <div className={styles.projectLinks}>
              <a href="#" className={styles.projectLink} title="View on GitHub">
                <Github size={18} /> GitHub
              </a>
              <a href="#" className={styles.projectLink} title="View Live Demo">
                <ExternalLink size={18} /> Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                   <button 
                     onClick={() => handleViewProject(project)}
                     className={styles.viewDetailsButton}
                   >
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

