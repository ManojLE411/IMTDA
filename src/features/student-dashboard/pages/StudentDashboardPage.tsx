import React from 'react';
import { Page } from '@/shared/constants';
import { useAuth } from '@/features/auth';
import { useInternshipApplication } from '@/features/internships/hooks/useInternshipApplication';
import { useTrainingPrograms } from '@/features/training/hooks/useTrainingPrograms';
import { User, BookOpen, Clock, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface StudentDashboardPageProps {
  onNavigate: (page: Page) => void;
}

export const StudentDashboardPage: React.FC<StudentDashboardPageProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { applications } = useInternshipApplication();
  const { programs } = useTrainingPrograms();

  if (!currentUser) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center">
        <div className="text-center text-gray-500">Please log in to view your dashboard.</div>
      </div>
    );
  }

  // Filter applications for this student
  const myApplications = applications.filter(app => app.email === currentUser.email || app.studentId === currentUser.id);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'Rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Approved': return <CheckCircle size={16} />;
      case 'Rejected': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 flex flex-col md:flex-row items-center gap-6 animate-fade-in">
           <div className="w-20 h-20 bg-imtda-primary text-white rounded-full flex items-center justify-center text-3xl font-bold">
             {currentUser.name.charAt(0).toUpperCase()}
           </div>
           <div>
             <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser.name}!</h1>
             <p className="text-gray-600 mt-1 flex items-center gap-2"><User size={16} /> Student Profile • {currentUser.email}</p>
           </div>
           <div className="ml-auto flex gap-3">
              <button onClick={() => onNavigate(Page.TRAINING)} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium transition-colors">
                 Browse Training
              </button>
              <button onClick={() => onNavigate(Page.INTERNSHIPS)} className="px-4 py-2 bg-imtda-accent text-white rounded-lg hover:bg-blue-400 font-medium transition-colors shadow-md">
                 Apply New Internship
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Applications Status */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Internship Applications */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
               <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                 <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                   <FileText size={20} className="text-imtda-primary" /> My Internship Applications
                 </h2>
                 <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">{myApplications.length}</span>
               </div>
               
               <div className="p-6">
                 {myApplications.length > 0 ? (
                   <div className="space-y-4">
                     {myApplications.map(app => (
                       <div key={app.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                             <h3 className="font-bold text-gray-900">{app.course}</h3>
                             <p className="text-sm text-gray-500">Applied on: {app.date}</p>
                          </div>
                          <div className={`px-3 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(app.status)}`}>
                             {getStatusIcon(app.status)} {app.status}
                          </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="text-center py-8 text-gray-500">
                     <AlertCircle size={48} className="mx-auto mb-3 text-gray-300" />
                     <p>You haven't applied for any internships yet.</p>
                     <button onClick={() => onNavigate(Page.INTERNSHIPS)} className="text-imtda-primary font-semibold hover:underline mt-2">Browse Internships</button>
                   </div>
                 )}
               </div>
            </div>

            {/* Recommended Training */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
               <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                 <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                   <BookOpen size={20} className="text-imtda-primary" /> Recommended Training Programs
                 </h2>
               </div>
               <div className="p-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {programs.slice(0, 2).map(prog => (
                      <div key={prog.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                         <h3 className="font-bold text-gray-800">{prog.title}</h3>
                         <p className="text-sm text-gray-600 mt-1 line-clamp-2">{prog.description}</p>
                         <button onClick={() => onNavigate(Page.TRAINING)} className="mt-3 text-sm text-imtda-primary font-medium hover:underline">View Details</button>
                      </div>
                    ))}
                 </div>
               </div>
            </div>

          </div>

          {/* Right Column: Profile & Stats */}
          <div className="space-y-8">
             <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">My Profile</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500">Full Name</span>
                    <span className="font-medium text-gray-900">{currentUser.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium text-gray-900">{currentUser.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500">Phone</span>
                    <span className="font-medium text-gray-900">{currentUser.phone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-medium text-gray-900">{new Date().getFullYear()}</span>
                  </div>
                </div>
             </div>

             <div className="bg-gradient-to-br from-imtda-primary to-blue-900 rounded-xl shadow-md p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                <p className="text-blue-100 text-sm mb-4">Contact our support team for queries regarding your application status.</p>
                <button onClick={() => onNavigate(Page.CONTACT)} className="w-full bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg py-2 text-sm font-medium transition-colors">
                  Contact Support
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

