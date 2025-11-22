import React, { useState, useEffect } from 'react';
import { AuthProvider } from '@/features/auth';
import { AppRouter } from './router/router';
import { Navbar, Footer } from '@/shared/layout';
import { Page } from '@/shared/constants';
import { MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleNavigate = (page: Page, scrollToId?: string) => {
    setCurrentPage(page);
    
    if (scrollToId) {
      // Wait for page to render, then scroll to the section
      setTimeout(() => {
        const element = document.getElementById(scrollToId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      if (!showScrollTop && window.pageYOffset > 400) {
        setShowScrollTop(true);
      } else if (showScrollTop && window.pageYOffset <= 400) {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScrollTop]);

  // Only Admin page hides navigation
  const hideNavPages = [Page.ADMIN];

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen font-sans text-gray-800">
        {!hideNavPages.includes(currentPage) && (
          <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        )}
        
        <main className="flex-grow">
          <AppRouter currentPage={currentPage} onNavigate={handleNavigate} />
        </main>

        {!hideNavPages.includes(currentPage) && (
          <>
            <Footer onNavigate={handleNavigate} />
            
            {/* Floating WhatsApp/Contact Button */}
            <a 
              href="https://wa.me/916302305973" 
              target="_blank" 
              rel="noreferrer"
              className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 hover:scale-110 animate-bounce"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={28} />
            </a>
          </>
        )}
      </div>
    </AuthProvider>
  );
};

export default App;

