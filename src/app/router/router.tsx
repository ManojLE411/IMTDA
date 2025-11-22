import React from 'react';
import { Page } from '@/shared/constants';
import { useAuth } from '@/features/auth';
import { BlogPage } from '@/features/blog';
import { AuthPage } from '@/features/auth';
import { InternshipsPage } from '@/features/internships';
import { TrainingPage } from '@/features/training';
import { AdminPage } from '@/features/admin';
import { StudentDashboardPage } from '@/features/student-dashboard';
import { HomePage } from '@/pages/home/HomePage';
import { AboutPage } from '@/pages/about/AboutPage';
import { ServicesPage } from '@/pages/services/ServicesPage';
import { ProjectsPage } from '@/pages/projects/ProjectsPage';
import { CareersPage } from '@/pages/careers/CareersPage';
import { ContactPage } from '@/pages/contact/ContactPage';

interface AppRouterProps {
  currentPage: Page;
  onNavigate: (page: Page, scrollToId?: string) => void;
}

export const AppRouter: React.FC<AppRouterProps> = ({ currentPage, onNavigate }) => {
  const { isAuthenticated } = useAuth();

  // Protected Route
  if (currentPage === Page.STUDENT_DASHBOARD && !isAuthenticated) {
    return <AuthPage initialMode="login" onNavigate={onNavigate} />;
  }

  switch (currentPage) {
    case Page.HOME:
      return <HomePage onNavigate={onNavigate} />;
    case Page.ABOUT:
      return <AboutPage onNavigate={onNavigate} />;
    case Page.SERVICES:
      return <ServicesPage onNavigate={onNavigate} />;
    case Page.PROJECTS:
      return <ProjectsPage />;
    case Page.CAREERS:
      return <CareersPage />;
    case Page.CONTACT:
      return <ContactPage />;
    case Page.BLOG:
      return <BlogPage />;
    case Page.INTERNSHIPS:
      return <InternshipsPage />;
    case Page.TRAINING:
      return <TrainingPage />;
    case Page.ADMIN:
      return <AdminPage onNavigate={onNavigate} />;
    case Page.LOGIN:
    case Page.REGISTER:
      return <AuthPage initialMode={currentPage === Page.LOGIN ? 'login' : 'register'} onNavigate={onNavigate} />;
    case Page.STUDENT_DASHBOARD:
      return <StudentDashboardPage onNavigate={onNavigate} />;
    default:
      return <HomePage onNavigate={onNavigate} />;
  }
};
