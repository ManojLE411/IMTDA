import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '@/constants';
import { BlogPostForm, InternshipForm, TrainingForm, EmployeeForm, TestimonialForm, ServiceForm, JobForm } from '@/components/forms';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useInternships } from '@/hooks/useInternships';
import { useTrainingPrograms } from '@/hooks/useTrainingPrograms';
import { useInternshipApplication } from '@/hooks/useInternshipApplication';
import { useJobApplication } from '@/hooks/useJobApplication';
import { useEmployees } from '@/hooks/useEmployees';
import { useContactMessages } from '@/hooks/useContactMessages';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useServices } from '@/hooks/useServices';
import { useJobs } from '@/hooks/useJobs';
import { BlogPost } from '@/types/blog.types';
import { InternshipTrack } from '@/types/internship.types';
import { TrainingProgram } from '@/types/training.types';
import { Employee } from '@/types/employee.types';
import { Testimonial } from '@/types/testimonial.types';
import { Service } from '@/types/service.types';
import { Job } from '@/types/job.types';
import { Plus, Edit, Trash2, LogOut, ArrowLeft, AlertCircle, Layout, Briefcase, BookOpen, Users, FileText, Mail, Phone, Calendar, CheckCircle, XCircle, Clock, UserCircle, MessageSquare, Eye, Reply, Star, Settings } from 'lucide-react';
import logo from '@/assets/logo.png';
import styles from './AdminPage.module.css';

interface AdminPageProps {
  onNavigate?: (page: Page) => void;
}

type AdminTab = 'blog' | 'internships' | 'training' | 'applications' | 'employees' | 'messages' | 'testimonials' | 'services' | 'jobs';

