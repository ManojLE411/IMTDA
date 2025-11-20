import React from 'react';
import { Award, Target, Eye, Briefcase, Users, MapPin, Mail, Phone, Send, MessageCircle } from 'lucide-react';

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

        {/* Founder Section - Elevated */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Founder</h2>
            <p className="text-gray-600">The visionary behind IMTDA Infotech</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-imtda-primary/10 to-transparent rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-imtda-accent/10 to-transparent rounded-full -ml-48 -mb-48"></div>
              
              <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 p-8 md:p-12">
                {/* Founder Image */}
                <div className="md:col-span-2 flex justify-center items-start">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-imtda-primary to-imtda-accent rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                    <div className="relative w-56 h-56 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white">
                      <img 
                        src="https://picsum.photos/400?random=1" 
                        alt="Kishore Gundu" 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-imtda-primary to-imtda-accent text-white px-6 py-3 rounded-full shadow-lg">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Founder Info */}
                <div className="md:col-span-3 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Kishore Gundu</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-lg font-semibold text-imtda-primary">Co-Founder & CEO</span>
                      <span className="h-1 w-12 bg-gradient-to-r from-imtda-primary to-imtda-accent rounded"></span>
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed mb-6">
                      Visionary leader with a passion for revolutionizing education and industry through Artificial Intelligence. 
                      With extensive experience in AI research and EdTech innovation, Kishore founded IMTDA Infotech to bridge 
                      the gap between cutting-edge technology and accessible learning solutions.
                    </p>
                  </div>

                  {/* Expertise Tags */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Areas of Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow">AI Research</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow">EdTech Innovation</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow">Strategic Leadership</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow">Digital Transformation</span>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="border-l-4 border-imtda-primary pl-4 py-2 bg-blue-50/50 rounded-r-lg">
                    <p className="text-gray-700 italic text-sm">
                      "Our mission is to make AI-powered solutions accessible to everyone, empowering the next generation 
                      of innovators and transforming industries through technology."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-10 h-10 text-imtda-primary mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our diverse team of experts brings together deep expertise in AI, software development, and education to drive innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-imtda-primary/30">
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src="https://picsum.photos/400/300?random=2" alt="Team Member" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-imtda-primary transition-colors">Manoj Sharma</h3>
                  <p className="text-imtda-primary font-semibold text-sm">Chief Technology Officer</p>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Expert in full-stack development and cloud architecture with 10+ years experience.
                </p>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">Full Stack</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">Cloud</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">DevOps</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Briefcase className="w-6 h-6 text-imtda-primary" />
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-imtda-primary/30">
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-green-400 via-green-500 to-teal-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src="https://picsum.photos/400/300?random=3" alt="Team Member" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-imtda-primary transition-colors">Hemanth Reddy</h3>
                  <p className="text-imtda-primary font-semibold text-sm">Head of AI & Machine Learning</p>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Pioneering AI solutions with expertise in NLP, computer vision, and deep learning.
                </p>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">AI/ML</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">NLP</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">Deep Learning</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Briefcase className="w-6 h-6 text-imtda-primary" />
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-imtda-primary/30">
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src="https://picsum.photos/400/300?random=4" alt="Team Member" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-imtda-primary transition-colors">Kiran Patel</h3>
                  <p className="text-imtda-primary font-semibold text-sm">Product Manager</p>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Driving product innovation with focus on user experience and market trends.
                </p>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">Product Strategy</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">UX/UI</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">Agile</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Briefcase className="w-6 h-6 text-imtda-primary" />
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-imtda-primary/30">
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-indigo-400 via-indigo-500 to-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src="https://picsum.photos/400/300?random=5" alt="Team Member" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-imtda-primary transition-colors">Aditya Sharma</h3>
                  <p className="text-imtda-primary font-semibold text-sm">Lead Developer</p>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Building scalable applications with expertise in React, Node.js, and system design.
                </p>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">React</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">Node.js</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">TypeScript</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Briefcase className="w-6 h-6 text-imtda-primary" />
              </div>
            </div>

            {/* Team Member 5 */}
            <div className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-imtda-primary/30">
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src="https://picsum.photos/400/300?random=6" alt="Team Member" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-imtda-primary transition-colors">Ganesh Rao</h3>
                  <p className="text-imtda-primary font-semibold text-sm">Marketing Director</p>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Crafting compelling brand stories and growth strategies for digital transformation.
                </p>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">Digital Marketing</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">Branding</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">Growth</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Briefcase className="w-6 h-6 text-imtda-primary" />
              </div>
            </div>

            {/* Team Member 6 */}
            <div className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-imtda-primary/30">
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src="https://picsum.photos/400/300?random=7" alt="Team Member" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-imtda-primary transition-colors">Priya Singh</h3>
                  <p className="text-imtda-primary font-semibold text-sm">Business Analyst</p>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Translating business requirements into technical solutions with data-driven insights.
                </p>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">Analytics</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">Strategy</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">Data Science</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Briefcase className="w-6 h-6 text-imtda-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact-section" className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-imtda-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Our Office</h3>
                    <p className="text-gray-600 text-sm mt-1">Bheemunipatnam, Visakhapatnam,<br />Andhra Pradesh – 531163, India</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-imtda-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Email Us</h3>
                    <p className="text-gray-600 text-sm mt-1">imtdainfotech@gmail.com</p>
                    <p className="text-gray-500 text-xs mt-1">Response time: 24 hours</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-imtda-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Call Us</h3>
                    <p className="text-gray-600 text-sm mt-1">+91 6302305973</p>
                    <p className="text-gray-500 text-xs mt-1">Mon-Sat, 9am - 6pm</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your Email" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>General Inquiry</option>
                      <option>Internship Partnership</option>
                      <option>Project Consultation</option>
                      <option>Careers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="How can we help you?"></textarea>
                  </div>
                  <button className="w-full md:w-auto bg-imtda-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                    <Send size={18} /> Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Map Integration */}
            <div className="mt-12 rounded-xl overflow-hidden shadow-md h-80 bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60797.56216724848!2d83.4312!3d17.8914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3957a000000001%3A0x0!2sBheemunipatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                loading="lazy"
                className="filter grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
