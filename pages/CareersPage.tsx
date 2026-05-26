import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/Button';
import { Briefcase, Heart, Award, ArrowRight, ShieldCheck, Star, Users, CheckCircle, Send, UploadCloud } from 'lucide-react';

const CULTURE_POINTS = [
  {
    title: "Velocity with Quality",
    desc: "We build for performance and long-term modularity. We prioritize elite design metrics and beautiful engineering over shortcuts.",
    icon: Star,
  },
  {
    title: "Continuous Upskilling",
    desc: "Weekly tech syncs, dedicated learning budgets, and mentorship. At OITS Dhaka, you are always growing.",
    icon: Award,
  },
  {
    title: "Radical Transparency",
    desc: "Open slack channels, clear roadmap alignment, and an ownership-first culture where every line of code matters.",
    icon: Users,
  },
  {
    title: "Healthy Work-Life",
    desc: "Flexible remote schedules, supportive collaborative environments, and generous paid time off because rest powers creativity.",
    icon: Heart,
  }
];

const BENEFITS = [
  "Competitive compensation based on global standards",
  "Fully remote or hybrid flexible arrangements",
  "High-end workstation & tech gear allowance",
  "Annual training budget & certification program support",
  "Comprehensive private health and wellness coverage",
  "Twice-yearly performance bonuses and merit reviews"
];

const JOB_OPENINGS = [
  {
    id: "se",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (Bangladesh Timezone)",
    type: "Full-Time",
    desc: "We are looking for a Senior Full-Stack Engineer proficient in React, Node.js, and Cloud Infrastructure (AWS). You will architect highly performant web services and lead sprint delivery.",
    requirements: [
      "4+ years of professional full-stack engineering experience",
      "Expertise in TypeScript, React, Next.js, and Node.js (Express/NestJS)",
      "Strong understanding of SQL and NoSQL databases",
      "Experience with AWS deployments, Docker, and CI/CD pipelines"
    ]
  },
  {
    id: "pm",
    title: "Technical Project Manager",
    department: "Product Management",
    location: "Hybrid (Dhaka, Bangladesh)",
    type: "Full-Time",
    desc: "Guide cross-functional agile teams of designers and developers. You will manage client engagement, establish roadmap milestones, and synchronize daily scrum standups.",
    requirements: [
      "3+ years experience managing software products in an agile environment",
      "Exceptional communication skill and stakeholder management",
      "Proficient with Jira, Confluence, and Scrum framework methodologies",
      "Background in software development is a massive advantage"
    ]
  },
  {
    id: "qa",
    title: "Senior QA Automation Specialist",
    department: "Quality Assurance",
    location: "Remote",
    type: "Full-Time",
    desc: "Build manual and automated test suites for our enterprise web and native mobile client products. Ensure maximum coverage, zero downtime deployments, and top security frameworks.",
    requirements: [
      "3+ years experience in automated and manual software testing",
      "In-depth proficiency with Cypress, Playwright, or Selenium frameworks",
      "Comfortable writing automation scripts in JavaScript or Python",
      "Strong attention to detail with secure risk-assessment mindsets"
    ]
  }
];

