import React from 'react';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { Services } from '../components/Services';
import { FeaturedIn } from '../components/FeaturedIn';
import { Process } from '../components/Process';
import { Portfolio } from '../components/Portfolio';
import { Testimonials } from '../components/Testimonials';
import { TrustedBy } from '../components/TrustedBy';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { AnimateScroll } from '../components/ui/AnimateScroll';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <SEO 
        title="OITS Dhaka | Modern Software Solutions"
        description="Transforming ideas into digital reality with expert web and mobile development. We architect resilient, high-speed digital systems."
        keywords="software development, web development, mobile apps, OITS Dhaka, engineering"
      />
      <Hero />
      <Marquee />
      
      {/* Featured Services Section */}
      <div className="relative">
        <Services limit={4} />
        <ScrollReveal className="container mx-auto px-6 pb-24 text-center">
          <Link to="/services" aria-label="View all services offered by OITS Dhaka">
            <Button variant="outline" size="lg" className="rounded-full px-12 transition-all hover:bg-slate-900 hover:text-white">
              Explore All Services
            </Button>
          </Link>
        </ScrollReveal>
      </div>

      <FeaturedIn />
      <TrustedBy />
      
      <Process />

      {/* Featured Works Section */}
      <div className="bg-slate-50 dark:bg-slate-950/50 pt-24 border-t border-slate-100 dark:border-slate-800">
        <AnimateScroll className="container mx-auto px-6 text-center mb-16">
           <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Selected Case Studies</h2>
           <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Proof of Engineering Excellence</h3>
        </AnimateScroll>
        <Portfolio limit={3} />
        <ScrollReveal className="container mx-auto px-6 py-20 text-center">
          <Link to="/portfolio" aria-label="View our complete portfolio of case studies">
            <Button variant="outline" size="lg" className="rounded-full px-12 transition-all hover:bg-slate-900 hover:text-white">
              View All Projects
            </Button>
          </Link>
        </ScrollReveal>
      </div>

      <Testimonials />
      
      <section className="py-32 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50" />
        <ScrollReveal direction="up" className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-10 leading-tight tracking-tighter">Ready to build your <br/> digital future?</h2>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="scale-110 shadow-2xl !bg-white !text-blue-600 hover:!bg-blue-50 transition-all hover:scale-115 active:scale-95" aria-label="Contact OITS Dhaka to get started">
              Get Started Today
            </Button>
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Home;