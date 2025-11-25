import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '@/constants';
import { BlogPostForm, InternshipForm, TrainingForm, EmployeeForm, TestimonialForm, ServiceForm, JobForm, ProjectForm } from '@/components/forms';
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
import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/store/hooks';
import { loadBlogPosts } from '@/store/slices/blogSlice';
import { loadInternshipTracks, loadInternshipApplications } from '@/store/slices/internshipSlice';
import { loadTrainingPrograms } from '@/store/slices/trainingSlice';
import { loadEmployees } from '@/store/slices/employeeSlice';
import { loadJobs, loadJobApplications } from '@/store/slices/jobSlice';
import { loadServices } from '@/store/slices/serviceSlice';
import { loadTestimonials } from '@/store/slices/testimonialSlice';
import { loadContactMessages } from '@/store/slices/contactSlice';
import { BlogPost } from '@/types/blog.types';
import { InternshipTrack } from '@/types/internship.types';
import { TrainingProgram } from '@/types/training.types';
import { Employee } from '@/types/employee.types';
import { Testimonial } from '@/types/testimonial.types';
import { Service } from '@/types/service.types';
import { Job } from '@/types/job.types';
import { Project } from '@/types/common.types';
import { Plus, Edit, Trash2, LogOut, ArrowLeft, AlertCircle, Layout, Briefcase, BookOpen, Users, FileText, Mail, Phone, Calendar, CheckCircle, XCircle, Clock, UserCircle, MessageSquare, Eye, Reply, Star, Settings, FolderOpen, Lock, LogIn } from 'lucide-react';
import { Loading, Input, Button } from '@/components/ui';
import logo from '@/assets/logo.png';
import styles from './AdminPage.module.css';

interface AdminPageProps {
  onNavigate?: (page: Page) => void;
}

type AdminTab = 'blog' | 'internships' | 'training' | 'applications' | 'employees' | 'messages' | 'testimonials' | 'services' | 'jobs' | 'projects';

