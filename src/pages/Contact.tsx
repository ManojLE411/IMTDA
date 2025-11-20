import React from 'react';
import { MapPin, Mail, Phone, Send, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-imtda-primary py-16 text-center text-white">
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="mt-2 text-blue-200">Have a question? We'd love to hear from you.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-12">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
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

        {/* Map Integration Placeholder */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-md h-80 bg-gray-200 relative group">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60797.56216724848!2d83.4312!3d17.8914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3957a000000001%3A0x0!2sBheemunipatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin" 
             width="100%" 
             height="100%" 
             style={{border:0}} 
             loading="lazy"
             className="filter grayscale hover:grayscale-0 transition-all duration-700"
           ></iframe>
           <div className="absolute bottom-4 right-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold hover:bg-green-600 transition-colors">
                <MessageCircle size={20} /> WhatsApp Us
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
