import { Service, Project, Testimonial, NavItem, SectionId, TechDomain, ProcessStep } from './types';

export const COMPANY_NAME = "OITS Dhaka";
export const TAGLINE = "Empowering Businesses Through Advanced Engineering";
export const CONTACT_EMAIL = "info@oitsdhaka.com";
export const ADDRESS = "House # 42, Road # 2/A, Block # Z, Dhaka 1209, Bangladesh";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: `/` },
  { label: 'Services', href: `/services` },
  { label: 'Portfolio', href: `/portfolio` },
  { label: 'About', href: `/about` },
  { label: 'Contact', href: `/contact` },
];

export const TRUSTED_PARTNERS = [
  { name: 'TECHFLOW', icon: 'TF' },
  { name: 'CLOUDSCALE', icon: 'CS' },
  { name: 'INNOVATE', icon: 'IN' },
  { name: 'NEXUS', icon: 'NX' },
  { name: 'VANTAGE', icon: 'VT' },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your business goals, target audience, and market landscape to define a clear roadmap.',
    icon: 'Search',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design & Prototyping',
    description: 'Our design team creates intuitive, user-centric interfaces and interactive prototypes for early validation.',
    icon: 'Layers',
  },
  {
    id: 'development',
    number: '03',
    title: 'Agile Development',
    description: 'Using high-performance tech stacks, we build your solution in sprints, ensuring transparency and quality.',
    icon: 'Code',
  },
  {
    id: 'testing',
    number: '04',
    title: 'Quality Assurance',
    description: 'Rigorous manual and automated testing ensures your product is bug-free, secure, and ready for scale.',
    icon: 'ShieldCheck',
  },
  {
    id: 'deployment',
    number: '05',
    title: 'Launch & Evolution',
    description: 'We handle the deployment and provide ongoing support to scale your product based on user feedback.',
    icon: 'Rocket',
  },
];

