import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, Clock, X, Upload } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import { useJobApplication } from '@/hooks/useJobApplication';
import { useAuth } from '@/hooks/useAuth';
import { Job } from '@/types/job.types';
import { Alert } from '@/components/ui';
import styles from './CareersPage.module.css';

export const CareersPage: React.FC = () => {
  const { jobs } = useJobs();
  const { applyForJob } = useJobApplication();
  const { user: currentUser } = useAuth();
  
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const displayJobs = jobs || [];

  // Prefill form if user is logged in
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone || ''
      }));
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setSubmitted(false);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setSubmitted(false);
    setFormData({
      name: currentUser ? currentUser.name : '',
      email: currentUser ? currentUser.email : '',
      phone: currentUser ? currentUser.phone || '' : '',
      resume: null,
      coverLetter: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Validate resume file
    if (!formData.resume) {
      alert('Please upload your resume.');
      return;
    }
    
    const newApplication = {
      id: Date.now().toString(),
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      coverLetter: formData.coverLetter,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      status: 'Pending' as const,
      userId: currentUser?.id
    };

    applyForJob(newApplication, formData.resume);
    setSubmitted(true);
    
    // Reset after delay
    setTimeout(() => {
      handleCloseModal();
    }, 3000);
  };

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
              <button 
                className={styles.applyButton}
                onClick={() => handleApplyClick(job)}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className={styles.footerMessage}>
          <p>Don't see a matching role? Send your resume to <a href="mailto:careers@imtdainfotech.com" className={styles.footerLink}>careers@imtdainfotech.com</a></p>
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Apply for {selectedJob.title}</h2>
              <button className={styles.modalCloseButton} onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>

            {submitted ? (
              <Alert
                type="success"
                title="Application Received!"
                message={currentUser ? "Check your dashboard for status updates." : "Our team will review your profile and get back to you shortly."}
                className={styles.successMessage}
              />
            ) : (
              <form onSubmit={handleSubmit} className={styles.applicationForm}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required 
                      className={styles.input}
                      placeholder="John Doe"
                      onChange={handleInputChange}
                      value={formData.name}
                      readOnly={!!currentUser}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required 
                      className={styles.input}
                      placeholder="john@example.com"
                      onChange={handleInputChange}
                      value={formData.email}
                      readOnly={!!currentUser}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required 
                    className={styles.input}
                    placeholder="+1 (555) 123-4567"
                    onChange={handleInputChange}
                    value={formData.phone}
                    readOnly={!!currentUser}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Resume/CV</label>
                  <div className={styles.fileUpload}>
                    <label htmlFor="resume-upload" className={styles.fileUploadLabel}>
                      <div className={styles.fileUploadContent}>
                        <Upload className={styles.fileUploadIcon} />
                        <span className={styles.fileUploadText}>
                          {formData.resume ? formData.resume.name : 'Click to upload or drag and drop'}
                        </span>
                        <span className={styles.fileUploadHint}>PDF, DOC, DOCX (Max 5MB)</span>
                      </div>
                      <input
                        type="file"
                        id="resume-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                      />
                    </label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Cover Letter (Optional)</label>
                  <textarea 
                    name="coverLetter"
                    rows={5}
                    className={styles.textarea}
                    placeholder="Tell us why you're interested in this position..."
                    onChange={handleInputChange}
                    value={formData.coverLetter}
                  />
                </div>

                <div className={styles.formActions}>
                  <button type="button" onClick={handleCloseModal} className={styles.cancelButton}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

