import React, { useState } from 'react';
import { About } from '../components/About';
import { MeetTheTeam } from '../components/MeetTheTeam';
import { Metrics } from '../components/Metrics';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { HelpCircle, Briefcase, Coffee, Globe, GraduationCap, Cpu, Code2, Database } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Accordion } from '../components/ui/Accordion';
import { TECH_DOMAINS } from '../constants';
import { motion } from 'motion/react';

const LOGOS = [
  { name: 'TechFlow' },
  { name: 'CloudScale' },
  { name: 'DevOps' },
  { name: 'Innovate' },
  { name: 'GlobalLogistics' },
  { name: 'Fintech' },
];

const FAQS = [
  {
    id: "faq-0",
    question: "What is OITS Dhaka's typical project timeline?",
    answer: "Project timelines vary depending on complexity. A typical MVP development cycle takes between 8 to 12 weeks, while larger enterprise transformations can span 6+ months with continuous agile iterations."
  },
  {
    id: "faq-1",
    question: "How do you handle project communication?",
    answer: "We believe in radical transparency. Every project gets a dedicated Slack channel for real-time chat, bi-weekly video sprint reviews, and access to our project management tools (Jira/Asana) so you can track progress anytime."
  },
  {
    id: "faq-2",
    question: "Can you help with post-launch support and scaling?",
    answer: "Absolutely. We offer flexible post-launch maintenance packages that include monitoring, bug fixes, performance tuning, and continuous feature development to help you scale based on real user feedback."
  },
  {
    id: "faq-3",
    question: "Do you offer dedicated developer teams?",
    answer: "Yes, we specialize in high-velocity dedicated teams that integrate seamlessly with your in-house workflow. Our staff augmentation model ensures you get senior engineering talent that scales with your roadmap."
  },
  {
    id: "faq-4",
    question: "How do you ensure the security of our data and intellectual property?",
    answer: "Security is baked into our DNA. We sign strict NDAs, follow OWASP security best practices during development, and implement robust CI/CD pipelines with automated vulnerability scanning."
  }
];

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 bg-white dark:bg-slate-950">
      <SEO 
        title="About Us | OITS Dhaka"
        description="Learn about OITS Dhaka, our culture, and our mission to build the digital infrastructure for tomorrow's industry leaders."
        keywords="about OITS Dhaka, software company culture, engineering team, tech partners"
      />
      <div className="py-24 md:py-32 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-blue-400 font-bold uppercase tracking-[0.3em] mb-4 text-sm">Who We Are</h2>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight text-white">Engineers. <br/> Innovators. Partners.</h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
              Building the digital infrastructure for tomorrow's industry leaders with passion and precision.
            </p>
          </ScrollReveal>
        </div>
      </div>
      
      <About />
      <MeetTheTeam />
      <Metrics />

      {/* Skills Section with Animated Progress Bars */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Technical Prowess</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Our Expertise in Numbers</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We maintain mastery over modern tech stacks to deliver high-performance, enterprise-grade solutions.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {TECH_DOMAINS.map((domain, domainIdx) => {
               const Icon = domain.id === 'frontend' ? Code2 : domain.id === 'backend' ? Database : Cpu;
               return (
                <ScrollReveal key={domain.id} delay={domainIdx * 0.1} className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-all duration-500"></div>
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{domain.label}</h3>
                  </div>
                  <div className="space-y-6 relative z-10">
                    {domain.skills.map((skill, idx) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 tracking-tight">{skill.name}</span>
                          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-black">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="h-full bg-blue-600 dark:bg-blue-500 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
               );
            })}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Culture Code</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">We foster an environment where curiosity thrives and excellence is the standard.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: "Remote-First", desc: "We hire the best talent globally, regardless of location." },
              { icon: GraduationCap, title: "Continuous Learning", desc: "Weekly tech talks and a generous budget for upskilling." },
              { icon: Briefcase, title: "Ownership", desc: "We empower every team member to own their decisions." },
              { icon: Coffee, title: "Work-Life Balance", desc: "Flexible hours because burnout kills creativity." },
            ].map((item, idx) => (
              <ScrollReveal key={item.title} delay={idx * 0.1} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  <item.icon size={24} />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Glass-panel effect */}
      <section className="py-24 bg-white dark:bg-slate-950">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">
               <div className="lg:w-1/3">
                  <ScrollReveal className="sticky top-32">
                     <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                        <HelpCircle size={24} />
                     </div>
                     <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">Common Questions</h3>
                     <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        Everything you need to know about partnering with OITS Dhaka. Can't find the answer you're looking for?
                     </p>
                     <Link to="/contact" aria-label="Navigate to contact page for support">
                        <Button variant="outline" className="rounded-full px-8 py-4 border-2">Contact Support</Button>
                     </Link>
                  </ScrollReveal>
               </div>
               <div className="lg:w-2/3">
                  <ScrollReveal delay={0.2}>
                     <Accordion 
                        items={FAQS} 
                        className="glass-panel-container"
                     />
                  </ScrollReveal>
               </div>
            </div>
         </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6 text-center">
           <h3 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white uppercase tracking-tighter">Join the digital elite.</h3>
           <Link to="/contact">
             <Button size="lg" className="rounded-full shadow-2xl shadow-blue-500/20 px-12 py-6 text-lg font-black tracking-tight">Work With Us</Button>
           </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;