/**
 * AppRouter
 * Main router configuration with React Router v7
 * Includes nested routes, lazy loading, and route protection
 */

import React, { Suspense, lazy, useCallback } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { ReduxProvider } from '@/store/ReduxProvider';
import { ProtectedRoute } from '@/routes';
import { UserRole } from '@/types/auth.types';
import { MainLayout } from '@/layouts';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

// Loading component
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-imtda-primary mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Error page component for React Router
const ErrorPage: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  
  let errorMessage = 'An unexpected error occurred';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || errorMessage;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  const handleGoHome = React.useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  const handleReload = React.useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-shrink-0">
            <AlertCircle className="h-12 w-12 text-red-500" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {errorStatus === 404 ? 'Page Not Found' : 'Something went wrong'}
            </h1>
            <p className="text-gray-600 mt-1">
              {errorStatus === 404 
                ? "The page you're looking for doesn't exist."
                : "We're sorry, but something unexpected happened."}
            </p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h2 className="text-sm font-semibold text-red-800 mb-2">Error Details:</h2>
          <p className="text-sm text-red-700 font-mono break-all">{errorMessage}</p>
          {errorStatus && (
            <p className="text-xs text-red-600 mt-2">Status Code: {errorStatus}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleReload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            type="button"
          >
            <RefreshCw size={18} aria-hidden="true" />
            Reload Page
          </button>
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            type="button"
          >
            <Home size={18} aria-hidden="true" />
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

// Lazy-loaded pages
const HomePage = lazy(() => import('@/pages/home/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('@/pages/about/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('@/pages/services/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ProjectsPage = lazy(() => import('@/pages/projects/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const CareersPage = lazy(() => import('@/pages/careers/CareersPage').then((m) => ({ default: m.CareersPage })));
const ContactPage = lazy(() => import('@/pages/contact/ContactPage').then((m) => ({ default: m.ContactPage })));

// Feature pages
const BlogPage = lazy(() => import('@/pages/blog/BlogPage').then((m) => ({ default: m.BlogPage })));
const InternshipsPage = lazy(() => import('@/pages/internships/InternshipsPage').then((m) => ({ default: m.InternshipsPage })));
const TrainingPage = lazy(() => import('@/pages/training/TrainingPage').then((m) => ({ default: m.TrainingPage })));

// Auth pages
const AuthPage = lazy(() => import('@/pages/auth/AuthPage').then((m) => ({ default: m.AuthPage })));

// Dashboard pages
const StudentDashboardPage = lazy(() =>
  import('@/pages/student-dashboard').then((m) => ({ default: m.StudentDashboardPage }))
);
const AdminPage = lazy(() => import('@/pages/admin').then((m) => ({ default: m.AdminPage })));

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <HomePage />
        </Suspense>
      </MainLayout>
    ),
  },
  {
    path: '/about',
    element: (
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <AboutPage />
        </Suspense>
      </MainLayout>
    ),
  },
  {
    path: '/services',
    element: (
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <ServicesPage />
        </Suspense>
      </MainLayout>
    ),
  },
  {
    path: '/projects',
    element: (
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <ProjectsPage />
        </Suspense>
      </MainLayout>
    ),
  },
  {
    path: '/careers',
    element: (
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <CareersPage />
        </Suspense>
      </MainLayout>
    ),
  },
  {
    path: '/contact',
    element: (
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <ContactPage />
        </Suspense>
      </MainLayout>
    ),
  },
  {
    path: '/blog',
    element: (
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <BlogPage />
        </Suspense>
      </MainLayout>
    ),
  },
  {
    path: '/internships',
    element: (
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <InternshipsPage />
        </Suspense>
      </MainLayout>
    ),
  },
  {
    path: '/training',
    element: (
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <TrainingPage />
        </Suspense>
      </MainLayout>
    ),
  },
  {
    path: '/login',
    element: (
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <AuthPage initialMode="login" />
        </Suspense>
      </MainLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <AuthPage initialMode="register" />
        </Suspense>
      </MainLayout>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Suspense fallback={<LoadingFallback />}>
            <StudentDashboardPage />
          </Suspense>
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <AdminPage />
        </Suspense>
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

/**
 * AppRouter Component
 * Root router component wrapped with ReduxProvider
 */
export const AppRouter: React.FC = () => {
  return (
    <ReduxProvider>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
};
