import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'header.letsbuild': "Let's Build",
    'header.edit_logo': 'Edit Logo',
    'header.search_placeholder': 'What can we build for you?',
    'header.trending': 'Trending Searches',
    'header.no_matches': 'No exact matches for',
    'header.try_searching': "Try searching for 'Software', 'Cloud', or 'React'",
    'header.service_autocomplete': 'Service Autocomplete',
    'header.portfolio_insights': 'Portfolio Insights',
    
    'hero.title': 'Impactful Digital Stories.',
    'hero.subtitle': 'A selection of complex engineering challenges solved with precision and creativity.',
    'project.verticals': 'Verticals',
    'project.technologies': 'Technologies',
    'project.all': 'All Categories',
    'project.reset': 'Reset',
    'project.has_mind': 'Have a similar project in mind?',
    'project.discuss': "We'd love to discuss how our expertise can accelerate your specific technical roadmap.",
    
    // Services Page
    'services.capabilities': 'Our Capabilities',
    'services.title': 'Engineering for Scale.',
    'services.subtitle': 'High-performance solutions tailored to the needs of modern enterprises and fast-growing startups.',
    'services.differentiation': 'Differentiation',
    'services.why_choose_us': 'Why top innovators choose OITS Dhaka.',
    'services.consultation': 'Need a specialized technical consultation?',
    'services.contact_expert': 'Contact an Expert',
    
    // About Page
    'about.whoweare': 'Who We Are',
    'about.title': 'Engineers. Innovators. Partners.',
    'about.subtitle': "Building the digital infrastructure for tomorrow's industry leaders with passion and precision.",
    'about.technical_prowess': 'Technical Prowess',
    'about.expertise_numbers': 'Our Expertise in Numbers',
    'about.expertise_desc': 'We maintain mastery over modern tech stacks to deliver high-performance, enterprise-grade solutions.',
    'about.culture_code': 'Our Culture Code',
    'about.culture_desc': 'We foster an environment where curiosity thrives and excellence is the standard.',
    'about.common_questions': 'Common Questions',
    'about.common_questions_desc': "Everything you need to know about partnering with OITS Dhaka. Can't find the answer you're looking for?",
    'about.contact_support': 'Contact Support',
    'about.join_elite': 'Join the digital elite.',
    'about.work_with_us': 'Work With Us',
  },
  bn: {
    'nav.home': 'হোম',
    'nav.services': 'সেবা সমূহ',
    'nav.portfolio': 'পোর্টফোলিও',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.contact': 'যোগাযোগ',
    'header.letsbuild': 'চলুন তৈরি করি',
    'header.edit_logo': 'লোগো পরিবর্তন',
    'header.search_placeholder': 'আমরা আপনার জন্য কী তৈরি করতে পারি?',
    'header.trending': 'জনপ্রিয় অনুসন্ধান',
    'header.no_matches': 'কোন মিল পাওয়া যায়নি এর জন্য: ',
    'header.try_searching': "'সফ্টওয়্যার', 'ক্লাউড' বা 'রিয়েক্ট' অনুসন্ধান করার চেষ্টা করুন",
    'header.service_autocomplete': 'সেবা স্বয়ংক্রিয় সমাপ্তি',
    'header.portfolio_insights': 'পোর্টফোলিও অন্তর্দৃষ্টি',
    
    'hero.title': 'প্রভাবশীল ডিজিটাল সমাধান।',
    'hero.subtitle': 'নির্ভুলতা এবং সৃজনশীলতার সাথে সমাধান করা জটিল ইঞ্জিনিয়ারিং চ্যালেঞ্জগুলির একটি সংকলন।',
    'project.verticals': 'বিভাগসমূহ',
    'project.technologies': 'প্রযুক্তি সমূহ',
    'project.all': 'সব ক্যাটাগরি',
    'project.reset': 'রিসেট',
    'project.has_mind': 'আপনার কি অনুরূপ কোনো প্রজেক্ট মাথায় আছে?',
    'project.discuss': 'আমাদের দক্ষতা কীভাবে আপনার নির্দিষ্ট প্রযুক্তিগত রোডম্যাপকে ত্বরান্বিত করতে পারে তা আলোচনা করতে আমরা আনন্দিত হব।',
    
    // Services Page
    'services.capabilities': 'আমাদের সক্ষমতা',
    'services.title': 'স্কেলের জন্য প্রকৌশল।',
    'services.subtitle': 'আধুনিক এন্টারপ্রাইজ এবং দ্রুত বর্ধনশীল স্টার্টআপগুলির প্রয়োজন অনুসারে উচ্চ-মানের সমাধান।',
    'services.differentiation': 'পার্থক্যকরণ',
    'services.why_choose_us': 'কেন শীর্ষস্থানীয় উদ্ভাবকরা ওআইটিএস ঢাকাকে বেছে নেন।',
    'services.consultation': 'একটি বিশেষ প্রযুক্তিগত পরামর্শ প্রয়োজন?',
    'services.contact_expert': 'একজন বিশেষজ্ঞের সাথে যোগাযোগ করুন',
    
    // About Page
    'about.whoweare': 'আমরা কে',
    'about.title': 'প্রকৌশলী। উদ্ভাবক। অংশীদার।',
    'about.subtitle': "গভীর আবেগ এবং নির্ভুলতার সাথে আগামী দিনের শিল্প নেতাদের জন্য ডিজিটাল অবকাঠামো তৈরি করা।",
    'about.technical_prowess': 'প্রযুক্তিগত দক্ষতা',
    'about.expertise_numbers': 'সংখ্যায় আমাদের দক্ষতা',
    'about.expertise_desc': 'আমরা উচ্চ-ক্ষমতাসম্পন্ন এন্টারপ্রাইজ গ্রেড সমাধান প্রদানের জন্য আধুনিক টেক স্ট্যাকে দক্ষতা বজায় রাখি।',
    'about.culture_code': 'আমাদের সংস্কৃতি কোড',
    'about.culture_desc': 'আমরা এমন একটি পরিবেশ তৈরি করি যেখানে কৌতূহল বিকাশ লাভ করে এবং শ্রেষ্ঠত্বই আদর্শ।',
    'about.common_questions': 'সাধারণ প্রশ্নাবলী',
    'about.common_questions_desc': "ওআইটিএস ঢাকার সাথে অংশীদারিত্ব সম্পর্কে আপনার যা কিছু জানা দরকার। আপনি কি খুঁজছেন এমন উত্তর পাচ্ছেন না?",
    'about.contact_support': 'সহায়তা যোগাযোগ',
    'about.join_elite': 'ডিজিটাল এলিটদের সাথে যোগ দিন।',
    'about.work_with_us': 'আমাদের সাথে কাজ করুন',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('language');
      return (stored === 'bn' || stored === 'en') ? stored : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
