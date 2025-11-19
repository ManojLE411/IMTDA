
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Internships from './pages/Internships';
import Projects from './pages/Projects';
import Training from './pages/Training';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Admin from './pages/Admin';
import AuthPage from './pages/Login'; // Unified Auth Page
import StudentDashboard from './pages/StudentDashboard';
import { Page, BlogPost, InternshipTrack, TrainingProgram, InternshipApplication, Student } from './types';
import { MessageCircle } from 'lucide-react';

// Default Data
const defaultPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Education',
    excerpt: 'Artificial Intelligence is reshaping how we learn, teach, and assess. From personalized learning paths to automated grading, the possibilities are endless.',
    content: `Artificial Intelligence is reshaping how we learn, teach, and assess. From personalized learning paths to automated grading, the possibilities are endless.

    In the last decade, EdTech has moved from simple digitized classrooms to intelligent adaptive learning systems. AI models can now predict student performance, identify learning gaps, and suggest tailored resources.

    At IMTDA, we believe in integrating these technologies into our internship programs to ensure students are not just users of AI, but creators of it.`,
    author: 'Kishore Gundu',
    date: 'Jan 15, 2025',
    category: 'AI & Tech',
    image: 'https://picsum.photos/800/400?random=100'
  },
  {
    id: '2',
    title: 'Top Skills for 2025 Engineering Graduates',
    excerpt: 'The job market is evolving. Here are the top technical and soft skills you need to stay relevant in the industry.',
    content: `The job market is evolving rapidly. With the rise of generative AI and automation, traditional coding roles are shifting towards system architecture and problem-solving.

    1. **AI & Machine Learning**: Understanding the basics of LLMs and data pipelines.
    2. **Full Stack Development**: The ability to build end-to-end solutions.
    3. **Cloud Computing**: AWS, Azure, and Google Cloud are now standard requirements.
    4. **Soft Skills**: Adaptability and communication are more important than ever.

    Start preparing today to secure your future.`,
    author: 'Team IMTDA',
    date: 'Jan 20, 2025',
    category: 'Education',
    image: 'https://picsum.photos/800/400?random=101'
  },
  {
    id: '3',
    title: 'Understanding VLSI: From Logic to Layout',
    excerpt: 'A deep dive into the Very Large Scale Integration industry and why chip design is crucial for modern electronics.',
    content: `VLSI (Very Large Scale Integration) is the process of creating an integrated circuit (IC) by combining millions of MOS transistors onto a single chip.

    As devices get smaller and faster, the demand for skilled VLSI engineers is skyrocketing. This post covers the flow from RTL design using Verilog to physical layout and verification.`,
    author: 'Tech Lead',
    date: 'Feb 02, 2025',
    category: 'Industry Trends',
    image: 'https://picsum.photos/800/400?random=102'
  }
];

const defaultTracks: InternshipTrack[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    duration: '2 Months',
    mode: 'Hybrid',
    skills: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    description: 'Build scalable web applications from scratch using the MERN stack.',
    image: 'https://picsum.photos/400/200?random=1'
  },
  {
    id: '2',
    title: 'AI & Machine Learning',
    duration: '2 Months',
    mode: 'Online',
    skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-Learn'],
    description: 'Dive deep into neural networks, predictive modeling, and data analysis.',
    image: 'https://picsum.photos/400/200?random=2'
  },
  {
    id: '3',
    title: 'VLSI Design & Verification',
    duration: '3 Months',
    mode: 'Offline',
    skills: ['Verilog', 'SystemVerilog', 'UVM', 'RTL Design'],
    description: 'Master the art of chip design and verification methodologies.',
    image: 'https://picsum.photos/400/200?random=3'
  },
  {
    id: '4',
    title: 'AutoCAD & Mechanical Design',
    duration: '1 Month',
    mode: 'Offline',
    skills: ['AutoCAD', 'CATIA', 'ANSYS', '3D Modeling'],
    description: 'Industrial standard training for mechanical design and simulations.',
    image: 'https://picsum.photos/400/200?random=4'
  }
];

