import React, { useState } from 'react';
import { Rocket, Send } from 'lucide-react';
import { Page } from '@/constants';
import { useServices } from '@/hooks/useServices';
import { getIcon } from '@/utils/iconMap';
import styles from './ServicesPage.module.css';

export interface ServicesPageProps {
  onNavigate?: (page: Page, scrollToId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const { services } = useServices();

  // Fallback services if none exist in storage
  const fallbackServices = [
    {
      id: '1',
      title: 'Custom Software Development',
      icon: 'Code',
      description: 'End-to-end software solutions tailored to your business needs. From web applications to enterprise systems.',
      features: ['Full Stack Development', 'Microservices Architecture', 'API Development', 'Legacy System Modernization']
    },
    {
      id: '2',
      title: 'AI & Machine Learning Solutions',
      icon: 'Brain',
      description: 'Intelligent automation and predictive analytics powered by cutting-edge AI/ML technologies.',
      features: ['Custom AI Models', 'Computer Vision', 'Natural Language Processing', 'Predictive Analytics']
    },
    {
      id: '3',
      title: 'Cloud Infrastructure & DevOps',
      icon: 'Cloud',
      description: 'Scalable cloud solutions and automated deployment pipelines for seamless operations.',
      features: ['AWS/Azure/GCP Setup', 'CI/CD Pipelines', 'Container Orchestration', 'Infrastructure as Code']
    },
    {
      id: '4',
      title: 'Data Engineering & Analytics',
      icon: 'Database',
      description: 'Transform raw data into actionable insights with robust data pipelines and analytics platforms.',
      features: ['Data Pipeline Development', 'ETL/ELT Solutions', 'Business Intelligence', 'Real-time Analytics']
    },
    {
      id: '5',
      title: 'Mobile App Development',
      icon: 'Smartphone',
      description: 'Native and cross-platform mobile applications for iOS and Android with modern frameworks.',
      features: ['iOS & Android Apps', 'React Native', 'Flutter Development', 'App Store Deployment']
    },
    {
      id: '6',
      title: 'Cybersecurity Solutions',
      icon: 'Shield',
      description: 'Comprehensive security audits, penetration testing, and secure architecture design.',
      features: ['Security Audits', 'Penetration Testing', 'Secure Code Review', 'Compliance Consulting']
    },
  ];

  const softwareServices = services.length > 0 ? services : fallbackServices;

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your requirements, understand your business goals, and create a detailed project roadmap.'
    },
    {
      step: '02',
      title: 'Design & Architecture',
      description: 'Our team designs scalable architecture and creates wireframes/prototypes for your approval.'
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'Agile development with continuous testing, code reviews, and regular progress updates.'
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'Smooth deployment to production with ongoing maintenance, monitoring, and support.'
    }
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>Our Services</p>
          <h1 className={styles.heroTitle}>
            Transform your business with cutting-edge technology solutions.
          </h1>
          <p className={styles.heroDescription}>
            We deliver scalable, secure, and innovative software solutions that drive growth, accelerate digital transformation,
            and empower your organization to achieve its strategic objectives.
          </p>
          <div className={styles.heroButtons}>
            <button
              onClick={() => onNavigate(Page.CONTACT)}
              className={styles.primaryButton}
            >
              <Send size={16} /> Get Started Today
            </button>
            <button
              onClick={() => onNavigate(Page.PROJECTS)}
              className={styles.secondaryButton}
            >
              <Rocket size={16} /> View Our Work
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className={styles.servicesSection}>
        <div className={styles.servicesContainer}>
          <div className={styles.servicesHeader}>
            <h2 className={styles.servicesTitle}>Our Software Services</h2>
            <p className={styles.servicesDescription}>
              Comprehensive technology solutions to accelerate your digital transformation journey
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {softwareServices.map((service) => {
              const Icon = getIcon(service.icon || 'Code');
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={styles.serviceCard}
                >
                  <div className={styles.serviceIconContainer}>
                    <Icon className={styles.serviceIcon} />
                  </div>
                  
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  
                  <ul className={styles.serviceFeatures}>
                    {service.features.map((feature, idx) => (
                      <li key={idx} className={styles.serviceFeature}>
                        <div className={styles.serviceFeatureDot}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => onNavigate(Page.CONTACT)}
                    className={styles.serviceButton}
                  >
                    Learn More <span>→</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className={styles.processContainer}>
          <div className={styles.processHeader}>
            <h2 className={styles.processTitle}>Our Development Process</h2>
            <p className={styles.processDescription}>
              A proven methodology that ensures quality, transparency, and timely delivery
            </p>
          </div>

          <div className={styles.processGrid}>
            {processSteps.map((step, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div className={styles.processCard}>
                  <div className={styles.processStepNumber}>{step.step}</div>
                  <h3 className={styles.processStepTitle}>{step.title}</h3>
                  <p className={styles.processStepDescription}>{step.description}</p>
                </div>
                {idx < processSteps.length - 1 && (
                  <div className={styles.processConnector}>
                    <div className={styles.processConnectorLine}></div>
                    <Rocket size={24} className={styles.processConnectorIcon} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to Build Something Amazing?</h2>
          <p className={styles.ctaDescription}>
            Let's discuss how our software solutions can transform your business and drive innovation.
          </p>
          <div className={styles.ctaButtons}>
            <button
              onClick={() => onNavigate(Page.CONTACT)}
              className={styles.ctaPrimaryButton}
            >
              <Send size={16} /> Schedule a Consultation
            </button>
            <button
              onClick={() => onNavigate(Page.PROJECTS)}
              className={styles.ctaSecondaryButton}
            >
              View Our Work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

