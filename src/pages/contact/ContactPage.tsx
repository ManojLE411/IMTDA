import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Send, MessageCircle } from 'lucide-react';
import { useContactMessages } from '@/hooks/useContactMessages';
import { useLocation } from 'react-router-dom';
import { Alert } from '@/components/ui';
import styles from './ContactPage.module.css';

interface LocationState {
  subject?: string;
  programTitle?: string;
  inquiryType?: 'institutional' | 'corporate' | 'general';
  message?: string;
}

export const ContactPage: React.FC = () => {
  const { submitMessage } = useContactMessages();
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: locationState?.subject || 'General Inquiry',
    message: locationState?.message || ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Update form data when location state changes (e.g., navigating from training page)
  useEffect(() => {
    if (locationState) {
      setFormData(prev => ({
        ...prev,
        subject: locationState.subject || prev.subject,
        message: locationState.message || prev.message
      }));
      
      // Scroll to form when coming from training page
      setTimeout(() => {
        const formElement = document.querySelector(`.${styles.contactForm}`);
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [locationState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please enter your message.');
      return;
    }

    // Create contact message
    const newMessage = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject,
      message: formData.message.trim(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'New' as const
    };

    submitMessage(newMessage);
    setSubmitted(true);

    // Reset form after delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 5000);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Get in Touch</h1>
        <p className={styles.heroSubtitle}>Have a question? We'd love to hear from you.</p>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.contentGrid}>
          
          {/* Contact Info Cards */}
          <div className={styles.contactInfo}>
             <div className={styles.contactCard}>
                <div className={styles.iconContainer}>
                   <MapPin size={24} />
                </div>
                <div>
                   <h3 className={styles.contactCardTitle}>Our Office</h3>
                   <p className={styles.contactCardText}>Bheemunipatnam, Visakhapatnam,<br />Andhra Pradesh – 531163, India</p>
                </div>
             </div>
             
             <div className={styles.contactCard}>
                <div className={styles.iconContainer}>
                   <Mail size={24} />
                </div>
                <div>
                   <h3 className={styles.contactCardTitle}>Email Us</h3>
                   <p className={styles.contactCardText}>imtdainfotech@gmail.com</p>
                   <p className={styles.contactCardSubtext}>Response time: 24 hours</p>
                </div>
             </div>

             <div className={styles.contactCard}>
                <div className={styles.iconContainer}>
                   <Phone size={24} />
                </div>
                <div>
                   <h3 className={styles.contactCardTitle}>Call Us</h3>
                   <p className={styles.contactCardText}>+91 6302305973</p>
                   <p className={styles.contactCardSubtext}>Mon-Sat, 9am - 6pm</p>
                </div>
             </div>
          </div>

          {/* Contact Form */}
          <div className={styles.contactForm}>
            <h2 className={styles.formTitle}>Send us a Message</h2>
            {submitted ? (
              <Alert
                type="success"
                title="Message Sent Successfully!"
                message="Thank you for contacting us. We'll get back to you soon."
                className={styles.successMessage}
              />
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                {error && (
                  <Alert
                    type="error"
                    message={error}
                    className={styles.errorMessage}
                  />
                )}
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Name *</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Your Name" 
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email *</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Your Email" 
                      required
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>Subject *</label>
                  <select 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={styles.select}
                    required
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Institutional Training Inquiry">Institutional Training Inquiry</option>
                    <option value="Corporate Training Partnership">Corporate Training Partnership</option>
                    <option value="Training Program Inquiry">Training Program Inquiry</option>
                    <option value="Internship Partnership">Internship Partnership</option>
                    <option value="Project Consultation">Project Consultation</option>
                    <option value="Careers">Careers</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                   <label htmlFor="message" className={styles.label}>Message *</label>
                   <textarea 
                     id="message"
                     name="message"
                     rows={4} 
                     value={formData.message}
                     onChange={handleInputChange}
                     className={styles.textarea}
                     placeholder="How can we help you?"
                     required
                   ></textarea>
                </div>
                <button 
                  type="submit"
                  className={styles.submitButton}
                >
                  <Send size={18} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Integration Placeholder */}
        <div className={styles.mapSection}>
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60797.56216724848!2d83.4312!3d17.8914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3957a000000001%3A0x0!2sBheemunipatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin" 
             width="100%" 
             height="100%" 
             style={{border:0}} 
             loading="lazy"
             className={styles.map}
           ></iframe>
           <div className={styles.mapButton}>
                <MessageCircle size={20} /> WhatsApp Us
           </div>
        </div>
      </div>
    </div>
  );
};

