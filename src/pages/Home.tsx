import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Cpu, Code, Database, Video, PenTool, BookOpen } from 'lucide-react';
import { Page } from '../../types';

interface HomeProps {
  onNavigate: (page: Page, scrollToId?: string) => void;
}

const specializations = [
  {
    title: 'Artificial Intelligence',
    description: 'Build intelligent systems with neural networks, deep learning, and cutting-edge AI technologies.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    tags: ['Neural Networks', 'Deep Learning', 'NLP', 'Computer Vision']
  },
  {
    title: 'Machine Learning',
    description: 'Master predictive analytics, supervised & unsupervised learning, and model optimization techniques.',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop',
    tags: ['Predictive Analytics', 'Classification', 'Regression', 'Model Training']
  },
  {
    title: 'VLSI Design',
    description: 'Design and verify next-generation integrated circuits and semiconductor chips.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    tags: ['Chip Design', 'Layout', 'Verification', 'RTL Design']
  },
  {
    title: 'Full Stack Development',
    description: 'Create complete web applications using React, Node.js, Django, and modern frameworks.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'Django', 'APIs']
  },
  {
    title: 'Data Science',
    description: 'Transform raw data into actionable insights using analytics and visualization tools.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Analytics', 'Visualization', 'Big Data', 'Business Intelligence']
  }
];

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % specializations.length);
    }, 5000); // Change every 10 seconds

    return () => clearInterval(interval);
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

  const currentSpec = specializations[currentIndex];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-imtda-primary via-blue-900 to-imtda-primary min-h-[65vh] flex items-center overflow-hidden py-8">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-imtda-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-8 sm:px-12 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div className="text-left space-y-5">
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-500/20 text-imtda-accent rounded-full text-sm font-semibold border border-imtda-accent/30">
                  🚀 Leading Tech Education Platform
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-snug">
                Empowering Innovation in
                <span className="block text-imtda-accent mt-1 transition-all duration-500">
                  {currentSpec.title}
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed transition-all duration-500">
                {currentSpec.description}
              </p>
              
              <div className="pt-1">
                <button 
                  onClick={() => onNavigate(Page.ABOUT, 'contact-section')}
                  className="px-7 py-3 bg-imtda-accent text-white font-bold rounded-lg text-base hover:bg-blue-400 transition-all shadow-lg hover:shadow-blue-500/50 hover:translate-y-[-2px]"
                >
                  Partner With Us
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative w-full h-[280px] md:h-[380px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img 
                  key={currentIndex}
                  src={currentSpec.image} 
                  alt={currentSpec.title}
                  className="w-full h-full object-cover transition-opacity duration-1000 animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-imtda-primary/60 to-transparent"></div>
                
                {/* Floating Tech Tags */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {currentSpec.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-imtda-primary rounded-lg text-xs font-semibold shadow-lg transition-all duration-500"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Progress Indicator */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {specializations.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'w-8 bg-imtda-accent' : 'w-4 bg-white/40'
                      }`}
                    >
                      {idx === currentIndex && (
                        <div className="h-full bg-imtda-accent rounded-full animate-progress"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Domains Grid */}
      <section id="competencies" data-animate className={`py-20 bg-white transition-all duration-1000 transform ${
        visibleSections.has('competencies') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Core Competencies</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Bridging the gap between academic learning and industrial requirements through cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Cpu, title: 'AI & Machine Learning', desc: 'Building smart systems using neural networks and predictive analytics.' },
              { icon: Code, title: 'Full Stack Dev', desc: 'End-to-end web solutions using React, Node.js, and Django.' },
              { icon: Database, title: 'Data Science', desc: 'Turning raw data into actionable insights for business intelligence.' },
              { icon: Video, title: 'Smart Surveillance', desc: 'Advanced video analytics and computer vision solutions.' },
              { icon: PenTool, title: 'VLSI Design', desc: 'Chip design, layout, and verification for next-gen electronics.' },
              { icon: BookOpen, title: 'CAD & Simulation', desc: 'Expert training in AutoCAD, CATIA, and ANSYS tools.' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-500 cursor-pointer group transform ${
                  visibleSections.has('competencies') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-imtda-primary transition-colors">
                  <item.icon className="w-7 h-7 text-imtda-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
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
              { label: 'Students Trained', val: '500+' },
              { label: 'Live Projects', val: '50+' },
              { label: 'Corporate Partners', val: '10+' },
              { label: 'Years Vision', val: '2025' },
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
       <section id="testimonials" data-animate className="py-20 bg-gray-50 overflow-hidden">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 transition-all duration-1000 transform ${
          visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
           <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
        </div>
        <div className="relative">
           <div className="flex gap-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory scrollbar-hide">
              <div 
                className={`bg-white p-8 rounded-xl shadow-md min-w-[350px] md:min-w-[400px] snap-center transition-all duration-700 transform ${
                  visibleSections.has('testimonials') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: '0ms' }}
              >
                 <div className="flex items-center mb-4">
                    <img src="https://picsum.photos/50/50?random=101" alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Priya </div>
                      <div className="text-xs text-gray-500">Intern, AI & Machine Learning</div>
                    </div>
                 </div>
                 <p className="text-gray-600 italic text-left">"The AI internship at IMTDA gave me hands-on experience with real-world machine learning projects. The mentors were incredibly supportive and the learning environment was exceptional."</p>
              </div>
              
              <div 
                className={`bg-white p-8 rounded-xl shadow-md min-w-[350px] md:min-w-[400px] snap-center transition-all duration-700 transform ${
                  visibleSections.has('testimonials') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                 <div className="flex items-center mb-4">
                    <img src="https://picsum.photos/50/50?random=102" alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Rahul </div>
                      <div className="text-xs text-gray-500">Intern, Full Stack Development</div>
                    </div>
                 </div>
                 <p className="text-gray-600 italic text-left">"I learned more in 2 months at IMTDA than I did in my entire college curriculum. The practical projects and industry-standard tools helped me land my dream job!"</p>
              </div>
              
              <div 
                className={`bg-white p-8 rounded-xl shadow-md min-w-[350px] md:min-w-[400px] snap-center transition-all duration-700 transform ${
                  visibleSections.has('testimonials') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                 <div className="flex items-center mb-4">
                    <img src="https://picsum.photos/50/50?random=103" alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Ananya Reddy</div>
                      <div className="text-xs text-gray-500">Intern, VLSI Design</div>
                    </div>
                 </div>
                 <p className="text-gray-600 italic text-left">"The VLSI training program was comprehensive and industry-focused. I gained expertise in Verilog and RTL design which directly helped me secure a position at a semiconductor company."</p>
              </div>
              
              <div 
                className={`bg-white p-8 rounded-xl shadow-md min-w-[350px] md:min-w-[400px] snap-center transition-all duration-700 transform ${
                  visibleSections.has('testimonials') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                 <div className="flex items-center mb-4">
                    <img src="https://picsum.photos/50/50?random=104" alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Arjun Kumar</div>
                      <div className="text-xs text-gray-500">Intern, Data Science</div>
                    </div>
                 </div>
                 <p className="text-gray-600 italic text-left">"IMTDA's data science program transformed my understanding of analytics. The real-world datasets and visualization projects built my confidence tremendously."</p>
              </div>
              
              <div 
                className={`bg-white p-8 rounded-xl shadow-md min-w-[350px] md:min-w-[400px] snap-center transition-all duration-700 transform ${
                  visibleSections.has('testimonials') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                 <div className="flex items-center mb-4">
                    <img src="https://picsum.photos/50/50?random=105" alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Sneha </div>
                      <div className="text-xs text-gray-500">Intern, AutoCAD & Design</div>
                    </div>
                 </div>
                 <p className="text-gray-600 italic text-left">"The mechanical design training at IMTDA was exceptional. Learning AutoCAD and CATIA from industry experts gave me a competitive edge in my placements."</p>
              </div>
              
              <div 
                className={`bg-white p-8 rounded-xl shadow-md min-w-[350px] md:min-w-[400px] snap-center transition-all duration-700 transform ${
                  visibleSections.has('testimonials') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                 <div className="flex items-center mb-4">
                    <img src="https://picsum.photos/50/50?random=106" alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Vikram </div>
                      <div className="text-xs text-gray-500">Intern, Smart Surveillance</div>
                    </div>
                 </div>
                 <p className="text-gray-600 italic text-left">"Working on computer vision and video analytics projects was an incredible experience. The mentorship helped me understand AI applications in security systems."</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
