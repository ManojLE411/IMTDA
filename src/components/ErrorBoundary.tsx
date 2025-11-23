/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 * 
 * Note: Error boundaries must be class components as React doesn't support
 * functional error boundaries yet. This implementation uses modern React patterns
 * where possible and integrates with React Router for navigation.
 */

import React, { Component, ErrorInfo, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Fallback UI Component
 * Functional component that uses React Router hooks for navigation
 */
const ErrorFallback: React.FC<{
  error: Error | null;
  errorInfo: ErrorInfo | null;
}> = ({ error, errorInfo }) => {
  const navigate = useNavigate();

  const handleGoHome = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  const handleReload = useCallback(() => {
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
            <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
            <p className="text-gray-600 mt-1">We're sorry, but something unexpected happened.</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h2 className="text-sm font-semibold text-red-800 mb-2">Error Details:</h2>
            <p className="text-sm text-red-700 font-mono break-all">{error.message}</p>
            {errorInfo && process.env.NODE_ENV === 'development' && (
              <details className="mt-4">
                <summary className="text-sm font-semibold text-red-800 cursor-pointer">
                  Stack Trace
                </summary>
                <pre className="mt-2 text-xs text-red-600 overflow-auto max-h-48 bg-red-100 p-2 rounded">
                  {errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        )}

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

/**
 * ErrorBoundaryWrapper
 * Functional wrapper component that provides React Router context
 * to the error fallback UI
 */
const ErrorBoundaryWrapper: React.FC<ErrorBoundaryProps> = ({ children, fallback }) => {
  return (
    <ErrorBoundaryClass fallback={fallback}>
      {children}
    </ErrorBoundaryClass>
  );
};

/**
 * ErrorBoundary Class Component
 * Must be a class component as React doesn't support functional error boundaries
 */
class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo } = this.state;

      return <ErrorFallback error={error} errorInfo={errorInfo} />;
    }

    return this.props.children;
  }
}

// Export the wrapper component
export { ErrorBoundaryWrapper as ErrorBoundary };