type EditableData = BlogPost | InternshipTrack | TrainingProgram | Employee | Testimonial | Service | Job | Project | Partial<BlogPost> | Partial<InternshipTrack> | Partial<TrainingProgram> | Partial<Employee> | Partial<Testimonial> | Partial<Service> | Partial<Job> | Partial<Project>;

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // All hooks must be called unconditionally and in the same order
  // This is required by React's Rules of Hooks
  const { isAuthenticated, isAdmin, isLoading, logout, adminLogin, error: authError } = useAuth();
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
  const { projects, saveProject, deleteProject } = useProjects();

  // Safety checks to ensure arrays are never undefined
  const safePosts = posts || [];
  const safeInternships = internships || [];
  const safePrograms = programs || [];
  const safeEmployees = employees || [];
  const safeTestimonials = testimonials || [];
  const safeServices = services || [];
  const safeJobs = jobs || [];
  const safeProjects = projects || [];
  const safeInternshipApplications = internshipApplications || [];
  const safeJobApplications = jobApplications || [];
  const safeContactMessages = contactMessages || [];

  // Explicitly load all data when admin is authenticated and dashboard is visible
  // This ensures data is always fresh when admin accesses the dashboard
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      // Force reload all data when admin dashboard is accessed
      // The hooks already load data, but this ensures it happens immediately
      dispatch(loadBlogPosts());
      dispatch(loadInternshipTracks());
      dispatch(loadTrainingPrograms());
      dispatch(loadEmployees());
      dispatch(loadJobs());
      dispatch(loadServices());
      dispatch(loadTestimonials());
      dispatch(loadContactMessages());
      dispatch(loadInternshipApplications());
      dispatch(loadJobApplications());
    }
  }, [isAuthenticated, isAdmin, dispatch]);

  const [activeTab, setActiveTab] = useState<AdminTab>('blog');
  const [isEditing, setIsEditing] = useState(false);
  const [currentData, setCurrentData] = useState<EditableData | null>(null);
  
  // Admin login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');

  // All useCallback and useMemo hooks must be called BEFORE any conditional returns
  // This is required by React's Rules of Hooks
  const handleTabChange = useCallback((tab: AdminTab) => {
    setActiveTab(tab);
    setIsEditing(false);
    setCurrentData(null);
  }, []);

  const handleEdit = useCallback((data: EditableData) => {
    setCurrentData(data);
    setIsEditing(true);
  }, []);

  const handleDelete = useCallback((id: string | undefined, type: AdminTab) => {
    // Validate ID exists
    if (!id) {
      console.error('Cannot delete: ID is undefined');
      return;
    }

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
          if (safeInternshipApplications.some(app => app.id === id)) {
            deleteInternshipApplication(id);
          } else if (safeJobApplications.some(app => app.id === id)) {
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
        case 'projects':
          deleteProject(id);
          break;
      }
    }
  }, [deletePost, deleteInternship, deleteProgram, deleteInternshipApplication, deleteJobApplication, deleteEmployee, deleteMessage, deleteTestimonial, deleteService, deleteJob, deleteProject, safeInternshipApplications, safeJobApplications]);

  const handleUpdateApplicationStatus = useCallback((id: string, status: 'Approved' | 'Rejected') => {
    // Check if it's an internship or job application
    if (safeInternshipApplications.some(app => app.id === id)) {
      updateInternshipApplicationStatus(id, status);
    } else if (safeJobApplications.some(app => app.id === id)) {
      updateJobApplicationStatus(id, status);
    }
  }, [safeInternshipApplications, safeJobApplications, updateInternshipApplicationStatus, updateJobApplicationStatus]);

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

  const handleCreateProject = useCallback(() => {
    setCurrentData({
      id: Date.now().toString(),
      title: '',
      category: 'Web' as const,
      description: '',
      techStack: [],
      image: ''
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
      case 'projects':
        saveProject(data as Project);
        break;
    }
    setIsEditing(false);
    setCurrentData(null);
  }, [activeTab, savePost, saveInternship, saveProgram, saveEmployee, saveTestimonial, saveService, saveJob, saveProject]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setCurrentData(null);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    // logout action will handle redirect to home
  }, [logout]);

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
        return safePosts.length === 0;
      case 'internships':
        return safeInternships.length === 0;
      case 'training':
        return safePrograms.length === 0;
      case 'employees':
        return safeEmployees.length === 0;
      case 'applications':
        return safeInternshipApplications.length === 0 && safeJobApplications.length === 0;
      case 'messages':
        return safeContactMessages.length === 0;
      case 'testimonials':
        return safeTestimonials.length === 0;
      case 'services':
        return safeServices.length === 0;
      case 'jobs':
        return safeJobs.length === 0;
      case 'projects':
        return safeProjects.length === 0;
      default:
        return false;
    }
  }, [activeTab, safePosts.length, safeInternships.length, safePrograms.length, safeEmployees.length, safeInternshipApplications.length, safeJobApplications.length, safeContactMessages.length, safeTestimonials.length, safeServices.length, safeJobs.length, safeProjects.length]);

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
      case 'projects':
        return 'All Projects';
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
      case 'projects':
        return handleCreateProject;
      default:
        return undefined;
    }
  }, [activeTab, handleCreatePost, handleCreateTrack, handleCreateProgram, handleCreateEmployee, handleCreateTestimonial, handleCreateService, handleCreateJob, handleCreateProject]);

  // Show loading while checking authentication
  // This must come AFTER all hooks are called (Rules of Hooks)
  if (isLoading) {
    return <Loading text="Loading..." fullScreen />;
  }

  // Check if student is trying to access admin page
  const isStudentTryingToAccess = isAuthenticated && !isAdmin;

  // Show admin login page if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLoginData(prev => ({ ...prev, [name]: value }));
      if (loginError) setLoginError('');
    };

    const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoginError('');

      if (!loginData.email.trim() || !loginData.password.trim()) {
        setLoginError('Please enter both email and password.');
        return;
      }

      // Admin login endpoint handles role validation on backend

      try {
        await adminLogin({
          email: loginData.email.trim(),
          password: loginData.password,
        });
        // After successful login, the component will re-render
        // If user is admin, dashboard will show
        // If user is not admin (student), login form will show again with access denied message
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
        setLoginError(message);
      }
    };

    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <div className={styles.logoContainer}>
              <img src={logo} alt="IMTDA Logo" className={styles.logo} />
            </div>
            <h2 className={styles.loginTitle}>Admin Login</h2>
            <p className={styles.loginSubtitle}>Enter your credentials to access the admin dashboard</p>
          </div>
          
          {isStudentTryingToAccess && (
            <div className={styles.errorMessage} role="alert" style={{ marginBottom: '1rem' }}>
              <AlertCircle size={16} className={styles.errorIcon} aria-hidden="true" />
              <span>Access denied. This page is only accessible to administrators.</span>
            </div>
          )}
          
          <form onSubmit={handleAdminLogin} className={styles.loginForm}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              required
              leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
              placeholder="admin@imtda.com"
              value={loginData.email}
              onChange={handleLoginChange}
              error={loginError && !loginData.email ? loginError : undefined}
            />

             <Input
               label="Password"
               name="password"
               type="password"
               autoComplete="current-password"
               required
               leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
               placeholder="Enter your password"
               value={loginData.password}
               onChange={handleLoginChange}
               error={loginError && loginData.email ? loginError : undefined}
             />

            {(loginError || authError) && (
              <div className={styles.errorMessage} role="alert">
                <AlertCircle size={16} className={styles.errorIcon} aria-hidden="true" />
                <span>{loginError || authError}</span>
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              rightIcon={<LogIn className="w-4 h-4" />}
            >
              Sign In to Admin Dashboard
            </Button>
          </form>

          <div className={styles.loginFooter}>
            <button 
              onClick={() => navigate('/', { replace: true })}
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

  // All hooks are already defined above, before the conditional returns
  // Dashboard JSX starts here
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
          <button 
            onClick={() => handleTabChange('projects')}
            className={`${styles.sidebarButton} ${activeTab === 'projects' ? styles.sidebarButtonActive : ''}`}
            type="button"
            aria-current={activeTab === 'projects' ? 'page' : undefined}
          >
            <FolderOpen size={20} aria-hidden="true" /> <span>Projects</span>
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
           <button 
             onClick={() => handleTabChange('projects')} 
             className={`${styles.mobileTab} ${activeTab === 'projects' ? styles.mobileTabActive : ''}`}
             type="button"
             role="tab"
             aria-selected={activeTab === 'projects'}
           >
             Projects
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
             {activeTab === 'projects' && <ProjectForm initialData={currentData as Partial<Project>} onSave={handleSave} onCancel={handleCancel} />}
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
                       activeTab === 'jobs' ? 'Position' :
                       activeTab === 'projects' ? 'Project' : 'Title'}
                    </th>
                    <th className={styles.tableHeaderCell}>
                       {activeTab === 'applications' ? 'Details' : 
                        activeTab === 'messages' ? 'Subject & Contact' : 
                        activeTab === 'employees' ? 'Role & Skills' :
                        activeTab === 'testimonials' ? 'Title & Quote' :
                        activeTab === 'services' ? 'Description & Features' :
                        activeTab === 'jobs' ? 'Department, Type & Location' :
                        activeTab === 'projects' ? 'Category & Tech Stack' : 'Info'}
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
                  {activeTab === 'blog' && safePosts.filter(post => post.id).map(post => (
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
                  {activeTab === 'internships' && safeInternships.filter(track => track.id).map(track => (
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
                  {activeTab === 'training' && safePrograms.filter(program => program.id).map(program => (
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
                  {activeTab === 'employees' && safeEmployees.filter(employee => employee.id).map(employee => (
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
                  {activeTab === 'testimonials' && safeTestimonials.filter(testimonial => testimonial.id).map(testimonial => (
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
                  {activeTab === 'services' && safeServices.filter(service => service.id).map(service => (
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
                  {activeTab === 'jobs' && safeJobs.filter(job => job.id).map(job => (
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
                  {activeTab === 'projects' && safeProjects.filter(project => project.id).map(project => (
                    <tr key={project.id} className={styles.tableRow}>
                      <td className={`${styles.tableCell} ${styles.tableCellMedium}`}>{project.title}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.messagePreview} title={project.description}>
                          {project.description.substring(0, 80)}{project.description.length > 80 ? '...' : ''}
                        </div>
                        <div className={styles.skillsContainer} style={{ marginTop: '0.5rem' }}>
                          <span className={`${styles.badge} ${styles.badgeBlue}`}>{project.category}</span>
                          {project.techStack.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className={`${styles.badge} ${styles.badgeBlue}`}>{tech}</span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className={`${styles.badge} ${styles.badgeBlue}`}>+{project.techStack.length - 3} more</span>
                          )}
                        </div>
                      </td>
                      <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>
                        <div className={styles.actionButtons}>
                          <button onClick={() => handleEdit(project)} className={`${styles.actionButton} ${styles.editButton}`}><Edit size={18} /></button>
                          <button onClick={() => handleDelete(project.id, 'projects')} className={`${styles.actionButton} ${styles.deleteButton}`}><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Applications View - Internship Applications */}
                  {activeTab === 'applications' && safeInternshipApplications.filter(app => app.id).map(app => (
                     <tr key={`internship-${app.id}`} className={styles.tableRow}>
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
                  {activeTab === 'applications' && safeJobApplications.filter(app => app.id).map(app => (
                     <tr key={`job-${app.id}`} className={styles.tableRow}>
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
                  {activeTab === 'messages' && safeContactMessages.filter(msg => msg.id).map(msg => (
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
                    <tr key="empty-state">
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

