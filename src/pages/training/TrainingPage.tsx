import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrainingPrograms } from '@/hooks/useTrainingPrograms';
import { BookOpen, Briefcase, Award } from 'lucide-react';
import { Loading, EmptyState, SectionHeader } from '@/components/ui';
import styles from './TrainingPage.module.css';

export const TrainingPage: React.FC = () => {
  const navigate = useNavigate();
  const { programs, loading } = useTrainingPrograms();

  // Fallback training programs if none exist in storage
  const fallbackPrograms = [
    {
      id: '1',
      title: 'AI & Machine Learning Bootcamp',
      category: 'Institutional' as const,
      description: 'Comprehensive training in artificial intelligence, deep learning, and data science for students and professionals.',
      features: [
        'Python Programming Fundamentals',
        'Neural Networks & Deep Learning',
        'Computer Vision & NLP',
        'Real-world Project Portfolio',
        'Industry Mentorship'
      ]
    },
    {
      id: '2',
      title: 'Full Stack Web Development',
      category: 'Corporate' as const,
      description: 'Enterprise-grade web development training covering modern frameworks and best practices.',
      features: [
        'React & Node.js Mastery',
        'Database Design & Optimization',
        'API Development & Integration',
        'DevOps & Deployment',
        'Code Review & Best Practices'
      ]
    },
    {
      id: '3',
      title: 'Cloud Computing & DevOps',
      category: 'Corporate' as const,
      description: 'Hands-on training in cloud platforms, containerization, and CI/CD pipelines.',
      features: [
        'AWS/Azure/GCP Fundamentals',
        'Docker & Kubernetes',
        'Infrastructure as Code',
        'CI/CD Pipeline Setup',
        'Monitoring & Scaling'
      ]
    },
    {
      id: '4',
      title: 'VLSI Design & Verification',
      category: 'Institutional' as const,
      description: 'Advanced semiconductor design training for engineering students and professionals.',
      features: [
        'RTL Design with Verilog',
        'SystemVerilog & UVM',
        'FPGA Implementation',
        'ASIC Design Flow',
        'Industry Tools & Methodologies'
      ]
    }
  ];

  const displayPrograms = programs.length > 0 ? programs : fallbackPrograms;

  const handleInquire = (programTitle: string, isInstitutional: boolean) => {
    const subject = isInstitutional 
      ? 'Institutional Training Inquiry' 
      : 'Corporate Training Partnership';
    
    const message = isInstitutional
      ? `I am interested in learning more about the "${programTitle}" program for my institution. Please provide more details about the curriculum, duration, and partnership opportunities.`
      : `I am interested in partnering with IMTDA Infotech for the "${programTitle}" training program for my organization. Please provide more information about corporate training solutions and partnership options.`;

    navigate('/contact', {
      state: {
        subject,
        programTitle,
        inquiryType: isInstitutional ? 'institutional' : 'corporate',
        message
      }
    });
  };

  const handleGeneralTrainingInquiry = () => {
    navigate('/contact', {
      state: {
        subject: 'Training Program Inquiry',
        inquiryType: 'general',
        message: 'I would like to learn more about your professional training programs. Please provide information about available programs, schedules, and enrollment options.'
      }
    });
  };

  if (loading) {
    return <Loading text="Loading..." fullScreen />;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <SectionHeader
          title="Professional Training Programs"
          subtitle="Upskilling programs and technical training to build expertise in cutting-edge technologies."
          className={styles.header}
        />

        {/* Service Cards */}
        <div className={styles.programsGrid}>
          {displayPrograms.map(program => {
            const isInstitutional = program.category === 'Institutional';
            return (
              <div key={program.id} className={`${styles.programCard} ${isInstitutional ? styles.programCardInstitutional : styles.programCardCorporate}`}>
                <div className={`${styles.programIcon} ${isInstitutional ? styles.programIconInstitutional : styles.programIconCorporate}`}>
                  {isInstitutional ? <BookOpen size={28} /> : <Briefcase size={28} />}
                </div>
                <h2 className={styles.programTitle}>{program.title}</h2>
                <p className={styles.programDescription}>{program.description}</p>
                <ul className={styles.programFeatures}>
                  {program.features.map((feature, idx) => (
                    <li key={idx} className={styles.programFeature}>
                      <div className={`${styles.programFeatureDot} ${isInstitutional ? styles.programFeatureDotInstitutional : styles.programFeatureDotCorporate}`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleInquire(program.title, isInstitutional)}
                  className={`${styles.programButton} ${isInstitutional ? styles.programButtonInstitutional : styles.programButtonCorporate}`}
                >
                  {isInstitutional ? 'Inquire for College' : 'Partner With Us'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={styles.ctaSection}>
           <div className={styles.ctaPattern}></div>
           <div className={styles.ctaContent}>
             <Award className={styles.ctaIcon} />
             <h2 className={styles.ctaTitle}>Ready to Upskill Your Team?</h2>
             <p className={styles.ctaDescription}>Enhance your team's capabilities with our professional training programs in AI, software development, cloud technologies, and more.</p>
             <button 
               onClick={handleGeneralTrainingInquiry}
               className={styles.ctaButton}
             >
               Enquire About Training
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

