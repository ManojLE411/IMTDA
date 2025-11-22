import React, { useState } from 'react';
import { Code, Cloud, Brain, Database, Smartphone, Shield, Zap, Globe, BarChart3, Settings, Lock, Rocket } from 'lucide-react';
import { Page } from '../utils/types';

interface ServicesProps {
  onNavigate: (page: Page, scrollToId?: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const softwareServices = [
    {
      id: '1',
      title: 'Custom Software Development',
      icon: Code,
      description: 'End-to-end software solutions tailored to your business needs. From web applications to enterprise systems.',
      features: ['Full Stack Development', 'Microservices Architecture', 'API Development', 'Legacy System Modernization'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: '2',
      title: 'AI & Machine Learning Solutions',
      icon: Brain,
      description: 'Intelligent automation and predictive analytics powered by cutting-edge AI/ML technologies.',
      features: ['Custom AI Models', 'Computer Vision', 'Natural Language Processing', 'Predictive Analytics'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: '3',
      title: 'Cloud Infrastructure & DevOps',
      icon: Cloud,
      description: 'Scalable cloud solutions and automated deployment pipelines for seamless operations.',
      features: ['AWS/Azure/GCP Setup', 'CI/CD Pipelines', 'Container Orchestration', 'Infrastructure as Code'],
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200'
    },
    {
      id: '4',
      title: 'Data Engineering & Analytics',
      icon: Database,
      description: 'Transform raw data into actionable insights with robust data pipelines and analytics platforms.',
      features: ['Data Pipeline Development', 'ETL/ELT Solutions', 'Business Intelligence', 'Real-time Analytics'],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: '5',
      title: 'Mobile App Development',
      icon: Smartphone,
      description: 'Native and cross-platform mobile applications for iOS and Android with modern frameworks.',
      features: ['iOS & Android Apps', 'React Native', 'Flutter Development', 'App Store Deployment'],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: '6',
      title: 'Cybersecurity Solutions',
      icon: Shield,
      description: 'Comprehensive security audits, penetration testing, and secure architecture design.',
      features: ['Security Audits', 'Penetration Testing', 'Secure Code Review', 'Compliance Consulting'],
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: '7',
      title: 'API Development & Integration',
      icon: Zap,
      description: 'RESTful and GraphQL APIs with seamless third-party integrations and documentation.',
      features: ['REST & GraphQL APIs', 'Third-party Integrations', 'API Gateway Setup', 'API Documentation'],
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: '8',
      title: 'Web Development',
      icon: Globe,
      description: 'Modern, responsive web applications with optimal performance and user experience.',
      features: ['React/Vue/Angular', 'Progressive Web Apps', 'E-commerce Solutions', 'CMS Development'],
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: '9',
      title: 'Business Intelligence & Reporting',
      icon: BarChart3,
      description: 'Custom dashboards and reporting systems for data-driven decision making.',
      features: ['Custom Dashboards', 'Data Visualization', 'Automated Reporting', 'KPI Tracking'],
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'
    },
    {
      id: '10',
      title: 'System Integration & Automation',
      icon: Settings,
      description: 'Seamless integration of disparate systems and workflow automation solutions.',
      features: ['System Integration', 'Workflow Automation', 'Process Optimization', 'RPA Solutions'],
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
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
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-imtda-primary via-blue-900 to-imtda-primary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-imtda-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-blue-500/20 text-imtda-accent rounded-full text-sm font-semibold border border-imtda-accent/30">
              💼 Professional Software Solutions
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Transform Your Business with
            <span className="block text-imtda-accent mt-2">Cutting-Edge Technology</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            We deliver scalable, secure, and innovative software solutions that drive growth and digital transformation.
          </p>
          <button
            onClick={() => onNavigate(Page.ABOUT, 'contact-section')}
            className="px-8 py-4 bg-imtda-accent text-white font-bold rounded-lg text-lg hover:bg-blue-400 transition-all shadow-lg hover:shadow-blue-500/50 hover:translate-y-[-2px]"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Software Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                  className={`${service.bgColor} ${service.borderColor} border-2 rounded-2xl p-8 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
                    hoveredService === service.id ? 'shadow-xl' : 'shadow-md'
                  }`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 transform transition-transform ${
                    hoveredService === service.id ? 'rotate-6 scale-110' : ''
                  }`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => onNavigate(Page.ABOUT, 'contact-section')}
                    className={`mt-6 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${service.color} hover:opacity-80 transition-opacity`}
                  >
                    Learn More →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven methodology that ensures quality, transparency, and timely delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-gradient-to-br from-imtda-primary to-blue-800 rounded-2xl p-8 text-white h-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                  <div className="text-5xl font-bold text-imtda-accent mb-4 opacity-50">{step.step}</div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{step.description}</p>
                </div>
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-imtda-primary to-transparent"></div>
                    <Rocket className="w-6 h-6 text-imtda-accent absolute -right-2 -top-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-imtda-primary via-blue-900 to-imtda-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how our software solutions can transform your business and drive innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate(Page.ABOUT, 'contact-section')}
              className="px-8 py-4 bg-imtda-accent text-white font-bold rounded-lg text-lg hover:bg-blue-400 transition-all shadow-lg hover:shadow-blue-500/50"
            >
              Schedule a Consultation
            </button>
            <button
              onClick={() => onNavigate(Page.PROJECTS)}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg text-lg border-2 border-white/30 hover:bg-white/20 transition-all"
            >
              View Our Work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;


