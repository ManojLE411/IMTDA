import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Send, ArrowLeft } from 'lucide-react';
import { Page } from '@/constants';
import { useServices } from '@/hooks/useServices';
import { Service } from '@/types/service.types';
import { getIcon } from '@/utils/iconMap';
import styles from './ServicesPage.module.css';

export interface ServicesPageProps {
  onNavigate?: (page: Page, scrollToId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate: onNavigateProp }) => {
  const navigate = useNavigate();
  
  // Helper function to handle navigation
  const handleNavigate = (page: Page) => {
    // Use React Router navigate if available, otherwise fall back to prop
    const route = `/${page}`;
    if (navigate) {
      navigate(route);
    } else if (onNavigateProp) {
      onNavigateProp(page);
    }
  };
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { services } = useServices();

  const softwareServices = services || [];

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

  // Scroll to top when viewing service
  const handleViewService = (service: Service) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedService(service);
  };

  const handleBackToList = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedService(null);
  };

  // If a service is selected, show detail view
  if (selectedService) {
    const Icon = getIcon(selectedService.icon || 'Code');
    return (
      <div className={styles.serviceDetail}>
        <div className={styles.serviceDetailContent}>
          <button 
            onClick={handleBackToList}
            className={styles.backButton}
          >
            <ArrowLeft size={20} className={styles.backIcon} /> Back to Services
          </button>

          <div className={styles.serviceHeader}>
            <span className={styles.serviceCategory}>
              {selectedService.icon || 'Service'}
            </span>
            <div className={styles.serviceTitleSection}>
              <div className={styles.serviceIconContainer}>
                <Icon className={styles.serviceDetailIcon} />
              </div>
              <h1 className={styles.serviceDetailTitle}>
                {selectedService.title}
              </h1>
            </div>
            <p className={styles.serviceDetailDescription}>
              {selectedService.description}
            </p>
            <div className={styles.serviceMeta}>
              <span className={styles.serviceMetaItem}>
                <Rocket size={16} /> Software Solutions
              </span>
              <span className={styles.serviceMetaItem}>
                <Send size={16} /> Get Started
              </span>
            </div>
          </div>

          {selectedService.image && (
            <div className={styles.serviceImage}>
              <img 
                src={selectedService.image} 
                alt={selectedService.title} 
              />
            </div>
          )}

          <div className={styles.serviceContent}>
            <h2 className={styles.serviceFeaturesTitle}>Key Features & Capabilities</h2>
            <p className={styles.serviceFeaturesIntro}>
              Our comprehensive service includes the following features and capabilities designed to meet your business needs:
            </p>
            <div className={styles.serviceFeaturesGrid}>
              {selectedService.features.map((feature, idx) => (
                <div key={idx} className={styles.serviceFeatureCard}>
                  <div className={styles.serviceFeatureIcon}>
                    <div className={styles.serviceFeatureDot}></div>
                  </div>
                  <p className={styles.serviceFeatureText}>{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.serviceCta}>
            <h3 className={styles.serviceCtaTitle}>Ready to Get Started?</h3>
            <p className={styles.serviceCtaDescription}>
              Let's discuss how {selectedService.title} can transform your business and drive innovation.
            </p>
            <div className={styles.serviceCtaButtons}>
              <button
                onClick={() => handleNavigate(Page.CONTACT)}
                className={styles.serviceCtaPrimary}
              >
                <Send size={16} /> Contact Us
              </button>
              <button
                onClick={handleBackToList}
                className={styles.serviceCtaSecondary}
              >
                View All Services
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              onClick={() => handleNavigate(Page.CONTACT)}
              className={styles.primaryButton}
            >
              <Send size={16} /> Get Started Today
            </button>
            <button
              onClick={() => handleNavigate(Page.PROJECTS)}
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
                  <p className={styles.serviceDescription}>
                    {service.description.length > 100 
                      ? service.description.substring(0, 100) + '...' 
                      : service.description}
                  </p>
                  
                  <button
                    onClick={() => handleViewService(service)}
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
              onClick={() => handleNavigate(Page.CONTACT)}
              className={styles.ctaPrimaryButton}
            >
              <Send size={16} /> Schedule a Consultation
            </button>
            <button
              onClick={() => handleNavigate(Page.PROJECTS)}
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