export const SERVICES: Service[] = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description: 'We orchestrate robust client systems designed to automate internal team workflows, integrate legacy APIs, and resolve complex, business-specific scaling bottlenecks with strict data compliance metrics.',
    icon: 'Users',
    features: ['Workflow Automation Engines', 'Legacy Core Migration', 'SaaS Multi-tenant Control', 'Enterprise Risk Mitigations'],
    benefits: ['100% intellectual property ownership', 'Streamlined administrative overhead', 'Seamless system interconnectedness', 'Reduced operating licensing costs'],
    caseStudyPlaceholder: "Client Diagnostic: 'OITS Dhaka consolidated our fragmented backend portals into a unified workflow engine. Operating administrative spend dropped directly by 30%.'",
    category: 'Core Engineering'
  },
  {
    id: 'web-dev',
    title: 'Web Application Development',
    description: 'Architecting ultra-responsive, highly optimized, and modern web applications that handle massive transaction counts while ensuring leading edge Web Vitals score metrics.',
    icon: 'Globe',
    features: ['React & Next.js Core Optimization', 'Cloud-Native SaaS Architecture', 'High-Conversion E-commerce', 'Headless CMS & API Orchestration'],
    benefits: ['Sub-second initial server response time', 'SEO-friendly server-side parsing', 'Fluid responsive layout adaptations', 'State preservation on connection loss'],
    caseStudyPlaceholder: "Client Diagnostic: 'Our platform rewrite was handled with immense technical accuracy. Under Black Friday stress testing, we registered absolute zero-latency spikes.'",
    category: 'Web Solutions'
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    description: 'Crafting premium native and hybrid mobile applications for iOS and Android platforms. We construct immersive app pathways, battery-conscious frameworks, and offline-first data caching layers.',
    icon: 'Smartphone',
    features: ['Swift & Kotlin Architecture', 'React Native & Flutter Mastery', 'Offline-First Functionality', 'Sensors & Device API Integration'],
    benefits: ['Identical user layouts across operating systems', 'Lower device battery & CPU footprints', 'Immediate response times during cell transitions', 'Biometric sign-on compatibility'],
    caseStudyPlaceholder: "Client Diagnostic: 'The OITS Dhaka mobile delivery has been exceptionally smooth. App Store ratings surged in eight weeks.'",
    category: 'Mobile Solutions'
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions & Infrastructure',
    description: 'Aligning enterprise setups with AWS, Azure, and Google Cloud optimization patterns to yield dynamic scaling, proactive data disaster recoveries, and extreme cost-efficiencies.',
    icon: 'Cloud',
    features: ['Serverless & Microservices', 'Kubernetes Cluster Management', 'Automated CI/CD Pipelines', 'Automated Database Backups'],
    benefits: ['On-demand container scaling controls', 'Up to 50% decrease in idle resource spend', 'Radical DevOps delivery automation rates', 'Guaranteed high accessibility benchmarks'],
    caseStudyPlaceholder: "Client Diagnostic: 'Their cluster modernization removed all scaling bottlenecks. We now handle ten times our past user transactions smoothly.'",
    category: 'Infrastructure'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design Engineering',
    description: 'Creating human-centered interface architectures based on extensive user testing, high-fidelity interactive prototyping, and beautiful, standard visual hierarchies.',
    icon: 'Layers',
    features: ['Precision Wireframing & Pairing', 'Conversion Funnel Optimizations', 'Dynamic Interaction Prototyping', 'Universal Accessibility Compliance'],
    benefits: ['Instant uplift in new user registrations', 'Reduced checkout drop-off rates', 'Strong core brand prestige signals', 'Frictionless customer navigation pathways'],
    caseStudyPlaceholder: "Client Diagnostic: 'The UI redesign reduced user checkout drop-offs by 25% with immediate, measurable gains in user retention metrics.'",
    category: 'Design'
  },
  {
    id: 'tech-frontiers',
    title: 'Solutions for Technology Frontiers',
    description: 'Pioneering cutting-edge implementations with AI/ML predictive analytics, immersive AR/VR spatial experiences, secure DApp structures (Blockchain), and responsive Edge computing frameworks.',
    icon: 'Layers',
    features: ['AI/ML Predictive Analytics', 'Immersive AR/VR Apps', 'Blockchain & Web-3 (DApps)', 'IoT & Edge Computing'],
    benefits: ['First-mover market technology advantages', 'Highly secure decentralized frameworks', 'Enhanced user-engagement through immersion', 'Real-time data processing at the Edge'],
    caseStudyPlaceholder: "Client Diagnostic: 'Implementing these AI-driven analytics provided our team with 40% more accuracy in predicting customer churn.'",
    category: 'Advanced Solutions'
  },
  {
    id: 'cross-platform',
    title: 'Cross-platform Solutions',
    description: 'Streamline your digital presence with high-performance PWA structures and unified mobile frameworks, ensuring consistent speed and interactivity across all device types.',
    icon: 'Smartphone',
    features: ['Progressive Web App (PWA)', 'React Native Frameworks', 'Flutter Application Development', 'Unified OS Experience'],
    benefits: ['Reduced development & maintenance costs', 'Identical branding across all OS', 'Faster product delivery lifecycle', 'Low device resource footprint'],
    caseStudyPlaceholder: "Client Diagnostic: 'Moving to a unified React Native architecture enabled us to reach both iOS and Android markets 50% faster than our original roadmap.'",
    category: 'Mobile Solutions',
    techStack: ['React Native', 'Flutter', 'PWA', 'Expo']
  },
  {
    id: 'dedicated-teams',
    title: 'Dedicated Teams',
    description: 'Expand your engineering capacity seamlessly with our fully managed teams of experts, meticulously selected to align with your project’s agile workflows and core objectives.',
    icon: 'Users',
    features: ['Expert Staff Augmentation', 'Agile Project Management', 'Full-stack Technical Leads', 'Seamless Team Integration'],
    benefits: ['Rapid scalability of engineering capacity', 'Direct access to senior engineering talent', 'Minimized recruitment & onboarding friction', 'Complete alignment with agile sprint cadences'],
    caseStudyPlaceholder: "Client Diagnostic: 'The OITS Dedicated Team integrated perfectly within two weeks, boosting our core feature delivery cadence by 60%.'"
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'FinTech Analytics Hub',
    category: 'Web Development',
    imageUrl: '/assets/portfolio_1.png',
    description: 'A comprehensive financial analytics dashboard for real-time market tracking.',
    fullDescription: 'We engineered a low-latency data ingestion pipeline for real-time stock market analysis, providing institutional-grade charting tools. The system handles over 10k concurrent data points per second with advanced visualization.',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/finance.vtt'
  },
  {
    id: '2',
    title: 'Luma Healthcare App',
    category: 'Mobile Apps',
    imageUrl: '/assets/portfolio_2.png',
    description: 'A HIPAA-compliant telemedicine platform with secure video conferencing.',
    fullDescription: 'Our mobile team focused on high-security standards (HIPAA) and low-latency video streaming to connect patients with specialists globally. Features include encrypted health records, automated prescription refills, and instant appointment management.',
    technologies: ['Flutter', 'Firebase', 'WebRTC'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/healthcare.vtt'
  },
  {
    id: '3',
    title: 'Global Logistics Engine',
    category: 'Cloud',
    imageUrl: '/assets/portfolio_3.png',
    description: 'AI-driven logistics platform managing complex global supply chains.',
    fullDescription: 'Integrating AI for predictive route optimization, this platform reduced fuel costs for a major shipping firm by 14% in its first quarter of operation using real-time GPS tracking and weather forecasting data.',
    technologies: ['Next.js', 'Python', 'AWS SageMaker'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/logistics.vtt'
  },
  {
    id: '4',
    title: 'EduStream Pro',
    category: 'Web Development',
    imageUrl: '/assets/portfolio_4.png',
    description: 'Cloud-based learning management system for universities.',
    fullDescription: 'A scalable LMS built to support over 50,000 students. Includes real-time testing, automated grading, a collaborative virtual classroom module, and rich multimedia resource storage.',
    technologies: ['Vue.js', 'Firebase', 'Node.js', 'Redis'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/edu.vtt'
  },
  {
    id: '5',
    title: 'EcoTrack IoT',
    category: 'Cloud',
    imageUrl: '/assets/portfolio_5.png',
    description: 'Industrial IoT monitoring for sustainable manufacturing.',
    fullDescription: 'Connects factory floor sensors to a central dashboard to monitor carbon footprint and energy waste in real-time. Built with a focus on edge computing and high-availability data streams.',
    technologies: ['Angular', 'Go', 'MQTT', 'Docker'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/eco.vtt'
  },
  {
    id: '6',
    title: 'Nexus Real Estate VR',
    category: 'Web Development',
    imageUrl: '/assets/portfolio_1.png',
    description: 'Web-based VR walkthroughs for luxury property listings.',
    fullDescription: 'Allowing potential buyers to explore properties from their browser with high-fidelity 3D rendering and interactive floor plans, significantly increasing conversion rates for global buyers.',
    technologies: ['React', 'Three.js', 'WebGL', 'AWS S3'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackAds.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/vr.vtt'
  },
  {
    id: '7',
    title: 'CloudScale Infrastructure',
    category: 'Cloud',
    imageUrl: '/assets/portfolio_2.png',
    description: 'Automated multitenant provisioning system for enterprise cloud users.',
    fullDescription: 'A robust orchestration tool that manages resource allocation across hybrid cloud environments, providing a single pane of glass for multi-cloud deployments.',
    technologies: ['Terraform', 'Go', 'Kubernetes', 'AWS'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    captionsUrl: 'https://storage.googleapis.com/cloud.vtt'
  },
  {
    id: '8',
    title: 'OmniShop AI',
    category: 'Web Development',
    imageUrl: '/assets/portfolio_3.png',
    description: 'Personalized e-commerce engine with real-time AI recommendations.',
    fullDescription: 'We built a high-conversion retail platform that uses machine learning to predict user behavior and provide ultra-fast search results across millions of SKU items.',
    technologies: ['React', 'Next.js', 'Python', 'ElasticSearch'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/shop.vtt'
  },
  {
    id: '9',
    title: 'MediVision Diagnosis',
    category: 'Mobile Apps',
    imageUrl: '/assets/portfolio_4.png',
    description: 'AI-powered diagnostic imaging assistant for radiologists.',
    fullDescription: 'A deep-learning application that assists medical professionals in identifying anomalies in X-rays and MRIs with 94% accuracy, integrated into existing hospital PACS systems.',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'AWS'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/med.vtt'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechFlow Global',
    content: "OITS Dhaka is not just a vendor; they are our technology partners. Their ability to translate complex requirements into clean code is exceptional.",
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: 't2',
    name: 'Rahat Ahmed',
    role: 'Founder',
    company: 'Pathao (Demo)',
    content: "The engineering discipline and communication standard maintained by OITS Dhaka helped us ship our MVP weeks ahead of schedule.",
    avatar: 'https://i.pravatar.cc/150?u=rahat',
  },
];

export const TECH_STACK = [
  "React", "Next.js", "Node.js", "TypeScript", "Python", "AWS", "Docker", "Flutter", "PostgreSQL", "Go", "Kubernetes"
];

export const TECH_DOMAINS: TechDomain[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 92 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Three.js', level: 75 }
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Go', level: 80 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'Redis', level: 80 }
    ]
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'Docker', level: 90 },
      { name: 'Kubernetes', level: 75 },
      { name: 'Terraform', level: 80 },
      { name: 'CI/CD', level: 95 }
    ]
  }
];