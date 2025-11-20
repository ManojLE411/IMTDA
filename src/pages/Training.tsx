import React from 'react';
import { TrainingProgram } from '../utils/types';
import { Users, BookOpen, Briefcase, Award } from 'lucide-react';

interface TrainingProps {
  programs: TrainingProgram[];
}

const Training: React.FC<TrainingProps> = ({ programs }) => {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Training & Consultancy</h1>
          <p className="mt-4 text-xl text-gray-600">Upskilling students and empowering enterprises with custom AI solutions.</p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {programs.map(program => (
            <div key={program.id} className={`bg-${program.category === 'Institutional' ? 'blue' : 'gray'}-50 rounded-2xl p-8 border border-${program.category === 'Institutional' ? 'blue' : 'gray'}-100 hover:border-imtda-accent transition-all`}>
              <div className={`w-12 h-12 bg-${program.category === 'Institutional' ? 'blue-600' : 'gray-800'} rounded-lg flex items-center justify-center text-white mb-6`}>
                {program.category === 'Institutional' ? <BookOpen size={28} /> : <Briefcase size={28} />}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h2>
              <ul className="space-y-3 text-gray-700">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className={`w-2 h-2 bg-${program.category === 'Institutional' ? 'imtda-accent' : 'gray-500'} rounded-full`}></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`mt-8 px-6 py-2 border border-${program.category === 'Institutional' ? 'blue-600 text-blue-700' : 'gray-800 text-gray-800'} font-semibold rounded-lg hover:bg-${program.category === 'Institutional' ? 'blue-600' : 'gray-800'} hover:text-white transition-colors`}>
                {program.category === 'Institutional' ? 'Inquire for College' : 'Partner With Us'}
              </button>
            </div>
          ))}
        </div>
        
        {programs.length === 0 && (
           <div className="text-center text-gray-500 py-10">No training programs listed at the moment.</div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-imtda-primary rounded-2xl p-10 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10">
             <Award className="mx-auto w-16 h-16 text-imtda-accent mb-4" />
             <h2 className="text-3xl font-bold mb-4">Ready to Transform?</h2>
             <p className="max-w-2xl mx-auto mb-8 text-blue-100">Whether you are a student looking to jumpstart your career or an institution aiming for excellence, IMTDA is your partner in progress.</p>
             <button className="bg-white text-imtda-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
               Contact Us Today
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Training;