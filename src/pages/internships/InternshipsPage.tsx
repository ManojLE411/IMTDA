import React, { useState, useEffect } from 'react';
import { useInternships } from '@/hooks/useInternships';
import { useInternshipApplication } from '@/hooks/useInternshipApplication';
import { useAuth } from '@/hooks/useAuth';
import { Clock, MapPin, Upload } from 'lucide-react';
import { Loading, Alert, SectionHeader } from '@/components/ui';
import styles from './InternshipsPage.module.css';

export const InternshipsPage: React.FC = () => {
  const { tracks, loading } = useInternships();
  const { applyForInternship } = useInternshipApplication();
  const { user: currentUser } = useAuth();

  // Fallback/preset tracks if none exist in storage
  const fallbackTracks = [
    {
      id: '1',
      title: 'Full Stack Web Development',
      description: 'Build scalable web applications from scratch using the MERN stack.',
      duration: '2 Months',
      mode: 'Hybrid' as const,
      skills: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80'
    },
    {
      id: '2',
      title: 'AI & Machine Learning',
      description: 'Dive deep into neural networks, predictive modeling, and data analysis.',
      duration: '2 Months',
      mode: 'Online' as const,
      skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-Learn'],
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&q=80'
    },
    {
      id: '3',
      title: 'VLSI Design & Verification',
      description: 'Master the art of chip design and verification methodologies.',
      duration: '3 Months',
      mode: 'Offline' as const,
      skills: ['Verilog', 'SystemVerilog', 'UVM', 'RTL Design'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80'
    },
    {
      id: '4',
      title: 'AutoCAD & Mechanical Design',
      description: 'Industrial standard training for mechanical design and simulations.',
      duration: '1 Month',
      mode: 'Offline' as const,
      skills: ['AutoCAD', 'CATIA', 'ANSYS', '3D Modeling'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80'
    },
  ];

  const displayTracks = tracks.length > 0 ? tracks : fallbackTracks;

  const [selectedTrack, setSelectedTrack] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'course') setSelectedTrack(value);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newApplication = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      course: selectedTrack,
      resumeName: formData.resume ? formData.resume.name : 'No file uploaded',
      message: formData.message,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      status: 'Pending' as const,
      studentId: currentUser?.id
    };

    applyForInternship(newApplication);
    setSubmitted(true);
    
    // Reset after delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData(prev => ({
        ...prev,
        resume: null,
        message: '',
        name: currentUser ? currentUser.name : '',
        email: currentUser ? currentUser.email : '',
        phone: currentUser ? currentUser.phone || '' : ''
      }));
      setSelectedTrack('');
    }, 5000);
  };

  if (loading) {
    return <Loading text="Loading..." fullScreen />;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        
        {/* Header */}
        <SectionHeader
          title="Industry-Ready Internships"
          subtitle="Learn by doing. Join our rigorous training programs and work on live projects."
          className={styles.header}
        />

        {/* Tracks Grid */}
        <div className={styles.tracksGrid}>
          {displayTracks.map(track => (
            <div key={track.id} className={styles.trackCard}>
              <div className={styles.trackImageContainer}>
                 <img src={track.image || `https://picsum.photos/400/200?random=${track.id}`} alt={track.title} className={styles.trackImage} />
                 <div className={styles.trackImageOverlay}></div>
              </div>
              <div className={styles.trackContent}>
                <div>
                  <div className={styles.trackHeader}>
                     <h3 className={styles.trackTitle}>{track.title}</h3>
                  </div>
                  <p className={styles.trackDescription}>{track.description}</p>
                  <div className={styles.trackSkills}>
                    {track.skills.map(skill => (
                      <span key={skill} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.trackMeta}>
                  <span className={styles.trackMetaItem}><Clock size={14} /> {track.duration}</span>
                  <span className={styles.trackMetaItem}><MapPin size={14} /> {track.mode}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div id="apply" className={styles.applicationForm}>
          <h2 className={styles.formTitle}>Apply Now</h2>
          
          {submitted ? (
            <Alert
              type="success"
              title="Application Received!"
              message={currentUser ? "Check your dashboard for status updates." : "Our team will review your profile and get back to you shortly."}
              className={styles.successMessage}
            />
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
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

              <div className={styles.formGrid}>
                 <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required 
                    className={styles.input}
                    placeholder="+91 98765 43210"
                    onChange={handleInputChange}
                    value={formData.phone}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Interested Track</label>
                  <select 
                    name="course"
                    value={selectedTrack}
                    onChange={handleInputChange}
                    className={styles.select}
                    required
                  >
                    <option value="">Select a Program</option>
                    {displayTracks.map(t => <option key={t.id} value={t.title}>{t.title}</option>)}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                 <label className={styles.label}>Upload Resume (PDF)</label>
                 <div className={styles.fileUpload}>
                    <div className={styles.fileUploadContent}>
                      <Upload className={styles.fileUploadIcon} />
                      <div className={styles.fileUploadText}>
                        <label htmlFor="file-upload" className={styles.fileUploadLabel}>
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className={styles.fileUploadInput} accept=".pdf" onChange={handleFileChange} />
                        </label>
                        <p className={styles.fileUploadHint}>or drag and drop</p>
                      </div>
                      <p className={styles.fileUploadHint}>PDF up to 5MB</p>
                      {formData.resume && <p className={styles.fileUploadSelected}>Selected: {formData.resume.name}</p>}
                    </div>
                  </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Message / Queries</label>
                <textarea 
                  name="message"
                  rows={3}
                  className={styles.textarea}
                  placeholder="Why do you want to join this program?"
                  onChange={handleInputChange}
                  value={formData.message}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

