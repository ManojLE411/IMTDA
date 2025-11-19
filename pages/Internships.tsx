
import React, { useState, useEffect } from 'react';
import { InternshipTrack, InternshipApplication, Student } from '../types';
import { CheckCircle, Clock, MapPin, Upload } from 'lucide-react';

interface InternshipsProps {
  tracks: InternshipTrack[];
  onApply: (app: InternshipApplication) => void;
  currentUser: Student | null;
}

const Internships: React.FC<InternshipsProps> = ({ tracks, onApply, currentUser }) => {
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
    
    const newApplication: InternshipApplication = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      course: selectedTrack,
      resumeName: formData.resume ? formData.resume.name : 'No file uploaded',
      message: formData.message,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      status: 'Pending',
      studentId: currentUser?.id
    };

    onApply(newApplication);
    setSubmitted(true);
    
    // Reset after delay for demo
    setTimeout(() => {
      setSubmitted(false);
      // Only reset non-user fields if logged in
      setFormData(prev => ({
        ...prev,
        resume: null,
        message: '',
        // Keep name/email/phone if logged in
        name: currentUser ? currentUser.name : '',
        email: currentUser ? currentUser.email : '',
        phone: currentUser ? currentUser.phone || '' : ''
      }));
      setSelectedTrack('');
    }, 5000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-imtda-primary mb-4">Industry-Ready Internships</h1>
          <p className="text-xl text-gray-600">Learn by doing. Join our rigorous training programs and work on live projects.</p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {tracks.map(track => (
            <div key={track.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col md:flex-row">
              <div className="md:w-2/5 h-48 md:h-auto relative">
                 <img src={track.image || `https://picsum.photos/400/200?random=${track.id}`} alt={track.title} className="absolute inset-0 w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="p-6 md:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="text-xl font-bold text-gray-900">{track.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{track.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {track.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 border-t pt-4 mt-2">
                  <span className="flex items-center gap-1"><Clock size={14} /> {track.duration}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {track.mode}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div id="apply" className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto border-t-4 border-imtda-accent">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Apply Now</h2>
          
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center animate-fade-in">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-2">Application Received!</h3>
              <p>Thank you for applying. {currentUser ? "Check your dashboard for status updates." : "Our team will review your profile and get back to you shortly."}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    onChange={handleInputChange}
                    value={formData.name}
                    readOnly={!!currentUser}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                    onChange={handleInputChange}
                    value={formData.email}
                    readOnly={!!currentUser}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="+91 98765 43210"
                    onChange={handleInputChange}
                    value={formData.phone}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interested Track</label>
                  <select 
                    name="course"
                    value={selectedTrack}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  >
                    <option value="">Select a Program</option>
                    {tracks.map(t => <option key={t.id} value={t.title}>{t.title}</option>)}
                  </select>
                </div>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF)</label>
                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 5MB</p>
                      {formData.resume && <p className="text-sm text-green-600 font-semibold mt-2">Selected: {formData.resume.name}</p>}
                    </div>
                  </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message / Queries</label>
                <textarea 
                  name="message"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Why do you want to join this program?"
                  onChange={handleInputChange}
                  value={formData.message}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-imtda-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors shadow-md"
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

export default Internships;
