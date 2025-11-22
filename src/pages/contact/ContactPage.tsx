import React, { useState } from 'react';
import { MapPin, Mail, Phone, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { useContactMessages } from '@/features/contact';

export const ContactPage: React.FC = () => {
  const { submitMessage } = useContactMessages();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please enter your message.');
      return;
    }

    // Create contact message
    const newMessage = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject,
      message: formData.message.trim(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'New' as const
    };

    submitMessage(newMessage);
    setSubmitted(true);

    // Reset form after delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 5000);
  };

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
            {submitted ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center animate-fade-in">
                <CheckCircle size={48} className="mx-auto text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-green-700">Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-lg flex items-center gap-2 animate-fade-in">
                    <AlertCircle size={18} className="flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="Your Name" 
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="Your Email" 
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <select 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Internship Partnership">Internship Partnership</option>
                    <option value="Project Consultation">Project Consultation</option>
                    <option value="Careers">Careers</option>
                  </select>
                </div>
                <div>
                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                   <textarea 
                     id="message"
                     name="message"
                     rows={4} 
                     value={formData.message}
                     onChange={handleInputChange}
                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                     placeholder="How can we help you?"
                     required
                   ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full md:w-auto bg-imtda-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Send Message
                </button>
              </form>
            )}
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

