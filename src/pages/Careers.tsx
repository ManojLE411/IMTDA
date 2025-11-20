import React from 'react';
import { JobListing } from '../../types';
import { MapPin, Briefcase, Clock } from 'lucide-react';

const jobs: JobListing[] = [
  { id: '1', title: 'AI Research Engineer', department: 'R&D', type: 'Full-time', location: 'Remote' },
  { id: '2', title: 'Frontend Developer (React)', department: 'Engineering', type: 'Full-time', location: 'On-site' },
  { id: '3', title: 'Technical Trainer (VLSI)', department: 'Education', type: 'Contract', location: 'Hybrid' },
  { id: '4', title: 'Business Development Executive', department: 'Sales', type: 'Full-time', location: 'On-site' },
];

const Careers: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Join Our Team</h1>
          <p className="mt-4 text-xl text-gray-600">Be part of a dynamic team shaping the future of EdTech and AI.</p>
        </div>

        {/* Culture Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
           <div className="bg-white p-6 rounded-xl shadow-sm text-center">
             <div className="text-4xl mb-2">🚀</div>
             <h3 className="font-bold text-lg">Innovation First</h3>
             <p className="text-sm text-gray-500 mt-2">We encourage out-of-the-box thinking and rapid prototyping.</p>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm text-center">
             <div className="text-4xl mb-2">🎓</div>
             <h3 className="font-bold text-lg">Continuous Learning</h3>
             <p className="text-sm text-gray-500 mt-2">Access to premium courses and mentorship for every employee.</p>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm text-center">
             <div className="text-4xl mb-2">⚖️</div>
             <h3 className="font-bold text-lg">Work-Life Balance</h3>
             <p className="text-sm text-gray-500 mt-2">Flexible working hours and hybrid work models.</p>
           </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm text-gray-500">
                   <span className="flex items-center gap-1"><Briefcase size={14} /> {job.department}</span>
                   <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                   <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                </div>
              </div>
              <button className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>Don't see a matching role? Send your resume to <a href="mailto:careers@imtdainfotech.com" className="text-blue-600 font-semibold hover:underline">careers@imtdainfotech.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
