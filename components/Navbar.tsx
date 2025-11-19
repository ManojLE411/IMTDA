
import React, { useState } from 'react';
import { Menu, X, BrainCircuit, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Page, Student } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  currentUser: Student | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: Page.HOME },
    { label: 'About', value: Page.ABOUT },
    { label: 'Internships', value: Page.INTERNSHIPS },
    { label: 'Projects', value: Page.PROJECTS },
    { label: 'Training', value: Page.TRAINING },
    { label: 'Careers', value: Page.CAREERS },
    { label: 'Blog', value: Page.BLOG },
    { label: 'Contact', value: Page.CONTACT },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-imtda-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => handleNavClick(Page.HOME)}
          >
            <BrainCircuit className="h-8 w-8 text-imtda-accent" />
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
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.value
                      ? 'bg-blue-800 text-white shadow-inner'
                      : 'text-gray-300 hover:bg-blue-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {currentUser ? (
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-blue-700">
                  <button 
                    onClick={() => handleNavClick(Page.STUDENT_DASHBOARD)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === Page.STUDENT_DASHBOARD ? 'bg-imtda-accent text-white' : 'text-white hover:bg-blue-700'
                    }`}
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </button>
                  <button 
                    onClick={onLogout}
                    className="text-gray-300 hover:text-white p-2"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="ml-4 pl-4 border-l border-blue-700 flex gap-2">
                  <button 
                    onClick={() => handleNavClick(Page.LOGIN)}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => handleNavClick(Page.REGISTER)}
                    className="bg-imtda-accent text-white hover:bg-blue-400 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-blue-900 border-t border-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.value
                    ? 'bg-blue-800 text-white'
                    : 'text-gray-300 hover:bg-blue-700 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
             <div className="border-t border-blue-800 pt-4 mt-2">
              {currentUser ? (
                <>
                  <button
                    onClick={() => handleNavClick(Page.STUDENT_DASHBOARD)}
                    className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </button>
                  <button
                    onClick={() => { onLogout(); setIsMenuOpen(false); }}
                    className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-blue-700"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick(Page.LOGIN)}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-blue-700 hover:text-white"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavClick(Page.REGISTER)}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-imtda-accent hover:text-white"
                  >
                    Register
                  </button>
                </>
              )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
