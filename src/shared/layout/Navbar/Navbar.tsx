import React, { useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Page } from '@/shared/constants';
import { useAuth } from '@/features/auth';
import logo from '@/assets/logo.png';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const navItems = [
    { label: 'Home', value: Page.HOME },
    { label: 'About', value: Page.ABOUT },
    { label: 'Services', value: Page.SERVICES },
    { label: 'Projects', value: Page.PROJECTS },
    { label: 'Careers', value: Page.CAREERS },
    { label: 'Training', value: Page.TRAINING },
    { label: 'Blog', value: Page.BLOG },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    onNavigate(Page.HOME);
  };

  return (
    <nav className="bg-gradient-to-r from-imtda-primary via-blue-800 to-imtda-primary text-white sticky top-0 z-50 shadow-xl backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => handleNavClick(Page.HOME)}
          >
            <div className="bg-white p-1.5 rounded-lg">
              <img src={logo} alt="IMTDA" className="h-10 w-10 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wide">IMTDA</span>
              <span className="text-xs text-gray-300 tracking-widest">INFOTECH</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentPage === item.value
                      ? 'bg-imtda-accent text-white shadow-lg'
                      : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {currentUser ? (
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
                  <button 
                    onClick={() => handleNavClick(Page.STUDENT_DASHBOARD)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      currentPage === Page.STUDENT_DASHBOARD ? 'bg-imtda-accent text-white shadow-lg' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white p-2"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="ml-4 pl-4 border-l border-white/20">
                  <button 
                    onClick={() => handleNavClick(Page.LOGIN)}
                    className="bg-imtda-accent text-white hover:bg-blue-400 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none transition-all"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-blue-900 to-imtda-primary border-t border-white/10 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all ${
                  currentPage === item.value
                    ? 'bg-imtda-accent text-white shadow-lg'
                    : 'text-gray-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
             <div className="border-t border-white/10 pt-4 mt-2">
              {currentUser ? (
                <>
                  <button
                    onClick={() => handleNavClick(Page.STUDENT_DASHBOARD)}
                    className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 transition-all"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </button>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-white/10 transition-all"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleNavClick(Page.LOGIN)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-imtda-accent text-white hover:bg-blue-400"
                >
                  Login
                </button>
              )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

