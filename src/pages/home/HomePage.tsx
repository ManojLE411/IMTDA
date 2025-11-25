import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useServices } from '@/hooks/useServices';
import { getIcon } from '@/utils/iconMap';
import styles from './HomePage.module.css';

const slides = [
  {
    id: 1,
    title: 'Engineering Intelligent Futures',
    subtitle:
      'IMTDA builds forward-looking AI, ML, and automation platforms that unlock measurable business outcomes.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1950&q=80'
  },
  {
    id: 2,
    title: 'Digital Platforms with Purpose',
    subtitle:
      'Designing scalable web and cloud-native systems for education, finance, and enterprise teams.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1950&q=80'
  },
  {
    id: 3,
    title: 'Upskilling Tomorrow\'s Innovators',
    subtitle: 'Live workshops, mentorship, and hands-on projects that transform your workforce.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1950&q=80'
  }
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { testimonials } = useTestimonials();
  const { services } = useServices();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const displayServices = (services || []).slice(0, 6).map(s => ({ icon: s.icon, title: s.title, desc: s.description }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.heroSection}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={styles.slideContainer}
          >
            <div
              className={styles.slideBackground}
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            />
            <div className={styles.slideOverlay} />
            <div className={styles.slideGradient} />

            <div className={styles.heroContent}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className={styles.badgeContainer}
              >
                <span className={styles.badge}>
                  IMTDA Innovation Lab
                </span>
              </motion.div>

              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className={styles.heroTitle}
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className={styles.heroSubtitle}
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className={styles.heroButtons}
              >
                <button
                  onClick={() => navigate('/services')}
                  className={styles.primaryButton}
                >
                  <span className={styles.primaryButtonContent}>
                    Get Started Now <ArrowRight className="w-5 h-5" />
                  </span>
                  <div className={styles.primaryButtonOverlay} />
                </button>
                <button
                  onClick={() => {
                    navigate('/about');
                    setTimeout(() => {
                      const element = document.getElementById('contact-section');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                  className={styles.secondaryButton}
                >
                  Talk to Experts
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.slideIndicators}>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`${styles.indicator} ${currentSlide === index ? styles.indicatorActive : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Key Domains Grid */}
      <section id="competencies" data-animate className={`${styles.competenciesSection} ${
        visibleSections.has('competencies') ? '' : styles.competenciesSectionHidden
      }`}>
        <div className={styles.competenciesContainer}>
          <div className={styles.competenciesHeader}>
            <h2 className={styles.competenciesTitle}>Our Core Services</h2>
            <p className={styles.competenciesDescription}>
              Delivering enterprise-grade software solutions that drive digital transformation and business growth.
            </p>
          </div>

          <div className={styles.competenciesGrid}>
            {displayServices.map((item, idx) => {
              const Icon = getIcon(item.icon || 'Code');
              return (
                <div 
                  key={idx} 
                  className={`${styles.competencyCard} ${
                    visibleSections.has('competencies') ? '' : styles.competencyCardHidden
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className={styles.competencyIconContainer}>
                    <Icon className={styles.competencyIcon} />
                  </div>
                  <h3 className={styles.competencyTitle}>{item.title}</h3>
                  <p className={styles.competencyDescription}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section id="stats" data-animate className={`${styles.statsSection} ${
        visibleSections.has('stats') ? '' : styles.statsSectionHidden
      }`}>
        <div className={styles.statsContainer}>
          <div className={styles.statsGrid}>
            {[
              { label: 'Projects Delivered', val: '100+' },
              { label: 'Clients Served', val: '50+' },
              { label: 'Team Members', val: '25+' },
              { label: 'Years Experience', val: '5+' },
            ].map((stat, idx) => (
              <div 
                key={idx}
                className={`${styles.statItem} ${
                  visibleSections.has('stats') ? '' : styles.statItemHidden
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className={styles.statValue}>{stat.val}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Testimonials */}
       <section id="testimonials" data-animate className={styles.testimonialsSection}>
        <div className={`${styles.testimonialsHeader} ${
          visibleSections.has('testimonials') ? '' : styles.testimonialsHeaderHidden
        }`}>
           <h2 className={styles.testimonialsTitle}>What Our Clients Say</h2>
           <p className={styles.testimonialsSubtitle}>Trusted by businesses and institutions worldwide</p>
        </div>
        <div className={styles.testimonialsContainer}>
           <div className={styles.testimonialsScroll}>
              {(testimonials || []).map((testimonial, idx) => (
                <div
                  key={testimonial.id}
                  className={`${styles.testimonialCard} ${
                    visibleSections.has('testimonials') ? '' : styles.testimonialCardHidden
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className={styles.testimonialHeader}>
                    <img
                      src={testimonial.avatar || `https://picsum.photos/50/50?random=${100 + idx}`}
                      alt={`${testimonial.name} avatar`}
                      className={styles.testimonialAvatar}
                    />
                    <div className={styles.testimonialInfo}>
                      <div className={styles.testimonialName}>{testimonial.name}</div>
                      <div className={styles.testimonialTitle}>{testimonial.title}</div>
                    </div>
                  </div>
                  <p className={styles.testimonialQuote}>{testimonial.quote}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

