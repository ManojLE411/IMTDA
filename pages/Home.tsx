import React, { useEffect, useState } from 'react';
import { ArrowRight, Cpu, Code, Database, Video, PenTool, BookOpen } from 'lucide-react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Typewriter: React.FC<{ words: string[] }> = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (index >= words.length) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  return (
    <span className="text-imtda-accent font-mono">
      {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </span>
  );
};

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-imtda-primary min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/1920/1080?blur=10')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-imtda-primary/90"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6">
              Empowering Innovation <br className="hidden md:block" />
              Through <span className="text-imtda-accent">AI & Digital Education</span>
            </h1>
            <div className="text-xl md:text-3xl text-gray-300 mb-10 h-12">
              We specialize in <Typewriter words={['Artificial Intelligence', 'Machine Learning', 'VLSI Design', 'Full Stack Web Dev', 'Data Science']} />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => onNavigate(Page.INTERNSHIPS)}
                className="px-8 py-4 bg-imtda-accent text-white font-bold rounded-full text-lg hover:bg-blue-400 transition-all shadow-lg hover:shadow-blue-500/50 flex items-center gap-2"
              >
                Apply for Internship <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => onNavigate(Page.CONTACT)}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white hover:text-imtda-primary transition-all"
              >
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Domains Grid */}
      <section className="py-20 bg-white">
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
              <div key={idx} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer group">
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
      <section className="py-16 bg-imtda-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Students Trained', val: '500+' },
              { label: 'Live Projects', val: '50+' },
              { label: 'Corporate Partners', val: '10+' },
              { label: 'Years Vision', val: '2025' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-bold text-imtda-accent mb-2">{stat.val}</div>
                <div className="text-sm md:text-base text-blue-200 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Testimonials */}
       <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
           <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
        </div>
        <div className="flex overflow-x-hidden space-x-8 px-4 pb-8">
           <div className="flex animate-slide-up gap-6 mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-md max-w-md flex-shrink-0">
                   <div className="flex items-center mb-4">
                      <img src={`https://picsum.photos/50/50?random=${i}`} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                      <div className="text-left">
                        <div className="font-bold text-gray-900">Student {i}</div>
                        <div className="text-xs text-gray-500">Intern, AI Domain</div>
                      </div>
                   </div>
                   <p className="text-gray-600 italic text-left">"The internship program at IMTDA gave me real-world exposure to machine learning models. The mentorship was exceptional."</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
