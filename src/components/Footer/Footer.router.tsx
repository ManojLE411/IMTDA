/**
 * Footer Component (React Router version)
 * Updated to use React Router for navigation
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Facebook, Lock } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Company Info */}
          <div className={styles.companyInfo}>
            <h3 className={styles.companyTitle}>IMTDA Infotech</h3>
            <p className={styles.companyDescription}>
              Delivering enterprise-grade software solutions, AI-powered systems, and professional training services to drive digital transformation.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/company/imtda-infotech" className={styles.socialLink} aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="https://www.instagram.com/imtda_infotech" className={styles.socialLink} aria-label="Instagram"><Instagram size={20} /></a>
              <a href="https://www.twitter.com/imtda_infotech" className={styles.socialLink} aria-label="Twitter"><Twitter size={20} /></a>
              <a href="https://www.facebook.com/imtda_infotech" className={styles.socialLink} aria-label="Facebook"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.quickLinks}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              <li>
                <Link to="/" className={styles.footerLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={styles.footerLink}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className={styles.footerLink}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className={styles.footerLink}>
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/careers" className={styles.footerLink}>
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className={styles.footerLink}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className={styles.services}>
            <h4 className={styles.sectionTitle}>Services</h4>
            <ul className={styles.linksList}>
              <li>
                <Link to="/internships" className={styles.footerLink}>
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/training" className={styles.footerLink}>
                  Training Programs
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.footerLink}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <h4 className={styles.sectionTitle}>Contact</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Mail size={16} />
                <a href="mailto:info@imtda.com" className={styles.contactLink}>
                  info@imtda.com
                </a>
              </li>
              <li className={styles.contactItem}>
                <Phone size={16} />
                <a href="tel:+916302305973" className={styles.contactLink}>
                  +91 6302305973
                </a>
              </li>
              <li className={styles.contactItemAddress}>
                <MapPin size={16} className={styles.contactIcon} />
                <span>Hyderabad, Telangana, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} IMTDA Infotech. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Lock size={14} />
            <span>Privacy Policy</span>
            <span className={styles.legalSeparator}>|</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