export const CareersPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    coverLetter: "",
    resume: null as File | null,
    resumeName: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, resume: file, resumeName: file.name }));
      
      // Simulate highly interactive smooth upload progress
      setUploadProgress(10);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 15;
        });
      }, 100);
    }
  };

  const handleApplyClick = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setFormData(prev => ({ ...prev, role: roleTitle }));
    const formElement = document.getElementById("application-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) return;
    setIsSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="pt-20 bg-white dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100">
        <SEO 
          title="Careers | OITS Dhaka"
          description="Join the elite engineering circle at OITS Dhaka. Discover remote-first growth, high-velocity roadmaps, competitive compensation, and open job listings."
          keywords="careers, software developer jobs, remote software engineering, QA jobs, Dhaka careers, employment"
        />

        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-slate-900 border-b border-slate-800 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-25 -translate-y-1/2 -translate-x-1/3" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20 translate-y-1/2 translate-x-1/3" />
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-blue-400 font-bold uppercase tracking-[0.3em] mb-4 text-xs md:text-sm">Join Our Collective</h2>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter text-white leading-tight">
              Build the Future <br /> of Software with Us.
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-semibold">
              OITS Dhaka is looking for exceptional engineers, visionary managers, and meticulous analysts who strive to operate at the bleeding edge.
            </p>
            <div className="mt-10">
              <a href="#open-roles">
                <Button size="lg" className="rounded-full shadow-2xl shadow-blue-500/10">Browse Open Positions</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Culture & Philosophy */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/40 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.3em] mb-4 text-xs">Our Drive</h2>
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Culture Over Conveniences</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {CULTURE_POINTS.map((point, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800/80 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                    <point.icon size={24} />
                  </div>
                  <h4 className="font-extrabold text-xl text-slate-900 dark:text-white mb-3 tracking-tight">{point.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed font-medium">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Perks & Benefits */}
        <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
          <div className="container mx-auto px-6 max-w-5xl text-center">
            <h2 className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.3em] mb-4 text-xs">Uncompromising Perks</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tighter mb-12">Designed for High Performers</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {BENEFITS.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <p className="text-sm md:text-base font-bold text-slate-750 dark:text-slate-250 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section id="open-roles" className="py-24 bg-slate-50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.3em] mb-4 text-xs">Strategic Openings</h2>
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Current Opportunities</h3>
            </div>

            <div className="space-y-6">
              {JOB_OPENINGS.map((job) => (
                <div key={job.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800/80 p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-black text-blue-600/80 dark:text-blue-400/80 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">{job.department}</span>
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">{job.title}</h4>
                    </div>
                    <div className="flex gap-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-semibold text-sm md:text-base mb-8">
                    {job.desc}
                  </p>

                  <div className="mb-8">
                    <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Minimum Requirements</h5>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-bold text-slate-750 dark:text-slate-350">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => handleApplyClick(job.title)}
                    className="rounded-full flex items-center gap-2 group hover:scale-105"
                  >
                    Apply Now 
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 scroll-mt-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 md:p-16 shadow-lg">
              {isSubmitted ? (
                <div className="text-center py-12 animate-in zoom-in-95">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-8 text-blue-600 dark:text-blue-400">
                    <CheckCircle size={44} />
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Application Successfully Received!</h4>
                  <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto font-medium leading-relaxed">
                    Thank you, <strong className="text-slate-800 dark:text-white">{formData.name}</strong>, for your interest in OITS Dhaka. Our engineering talent team will review your CV and contact you within 3 business days.
                  </p>
                  <div className="mt-8">
                    <Button variant="secondary" onClick={() => setIsSubmitted(false)} className="rounded-full">Apply for Another Role</Button>
                  </div>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="text-center">
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Submit Your Resume</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">Interested in shipping high-performance code? Apply below!</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-500">Your Full Name</label>
                      <input 
                        id="name"
                        name="name"
                        type="text" 
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Sabit Chowdhury" 
                        className="w-full bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-500">Email Address</label>
                      <input 
                        id="email"
                        name="email"
                        type="email" 
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. sabit@oitsdhaka.com" 
                        className="w-full bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="role" className="text-xs font-black uppercase tracking-widest text-slate-500">Target Role Selection</label>
                    <select 
                      id="role"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-bold text-slate-700 dark:text-white"
                    >
                      <option value="" disabled>Select an option...</option>
                      <option value="Senior Full-Stack Engineer">Senior Full-Stack Engineer</option>
                      <option value="Technical Project Manager">Technical Project Manager</option>
                      <option value="Senior QA Automation Specialist">Senior QA Automation Specialist</option>
                      <option value="General Open Application">Other / General Open Application</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="coverLetter" className="text-xs font-black uppercase tracking-widest text-slate-500">Cover Letter (Brief)</label>
                    <textarea 
                      id="coverLetter"
                      name="coverLetter"
                      rows={4}
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      placeholder="Share a short summary of your primary engineering background or passion." 
                      className="w-full bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">Upload Resume (PDF/Word)</label>
                    <div className="relative border-2 border-dashed border-slate-250 dark:border-slate-800 rounded-[2rem] p-8 text-center hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-950/40 transition-all cursor-pointer">
                      <input 
                        id="resume-upload"
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        required
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        aria-label="Upload your resume file"
                      />
                      <div className="flex flex-col items-center">
                        <UploadCloud size={36} className="text-blue-600 dark:text-blue-400 mb-3" />
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {formData.resumeName ? `File selected: ${formData.resumeName}` : "Drag and drop or browse to upload resume"}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Accepts PDF, DOCX up to 10MB</p>
                      </div>
                      {uploadProgress > 0 && (
                        <div className="mt-4 w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest">
                    <Send size={16} /> Submit Application
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default CareersPage;
