import React, { useState, useEffect } from 'react';
import { useInternships } from '@/hooks/useInternships';
import { useInternshipApplication } from '@/hooks/useInternshipApplication';
import { useAuth } from '@/hooks/useAuth';
import { InternshipTrack } from '@/types/internship.types';
import { Clock, MapPin, Upload, ArrowLeft, ChevronRight, CheckCircle, Users, Target, Award } from 'lucide-react';
import { Loading, Alert, SectionHeader } from '@/components/ui';
import styles from './InternshipsPage.module.css';

// Helper function to generate detailed content for each track
const getTrackDetails = (track: InternshipTrack) => {
  // If track has saved detailed information, use it
  if (track.overview || track.programFlow || track.whatYoullLearn) {
    return {
      overview: track.overview || track.description + ' This comprehensive program provides hands-on training and real-world experience to help you excel in your chosen field.',
      programFlow: track.programFlow || [
        'Week 1-2: Foundation and fundamentals',
        'Week 3-4: Intermediate concepts and practical applications',
        'Week 5-6: Advanced topics and specialized training',
        'Week 7-8: Capstone project and portfolio development'
      ],
      whatYoullLearn: track.whatYoullLearn || track.skills.map(skill => `Master ${skill} and apply it in real-world projects`),
      programStructure: track.programStructure || [
        'Interactive live sessions',
        'Hands-on projects',
        'Mentorship and guidance',
        'Industry-relevant assignments',
        'Portfolio building',
        'Career support'
      ],
      whoShouldApply: track.whoShouldApply || [
        'Students and recent graduates',
        'Career switchers',
        'Professionals seeking skill enhancement',
        'Anyone passionate about learning'
      ],
      careerOutcomes: track.careerOutcomes || [
        'Industry-ready skills',
        'Portfolio of projects',
        'Career guidance',
        'Networking opportunities',
        'Job placement support'
      ]
    };
  }

  // Otherwise, use predefined details or generate fallback
  const detailsMap: Record<string, {
    overview: string;
    programFlow: string[];
    whatYoullLearn: string[];
    programStructure: string[];
    whoShouldApply: string[];
    careerOutcomes: string[];
  }> = {
    'Full Stack Web Development': {
      overview: 'This comprehensive internship program is designed to transform you into a full-stack web developer capable of building modern, scalable applications. You\'ll work with cutting-edge technologies including React for frontend development, Node.js for backend services, MongoDB for database management, and Tailwind CSS for responsive design. Through hands-on projects and real-world scenarios, you\'ll gain the practical experience needed to excel in today\'s competitive tech industry.',
      programFlow: [
        'Week 1-2: Foundation & Setup - Introduction to web development fundamentals, setting up development environment, Git version control, and HTML/CSS basics.',
        'Week 3-4: Frontend Development - Deep dive into React, component architecture, state management, hooks, and modern JavaScript (ES6+).',
        'Week 5-6: Backend Development - Building RESTful APIs with Node.js and Express, database design with MongoDB, authentication, and security best practices.',
        'Week 7-8: Full Stack Integration - Connecting frontend and backend, deployment strategies, testing, and building a complete capstone project.'
      ],
      whatYoullLearn: [
        'Build responsive and interactive user interfaces with React',
        'Create RESTful APIs and server-side applications with Node.js',
        'Design and implement database schemas with MongoDB',
        'Implement authentication and authorization systems',
        'Deploy applications to cloud platforms',
        'Write clean, maintainable, and scalable code',
        'Use version control and collaborative development workflows',
        'Apply best practices in software engineering'
      ],
      programStructure: [
        'Live coding sessions with industry experts',
        'Hands-on projects and assignments',
        'Code reviews and mentorship',
        'Weekly assessments and progress tracking',
        'Capstone project development',
        'Portfolio building and presentation'
      ],
      whoShouldApply: [
        'Computer Science students or graduates',
        'Career switchers looking to enter tech',
        'Self-taught developers seeking structured learning',
        'Anyone passionate about web development',
        'Individuals ready to commit 20+ hours per week'
      ],
      careerOutcomes: [
        'Full Stack Developer positions',
        'Frontend Developer roles',
        'Backend Developer opportunities',
        'Software Engineer positions',
        'Startup co-founder opportunities',
        'Freelance web development projects'
      ]
    },
    'AI & Machine Learning': {
      overview: 'Dive deep into the world of artificial intelligence and machine learning with this intensive program. You\'ll explore neural networks, predictive modeling, and data analysis using industry-standard tools like Python, TensorFlow, Pandas, and Scikit-Learn. This program combines theoretical knowledge with practical implementation, preparing you to solve real-world problems using AI and ML techniques.',
      programFlow: [
        'Week 1-2: Python Fundamentals & Data Science - Python programming, NumPy, Pandas, data manipulation, and visualization techniques.',
        'Week 3-4: Machine Learning Basics - Supervised and unsupervised learning, regression, classification, clustering algorithms, and model evaluation.',
        'Week 5-6: Deep Learning - Neural networks, TensorFlow/Keras, CNNs, RNNs, and transfer learning.',
        'Week 7-8: Advanced Topics & Projects - Natural Language Processing, computer vision, model deployment, and building end-to-end ML projects.'
      ],
      whatYoullLearn: [
        'Implement machine learning algorithms from scratch',
        'Build and train neural networks using TensorFlow',
        'Perform data analysis and visualization with Pandas',
        'Create predictive models for real-world problems',
        'Apply deep learning techniques to various domains',
        'Deploy ML models to production environments',
        'Understand model evaluation and optimization',
        'Work with large datasets and data preprocessing'
      ],
      programStructure: [
        'Theoretical lectures on ML concepts',
        'Hands-on coding labs and exercises',
        'Real-world dataset projects',
        'Model building and optimization workshops',
        'Industry case study analysis',
        'Final ML project presentation'
      ],
      whoShouldApply: [
        'Students with strong mathematics background',
        'Software developers interested in AI/ML',
        'Data analysts looking to advance their skills',
        'Researchers exploring AI applications',
        'Anyone curious about machine learning'
      ],
      careerOutcomes: [
        'Machine Learning Engineer roles',
        'Data Scientist positions',
        'AI Research positions',
        'ML Consultant opportunities',
        'Data Analyst roles',
        'AI Product Developer positions'
      ]
    },
    'VLSI Design & Verification': {
      overview: 'Master the art of chip design and verification methodologies in this comprehensive VLSI program. You\'ll learn to design digital circuits using Verilog and SystemVerilog, implement verification strategies with UVM (Universal Verification Methodology), and understand RTL (Register Transfer Level) design principles. This program provides hands-on experience with industry-standard EDA tools and prepares you for careers in semiconductor design.',
      programFlow: [
        'Month 1: Digital Design Fundamentals - Boolean algebra, combinational and sequential logic, Verilog HDL basics, and RTL coding practices.',
        'Month 2: Advanced RTL Design - Complex digital systems, state machines, memory interfaces, and design optimization techniques.',
        'Month 3: Verification & SystemVerilog - SystemVerilog language, UVM framework, testbench development, coverage analysis, and debugging methodologies.'
      ],
      whatYoullLearn: [
        'Design digital circuits using Verilog and SystemVerilog',
        'Implement RTL designs for ASICs and FPGAs',
        'Create comprehensive verification testbenches using UVM',
        'Apply verification methodologies and best practices',
        'Use industry-standard EDA tools (ModelSim, Vivado, etc.)',
        'Understand timing analysis and synthesis',
        'Debug and optimize digital designs',
        'Work with design constraints and optimization'
      ],
      programStructure: [
        'Theory sessions on VLSI concepts',
        'Hands-on lab exercises with EDA tools',
        'Design projects at increasing complexity',
        'Verification challenges and assignments',
        'Code reviews and design discussions',
        'Final project: Complete chip design and verification'
      ],
      whoShouldApply: [
        'Electronics/ECE engineering students',
        'Graduates interested in semiconductor industry',
        'Hardware engineers looking to specialize',
        'Anyone interested in chip design',
        'Individuals with digital logic background'
      ],
      careerOutcomes: [
        'VLSI Design Engineer positions',
        'Verification Engineer roles',
        'ASIC Design Engineer opportunities',
        'FPGA Engineer positions',
        'Hardware Design roles',
        'Semiconductor industry positions'
      ]
    },
    'AutoCAD & Mechanical Design': {
      overview: 'Gain industrial-standard training in mechanical design and simulations with this intensive program. You\'ll master AutoCAD for 2D drafting, CATIA for 3D modeling, ANSYS for finite element analysis, and advanced 3D modeling techniques. This program focuses on practical, industry-relevant skills that are directly applicable in manufacturing, automotive, aerospace, and engineering sectors.',
      programFlow: [
        'Week 1: AutoCAD Fundamentals - 2D drafting, dimensioning, layers, blocks, and technical drawing standards.',
        'Week 2: 3D Modeling with CATIA - Part design, assembly modeling, surface design, and engineering drawings.',
        'Week 3: Advanced CAD Techniques - Parametric modeling, design automation, sheet metal design, and rendering.',
        'Week 4: Simulation & Analysis - Finite Element Analysis with ANSYS, stress analysis, thermal analysis, and optimization.'
      ],
      whatYoullLearn: [
        'Create professional 2D technical drawings with AutoCAD',
        'Design complex 3D models using CATIA',
        'Perform structural and thermal analysis with ANSYS',
        'Apply engineering design principles and standards',
        'Create assembly models and engineering drawings',
        'Optimize designs for manufacturing',
        'Understand material properties and selection',
        'Work with industry-standard CAD/CAM tools'
      ],
      programStructure: [
        'Hands-on CAD software training',
        'Design projects and assignments',
        'Simulation workshops and labs',
        'Industry case studies',
        'Portfolio development',
        'Final design project presentation'
      ],
      whoShouldApply: [
        'Mechanical engineering students',
        'Design engineers seeking skill enhancement',
        'Drafters looking to upgrade to 3D modeling',
        'Manufacturing professionals',
        'Anyone interested in mechanical design'
      ],
      careerOutcomes: [
        'Mechanical Design Engineer roles',
        'CAD Designer positions',
        'Product Design Engineer opportunities',
        'Simulation Engineer positions',
        'Manufacturing Engineer roles',
        'Design Consultant positions'
      ]
    }
  };

  // For tracks not in the predefined list (e.g., newly created in admin), generate dynamic content
  return detailsMap[track.title] || {
    overview: track.description 
      ? `${track.description} This comprehensive program provides hands-on training and real-world experience to help you excel in your chosen field. Through structured learning, practical projects, and expert mentorship, you'll gain the skills and knowledge needed to succeed.`
      : 'This comprehensive program provides hands-on training and real-world experience to help you excel in your chosen field. Through structured learning, practical projects, and expert mentorship, you\'ll gain the skills and knowledge needed to succeed.',
    programFlow: track.duration 
      ? [
          `Phase 1: Foundation - Introduction to core concepts and fundamentals of ${track.title}`,
          `Phase 2: Intermediate - Building practical skills and working on real-world scenarios`,
          `Phase 3: Advanced - Specialized training and advanced techniques`,
          `Phase 4: Capstone - Final project development and portfolio building`
        ]
      : [
          'Week 1-2: Foundation and fundamentals',
          'Week 3-4: Intermediate concepts and practical applications',
          'Week 5-6: Advanced topics and specialized training',
          'Week 7-8: Capstone project and portfolio development'
        ],
    whatYoullLearn: track.skills && track.skills.length > 0
      ? track.skills.map(skill => `Master ${skill} and apply it in real-world projects`)
      : [
          'Industry-relevant technical skills',
          'Practical project experience',
          'Problem-solving methodologies',
          'Professional best practices',
          'Collaboration and teamwork',
          'Portfolio development'
        ],
    programStructure: [
      'Interactive live sessions with industry experts',
      'Hands-on projects and assignments',
      'Mentorship and personalized guidance',
      'Industry-relevant assignments',
      'Portfolio building and presentation',
      'Career support and job placement assistance'
    ],
    whoShouldApply: [
      'Students and recent graduates looking to enhance their skills',
      'Career switchers entering a new field',
      'Professionals seeking skill enhancement',
      'Anyone passionate about learning and growth',
      `Individuals interested in ${track.title}`
    ],
    careerOutcomes: [
      'Industry-ready skills and knowledge',
      'Portfolio of real-world projects',
      'Career guidance and mentorship',
      'Networking opportunities with professionals',
      'Job placement support and assistance',
      'Certification upon completion'
    ]
  };
};

