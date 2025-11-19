import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Facebook, Lock } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-imtda-accent">IMTDA Infotech</h3>
            <p className="text-gray-400 text-sm">
              Empowering the next generation of innovators through AI-driven education and industrial R&D solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => onNavigate(Page.ABOUT)} className="hover:text-imtda-accent transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate(Page.INTERNSHIPS)} className="hover:text-imtda-accent transition-colors">Internships</button></li>
              <li><button onClick={() => onNavigate(Page.PROJECTS)} className="hover:text-imtda-accent transition-colors">Projects</button></li>
              <li><button onClick={() => onNavigate(Page.BLOG)} className="hover:text-imtda-accent transition-colors">Blog</button></li>
              <li><button onClick={() => onNavigate(Page.CAREERS)} className="hover:text-imtda-accent transition-colors">Careers</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Domains</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Artificial Intelligence & ML</li>
              <li>Full Stack Development</li>
              <li>VLSI Design</li>
              <li>AutoCAD & CATIA</li>
              <li>Data Science</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-imtda-accent" />
                <span>Bheemunipatnam, Andhra Pradesh – 531163, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-imtda-accent" />
                <a href="mailto:imtdainfotech@gmail.com" className="hover:text-white">imtdainfotech@gmail.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-imtda-accent" />
                <a href="tel:+916302305973" className="hover:text-white">+91-6302305973</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} IMTDA Infotech (OPC) Private Limited. All rights reserved.</p>
          <button 
            onClick={() => onNavigate(Page.ADMIN)} 
            className="flex items-center gap-1 hover:text-gray-300 transition-colors mt-4 md:mt-0"
          >
            <Lock size={14} /> Staff Login
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