type EditableData = BlogPost | InternshipTrack | TrainingProgram | Employee | Testimonial | Service | Job | Partial<BlogPost> | Partial<InternshipTrack> | Partial<TrainingProgram> | Partial<Employee> | Partial<Testimonial> | Partial<Service> | Partial<Job>;

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const { posts, savePost, deletePost } = useBlogPosts();
  const { tracks: internships, saveTrack: saveInternship, deleteTrack: deleteInternship } = useInternships();
  const { programs, saveProgram, deleteProgram } = useTrainingPrograms();
  const { applications: internshipApplications, deleteApplication: deleteInternshipApplication, updateApplicationStatus: updateInternshipApplicationStatus } = useInternshipApplication();
  const { applications: jobApplications, deleteApplication: deleteJobApplication, updateApplicationStatus: updateJobApplicationStatus } = useJobApplication();
  const { employees, saveEmployee, deleteEmployee } = useEmployees();
  const { messages: contactMessages, deleteMessage, markAsRead, markAsReplied } = useContactMessages();
  const { testimonials, saveTestimonial, deleteTestimonial } = useTestimonials();
  const { services, saveService, deleteService } = useServices();
  const { jobs, saveJob, deleteJob } = useJobs();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('blog');
  const [isEditing, setIsEditing] = useState(false);
  const [currentData, setCurrentData] = useState<EditableData | null>(null);
  const [error, setError] = useState('');

  const handleLogin = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }
    // Simple mock authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
      setPassword('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  }, [password]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError('');
  }, [error]);

  const handleTabChange = useCallback((tab: AdminTab) => {
    setActiveTab(tab);
    setIsEditing(false);
    setCurrentData(null);
  }, []);

  const handleEdit = useCallback((data: EditableData) => {
    setCurrentData(data);
    setIsEditing(true);
  }, []);

  const handleDelete = useCallback((id: string, type: AdminTab) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      switch (type) {
        case 'blog':
          deletePost(id);
          break;
        case 'internships':
          deleteInternship(id);
          break;
        case 'training':
          deleteProgram(id);
          break;
        case 'applications':
          // Check if it's an internship or job application
          if (internshipApplications.some(app => app.id === id)) {
            deleteInternshipApplication(id);
          } else if (jobApplications.some(app => app.id === id)) {
            deleteJobApplication(id);
          }
          break;
        case 'employees':
          deleteEmployee(id);
          break;
        case 'messages':
          deleteMessage(id);
          break;
        case 'testimonials':
          deleteTestimonial(id);
          break;
        case 'services':
          deleteService(id);
          break;
        case 'jobs':
          deleteJob(id);
          break;
      }
    }
  }, [deletePost, deleteInternship, deleteProgram, deleteInternshipApplication, deleteJobApplication, deleteEmployee, deleteMessage, deleteTestimonial, deleteService, deleteJob, internshipApplications, jobApplications]);

  const handleUpdateApplicationStatus = useCallback((id: string, status: 'Approved' | 'Rejected') => {
    // Check if it's an internship or job application
    if (internshipApplications.some(app => app.id === id)) {
      updateInternshipApplicationStatus(id, status);
    } else if (jobApplications.some(app => app.id === id)) {
      updateJobApplicationStatus(id, status);
    }
  }, [internshipApplications, jobApplications, updateInternshipApplicationStatus, updateJobApplicationStatus]);

  const handleCreatePost = useCallback(() => {
    setCurrentData({
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      image: '',
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: ''
    });
    setIsEditing(true);
  }, []);

  const handleCreateTrack = useCallback(() => {
    setCurrentData({
      id: Date.now().toString(),
      skills: [],
      image: '',
      title: '',
      duration: '',
      mode: 'Online' as const,
      description: ''
    });
    setIsEditing(true);
  }, []);

  const handleCreateProgram = useCallback(() => {
    setCurrentData({
      id: Date.now().toString(),
      features: [],
      title: '',
      category: 'Institutional',
      description: ''
    });
    setIsEditing(true);
  }, []);

  const handleCreateEmployee = useCallback(() => {
    setCurrentData({
      id: Date.now().toString(),
      skills: [],
      image: `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`,
      name: '',
      role: '',
      summary: ''
    });
    setIsEditing(true);
  }, []);

  const handleCreateTestimonial = useCallback(() => {
    setCurrentData({
      id: Date.now().toString(),
      name: '',
      title: '',
      quote: '',
      avatar: ''
    });
    setIsEditing(true);
  }, []);

  const handleCreateService = useCallback(() => {
    setCurrentData({
      id: Date.now().toString(),
      title: '',
      description: '',
      features: [],
      icon: 'Code',
      image: ''
    });
    setIsEditing(true);
  }, []);

  const handleCreateJob = useCallback(() => {
    setCurrentData({
      id: Date.now().toString(),
      title: '',
      department: '',
      type: 'Full-time' as const,
      location: 'Remote' as const,
      description: ''
    });
    setIsEditing(true);
  }, []);

  const handleSave = useCallback((data: EditableData) => {
    switch (activeTab) {
      case 'blog':
        savePost(data as BlogPost);
        break;
      case 'internships':
        saveInternship(data as InternshipTrack);
        break;
      case 'training':
        saveProgram(data as TrainingProgram);
        break;
      case 'employees':
        saveEmployee(data as Employee);
        break;
      case 'testimonials':
        saveTestimonial(data as Testimonial);
        break;
      case 'services':
        saveService(data as Service);
        break;
      case 'jobs':
        saveJob(data as Job);
        break;
    }
    setIsEditing(false);
    setCurrentData(null);
  }, [activeTab, savePost, saveInternship, saveProgram, saveEmployee, saveTestimonial, saveService, saveJob]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setCurrentData(null);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setPassword('');
    setActiveTab('blog');
    setIsEditing(false);
    setCurrentData(null);
    setError('');
  }, []);

  const handleBackToWebsite = useCallback(() => {
    // Use React Router navigation if available, otherwise fall back to prop callback
    if (navigate) {
      navigate('/', { replace: true });
    } else {
      onNavigate?.(Page.HOME);
    }
  }, [navigate, onNavigate]);

  // Memoized computed values
  const isEmpty = useMemo(() => {
    switch (activeTab) {
      case 'blog':
        return posts.length === 0;
      case 'internships':
        return internships.length === 0;
      case 'training':
        return programs.length === 0;
      case 'employees':
        return employees.length === 0;
      case 'applications':
        return internshipApplications.length === 0 && jobApplications.length === 0;
      case 'messages':
        return contactMessages.length === 0;
      case 'testimonials':
        return testimonials.length === 0;
      case 'services':
        return services.length === 0;
      case 'jobs':
        return jobs.length === 0;
      default:
        return false;
    }
  }, [activeTab, posts.length, internships.length, programs.length, employees.length, internshipApplications.length, jobApplications.length, contactMessages.length, testimonials.length, services.length, jobs.length]);

  const tableColSpan = useMemo(() => {
    return (activeTab === 'applications' || activeTab === 'messages') ? 4 : 3;
  }, [activeTab]);

  const emptyStateMessage = useMemo(() => {
    if (activeTab === 'applications') return 'No applications received yet.';
    if (activeTab === 'messages') return 'No contact messages received yet.';
    return "No items found. Click 'Add New' to start.";
  }, [activeTab]);

  const contentCardTitle = useMemo(() => {
    switch (activeTab) {
      case 'blog':
        return 'All Posts';
      case 'internships':
        return 'All Tracks';
      case 'training':
        return 'All Programs';
      case 'employees':
        return 'All Employees';
      case 'messages':
        return 'Contact Messages';
      case 'applications':
        return 'All Applications';
      case 'testimonials':
        return 'All Testimonials';
      case 'services':
        return 'All Services';
      case 'jobs':
        return 'Open Positions';
      default:
        return '';
    }
  }, [activeTab]);

  const handleCreate = useMemo(() => {
    switch (activeTab) {
      case 'blog':
        return handleCreatePost;
      case 'internships':
        return handleCreateTrack;
      case 'training':
        return handleCreateProgram;
      case 'employees':
        return handleCreateEmployee;
      case 'testimonials':
        return handleCreateTestimonial;
      case 'services':
        return handleCreateService;
      case 'jobs':
        return handleCreateJob;
      default:
        return undefined;
    }
  }, [activeTab, handleCreatePost, handleCreateTrack, handleCreateProgram, handleCreateEmployee, handleCreateTestimonial, handleCreateService, handleCreateJob]);

  if (!isAuthenticated) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          
          <div className={styles.loginHeader}>
            <div className={styles.logoContainer}>
              <img src={logo} alt="IMTDA Logo" className={styles.logo} />
            </div>
            <h2 className={styles.loginTitle}>Admin Login</h2>
            <p className={styles.loginSubtitle}>Enter credentials to access dashboard</p>
          </div>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div>
              <label htmlFor="admin-password" className={styles.label}>
                Password
              </label>
              <input 
                id="admin-password"
                type="password" 
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password (admin123)"
                aria-invalid={!!error}
                aria-describedby={error ? 'password-error' : undefined}
              />
            </div>
            {error && (
              <div id="password-error" className={styles.errorMessage} role="alert">
                <AlertCircle size={16} className={styles.errorIcon} aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>

          <div className={styles.loginFooter}>
            <button 
              onClick={handleBackToWebsite}
              className={styles.backButton}
              type="button"
            >
              <ArrowLeft size={16} className={styles.backIcon} aria-hidden="true" /> Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>DASHBOARD</h2>
        </div>
        <nav className={styles.sidebarNav} aria-label="Admin navigation">
          <button 
            onClick={() => handleTabChange('blog')}
            className={`${styles.sidebarButton} ${activeTab === 'blog' ? styles.sidebarButtonActive : ''}`}
            type="button"
            aria-current={activeTab === 'blog' ? 'page' : undefined}
          >
            <Layout size={20} aria-hidden="true" /> <span>Blog Posts</span>
          </button>
          <button 
            onClick={() => handleTabChange('internships')}
            className={`${styles.sidebarButton} ${activeTab === 'internships' ? styles.sidebarButtonActive : ''}`}
            type="button"
            aria-current={activeTab === 'internships' ? 'page' : undefined}
          >
            <Briefcase size={20} aria-hidden="true" /> <span>Internships</span>
          </button>
          <button 
            onClick={() => handleTabChange('training')}
            className={`${styles.sidebarButton} ${activeTab === 'training' ? styles.sidebarButtonActive : ''}`}
            type="button"
            aria-current={activeTab === 'training' ? 'page' : undefined}
          >
            <BookOpen size={20} aria-hidden="true" /> <span>Training</span>
          </button>
           <button 
            onClick={() => handleTabChange('applications')}
            className={`${styles.sidebarButton} ${activeTab === 'applications' ? styles.sidebarButtonActive : ''}`}
            type="button"
            aria-current={activeTab === 'applications' ? 'page' : undefined}
          >
            <Users size={20} aria-hidden="true" /> <span>Applications</span>
          </button>
          <button 
            onClick={() => handleTabChange('employees')}
            className={`${styles.sidebarButton} ${activeTab === 'employees' ? styles.sidebarButtonActive : ''}`}
            type="button"
            aria-current={activeTab === 'employees' ? 'page' : undefined}
          >
            <UserCircle size={20} aria-hidden="true" /> <span>Employees</span>
          </button>
          <button 
            onClick={() => handleTabChange('messages')}
            className={`${styles.sidebarButton} ${activeTab === 'messages' ? styles.sidebarButtonActive : ''}`}
            type="button"
            aria-current={activeTab === 'messages' ? 'page' : undefined}
          >
            <MessageSquare size={20} aria-hidden="true" /> <span>Contact Messages</span>
          </button>
          <button 
            onClick={() => handleTabChange('testimonials')}
            className={`${styles.sidebarButton} ${activeTab === 'testimonials' ? styles.sidebarButtonActive : ''}`}
            type="button"
            aria-current={activeTab === 'testimonials' ? 'page' : undefined}
          >
            <Star size={20} aria-hidden="true" /> <span>Testimonials</span>
          </button>
          <button 
            onClick={() => handleTabChange('services')}
            className={`${styles.sidebarButton} ${activeTab === 'services' ? styles.sidebarButtonActive : ''}`}
            type="button"
            aria-current={activeTab === 'services' ? 'page' : undefined}
          >
            <Settings size={20} aria-hidden="true" /> <span>Services</span>
          </button>
          <button 
            onClick={() => handleTabChange('jobs')}
            className={`${styles.sidebarButton} ${activeTab === 'jobs' ? styles.sidebarButtonActive : ''}`}
            type="button"
            aria-current={activeTab === 'jobs' ? 'page' : undefined}
          >
            <Briefcase size={20} aria-hidden="true" /> <span>Open Positions</span>
          </button>
        </nav>
        <div className={styles.sidebarFooter}>
          <button 
             onClick={handleLogout}
             className={styles.logoutButton}
             type="button"
           >
             <LogOut size={18} aria-hidden="true" /> Logout
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.mainHeader}>
          <div className={styles.mainHeaderMobile}>
             <button 
               onClick={handleBackToWebsite}
               className={styles.mobileBackButton}
               type="button"
               aria-label="Back to website"
             >
               <ArrowLeft size={20} aria-hidden="true" />
             </button>
          </div>
          <div className={styles.mainHeaderDesktop}>
            <button 
              onClick={handleBackToWebsite} 
              className={styles.desktopBackButton}
              type="button"
            >
              <ArrowLeft size={14} aria-hidden="true" /> Back to Website
            </button>
          </div>
          <h1 className={styles.mainTitle}>{activeTab} Management</h1>
        </div>

        {/* Mobile Tabs (Visible only on small screens) */}
        <div className={styles.mobileTabs} role="tablist" aria-label="Admin sections">
           <button 
             onClick={() => handleTabChange('blog')} 
             className={`${styles.mobileTab} ${activeTab === 'blog' ? styles.mobileTabActive : ''}`}
             type="button"
             role="tab"
             aria-selected={activeTab === 'blog'}
           >
             Blog
           </button>
           <button 
             onClick={() => handleTabChange('internships')} 
             className={`${styles.mobileTab} ${activeTab === 'internships' ? styles.mobileTabActive : ''}`}
             type="button"
             role="tab"
             aria-selected={activeTab === 'internships'}
           >
             Internships
           </button>
           <button 
             onClick={() => handleTabChange('training')} 
             className={`${styles.mobileTab} ${activeTab === 'training' ? styles.mobileTabActive : ''}`}
             type="button"
             role="tab"
             aria-selected={activeTab === 'training'}
           >
             Training
           </button>
           <button 
             onClick={() => handleTabChange('applications')} 
             className={`${styles.mobileTab} ${activeTab === 'applications' ? styles.mobileTabActive : ''}`}
             type="button"
             role="tab"
             aria-selected={activeTab === 'applications'}
           >
             Applications
           </button>
           <button 
             onClick={() => handleTabChange('employees')} 
             className={`${styles.mobileTab} ${activeTab === 'employees' ? styles.mobileTabActive : ''}`}
             type="button"
             role="tab"
             aria-selected={activeTab === 'employees'}
           >
             Employees
           </button>
           <button 
             onClick={() => handleTabChange('messages')} 
             className={`${styles.mobileTab} ${activeTab === 'messages' ? styles.mobileTabActive : ''}`}
             type="button"
             role="tab"
             aria-selected={activeTab === 'messages'}
           >
             Messages
           </button>
           <button 
             onClick={() => handleTabChange('testimonials')} 
             className={`${styles.mobileTab} ${activeTab === 'testimonials' ? styles.mobileTabActive : ''}`}
             type="button"
             role="tab"
             aria-selected={activeTab === 'testimonials'}
           >
             Testimonials
           </button>
           <button 
             onClick={() => handleTabChange('services')} 
             className={`${styles.mobileTab} ${activeTab === 'services' ? styles.mobileTabActive : ''}`}
             type="button"
             role="tab"
             aria-selected={activeTab === 'services'}
           >
             Services
           </button>
           <button 
             onClick={() => handleTabChange('jobs')} 
             className={`${styles.mobileTab} ${activeTab === 'jobs' ? styles.mobileTabActive : ''}`}
             type="button"
             role="tab"
             aria-selected={activeTab === 'jobs'}
           >
             Jobs
           </button>
        </div>

        {isEditing && currentData ? (
          <div>
             {activeTab === 'blog' && <BlogPostForm initialData={currentData as Partial<BlogPost>} onSave={handleSave} onCancel={handleCancel} />}
             {activeTab === 'internships' && <InternshipForm initialData={currentData as Partial<InternshipTrack>} onSave={handleSave} onCancel={handleCancel} />}
             {activeTab === 'training' && <TrainingForm initialData={currentData as Partial<TrainingProgram>} onSave={handleSave} onCancel={handleCancel} />}
             {activeTab === 'employees' && <EmployeeForm initialData={currentData as Partial<Employee>} onSave={handleSave} onCancel={handleCancel} />}
             {activeTab === 'testimonials' && <TestimonialForm initialData={currentData as Partial<Testimonial>} onSave={handleSave} onCancel={handleCancel} />}
             {activeTab === 'services' && <ServiceForm initialData={currentData as Partial<Service>} onSave={handleSave} onCancel={handleCancel} />}
             {activeTab === 'jobs' && <JobForm initialData={currentData as Partial<Job>} onSave={handleSave} onCancel={handleCancel} />}
          </div>
        ) : (
          <div className={styles.contentCard}>
            <div className={styles.contentCardHeader}>
              <h3 className={styles.contentCardTitle}>
                {contentCardTitle}
              </h3>
              {handleCreate && (
                <button 
                  onClick={handleCreate}
                  className={styles.addButton}
                  type="button"
                  aria-label={`Add new ${activeTab} item`}
                >
                  <Plus size={18} aria-hidden="true" /> Add New
                </button>
              )}
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead className={styles.tableHeader}>
                  <tr>
                    <th className={styles.tableHeaderCell}>
                      {activeTab === 'applications' ? 'Applicant' : 
                       activeTab === 'messages' ? 'From' : 
                       activeTab === 'employees' ? 'Name' :
                       activeTab === 'testimonials' ? 'Name' :
                       activeTab === 'services' ? 'Title' :
                       activeTab === 'jobs' ? 'Position' : 'Title'}
                    </th>
                    <th className={styles.tableHeaderCell}>
                       {activeTab === 'applications' ? 'Details' : 
                        activeTab === 'messages' ? 'Subject & Contact' : 
                        activeTab === 'employees' ? 'Role & Skills' :
                        activeTab === 'testimonials' ? 'Title & Quote' :
                        activeTab === 'services' ? 'Description & Features' :
                        activeTab === 'jobs' ? 'Department, Type & Location' : 'Info'}
                    </th>
                    {(activeTab === 'applications' || activeTab === 'messages') && (
                      <th className={styles.tableHeaderCell}>
                        {activeTab === 'applications' ? 'Resume/Message' : 'Message'}
                      </th>
                    )}
                    <th className={`${styles.tableHeaderCell} ${styles.tableHeaderCellCenter}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {activeTab === 'blog' && posts.map(post => (
                    <tr key={post.id} className={styles.tableRow}>
                      <td className={`${styles.tableCell} ${styles.tableCellMedium}`}>{post.title}</td>
                      <td className={styles.tableCell}><span className={`${styles.badge} ${styles.badgeBlue}`}>{post.category}</span></td>
                      <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>
                        <div className={styles.actionButtons}>
                          <button 
                            onClick={() => handleEdit(post)} 
                            className={`${styles.actionButton} ${styles.editButton}`}
                            type="button"
                            aria-label={`Edit ${post.title}`}
                          >
                            <Edit size={18} aria-hidden="true" />
                          </button>
                          <button 
                            onClick={() => handleDelete(post.id, 'blog')} 
                            className={`${styles.actionButton} ${styles.deleteButton}`}
                            type="button"
                            aria-label={`Delete ${post.title}`}
                          >
                            <Trash2 size={18} aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeTab === 'internships' && internships.map(track => (
                    <tr key={track.id} className={styles.tableRow}>
                      <td className={`${styles.tableCell} ${styles.tableCellMedium}`}>{track.title}</td>
                      <td className={`${styles.tableCell} ${styles.tableCellSmall}`}>{track.duration} • {track.mode}</td>
                      <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>
                        <div className={styles.actionButtons}>
                          <button onClick={() => handleEdit(track)} className={`${styles.actionButton} ${styles.editButton}`}><Edit size={18} /></button>
                          <button onClick={() => handleDelete(track.id, 'internships')} className={`${styles.actionButton} ${styles.deleteButton}`}><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeTab === 'training' && programs.map(program => (
                    <tr key={program.id} className={styles.tableRow}>
                      <td className={`${styles.tableCell} ${styles.tableCellMedium}`}>{program.title}</td>
                      <td className={styles.tableCell}><span className={`${styles.badge} ${program.category === 'Institutional' ? styles.badgePurple : styles.badgeOrange}`}>{program.category}</span></td>
                      <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>
                        <div className={styles.actionButtons}>
                          <button onClick={() => handleEdit(program)} className={`${styles.actionButton} ${styles.editButton}`}><Edit size={18} /></button>
                          <button onClick={() => handleDelete(program.id, 'training')} className={`${styles.actionButton} ${styles.deleteButton}`}><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeTab === 'employees' && employees.map(employee => (
                    <tr key={employee.id} className={styles.tableRow}>
                      <td className={`${styles.tableCell} ${styles.tableCellMedium}`}>{employee.name}</td>
                      <td className={`${styles.tableCell} ${styles.tableCellSmall}`}>
                        <div className={styles.roleText}>{employee.role}</div>
                        <div className={styles.skillsContainer}>
                          {employee.skills.map((skill, idx) => (
                            <span key={idx} className={`${styles.badge} ${styles.badgeBlue}`}>{skill}</span>
                          ))}
                        </div>
                      </td>
                      <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>
                        <div className={styles.actionButtons}>
                          <button onClick={() => handleEdit(employee)} className={`${styles.actionButton} ${styles.editButton}`}><Edit size={18} /></button>
                          <button onClick={() => handleDelete(employee.id, 'employees')} className={`${styles.actionButton} ${styles.deleteButton}`}><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeTab === 'testimonials' && testimonials.map(testimonial => (
                    <tr key={testimonial.id} className={styles.tableRow}>
                      <td className={`${styles.tableCell} ${styles.tableCellMedium}`}>{testimonial.name}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.roleText}>{testimonial.title}</div>
                        <div className={styles.messagePreview} title={testimonial.quote}>
                          "{testimonial.quote.substring(0, 100)}{testimonial.quote.length > 100 ? '...' : ''}"
                        </div>
                      </td>
                      <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>
                        <div className={styles.actionButtons}>
                          <button onClick={() => handleEdit(testimonial)} className={`${styles.actionButton} ${styles.editButton}`}><Edit size={18} /></button>
                          <button onClick={() => handleDelete(testimonial.id, 'testimonials')} className={`${styles.actionButton} ${styles.deleteButton}`}><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeTab === 'services' && services.map(service => (
                    <tr key={service.id} className={styles.tableRow}>
                      <td className={`${styles.tableCell} ${styles.tableCellMedium}`}>{service.title}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.messagePreview} title={service.description}>
                          {service.description.substring(0, 80)}{service.description.length > 80 ? '...' : ''}
                        </div>
                        <div className={styles.skillsContainer} style={{ marginTop: '0.5rem' }}>
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className={`${styles.badge} ${styles.badgeBlue}`}>{feature}</span>
                          ))}
                          {service.features.length > 3 && (
                            <span className={`${styles.badge} ${styles.badgeBlue}`}>+{service.features.length - 3} more</span>
                          )}
                        </div>
                      </td>
                      <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>
                        <div className={styles.actionButtons}>
                          <button onClick={() => handleEdit(service)} className={`${styles.actionButton} ${styles.editButton}`}><Edit size={18} /></button>
                          <button onClick={() => handleDelete(service.id, 'services')} className={`${styles.actionButton} ${styles.deleteButton}`}><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeTab === 'jobs' && jobs.map(job => (
                    <tr key={job.id} className={styles.tableRow}>
                      <td className={`${styles.tableCell} ${styles.tableCellMedium}`}>{job.title}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.roleText}>{job.department}</div>
                        <div className={styles.skillsContainer} style={{ marginTop: '0.5rem' }}>
                          <span className={`${styles.badge} ${styles.badgeBlue}`}>{job.type}</span>
                          <span className={`${styles.badge} ${styles.badgePurple}`}>{job.location}</span>
                        </div>
                      </td>
                      <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>
                        <div className={styles.actionButtons}>
                          <button onClick={() => handleEdit(job)} className={`${styles.actionButton} ${styles.editButton}`}><Edit size={18} /></button>
                          <button onClick={() => handleDelete(job.id, 'jobs')} className={`${styles.actionButton} ${styles.deleteButton}`}><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Applications View - Internship Applications */}
                  {activeTab === 'applications' && internshipApplications.length > 0 && internshipApplications.map(app => (
                     <tr key={app.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>
                         <div className={styles.applicantName}>{app.name}</div>
                         <div className={styles.dateText}><Calendar size={12}/> {app.date}</div>
                         <div className={styles.badge} style={{ marginTop: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#60A5FA' }}>Internship</div>
                      </td>
                      <td className={`${styles.tableCell} ${styles.tableCellSmall}`}>
                         <div className={styles.textPrimary}>{app.course}</div>
                         <div className={styles.contactInfo}>
                            <span className={styles.contactInfoItem}><Mail size={12} /> {app.email}</span>
                            <span className={styles.contactInfoItem}><Phone size={12} /> {app.phone}</span>
                         </div>
                         <div className={`${styles.statusBadge} ${
                           app.status === 'Approved' ? styles.statusBadgeApproved : 
                           app.status === 'Rejected' ? styles.statusBadgeRejected : 
                           styles.statusBadgePending
                         }`}>
                           {app.status === 'Approved' ? <CheckCircle size={10} /> : 
                            app.status === 'Rejected' ? <XCircle size={10} /> : 
                            <Clock size={10} />} {app.status}
                         </div>
                      </td>
                      <td className={`${styles.tableCell} ${styles.tableCellSmall}`}>
                         <div className={styles.resumeLink}>
                            <FileText size={14} /> 
                            <span className={styles.resumeName} title={app.resumeName}>{app.resumeName}</span>
                         </div>
                         <div className={styles.messagePreview} title={app.message}>
                           "{app.message}"
                         </div>
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.actionButtons}>
                          {app.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => handleUpdateApplicationStatus(app.id, 'Approved')} 
                                className={`${styles.actionButton} ${styles.actionButtonApprove} ${styles.actionButtonSmall}`} 
                                title="Approve Application"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button 
                                onClick={() => handleUpdateApplicationStatus(app.id, 'Rejected')} 
                                className={`${styles.actionButton} ${styles.actionButtonReject} ${styles.actionButtonSmall}`} 
                                title="Reject Application"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                          <button onClick={() => handleDelete(app.id, 'applications')} className={`${styles.actionButton} ${styles.actionButtonDelete} ${styles.actionButtonSmall}`} title="Delete Application"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Applications View - Job Applications */}
                  {activeTab === 'applications' && jobApplications.length > 0 && jobApplications.map(app => (
                     <tr key={app.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>
                         <div className={styles.applicantName}>{app.name}</div>
                         <div className={styles.dateText}><Calendar size={12}/> {app.date}</div>
                         <div className={styles.badge} style={{ marginTop: '0.5rem', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#A78BFA' }}>Job Application</div>
                      </td>
                      <td className={`${styles.tableCell} ${styles.tableCellSmall}`}>
                         <div className={styles.textPrimary}>{app.jobTitle}</div>
                         <div className={styles.contactInfo}>
                            <span className={styles.contactInfoItem}><Mail size={12} /> {app.email}</span>
                            <span className={styles.contactInfoItem}><Phone size={12} /> {app.phone}</span>
                         </div>
                         <div className={`${styles.statusBadge} ${
                           app.status === 'Approved' ? styles.statusBadgeApproved : 
                           app.status === 'Rejected' ? styles.statusBadgeRejected : 
                           styles.statusBadgePending
                         }`}>
                           {app.status === 'Approved' ? <CheckCircle size={10} /> : 
                            app.status === 'Rejected' ? <XCircle size={10} /> : 
                            <Clock size={10} />} {app.status}
                         </div>
                      </td>
                      <td className={`${styles.tableCell} ${styles.tableCellSmall}`}>
                         <div className={styles.resumeLink}>
                            <FileText size={14} /> 
                            <span className={styles.resumeName} title={app.resumeName}>{app.resumeName}</span>
                         </div>
                         {app.coverLetter && (
                           <div className={styles.messagePreview} title={app.coverLetter}>
                             "{app.coverLetter}"
                           </div>
                         )}
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.actionButtons}>
                          {app.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => handleUpdateApplicationStatus(app.id, 'Approved')} 
                                className={`${styles.actionButton} ${styles.actionButtonApprove} ${styles.actionButtonSmall}`} 
                                title="Approve Application"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button 
                                onClick={() => handleUpdateApplicationStatus(app.id, 'Rejected')} 
                                className={`${styles.actionButton} ${styles.actionButtonReject} ${styles.actionButtonSmall}`} 
                                title="Reject Application"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                          <button onClick={() => handleDelete(app.id, 'applications')} className={`${styles.actionButton} ${styles.actionButtonDelete} ${styles.actionButtonSmall}`} title="Delete Application"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Contact Messages View */}
                  {activeTab === 'messages' && contactMessages.map(msg => (
                    <tr key={msg.id} className={`${styles.tableRow} ${msg.status === 'New' ? styles.tableRowNew : ''}`}>
                      <td className={styles.tableCell}>
                        <div className={styles.messageHeader}>
                          {msg.status === 'New' && (
                            <div className={styles.newIndicator}></div>
                          )}
                          <div className={styles.messageHeaderContent}>
                            <div className={styles.messageName}>
                              {msg.name}
                              {msg.status === 'New' && (
                                <span className={styles.newBadge}>NEW</span>
                              )}
                            </div>
                            <div className={styles.dateText}>
                              <Calendar size={12} /> {msg.date}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={`${styles.tableCell} ${styles.tableCellSmall}`}>
                        <div className={styles.subjectText}>{msg.subject}</div>
                        <div className={styles.contactInfo}>
                          <span className={styles.contactInfoItem}>
                            <Mail size={12} className="text-gray-400" /> 
                            <a href={`mailto:${msg.email}`} className={styles.emailLink}>{msg.email}</a>
                          </span>
                        </div>
                        <div className={`${styles.statusBadge} ${
                          msg.status === 'New' ? styles.statusBadgeNew : 
                          msg.status === 'Replied' ? styles.statusBadgeReplied : 
                          styles.statusBadgeRead
                        }`}>
                          {msg.status === 'New' ? <AlertCircle size={10} /> : 
                           msg.status === 'Replied' ? <CheckCircle size={10} /> : 
                           <Eye size={10} />} {msg.status}
                        </div>
                      </td>
                      <td className={`${styles.tableCell} ${styles.tableCellSmall}`}>
                        <div className={styles.messageText} title={msg.message}>
                          "{msg.message}"
                        </div>
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.flexCenter}>
                          {msg.status === 'New' && (
                            <button 
                              onClick={() => markAsRead(msg.id)} 
                              className={`${styles.actionButton} ${styles.actionButtonRead} ${styles.actionButtonSmall}`}
                              title="Mark as Read"
                            >
                              <Eye size={16} />
                            </button>
                          )}
                          {msg.status !== 'Replied' && (
                            <button 
                              onClick={() => markAsReplied(msg.id)} 
                              className={`${styles.actionButton} ${styles.actionButtonReplied} ${styles.actionButtonSmall}`}
                              title="Mark as Replied"
                            >
                              <Reply size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(msg.id, 'messages')} 
                            className={`${styles.actionButton} ${styles.actionButtonDelete} ${styles.actionButtonSmall}`}
                            title="Delete Message"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {isEmpty && (
                    <tr>
                      <td colSpan={tableColSpan} className={styles.emptyStateCell}>
                        {emptyStateMessage}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

