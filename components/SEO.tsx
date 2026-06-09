import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COMPANY_NAME } from '../constants';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const routeConfig: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${COMPANY_NAME} | Transforming Ideas into Digital Reality`,
    description: 'Modern Software Solutions. Transforming ideas into digital reality with expert web and mobile development.',
  },
  '/services': {
    title: `Our Services | ${COMPANY_NAME}`,
    description: 'Explore our comprehensive range of software engineering, cloud solutions, and UI/UX design services.',
  },
  '/portfolio': {
    title: `Our Portfolio | ${COMPANY_NAME}`,
    description: 'Browse our past projects and case studies showcasing our technical expertise and delivery excellence.',
  },
  '/about': {
    title: `About Us | ${COMPANY_NAME}`,
    description: 'Learn about OITS Dhaka, our mission, values, and the team behind our modern software solutions.',
  },
  '/careers': {
    title: `Careers | ${COMPANY_NAME}`,
    description: 'Join our team of passionate engineers and designers building the future of technology.',
  },
  '/contact': {
    title: `Contact Us | ${COMPANY_NAME}`,
    description: 'Get in touch with our engineering team to discuss your next project or technology frontier.',
  },
};

export const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, url }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const config = routeConfig[pathname] || routeConfig['/'];
    const finalTitle = title || config.title;
    const finalDesc = description || config.description;

    document.title = finalTitle;
    
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('description', finalDesc);
    if (keywords) setMetaTag('keywords', keywords);
    
    setMetaTag('og:title', finalTitle, true);
    setMetaTag('og:description', finalDesc, true);
    if (image) setMetaTag('og:image', image, true);
    if (url) setMetaTag('og:url', url || window.location.href, true);
    
    setMetaTag('twitter:title', finalTitle);
    setMetaTag('twitter:description', finalDesc);
    if (image) setMetaTag('twitter:image', image);
    
  }, [pathname, title, description, keywords, image, url]);

  return null;
};
