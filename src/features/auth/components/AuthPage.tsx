import React, { useState, useEffect } from 'react';
import { Page } from '@/shared/constants';
import { useAuth } from '../hooks/useAuth';
import { Student } from '../types/auth.types';
import { Lock, Mail, User, Phone, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import logo from '@/assets/logo.png';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
  onNavigate: (page: Page) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login', onNavigate }) => {
  const { login, register, isAuthenticated } = useAuth();
  const [isRegistering, setIsRegistering] = useState(initialMode === 'register');
  const [error, setError] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      onNavigate(Page.STUDENT_DASHBOARD);
    }
  }, [isAuthenticated, onNavigate]);

  useEffect(() => {
    setIsRegistering(initialMode === 'register');
    setError('');
    setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  }, [initialMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegistering) {
      // Registration Logic
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords don't match");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      const newStudent: Student = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        enrolledPrograms: []
      };

      if (register(newStudent)) {
        onNavigate(Page.STUDENT_DASHBOARD);
      } else {
        setError('Email already registered.');
      }
    } else {
      // Login Logic
      if (login(formData.email, formData.password)) {
        onNavigate(Page.STUDENT_DASHBOARD);
      } else {
        setError('Invalid email or password.');
      }
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  return (
    <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
        
        {/* Left Side - Visual & Branding */}
        <div className="md:w-1/2 bg-imtda-primary text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
               <div className="bg-white p-2 rounded-lg">
                 <img src={logo} alt="IMTDA" className="w-10 h-10 object-contain" />
               </div>
               <span className="text-xl font-bold tracking-widest">IMTDA</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {isRegistering ? "Join the Innovation Hub" : "Welcome Back!"}
            </h2>
            <p className="text-blue-100 leading-relaxed">
              {isRegistering 
                ? "Create an account to apply for internships, access exclusive training modules, and track your career progress." 
                : "Log in to access your dashboard, view application status, and manage your learning journey."}
            </p>
          </div>
          <div className="relative z-10 mt-8 text-sm text-blue-200">
            &copy; 2025 IMTDA Infotech
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            {isRegistering ? <UserPlus className="text-imtda-accent" /> : <LogIn className="text-imtda-accent" />}
            {isRegistering ? 'Create Account' : 'Student Login'}
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {isRegistering && (
              <div className="animate-slide-up space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="name"
                      type="text"
                      required
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {isRegistering && (
              <div className="animate-slide-up">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-100 animate-fade-in">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-imtda-primary text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              {isRegistering ? 'Create Account' : 'Sign In to Dashboard'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isRegistering ? "Already have an account?" : "Don't have an account?"}
              <button 
                onClick={toggleMode} 
                className="ml-2 font-bold text-imtda-primary hover:text-imtda-accent hover:underline transition-colors"
              >
                {isRegistering ? "Sign In" : "Sign Up Now"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

