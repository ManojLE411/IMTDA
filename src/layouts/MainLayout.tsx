/**
 * MainLayout Component
 * Layout wrapper with Navbar and Footer
 * Used by pages that need the standard layout
 */

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MessageCircle } from 'lucide-react';

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      
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
    </div>
  );
};
