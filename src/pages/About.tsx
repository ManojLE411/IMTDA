import React from 'react';
import {
  Award,
  Target,
  Eye,
  Briefcase,
  Users,
  MapPin,
  Mail,
  Phone,
  Send,
  MessageCircle,
} from 'lucide-react';

const stats = [
  { value: '12+', label: 'Years of Excellence', description: 'In software delivery and AI-led innovation.' },
  { value: '150+', label: 'Products & Platforms', description: 'Launched for clients across fintech, logistics, and edtech.' },
  { value: '200+', label: 'Certified Experts', description: 'Solving complex challenges in every phase of digital transformation.' },
  { value: '50+', label: 'Global Customers', description: 'Partnering with companies in India, APAC, and the US.' },
];

const features = [
  { title: 'Trusted Company', description: 'Reliable delivery, transparent execution, measurable outcomes.', icon: Award },
  { title: 'Professional Work', description: 'Modern engineering paired with design-led thinking.', icon: Briefcase },
  { title: 'Award Winning', description: 'Recognized for solutions that marry quality with speed.', icon: Target },
  { title: 'Help Anytime', description: 'Dedicated teams available across time zones and channels.', icon: MessageCircle },
];

const teamMembers = [
  {
    name: 'Manoj Sharma',
    role: 'Chief Technology Officer',
    summary: 'Full-stack architect pairing cloud economics with product velocity.',
    skills: ['Full Stack', 'Cloud', 'DevOps'],
    image: 'https://picsum.photos/400/300?random=2',
  },
  {
    name: 'Hemanth Reddy',
    role: 'Head of AI & Machine Learning',
    summary: 'Leading NLP, computer vision, and automation initiatives.',
    skills: ['AI/ML', 'NLP', 'Deep Learning'],
    image: 'https://picsum.photos/400/300?random=3',
  },
  {
    name: 'Kiran Patel',
    role: 'Product Manager',
    summary: 'Aligns product stories with market needs and UX research.',
    skills: ['Product Strategy', 'UX/UI', 'Agile'],
    image: 'https://picsum.photos/400/300?random=4',
  },
  {
    name: 'Aditya Sharma',
    role: 'Lead Developer',
    summary: 'Builds scalable React + Node.js platforms with mature pipelines.',
    skills: ['React', 'Node.js', 'TypeScript'],
    image: 'https://picsum.photos/400/300?random=5',
  },
];

