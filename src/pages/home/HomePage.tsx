import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Cpu, Code, Database, Video, PenTool, BookOpen } from 'lucide-react';
import { Page } from '@/shared/constants';

interface HomePageProps {
  onNavigate: (page: Page, scrollToId?: string) => void;
}

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

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

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
    <div className="flex flex-col w-full bg-slate-950 text-slate-100">
      <section className="relative h-[85vh] sm:h-[90vh] min-h-[640px] overflow-hidden bg-imtda-primary">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            />
            <div className="absolute inset-0 bg-imtda-primary/70 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-imtda-primary/90" />

            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-6"
              >
                <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium uppercase tracking-wider border border-white/20">
                  IMTDA Innovation Lab
                </span>
              </motion.div>

              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight drop-shadow-lg"
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-lg md:text-xl text-slate-200 max-w-3xl mb-10 font-light leading-relaxed"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex gap-4 flex-wrap justify-center"
              >
                <button
                  onClick={() => onNavigate(Page.SERVICES)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <button
                  onClick={() => onNavigate(Page.ABOUT, 'contact-section')}
                  className="px-8 py-4 border border-white/40 rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-colors duration-300"
                >
                  Talk to Experts
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Key Domains Grid */}
      <section id="competencies" data-animate className={`py-20 bg-slate-900 border-t border-b border-white/10 transition-all duration-1000 transform ${
        visibleSections.has('competencies') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Our Core Services</h2>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Delivering enterprise-grade software solutions that drive digital transformation and business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Cpu, title: 'AI & Machine Learning', desc: 'Custom AI solutions, predictive analytics, and intelligent automation for your business.' },
              { icon: Code, title: 'Custom Software Development', desc: 'Scalable web and enterprise applications built with modern technologies.' },
              { icon: Database, title: 'Data Engineering & Analytics', desc: 'Transform data into insights with robust pipelines and BI solutions.' },
              { icon: Video, title: 'Computer Vision Solutions', desc: 'Advanced video analytics, image processing, and smart surveillance systems.' },
              { icon: PenTool, title: 'Cloud & DevOps', desc: 'Scalable cloud infrastructure, CI/CD pipelines, and automated deployments.' },
              { icon: BookOpen, title: 'Training & Upskilling', desc: 'Professional training programs to upskill your team in cutting-edge technologies.' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`p-8 bg-white/5 rounded-2xl border border-white/5 hover:shadow-2xl transition-all duration-500 cursor-pointer group transform ${
                  visibleSections.has('competencies') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-14 h-14 bg-imtda-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-imtda-primary transition-colors">
                  <item.icon className="w-7 h-7 text-imtda-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section id="stats" data-animate className={`py-16 bg-imtda-primary text-white transition-all duration-1000 transform ${
        visibleSections.has('stats') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Projects Delivered', val: '100+' },
              { label: 'Clients Served', val: '50+' },
              { label: 'Team Members', val: '25+' },
              { label: 'Years Experience', val: '5+' },
            ].map((stat, idx) => (
              <div 
                key={idx}
                className={`transition-all duration-700 transform ${
                  visibleSections.has('stats') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-imtda-accent mb-2">{stat.val}</div>
                <div className="text-sm md:text-base text-blue-200 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Testimonials */}
       <section id="testimonials" data-animate className="py-20 bg-slate-900 overflow-hidden">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 transition-all duration-1000 transform ${
          visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
           <h2 className="text-3xl font-bold text-white">What Our Clients Say</h2>
           <p className="mt-2 text-slate-300">Trusted by businesses and institutions worldwide</p>
        </div>
        <div className="relative">
           <div className="flex gap-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory scrollbar-hide">
              {[
                {
                  name: 'Rajesh Kumar',
                  title: 'CTO, TechCorp Solutions',
                  quote:
                    "IMTDA delivered an exceptional AI-powered analytics platform for our business. Their team's expertise and professionalism exceeded our expectations. The solution has significantly improved our decision-making process.",
                },
                {
                  name: 'Sarah Johnson',
                  title: 'Product Manager, InnovateLabs',
                  quote:
                    "Working with IMTDA on our custom software development project was seamless. They understood our requirements perfectly and delivered a scalable solution on time. Highly recommended!",
                },
                {
                  name: 'Michael Chen',
                  title: 'Director, DataFlow Systems',
                  quote:
                    "IMTDA's data engineering team built us a robust ETL pipeline that processes millions of records daily. Their cloud infrastructure expertise helped us scale efficiently while reducing costs.",
                },
                {
                  name: 'Priya Sharma',
                  title: 'CEO, EduTech Innovations',
                  quote:
                    "The custom e-learning platform developed by IMTDA has transformed our business. Their team's technical expertise and attention to detail made the entire process smooth and efficient.",
                },
                {
                  name: 'David Martinez',
                  title: 'IT Director, Global Manufacturing Co.',
                  quote:
                    "IMTDA's system integration services helped us connect multiple legacy systems seamlessly. Their automation solutions have reduced our operational costs by 30%.",
                },
                {
                  name: 'Ananya Reddy',
                  title: 'Training Program Graduate, Now Software Engineer',
                  quote:
                    "IMTDA's training program gave me the skills I needed to transition into software development. The hands-on projects and industry mentorship were invaluable for my career growth.",
                },
              ].map((testimonial, idx) => (
                <div
                  key={testimonial.name}
                  className={`bg-white/5 text-slate-100 p-8 rounded-xl shadow-2xl min-w-[350px] md:min-w-[400px] snap-center transition-all duration-700 transform border border-white/5 ${
                    visibleSections.has('testimonials') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={`https://picsum.photos/50/50?random=${100 + idx}`}
                      alt={`${testimonial.name} avatar`}
                      className="w-12 h-12 rounded-full mr-4 border border-white/20"
                    />
                    <div className="text-left">
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-xs text-slate-400">{testimonial.title}</div>
                    </div>
                  </div>
                  <p className="text-slate-200 italic">{testimonial.quote}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

