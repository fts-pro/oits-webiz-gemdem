import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Services } from '../components/Services';
import { Process } from '../components/Process';
import { ClientTestimonials } from '../components/ClientTestimonials';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Lightbulb, Users, Activity, TrendingUp, HelpCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Accordion } from '../components/ui/Accordion';

const WHY_CHOOSE_US = [
  {
    title: "Expertise & Innovation",
    desc: "We operate at the bleeding edge of engineering, ensuring your product is built with the most resilient, modern tech available.",
    icon: Lightbulb
  },
  {
    title: "Client-Centric Approach",
    desc: "Your vision is our mandate. We synchronize our technical roadmap directly with your long-term business objectives.",
    icon: Users
  },
  {
    title: "Agile Delivery",
    desc: "Benefit from rapid, high-transparency dev cycles with bi-weekly sprints that keep you in total control of every feature.",
    icon: Activity
  },
  {
    title: "Scalable Solutions",
    desc: "We architect for global-scale growth. Our cloud-native systems expand seamlessly as your user base explodes.",
    icon: TrendingUp
  }
];

const SERVICES_FAQS = [
  {
    id: "service-faq-0",
    question: "What software architectures do you specialize in for enterprise systems?",
    answer: "We specialize in domain-driven design, clean architecture, automated continuous delivery (CI/CD), and microservices. We build resilient, stateless backend servers in Go or NodeJS paired with highly responsive React or Vue web architectures."
  },
  {
    id: "service-faq-1",
    question: "Do you build cross-platform mobile apps or native apps?",
    answer: "We cover both paths. We build native iOS and Android applications using Swift and Kotlin respectively for maximum performance and hardware integration. For high-velocity setups, we use Flutter or React Native to ship a single, clean codebase to both platforms."
  },
  {
    id: "service-faq-2",
    question: "How do you guarantee scalability and high availability on the cloud?",
    answer: "Every application we deploy is bundled into lightweight Docker containers orchestrated by Kubernetes. We practice Infrastructure-as-Code (IaC) using HashiCorp Terraform on AWS, Azure, and Google Cloud, with automatic server-scaling policies and automated multi-region backup systems."
  },
  {
    id: "service-faq-3",
    question: "How do dedicated teams integrate into our existing startup processes?",
    answer: "Our dedicated squads operate as a seamless extension of your organization. They join your daily standups, integrate into your Slack channels, deploy to your staging environments, and track task completions transparently using platforms like Jira or Trello."
  }
];

const ServicesPage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="pt-20">
      <SEO 
        title="Our Services | OITS Dhaka"
        description="High-performance solutions tailored to the needs of modern enterprises and fast-growing startups. Explore our engineering capabilities."
        keywords="enterprise web solutions, native mobile apps, dedicated teams, cloud infrastructure"
      />
      <div className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <ScrollReveal direction="up">
            <h2 className="text-blue-400 font-bold uppercase tracking-[0.3em] mb-6 text-sm">Our Capabilities</h2>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter text-white leading-tight">Engineering <br/> for Scale.</h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
              High-performance solutions tailored to the needs of modern enterprises and fast-growing startups.
            </p>
          </ScrollReveal>
        </div>
      </div>
      
      <Services />
      
      {/* Why Choose Us Section */}
      <section className="py-32 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50 dark:from-slate-950 to-transparent opacity-50" />
        
        <div className="container mx-auto px-6 relative z-10">
           <ScrollReveal className="flex flex-col items-center text-center mb-20">
              <h2 className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.3em] mb-4 text-xs">Differentiation</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tighter">Why top innovators <br/> choose OITS Dhaka.</h3>
           </ScrollReveal>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {WHY_CHOOSE_US.map((item, idx) => (
                <ScrollReveal 
                  key={idx} 
                  delay={idx * 0.1}
                  className="group relative p-10 bg-slate-50 dark:bg-slate-800/40 rounded-[2.5rem] border border-slate-200 dark:border-slate-700/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2 hover:ring-1 hover:ring-blue-500/30 overflow-hidden"
                >
                  {/* Subtle illustrative index background */}
                  <div className="absolute -bottom-6 -right-4 text-9xl font-black text-slate-900/5 dark:text-white/5 pointer-events-none select-none transition-transform duration-700 group-hover:-translate-y-4 group-hover:-translate-x-4">
                    0{idx + 1}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-8 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-xl shadow-blue-600/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <item.icon size={30} />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-blue-600/60 dark:text-blue-400/60 font-mono tracking-widest uppercase">Feature</span>
                        <h4 className="font-black text-2xl text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h4>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
           </div>
           
           <div className="mt-20 flex flex-col lg:flex-row items-center justify-center gap-12 pt-20 border-t border-slate-100 dark:border-slate-800/50">
              <ScrollReveal direction="left" className="relative group lg:w-1/2">
                 <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 group-hover:rotate-1 transition-transform opacity-10" />
                 <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000&fm=webp"
                      alt="Team working together at OITS Dhaka" 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                 </div>
              </ScrollReveal>
              <ScrollReveal direction="right" className="lg:w-1/2 space-y-6">
                <div className="inline-block p-1 bg-blue-600/10 rounded-lg">
                   <div className="px-3 py-1 bg-blue-600 text-[10px] font-black text-white uppercase tracking-widest rounded-md">Philosophy</div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl leading-relaxed italic font-medium">
                  "At OITS Dhaka, we don't just write code; we solve complex business problems through engineering excellence and radical transparency."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <img 
                      src="https://i.pravatar.cc/150?u=techlead" aria-label="OITS Dhaka Core Team tech lead avatar portrait"
                      className="w-full h-full object-cover opacity-80" 
                      alt="Tech Lead avatar" 
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 dark:text-white">Engineering Leadership</p>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">OITS Dhaka Core Team</p>
                  </div>
                </div>
              </ScrollReveal>
           </div>
        </div>
      </section>

      <Process />

      <ClientTestimonials />

      {/* Services Interactive Accordion FAQ Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/40 border-t border-b border-slate-100 dark:border-slate-800">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">
               <div className="lg:w-1/3">
                  <ScrollReveal className="sticky top-32">
                     <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                        <HelpCircle size={24} />
                     </div>
                     <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tighter leading-tight">Service <br/>Frictionless FAQs</h3>
                     <p className="text-slate-650 dark:text-slate-400 mb-8 leading-relaxed font-medium">
                        Everything you need to know about our dedicated engineering practices, deliverables, and service architecture. For extra queries, connect with our support pipeline.
                     </p>
                  </ScrollReveal>
               </div>
               
               <div className="lg:w-2/3">
                 <ScrollReveal delay={0.2}>
                    <Accordion items={SERVICES_FAQS} />
                 </ScrollReveal>
               </div>
            </div>
         </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-6 text-center">
           <h3 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">Need a specialized technical consultation?</h3>
           <Link to="/contact">
             <Button size="lg" className="rounded-full shadow-xl">Contact an Expert</Button>
           </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;