const About: React.FC = () => {
  return (
    <div className="bg-slate-950 text-slate-100">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-4">About Us</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Crafting digital experiences built for scale, speed, and trust.
          </h1>
          <p className="max-w-3xl text-lg text-slate-200 mb-8">
            IMTDA Infotech partners with ambitious teams to engineer software, data, and AI solutions that accelerate growth,
            unlock insights, and delight customers across every channel.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact-section" className="inline-flex items-center gap-2 bg-imtda-primary text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-500 transition">
              <Send size={16} /> Talk to us
            </a>
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full text-white/80 hover:border-white hover:text-white transition">
              <Users size={16} /> Meet the team
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-inner">
              <p className="text-4xl font-bold text-white">{stat.value}</p>
              <h3 className="text-lg font-semibold text-slate-200 mt-2">{stat.label}</h3>
              <p className="text-sm text-slate-400 mt-2">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* About Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white/5 border border-white/10 rounded-3xl p-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Powerful agency for enterprise transformation.</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              We blend strategy, engineering, and AI to deliver bespoke platforms that run securely, scale gracefully,
              and keep humans at the center. From discovery workshops to product launches, our cross-disciplinary teams
              stay aligned with your goals and operate transparently.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="px-4 py-2 border border-white/20 rounded-full">Strategy</span>
              <span className="px-4 py-2 border border-white/20 rounded-full">Engineering</span>
              <span className="px-4 py-2 border border-white/20 rounded-full">AI & Automation</span>
              <span className="px-4 py-2 border border-white/20 rounded-full">Delivery Excellence</span>
            </div>
          </div>
          <div className="space-y-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-900/60 to-slate-900/60 border border-white/10 shadow-lg">
                  <div className="p-3 rounded-2xl bg-white/10">
                    <Icon className="w-6 h-6 text-imtda-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-slate-300">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission / Vision / Values */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-sm uppercase tracking-[0.5em] text-slate-400">Principles</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-imtda-primary" />
                <h3 className="text-xl font-semibold text-white">Vision</h3>
              </div>
              <p className="text-sm text-slate-300">
                To be the go-to innovation partner for next-gen enterprises, powering intelligent & trustworthy products.
              </p>
              <p className="text-xs uppercase text-slate-500 tracking-wider">See beyond the horizon</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-imtda-primary" />
                <h3 className="text-xl font-semibold text-white">Mission</h3>
              </div>
              <p className="text-sm text-slate-300">
                Deliver secure, scalable, and AI-powered software that answers real business problems with measurable impact.
              </p>
              <p className="text-xs uppercase text-slate-500 tracking-wider">Build with intent</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-imtda-primary" />
                <h3 className="text-xl font-semibold text-white">Values</h3>
              </div>
              <p className="text-sm text-slate-300">
                Empathy, experimentation, and accountability drive how we engage, create, and deliver for every partner.
              </p>
              <p className="text-xs uppercase text-slate-500 tracking-wider">Be human. Be bold.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-imtda-primary" />
                <h2 className="text-3xl font-bold text-white">Meet Our Core Team</h2>
              </div>
              <p className="text-slate-300 max-w-2xl">
                Our strategic partners, product leads, and technologists work shoulder-to-shoulder with your team from day one.
              </p>
            </div>
            <span className="text-sm uppercase tracking-[0.4em] text-slate-500">Trusted</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <article key={member.name} className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform">
                <div className="relative">
                  <div className="h-48 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-80 transition-opacity"></div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-sm font-medium text-imtda-primary">{member.role}</p>
                  <p className="text-sm text-slate-300">{member.summary}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                    {member.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white/10 rounded-full border border-white/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Contact / CTA */}
        <div id="contact-section" className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="space-y-5">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Start a conversation</h2>
              <p className="text-slate-600">
                Tell us about your next product, automation opportunity, or talent need. We will craft a plan within one business day.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-imtda-primary" />
                <div>
                  <p className="font-semibold text-slate-800">Headquarters</p>
                  <p className="text-sm text-slate-500">Bheemunipatnam, Visakhapatnam, Andhra Pradesh – 531163</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-imtda-primary" />
                <div>
                  <p className="font-semibold text-slate-800">Email</p>
                  <p className="text-sm text-slate-500">imtdainfotech@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-imtda-primary" />
                <div>
                  <p className="font-semibold text-slate-800">Call</p>
                  <p className="text-sm text-slate-500">+91 6302305973 (Mon-Sat, 9am-6pm IST)</p>
                </div>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-imtda-primary px-5 py-3 rounded-full hover:bg-blue-500 transition">
              <Send size={16} /> Share your brief
            </button>
          </div>
          <form className="space-y-4 bg-slate-950 border border-white/10 p-6 rounded-2xl shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Your name" className="w-full rounded-xl px-4 py-2 border border-white/10 bg-transparent text-sm text-white focus:border-imtda-primary focus:outline-none" />
              <input type="email" placeholder="Work email" className="w-full rounded-xl px-4 py-2 border border-white/10 bg-transparent text-sm text-white focus:border-imtda-primary focus:outline-none" />
            </div>
            <input type="text" placeholder="Company / Product" className="w-full rounded-xl px-4 py-2 border border-white/10 bg-transparent text-sm text-white focus:border-imtda-primary focus:outline-none" />
            <textarea rows={4} placeholder="How can we help?" className="w-full rounded-xl px-4 py-2 border border-white/10 bg-transparent text-sm text-white focus:border-imtda-primary focus:outline-none"></textarea>
            <button type="submit" className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-imtda-primary to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition">
              <Send size={16} /> Request a callback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;