const defaultPrograms: TrainingProgram[] = [
  {
    id: '1',
    title: 'Institutional Training',
    category: 'Institutional',
    description: 'Comprehensive training packages for colleges and universities.',
    features: ['College MoU Partnerships', 'Faculty Development Programs (FDP)', 'Guest Lectures & Workshops', 'Lab Setup Assistance']
  },
  {
    id: '2',
    title: 'Corporate Solutions',
    category: 'Corporate',
    description: 'Advanced upskilling and consultancy for businesses.',
    features: ['Employee Upskilling (AI/ML/DevOps)', 'Custom Software Development', 'Technical Consultancy', 'Workflow Automation']
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // State Management
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [internshipTracks, setInternshipTracks] = useState<InternshipTrack[]>([]);
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>([]);
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  
  // Auth State
  const [students, setStudents] = useState<Student[]>([]);
  const [currentUser, setCurrentUser] = useState<Student | null>(null);

  // Initialize Data
  useEffect(() => {
    const loadData = (key: string, setter: React.Dispatch<React.SetStateAction<any[]>>, defaults: any[]) => {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          setter(JSON.parse(stored));
        } catch (e) {
          console.error(`Failed to parse ${key}`, e);
          setter(defaults);
        }
      } else {
        setter(defaults);
      }
    };

    loadData('imtda_blog_posts', setPosts, defaultPosts);
    loadData('imtda_internships', setInternshipTracks, defaultTracks);
    loadData('imtda_training', setTrainingPrograms, defaultPrograms);
    loadData('imtda_applications', setApplications, []);
    loadData('imtda_students', setStudents, []);
    
    // Load session
    const savedUser = localStorage.getItem('imtda_currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch(e) {
        console.error("Session Error", e);
      }
    }
  }, []);

  // Persist Data
  useEffect(() => {
    if (posts.length > 0) localStorage.setItem('imtda_blog_posts', JSON.stringify(posts));
  }, [posts]);
  useEffect(() => {
    if (internshipTracks.length > 0) localStorage.setItem('imtda_internships', JSON.stringify(internshipTracks));
  }, [internshipTracks]);
  useEffect(() => {
    if (trainingPrograms.length > 0) localStorage.setItem('imtda_training', JSON.stringify(trainingPrograms));
  }, [trainingPrograms]);
  useEffect(() => {
    localStorage.setItem('imtda_applications', JSON.stringify(applications));
  }, [applications]);
  useEffect(() => {
    localStorage.setItem('imtda_students', JSON.stringify(students));
  }, [students]);

  // Session persistence
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('imtda_currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('imtda_currentUser');
    }
  }, [currentUser]);

  const handleNavigate = (page: Page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  // CRUD Wrappers
  const createOrUpdate = <T extends { id: string }>(item: T, list: T[], setter: React.Dispatch<React.SetStateAction<T[]>>) => {
    if (list.some(i => i.id === item.id)) {
      setter(list.map(i => i.id === item.id ? item : i));
    } else {
      setter([item, ...list]);
    }
  };

  const deleteItem = <T extends { id: string }>(id: string, list: T[], setter: React.Dispatch<React.SetStateAction<T[]>>) => {
    setter(list.filter(i => i.id !== id));
  };

  // Handlers
  const handleSavePost = (post: BlogPost) => createOrUpdate(post, posts, setPosts);
  const handleDeletePost = (id: string) => deleteItem(id, posts, setPosts);

  const handleSaveTrack = (track: InternshipTrack) => createOrUpdate(track, internshipTracks, setInternshipTracks);
  const handleDeleteTrack = (id: string) => deleteItem(id, internshipTracks, setInternshipTracks);

  const handleSaveProgram = (program: TrainingProgram) => createOrUpdate(program, trainingPrograms, setTrainingPrograms);
  const handleDeleteProgram = (id: string) => deleteItem(id, trainingPrograms, setTrainingPrograms);

  // Application Handlers
  const handleNewApplication = (app: InternshipApplication) => {
    setApplications(prev => [app, ...prev]);
  };
  const handleDeleteApplication = (id: string) => deleteItem(id, applications, setApplications);

  // Auth Handlers
  const handleRegister = (newStudent: Student) => {
    if (students.some(s => s.email === newStudent.email)) {
      return false; // Email exists
    }
    setStudents(prev => [...prev, newStudent]);
    setCurrentUser(newStudent);
    handleNavigate(Page.STUDENT_DASHBOARD);
    return true;
  };

  const handleLogin = (email: string, pass: string) => {
    const user = students.find(s => s.email === email && s.password === pass);
    if (user) {
      setCurrentUser(user);
      handleNavigate(Page.STUDENT_DASHBOARD);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleNavigate(Page.HOME);
  };

  useEffect(() => {
    const checkScroll = () => {
      if (!showScrollTop && window.pageYOffset > 400){
        setShowScrollTop(true)
      } else if (showScrollTop && window.pageYOffset <= 400){
        setShowScrollTop(false)
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScrollTop]);

  // Render Helper
  const renderPage = () => {
    // Protected Route
    if (currentPage === Page.STUDENT_DASHBOARD && !currentUser) {
      // Redirect to unified login if trying to access dashboard without auth
      return <AuthPage initialMode="login" onLogin={handleLogin} onRegister={handleRegister} onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case Page.HOME: return <Home onNavigate={handleNavigate} />;
      case Page.ABOUT: return <About />;
      case Page.INTERNSHIPS: return <Internships tracks={internshipTracks} onApply={handleNewApplication} currentUser={currentUser} />;
      case Page.PROJECTS: return <Projects />;
      case Page.TRAINING: return <Training programs={trainingPrograms} />;
      case Page.CAREERS: return <Careers />;
      case Page.BLOG: return <Blog posts={posts} />;
      case Page.ADMIN: return (
        <Admin 
          posts={posts} onSavePost={handleSavePost} onDeletePost={handleDeletePost}
          internshipTracks={internshipTracks} onSaveTrack={handleSaveTrack} onDeleteTrack={handleDeleteTrack}
          trainingPrograms={trainingPrograms} onSaveProgram={handleSaveProgram} onDeleteProgram={handleDeleteProgram}
          applications={applications} onDeleteApplication={handleDeleteApplication}
          onNavigate={handleNavigate} 
        />
      );
      case Page.CONTACT: return <Contact />;
      case Page.LOGIN: return <AuthPage initialMode="login" onLogin={handleLogin} onRegister={handleRegister} onNavigate={handleNavigate} />;
      case Page.REGISTER: return <AuthPage initialMode="register" onLogin={handleLogin} onRegister={handleRegister} onNavigate={handleNavigate} />;
      case Page.STUDENT_DASHBOARD: return (
        <StudentDashboard 
          student={currentUser!} 
          applications={applications}
          availableInternships={internshipTracks}
          availableTraining={trainingPrograms}
          onNavigate={handleNavigate}
        />
      );
      default: return <Home onNavigate={handleNavigate} />;
    }
  };

  // Only Admin page hides navigation. Auth pages (Login/Register) now show navigation.
  const hideNavPages = [Page.ADMIN];

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      {!hideNavPages.includes(currentPage) && (
        <Navbar 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      {!hideNavPages.includes(currentPage) && (
        <Footer onNavigate={handleNavigate} />
      )}

      {/* Floating WhatsApp/Contact Button */}
      {!hideNavPages.includes(currentPage) && (
        <a 
          href="https://wa.me/916302305973" 
          target="_blank" 
          rel="noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 hover:scale-110 animate-bounce"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      )}
    </div>
  );
};

export default App;
