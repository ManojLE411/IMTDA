import React from 'react';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import styles from './CareersPage.module.css';

export const CareersPage: React.FC = () => {
  const { jobs } = useJobs();

  // Fallback jobs if none exist in storage
  const fallbackJobs = [
    { id: '1', title: 'AI Research Engineer', department: 'R&D', type: 'Full-time' as const, location: 'Remote' as const },
    { id: '2', title: 'Frontend Developer (React)', department: 'Engineering', type: 'Full-time' as const, location: 'On-site' as const },
    { id: '3', title: 'Technical Trainer (VLSI)', department: 'Education', type: 'Contract' as const, location: 'Hybrid' as const },
    { id: '4', title: 'Business Development Executive', department: 'Sales', type: 'Full-time' as const, location: 'On-site' as const },
  ];

  const displayJobs = jobs.length > 0 ? jobs : fallbackJobs;

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>Careers</p>
          <h1 className={styles.heroTitle}>Join Our Team</h1>
          <p className={styles.heroDescription}>Be part of a dynamic team shaping the future of EdTech and AI.</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Why Work With Us</h2>
        </div>

        {/* Culture Section */}
        <div className={styles.cultureGrid}>
           <div className={styles.cultureCard}>
             <div className={styles.cultureIcon}>🚀</div>
             <h3 className={styles.cultureTitle}>Innovation First</h3>
             <p className={styles.cultureDescription}>We encourage out-of-the-box thinking and rapid prototyping.</p>
           </div>
           <div className={styles.cultureCard}>
             <div className={styles.cultureIcon}>🎓</div>
             <h3 className={styles.cultureTitle}>Continuous Learning</h3>
             <p className={styles.cultureDescription}>Access to premium courses and mentorship for every employee.</p>
           </div>
           <div className={styles.cultureCard}>
             <div className={styles.cultureIcon}>⚖️</div>
             <h3 className={styles.cultureTitle}>Work-Life Balance</h3>
             <p className={styles.cultureDescription}>Flexible working hours and hybrid work models.</p>
           </div>
        </div>

        <h2 className={styles.jobsTitle}>Open Positions</h2>
        <div className={styles.jobsList}>
          {displayJobs.map(job => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.jobInfo}>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <div className={styles.jobMeta}>
                   <span className={styles.jobMetaItem}><Briefcase size={14} /> {job.department}</span>
                   <span className={styles.jobMetaItem}><Clock size={14} /> {job.type}</span>
                   <span className={styles.jobMetaItem}><MapPin size={14} /> {job.location}</span>
                </div>
              </div>
              <button className={styles.applyButton}>
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className={styles.footerMessage}>
          <p>Don't see a matching role? Send your resume to <a href="mailto:careers@imtdainfotech.com" className={styles.footerLink}>careers@imtdainfotech.com</a></p>
        </div>
      </div>
    </div>
  );
};

