import React, { useState } from 'react';
import { Page } from '@/shared/constants';
import { BlogPostForm } from '@/features/blog/components/BlogPostForm';
import { InternshipForm } from '@/features/internships/components/InternshipForm';
import { TrainingForm } from '@/features/training/components/TrainingForm';
import { EmployeeForm } from '@/features/employees/components/EmployeeForm';
import { useBlogPosts } from '@/features/blog/hooks/useBlogPosts';
import { useInternships } from '@/features/internships/hooks/useInternships';
import { useTrainingPrograms } from '@/features/training/hooks/useTrainingPrograms';
import { useInternshipApplication } from '@/features/internships/hooks/useInternshipApplication';
import { useEmployees } from '@/features/employees/hooks/useEmployees';
import { useContactMessages } from '@/features/contact';
import { Plus, Edit, Trash2, LogOut, Lock, ArrowLeft, AlertCircle, Layout, Briefcase, BookOpen, Users, FileText, Mail, Phone, Calendar, CheckCircle, XCircle, Clock, UserCircle, MessageSquare, Eye, Reply } from 'lucide-react';
import logo from '@/assets/logo.png';

interface AdminPageProps {
  onNavigate: (page: Page) => void;
}

type AdminTab = 'blog' | 'internships' | 'training' | 'applications' | 'employees' | 'messages';

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { posts, savePost, deletePost } = useBlogPosts();
  const { tracks: internships, saveTrack: saveInternship, deleteTrack: deleteInternship } = useInternships();
  const { programs, saveProgram, deleteProgram } = useTrainingPrograms();
  const { applications, deleteApplication } = useInternshipApplication();
  const { employees, saveEmployee, deleteEmployee } = useEmployees();
  const { messages: contactMessages, deleteMessage, markAsRead, markAsReplied } = useContactMessages();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('blog');
  const [isEditing, setIsEditing] = useState(false);
  const [currentData, setCurrentData] = useState<any>({});
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }
    // Simple mock authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  // Generic Edit Handler
  const handleEdit = (data: any) => {
    setCurrentData(data);
    setIsEditing(true);
  };

  // Generic Delete Handler
  const handleDelete = (id: string, type: AdminTab) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'blog') deletePost(id);
      if (type === 'internships') deleteInternship(id);
      if (type === 'training') deleteProgram(id);
      if (type === 'applications') deleteApplication(id);
      if (type === 'employees') deleteEmployee(id);
      if (type === 'messages') deleteMessage(id);
    }
  };

  // Create Handlers
  const handleCreatePost = () => {
    setCurrentData({
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      image: ''
    });
    setIsEditing(true);
  };

  const handleCreateTrack = () => {
    setCurrentData({
      id: Date.now().toString(),
      skills: [],
      image: ''
    });
    setIsEditing(true);
  };

  const handleCreateProgram = () => {
    setCurrentData({
      id: Date.now().toString(),
      features: []
    });
    setIsEditing(true);
  };

  const handleCreateEmployee = () => {
    setCurrentData({
      id: Date.now().toString(),
      skills: [],
      image: 'https://picsum.photos/400/300?random=' + Math.floor(Math.random() * 1000)
    });
    setIsEditing(true);
  };

  // Save Handlers
  const handleSave = (data: any) => {
    if (activeTab === 'blog') savePost(data);
    if (activeTab === 'internships') saveInternship(data);
    if (activeTab === 'training') saveProgram(data);
    if (activeTab === 'employees') saveEmployee(data);
    setIsEditing(false);
    setCurrentData({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentData({});
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative animate-fade-in">
          
          <div className="text-center mb-6">
            <div className="w-32 mx-auto mb-4 bg-white p-3 rounded-lg">
              <img src={logo} alt="IMTDA Logo" className="w-full h-auto object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-500">Enter credentials to access dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-all ${
                  error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter password (admin123)"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2 animate-fade-in">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <button type="submit" className="w-full bg-imtda-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-md">
              Login
            </button>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 pt-4">
            <button 
              onClick={() => onNavigate(Page.HOME)} 
              className="text-gray-500 hover:text-imtda-primary text-sm flex items-center justify-center gap-2 mx-auto transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm hidden md:block flex-shrink-0">
        <div className="p-6 border-b border-gray-100 flex items-center justify-center">
          <h2 className="text-xl font-bold text-imtda-primary tracking-wide">DASHBOARD</h2>
        </div>
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => { setActiveTab('blog'); setIsEditing(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'blog' ? 'bg-blue-50 text-imtda-primary font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Layout size={20} /> <span>Blog Posts</span>
          </button>
          <button 
            onClick={() => { setActiveTab('internships'); setIsEditing(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'internships' ? 'bg-blue-50 text-imtda-primary font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Briefcase size={20} /> <span>Internships</span>
          </button>
          <button 
            onClick={() => { setActiveTab('training'); setIsEditing(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'training' ? 'bg-blue-50 text-imtda-primary font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <BookOpen size={20} /> <span>Training</span>
          </button>
           <button 
            onClick={() => { setActiveTab('applications'); setIsEditing(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'applications' ? 'bg-blue-50 text-imtda-primary font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users size={20} /> <span>Applications</span>
          </button>
          <button 
            onClick={() => { setActiveTab('employees'); setIsEditing(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'employees' ? 'bg-blue-50 text-imtda-primary font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <UserCircle size={20} /> <span>Employees</span>
          </button>
          <button 
            onClick={() => { setActiveTab('messages'); setIsEditing(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'messages' ? 'bg-blue-50 text-imtda-primary font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <MessageSquare size={20} /> <span>Contact Messages</span>
          </button>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button 
             onClick={() => setIsAuthenticated(false)}
             className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-red-600 transition-colors p-2"
           >
             <LogOut size={18} /> Logout
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4 md:hidden">
             <button 
               onClick={() => onNavigate(Page.HOME)}
               className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-imtda-primary"
             >
               <ArrowLeft size={20} />
             </button>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => onNavigate(Page.HOME)} className="text-sm text-gray-500 hover:text-imtda-primary flex items-center gap-1">
              <ArrowLeft size={14} /> Back to Website
            </button>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">{activeTab} Management</h1>
        </div>

        {/* Mobile Tabs (Visible only on small screens) */}
        <div className="md:hidden flex space-x-2 mb-6 overflow-x-auto pb-2">
           <button onClick={() => { setActiveTab('blog'); setIsEditing(false); }} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'blog' ? 'bg-imtda-primary text-white' : 'bg-white text-gray-600'}`}>Blog</button>
           <button onClick={() => { setActiveTab('internships'); setIsEditing(false); }} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'internships' ? 'bg-imtda-primary text-white' : 'bg-white text-gray-600'}`}>Internships</button>
           <button onClick={() => { setActiveTab('training'); setIsEditing(false); }} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'training' ? 'bg-imtda-primary text-white' : 'bg-white text-gray-600'}`}>Training</button>
           <button onClick={() => { setActiveTab('applications'); setIsEditing(false); }} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'applications' ? 'bg-imtda-primary text-white' : 'bg-white text-gray-600'}`}>Applications</button>
           <button onClick={() => { setActiveTab('employees'); setIsEditing(false); }} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'employees' ? 'bg-imtda-primary text-white' : 'bg-white text-gray-600'}`}>Employees</button>
           <button onClick={() => { setActiveTab('messages'); setIsEditing(false); }} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'messages' ? 'bg-imtda-primary text-white' : 'bg-white text-gray-600'}`}>Messages</button>
        </div>

        {isEditing ? (
          <div>
             {activeTab === 'blog' && <BlogPostForm initialData={currentData} onSave={handleSave} onCancel={handleCancel} />}
             {activeTab === 'internships' && <InternshipForm initialData={currentData} onSave={handleSave} onCancel={handleCancel} />}
             {activeTab === 'training' && <TrainingForm initialData={currentData} onSave={handleSave} onCancel={handleCancel} />}
             {activeTab === 'employees' && <EmployeeForm initialData={currentData} onSave={handleSave} onCancel={handleCancel} />}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-700 uppercase tracking-wider text-sm">
                {activeTab === 'blog' ? 'All Posts' : 
                 activeTab === 'internships' ? 'All Tracks' : 
                 activeTab === 'training' ? 'All Programs' : 
                 activeTab === 'employees' ? 'All Employees' : 
                 activeTab === 'messages' ? 'Contact Messages' : 'Application Requests'}
              </h3>
              {activeTab !== 'applications' && activeTab !== 'messages' && (
                <button 
                  onClick={activeTab === 'blog' ? handleCreatePost : 
                           activeTab === 'internships' ? handleCreateTrack : 
                           activeTab === 'training' ? handleCreateProgram :
                           handleCreateEmployee}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Plus size={18} /> Add New
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                  <tr>
                    <th className="py-4 px-6 text-left">
                      {activeTab === 'applications' ? 'Applicant' : 
                       activeTab === 'messages' ? 'From' : 
                       activeTab === 'employees' ? 'Name' : 'Title'}
                    </th>
                    <th className="py-4 px-6 text-left">
                       {activeTab === 'applications' ? 'Details' : 
                        activeTab === 'messages' ? 'Subject & Contact' : 
                        activeTab === 'employees' ? 'Role & Skills' : 'Info'}
                    </th>
                    {(activeTab === 'applications' || activeTab === 'messages') && (
                      <th className="py-4 px-6 text-left">
                        {activeTab === 'applications' ? 'Resume/Message' : 'Message'}
                      </th>
                    )}
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 divide-y divide-gray-100">
                  {activeTab === 'blog' && posts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium">{post.title}</td>
                      <td className="py-4 px-6"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">{post.category}</span></td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => handleEdit(post)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                          <button onClick={() => handleDelete(post.id, 'blog')} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeTab === 'internships' && internships.map(track => (
                    <tr key={track.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium">{track.title}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{track.duration} • {track.mode}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => handleEdit(track)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                          <button onClick={() => handleDelete(track.id, 'internships')} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeTab === 'training' && programs.map(program => (
                    <tr key={program.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium">{program.title}</td>
                      <td className="py-4 px-6"><span className={`px-2 py-1 rounded-full text-xs ${program.category === 'Institutional' ? 'bg-purple-50 text-purple-700' : 'bg-orange-50 text-orange-700'}`}>{program.category}</span></td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => handleEdit(program)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                          <button onClick={() => handleDelete(program.id, 'training')} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeTab === 'employees' && employees.map(employee => (
                    <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium">{employee.name}</td>
                      <td className="py-4 px-6 text-sm">
                        <div className="font-semibold text-imtda-primary mb-1">{employee.role}</div>
                        <div className="flex flex-wrap gap-1">
                          {employee.skills.map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">{skill}</span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => handleEdit(employee)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                          <button onClick={() => handleDelete(employee.id, 'employees')} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Applications View */}
                  {activeTab === 'applications' && applications.map(app => (
                     <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                         <div className="font-bold text-gray-900">{app.name}</div>
                         <div className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Calendar size={12}/> {app.date}</div>
                      </td>
                      <td className="py-4 px-6 text-sm">
                         <div className="font-semibold text-imtda-primary">{app.course}</div>
                         <div className="flex flex-col mt-1 text-xs text-gray-500 gap-1">
                            <span className="flex items-center gap-1"><Mail size={12} /> {app.email}</span>
                            <span className="flex items-center gap-1"><Phone size={12} /> {app.phone}</span>
                         </div>
                         <div className={`mt-2 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${
                           app.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : 
                           app.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : 
                           'bg-yellow-50 text-yellow-700 border-yellow-200'
                         }`}>
                           {app.status === 'Approved' ? <CheckCircle size={10} /> : 
                            app.status === 'Rejected' ? <XCircle size={10} /> : 
                            <Clock size={10} />} {app.status}
                         </div>
                      </td>
                      <td className="py-4 px-6 text-sm">
                         <div className="flex items-center gap-1 text-blue-600 mb-1">
                            <FileText size={14} /> 
                            <span className="text-xs font-medium truncate max-w-[150px]" title={app.resumeName}>{app.resumeName}</span>
                         </div>
                         <div className="text-gray-600 text-xs italic line-clamp-2" title={app.message}>
                           "{app.message}"
                         </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => handleDelete(app.id, 'applications')} className="text-red-500 hover:text-red-700" title="Delete Application"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Contact Messages View */}
                  {activeTab === 'messages' && contactMessages.map(msg => (
                    <tr key={msg.id} className={`hover:bg-gray-50 transition-colors ${msg.status === 'New' ? 'bg-blue-50/30' : ''}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-3">
                          {msg.status === 'New' && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                          )}
                          <div className="flex-1">
                            <div className="font-bold text-gray-900 flex items-center gap-2">
                              {msg.name}
                              {msg.status === 'New' && (
                                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-semibold">NEW</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Calendar size={12} /> {msg.date}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <div className="font-semibold text-imtda-primary mb-2">{msg.subject}</div>
                        <div className="flex flex-col gap-1 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Mail size={12} className="text-gray-400" /> 
                            <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">{msg.email}</a>
                          </span>
                        </div>
                        <div className={`mt-2 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${
                          msg.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                          msg.status === 'Replied' ? 'bg-green-50 text-green-700 border-green-200' : 
                          'bg-gray-50 text-gray-700 border-gray-200'
                        }`}>
                          {msg.status === 'New' ? <AlertCircle size={10} /> : 
                           msg.status === 'Replied' ? <CheckCircle size={10} /> : 
                           <Eye size={10} />} {msg.status}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <div className="text-gray-700 text-sm leading-relaxed line-clamp-3" title={msg.message}>
                          "{msg.message}"
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          {msg.status === 'New' && (
                            <button 
                              onClick={() => markAsRead(msg.id)} 
                              className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 transition-colors" 
                              title="Mark as Read"
                            >
                              <Eye size={16} />
                            </button>
                          )}
                          {msg.status !== 'Replied' && (
                            <button 
                              onClick={() => markAsReplied(msg.id)} 
                              className="text-green-600 hover:text-green-800 p-1.5 rounded hover:bg-green-50 transition-colors" 
                              title="Mark as Replied"
                            >
                              <Reply size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(msg.id, 'messages')} 
                            className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors" 
                            title="Delete Message"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {((activeTab === 'blog' && posts.length === 0) || 
                    (activeTab === 'internships' && internships.length === 0) || 
                    (activeTab === 'training' && programs.length === 0) ||
                    (activeTab === 'employees' && employees.length === 0) ||
                    (activeTab === 'applications' && applications.length === 0) ||
                    (activeTab === 'messages' && contactMessages.length === 0)) && (
                    <tr>
                      <td colSpan={activeTab === 'applications' || activeTab === 'messages' ? 4 : 3} className="py-8 text-center text-gray-500">
                        {activeTab === 'applications' ? 'No applications received yet.' : 
                         activeTab === 'messages' ? 'No contact messages received yet.' : 
                         "No items found. Click 'Add New' to start."}
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


