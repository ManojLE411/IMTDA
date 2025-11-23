/**
 * Navbar Component (React Router version)
 * Updated to use React Router for navigation
 */

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/logo.png';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Careers', path: '/careers' },
    { label: 'Training', path: '/training' },
    { label: 'Blog', path: '/blog' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link
            to="/"
            className={styles.logoLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className={styles.logoContainer}>
              <img src={logo} alt="IMTDA" className={styles.logoImage} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>IMTDA</span>
              <span className={styles.logoSubtitle}>INFOTECH</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            <div className={styles.desktopMenuContent}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.navLink} ${
                    isActive(item.path) ? styles.navLinkActive : styles.navLinkInactive
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {user ? (
                <div className={styles.userSection}>
                  <Link
                    to="/dashboard"
                    className={`${styles.dashboardLink} ${
                      isActive('/dashboard') ? styles.dashboardLinkActive : styles.dashboardLinkInactive
                    }`}
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className={`${styles.adminLink} ${
                        isActive('/admin') ? styles.adminLinkActive : styles.adminLinkInactive
                      }`}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className={styles.logoutButton}
                    title="Logout"
                    aria-label="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className={styles.loginSection}>
                  <Link
                    to="/login"
                    className={styles.loginLink}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className={styles.mobileMenuButton}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={styles.menuToggleButton}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              <div className={styles.mobileNavItems}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${styles.mobileNavLink} ${
                    isActive(item.path)
                      ? styles.mobileNavLinkActive
                      : styles.mobileNavLinkInactive
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {user ? (
                <div className={styles.mobileUserSection}>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={`${styles.mobileDashboardLink} ${
                      isActive('/dashboard') ? styles.mobileDashboardLinkActive : styles.mobileDashboardLinkInactive
                    }`}
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className={`${styles.mobileAdminLink} ${
                        isActive('/admin') ? styles.mobileAdminLinkActive : styles.mobileAdminLinkInactive
                      }`}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className={styles.mobileLogoutButton}
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <div className={styles.mobileLoginSection}>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={styles.mobileLoginLink}
                  >
                    Login
                  </Link>
                </div>
              )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
