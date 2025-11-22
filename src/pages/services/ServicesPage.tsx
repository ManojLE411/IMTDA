import React, { useState } from 'react';
import { Code, Cloud, Brain, Database, Smartphone, Shield, Zap, Globe, BarChart3, Settings, Rocket, Send } from 'lucide-react';
import { Page } from '@/shared/constants';

interface ServicesPageProps {
  onNavigate: (page: Page, scrollToId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const softwareServices = [
    {
      id: '1',
      title: 'Custom Software Development',
      icon: Code,
      description: 'End-to-end software solutions tailored to your business needs. From web applications to enterprise systems.',
      features: ['Full Stack Development', 'Microservices Architecture', 'API Development', 'Legacy System Modernization']
    },
    {
      id: '2',
      title: 'AI & Machine Learning Solutions',
      icon: Brain,
      description: 'Intelligent automation and predictive analytics powered by cutting-edge AI/ML technologies.',
      features: ['Custom AI Models', 'Computer Vision', 'Natural Language Processing', 'Predictive Analytics']
    },
    {
      id: '3',
      title: 'Cloud Infrastructure & DevOps',
      icon: Cloud,
      description: 'Scalable cloud solutions and automated deployment pipelines for seamless operations.',
      features: ['AWS/Azure/GCP Setup', 'CI/CD Pipelines', 'Container Orchestration', 'Infrastructure as Code']
    },
    {
      id: '4',
      title: 'Data Engineering & Analytics',
      icon: Database,
      description: 'Transform raw data into actionable insights with robust data pipelines and analytics platforms.',
      features: ['Data Pipeline Development', 'ETL/ELT Solutions', 'Business Intelligence', 'Real-time Analytics']
    },
    {
      id: '5',
      title: 'Mobile App Development',
      icon: Smartphone,
      description: 'Native and cross-platform mobile applications for iOS and Android with modern frameworks.',
      features: ['iOS & Android Apps', 'React Native', 'Flutter Development', 'App Store Deployment']
    },
    {
      id: '6',
      title: 'Cybersecurity Solutions',
      icon: Shield,
      description: 'Comprehensive security audits, penetration testing, and secure architecture design.',
      features: ['Security Audits', 'Penetration Testing', 'Secure Code Review', 'Compliance Consulting']
    },
    {
      id: '7',
      title: 'API Development & Integration',
      icon: Zap,
      description: 'RESTful and GraphQL APIs with seamless third-party integrations and documentation.',
      features: ['REST & GraphQL APIs', 'Third-party Integrations', 'API Gateway Setup', 'API Documentation']
    },
    {
      id: '8',
      title: 'Web Development',
      icon: Globe,
      description: 'Modern, responsive web applications with optimal performance and user experience.',
      features: ['React/Vue/Angular', 'Progressive Web Apps', 'E-commerce Solutions', 'CMS Development']
    },
    {
      id: '9',
      title: 'Business Intelligence & Reporting',
      icon: BarChart3,
      description: 'Custom dashboards and reporting systems for data-driven decision making.',
      features: ['Custom Dashboards', 'Data Visualization', 'Automated Reporting', 'KPI Tracking']
    },
    {
      id: '10',
      title: 'System Integration & Automation',
      icon: Settings,
      description: 'Seamless integration of disparate systems and workflow automation solutions.',
      features: ['System Integration', 'Workflow Automation', 'Process Optimization', 'RPA Solutions']
    }
  ];

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
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-4">Our Services</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Transform your business with cutting-edge technology solutions.
          </h1>
          <p className="max-w-3xl text-lg text-slate-200 mb-8">
            We deliver scalable, secure, and innovative software solutions that drive growth, accelerate digital transformation,
            and empower your organization to achieve its strategic objectives.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate(Page.CONTACT)}
              className="inline-flex items-center gap-2 bg-imtda-primary text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-500 transition"
            >
              <Send size={16} /> Get Started Today
            </button>
            <button
              onClick={() => onNavigate(Page.PROJECTS)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full text-white/80 hover:border-white hover:text-white transition"
            >
              <Rocket size={16} /> View Our Work
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Software Services</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Comprehensive technology solutions to accelerate your digital transformation journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softwareServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-imtda-primary to-blue-700 rounded-xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-imtda-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => onNavigate(Page.CONTACT)}
                    className="mt-6 text-sm font-semibold text-imtda-primary hover:text-blue-400 transition-colors inline-flex items-center gap-1"
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
      <section className="py-20 bg-slate-900 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Development Process</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              A proven methodology that ensures quality, transparency, and timely delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
                  <div className="text-5xl font-bold text-imtda-primary mb-4 opacity-30">{step.step}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-imtda-primary to-transparent"></div>
                    <Rocket className="w-6 h-6 text-imtda-primary absolute -right-2 -top-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Let's discuss how our software solutions can transform your business and drive innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate(Page.CONTACT)}
              className="inline-flex items-center gap-2 bg-imtda-primary text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-500 transition"
            >
              <Send size={16} /> Schedule a Consultation
            </button>
            <button
              onClick={() => onNavigate(Page.PROJECTS)}
              className="px-8 py-4 border border-white/30 rounded-full text-white/80 hover:border-white hover:text-white transition font-semibold text-lg"
            >
              View Our Work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

