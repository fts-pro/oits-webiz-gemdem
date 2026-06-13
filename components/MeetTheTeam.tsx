import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Github, Mail, Users } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin: string;
  twitter: string;
  github: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Alex Morgan',
    role: 'CEO & Founder',
    description: 'Spearheading product strategy and business vision to bridge complex software architecture with commercial growth.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&fm=webp',
    linkedin: '#',
    twitter: '#',
    github: '#'
  },
  {
    name: 'Sarah Chen',
    role: 'Chief Architect',
    description: 'Expert in designing highly reliable, cloud-native global server backends and distributed transactional schemas.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&fm=webp',
    linkedin: '#',
    twitter: '#',
    github: '#'
  },
  {
    name: 'James Wilson',
    role: 'Head of UI/UX',
    description: 'Architecting dynamic usability loops, interactive animations, and pristine system-level design systems.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&fm=webp',
    linkedin: '#',
    twitter: '#',
    github: '#'
  },
  {
    name: 'Maria Garcia',
    role: 'Product Delivery Director',
    description: 'Synchronizing cross-functional sprints, QA cycles, and release windows with radical accountability.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&fm=webp',
    linkedin: '#',
    twitter: '#',
    github: '#'
  }
];

export const MeetTheTeam: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-150 dark:border-slate-900 overflow-hidden">
      <div className="container mx-auto px-6">
        
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full mb-4">
            <Users size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Leadership</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-none tracking-tighter mb-4">
            Meet Our Brains
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base">
            A cohesive squad of world-class developers, designers, and system operators building digital landmarks.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <ScrollReveal
              key={member.name}
              delay={idx * 0.1}
              className="group relative bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={member.image}
                  referrerPolicy="no-referrer"
                  alt={`${member.name}, ${member.role}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  aria-label={`Portrait photo of ${member.name}`}
                />
                
                {/* Overlay revealing descriptions and links */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent p-6 sm:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 z-10">
                  <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-slate-300 text-xs leading-relaxed font-medium">
                      {member.description}
                    </p>
                    <div className="h-px bg-slate-800/80 w-full" />
                    <div className="flex gap-2">
                      <a
                        href={member.linkedin}
                        aria-label={`${member.name}'s LinkedIn`}
                        className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
                      >
                        <Linkedin size={15} />
                      </a>
                      <a
                        href={member.twitter}
                        aria-label={`${member.name}'s Twitter`}
                        className="w-9 h-9 bg-slate-800 hover:bg-sky-500 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
                      >
                        <Twitter size={15} />
                      </a>
                      <a
                        href={member.github}
                        aria-label={`${member.name}'s GitHub`}
                        className="w-9 h-9 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
                      >
                        <Github size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 relative">
                <div className="flex flex-col gap-1">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs font-mono font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    {member.role}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
