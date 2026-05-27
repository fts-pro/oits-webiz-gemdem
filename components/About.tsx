
import React from 'react';
import { CheckCircle2, Target, Heart, Users } from 'lucide-react';
import { SectionId } from '../types';
import { ScrollReveal } from './ui/ScrollReveal';

const TEAM = [
  {
    name: 'Alex Morgan',
    role: 'CEO & Founder',
    image: '/assets/about_ceo.png',
  },
  {
    name: 'Sarah Chen',
    role: 'Lead Architect',
    image: '/assets/about_architect.png',
  },
  {
    name: 'James Wilson',
    role: 'Head of Design',
    image: '/assets/about_designer.png',
  },
  {
    name: 'Maria Garcia',
    role: 'Project Manager',
    image: '/assets/about_pm.png',
  },
];

export const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          
          {/* Hero Image Section */}
          <ScrollReveal direction="left" className="flex-1 w-full relative">
             <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-2xl group">
                <img 
                  src="/assets/about_team.png" 
                  referrerPolicy="no-referrer" 
                  alt="OITS Dhaka team collaboration" 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  aria-label="OITS Dhaka team collaborating on a project"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="text-3xl font-bold">10+</p>
                    <p className="text-sm opacity-80">Years of Excellence</p>
                  </div>
                </div>
             </div>
             {/* Floater */}
             <div className="absolute -bottom-8 -right-8 w-48 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 hidden md:block z-10 transition-transform duration-500 hover:scale-105">
               <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold mb-2">Projects Completed</p>
               <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">150+</p>
             </div>
          </ScrollReveal>

          <div className="flex-1 space-y-12">
            {/* Mission & Vision Subsection */}
            <ScrollReveal className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                   <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                   <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Our Mission & Vision</h2>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                  Partnering with startups and enterprises to build the future.
                </h3>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                We are a team of passionate developers, designers, and strategists dedicated to delivering digital solutions that make a difference. At OITS Dhaka, we don't just write code; we solve complex business problems through innovation.
              </p>
            </ScrollReveal>

            {/* Core Values Subsection */}
            <ScrollReveal delay={0.2}>
               <div className="flex items-center gap-2 mb-6">
                   <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                   <h4 className="text-lg font-bold text-slate-900 dark:text-white">Core Values</h4>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Agile Methodology', '24/7 Support', 'Dedicated Teams', 'Top-tier Security'].map((item, idx) => (
                    <div 
                      key={item} 
                      className={`flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50 transition-all duration-500`} 
                    >
                      <CheckCircle2 className="text-green-500 w-5 h-5 flex-shrink-0" />
                      <span className="font-medium text-slate-800 dark:text-slate-200">{item}</span>
                    </div>
                  ))}
               </div>
            </ScrollReveal>

            {/* Stats Subsection */}
            <ScrollReveal delay={0.3} className="pt-4">
               <div className="h-px w-full bg-slate-200 dark:bg-slate-800 mb-8"></div>
               <div className="flex gap-12" aria-label="Company statistics">
                 <div>
                   <p className="text-3xl font-bold text-slate-900 dark:text-white">50+</p>
                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Experts</p>
                 </div>
                 <div>
                   <p className="text-3xl font-bold text-slate-900 dark:text-white">98%</p>
                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Client Retention</p>
                 </div>
               </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <ScrollReveal className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Our Team</h2>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Meet the minds behind the magic.</h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, index) => (
              <ScrollReveal 
                key={member.name}
                delay={index * 0.1}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-200 dark:bg-slate-700">
                  <img 
                    src={member.image} 
                    referrerPolicy="no-referrer"
                    alt={`${member.name}, ${member.role} at OITS Dhaka`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    aria-label={`Photo of ${member.name}, ${member.role}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-lg">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">{member.name}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{member.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
