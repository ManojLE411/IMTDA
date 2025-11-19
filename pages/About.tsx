import React from 'react';
import { Award, Target, Eye, Briefcase } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-900 py-20 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">About IMTDA Infotech</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto px-4">
          Founded in Jan 2025, we are on a mission to revolutionize education and industry through Artificial Intelligence.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-blue-50 p-8 rounded-2xl border-l-4 border-imtda-primary">
            <div className="flex items-center mb-4">
              <Eye className="w-8 h-8 text-imtda-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To become a catalyst for AI-powered digital transformation in education, industry, and governance, ensuring technology is accessible to all.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-2xl border-l-4 border-imtda-accent">
             <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-imtda-accent mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To develop smart, scalable, and secure digital platforms that empower students, startups, and enterprises to innovate using AI.
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="w-full md:w-1/3">
            <div className="relative">
               <div className="absolute inset-0 bg-imtda-accent transform translate-x-3 translate-y-3 rounded-xl"></div>
               <img 
                 src="https://picsum.photos/400/500?grayscale" 
                 alt="Founder" 
                 className="relative rounded-xl shadow-lg w-full object-cover"
               />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Message from the Founder</h2>
            <h3 className="text-xl text-imtda-primary font-semibold mb-6">Mr. Kishore Gundu</h3>
            <blockquote className="text-gray-600 italic text-lg border-l-4 border-gray-300 pl-4 mb-6">
              "At IMTDA, we believe that the future belongs to those who understand the language of machines. Our goal is not just to teach technology, but to instill a mindset of innovation and problem-solving in every student and professional we touch."
            </blockquote>
            <div className="flex gap-4">
              <span className="px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-600 font-medium">EdTech</span>
              <span className="px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-600 font-medium">AI Research</span>
              <span className="px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-600 font-medium">Incubation</span>
            </div>
          </div>
        </div>

        {/* Corporate Info Table */}
        <div className="border rounded-xl overflow-hidden shadow-sm">
          <div className="bg-gray-50 px-6 py-4 border-b">
             <h3 className="text-lg font-bold text-gray-800 flex items-center">
               <Briefcase className="w-5 h-5 mr-2" /> Corporate Information
             </h3>
          </div>
          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Legal Name</span>
                <span className="font-medium text-gray-900 text-right">IMTDA Infotech (OPC) Private Limited</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Incorporation Date</span>
                <span className="font-medium text-gray-900 text-right">January 6, 2025</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Location</span>
                <span className="font-medium text-gray-900 text-right">Bheemunipatnam, AP, India</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Registration</span>
                <span className="font-medium text-gray-900 text-right">Companies Act, 2013</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Focus</span>
                <span className="font-medium text-gray-900 text-right">Education & Software Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
