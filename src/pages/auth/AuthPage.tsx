/**
 * AuthPage Component
 * Login and registration page using React Router
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/auth.types';
import { Lock, Mail, User, Phone, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import logo from '@/assets/logo.png';
import { authSchema, loginSchema } from '@/utils/validation';
import styles from './AuthPage.module.css';

type AuthMode = 'login' | 'register';

export interface AuthPageProps {
  initialMode?: AuthMode;
}

interface LocationState {
  from?: { pathname: string };
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated, isLoading, user, isAdmin } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // Redirect if already authenticated - handles both initial load and after login
  useEffect(() => {
    // Only redirect if we're on login/register pages and user is authenticated
    const isOnAuthPage = location.pathname === '/login' || location.pathname === '/register';
    
    if (isAuthenticated && user && !isLoading && isOnAuthPage) {
      const state = location.state as LocationState | null;
      const from = state?.from?.pathname;
      
      // If there's a specific redirect path (from protected route), use it
      if (from) {
        navigate(from, { replace: true });
        return;
      }
      
      // Redirect based on user role - admins go to /admin, students to /dashboard
      if (isAdmin || user.role === UserRole.ADMIN) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, user, isAdmin, isLoading, navigate, location]);

  // Update mode when initialMode changes
  useEffect(() => {
    setMode(initialMode);
    setError('');
    setFormErrors({});
    setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  }, [initialMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear errors for this field
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    try {
      if (mode === 'register') {
        authSchema.parse(formData);
      } else {
        loginSchema.parse({ email: formData.email, password: formData.password });
      }
      setFormErrors({});
      return true;
    } catch (err: unknown) {
      // Properly handle ZodError
      if (err && typeof err === 'object' && 'issues' in err) {
        const zodError = err as { issues: Array<{ path: (string | number)[]; message: string }> };
        const errors: Record<string, string> = {};
        zodError.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0] as string] = issue.message;
          }
        });
        setFormErrors(errors);
      } else {
        // Fallback for unexpected errors
        setFormErrors({ _error: 'Validation failed. Please check your input.' });
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    try {
      if (mode === 'register') {
        await register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone.trim() || undefined, // Convert empty string to undefined
          password: formData.password,
        });
        // Navigation will be handled by useEffect when isAuthenticated becomes true
        // The useEffect watches isAuthenticated, user, and isLoading changes
      } else {
        // Login and redirect based on role
        await login({
          email: formData.email,
          password: formData.password,
        });
        
        // Redirect immediately after login completes
        // Check email directly to determine admin vs student
        const state = location.state as LocationState | null;
        const from = state?.from?.pathname;
        
        // If there's a specific redirect path (from protected route), use it
        if (from) {
          navigate(from, { replace: true });
        } else {
          // Check email to determine admin - admin@imtda.com goes to /admin
          // The user state might not be updated yet, so check email directly
          if (formData.email === 'admin@imtda.com') {
            navigate('/admin', { replace: true });
          } else {
            navigate('/dashboard', { replace: true });
          }
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(message);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setFormErrors({});
    setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        {/* Left Side - Visual & Branding */}
        <div className={styles.leftPanel}>
          <div className={styles.patternOverlay}></div>
          <div className={styles.leftContent}>
            <div className={styles.logoContainer}>
              <div className={styles.logoWrapper}>
                <img src={logo} alt="IMTDA" className={styles.logo} />
              </div>
              <span className={styles.brandName}>IMTDA</span>
            </div>
            <h2 className={styles.heading}>
              {mode === 'register' ? 'Join the Innovation Hub' : 'Welcome Back!'}
            </h2>
            <p className={styles.description}>
              {mode === 'register'
                ? 'Create an account to apply for internships, access exclusive training modules, and track your career progress.'
                : 'Log in to access your dashboard, view application status, and manage your learning journey.'}
            </p>
          </div>
          <div className={styles.footer}>
            &copy; 2025 IMTDA Infotech
          </div>
        </div>

        {/* Right Side - Form */}
        <div className={styles.rightPanel}>
          <h3 className={styles.formTitle}>
            {mode === 'register' ? <UserPlus className="text-imtda-accent" /> : <LogIn className="text-imtda-accent" />}
            {mode === 'register' ? 'Create Account' : 'Student Login'}
          </h3>

          <form className={styles.form} onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className={styles.registerFields}>
                <Input
                  label="Full Name"
                  name="name"
                  type="text"
                  required
                  leftIcon={<User className="h-5 w-5 text-gray-400" />}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  error={formErrors.name}
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  error={formErrors.phone}
                />
              </div>
            )}

            <Input
              label="Email Address"
              name="email"
              type="email"
              required
              leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
              placeholder="student@example.com"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              required
              leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
            />

            {mode === 'register' && (
              <div className={styles.registerFields}>
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  required
                  leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={formErrors.confirmPassword}
                />
              </div>
            )}

            {error && (
              <div className={styles.errorMessage} role="alert">
                {error}
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {mode === 'register' ? 'Create Account' : 'Sign In to Dashboard'}
            </Button>
          </form>

          <div className={styles.toggleLink}>
            <p className={styles.toggleText}>
              {mode === 'register' ? "Already have an account?" : "Don't have an account?"}
              <Link
                to={mode === 'register' ? '/login' : '/register'}
                onClick={toggleMode}
                className={styles.toggleLinkAnchor}
              >
                {mode === 'register' ? 'Sign In' : 'Sign Up Now'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