export const InternshipsPage: React.FC = () => {
  const { tracks, loading } = useInternships();
  const { applyForInternship } = useInternshipApplication();
  const { user: currentUser } = useAuth();

  const displayTracks = tracks || [];

  const [selectedTrackDetail, setSelectedTrackDetail] = useState<InternshipTrack | null>(null);
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
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !selectedTrack || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Validate resume file
    if (!formData.resume) {
      alert('Please upload your resume.');
      return;
    }
    
    // Find the internship track ID
    const selectedTrackObj = displayTracks.find(t => t.title === selectedTrack);
    if (!selectedTrackObj) {
      alert('Please select a valid internship track.');
      return;
    }
    
    const newApplication = {
      id: Date.now().toString(),
      internshipId: selectedTrackObj.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      course: selectedTrack,
      message: formData.message,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      status: 'Pending' as const,
      studentId: currentUser?.id
    };

    applyForInternship(newApplication, formData.resume);
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

  // Scroll to top when viewing track
  const handleViewTrack = (track: InternshipTrack) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedTrackDetail(track);
  };

  const handleBackToList = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedTrackDetail(null);
  };

  if (selectedTrackDetail) {
    const trackDetails = getTrackDetails(selectedTrackDetail);
    
    return (
      <div className={styles.trackDetail}>
        <div className={styles.trackDetailContent}>
          <button 
            onClick={handleBackToList}
            className={styles.backButton}
          >
            <ArrowLeft size={20} className={styles.backIcon} /> Back to Programs
          </button>

          <div className={styles.trackHeader}>
            <h1 className={styles.trackTitle}>
              {selectedTrackDetail.title}
            </h1>
            <div className={styles.trackMeta}>
              <span className={styles.trackMetaItem}><Clock size={16} /> {selectedTrackDetail.duration}</span>
              <span className={styles.trackMetaItem}><MapPin size={16} /> {selectedTrackDetail.mode}</span>
            </div>
          </div>

          <div className={styles.trackDetailImage}>
            <img 
              src={selectedTrackDetail.image} 
              alt={selectedTrackDetail.title} 
            />
          </div>

          <div className={styles.trackContent}>
            {/* Overview Section */}
            <section className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>Program Overview</h2>
              <p className={styles.trackDescription}>
                {trackDetails.overview}
              </p>
            </section>

            {/* Program Flow Section */}
            <section className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>
                <Target size={20} className={styles.sectionIcon} />
                Program Flow
              </h2>
              <div className={styles.flowList}>
                {trackDetails.programFlow.map((flow, index) => (
                  <div key={index} className={styles.flowItem}>
                    <div className={styles.flowNumber}>{index + 1}</div>
                    <div className={styles.flowContent}>
                      <p>{flow}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* What You'll Learn Section */}
            <section className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>
                <Award size={20} className={styles.sectionIcon} />
                What You'll Learn
              </h2>
              <div className={styles.learnList}>
                {trackDetails.whatYoullLearn.map((item, index) => (
                  <div key={index} className={styles.learnItem}>
                    <CheckCircle size={18} className={styles.checkIcon} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Section */}
            <section className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>Key Technologies</h2>
              <div className={styles.trackSkills}>
                {selectedTrackDetail.skills.map(skill => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Program Structure Section */}
            <section className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>
                <Users size={20} className={styles.sectionIcon} />
                Program Structure
              </h2>
              <div className={styles.structureList}>
                {trackDetails.programStructure.map((item, index) => (
                  <div key={index} className={styles.structureItem}>
                    <div className={styles.structureBullet}></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Who Should Apply Section */}
            <section className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>Who Should Apply</h2>
              <div className={styles.applyList}>
                {trackDetails.whoShouldApply.map((item, index) => (
                  <div key={index} className={styles.applyItem}>
                    <CheckCircle size={16} className={styles.checkIcon} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Career Outcomes Section */}
            <section className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>Career Outcomes</h2>
              <div className={styles.careerList}>
                {trackDetails.careerOutcomes.map((outcome, index) => (
                  <div key={index} className={styles.careerItem}>
                    <Award size={16} className={styles.careerIcon} />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
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
            <div 
              key={track.id} 
              className={styles.trackCard}
              onClick={() => handleViewTrack(track)}
            >
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
                <div className={styles.trackCardFooter}>
                  View Details <ChevronRight size={16} />
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

