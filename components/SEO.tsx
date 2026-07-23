import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COMPANY_NAME, TAGLINE } from '../constants';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  category?: string;
}

const ROUTE_CONFIG: Record<string, { title: string; description: string; context: string }> = {
  '/': {
    title: `${COMPANY_NAME} | ${TAGLINE || 'Transforming Ideas into Digital Reality'}`,
    description: 'Boutique software architecture agency delivering high-performance enterprise applications, cloud solutions, and bespoke digital products.',
    context: 'Homepage',
  },
  '/services': {
    title: `Software Engineering Services & Solutions | ${COMPANY_NAME}`,
    description: 'Explore our full spectrum of software services including Custom Web Applications, Cloud Infrastructure, Mobile Apps, and AI Integration.',
    context: 'Services',
  },
  '/portfolio': {
    title: `Case Studies & Featured Works | ${COMPANY_NAME}`,
    description: 'Discover our portfolio of high-impact digital products, enterprise web platforms, and mobile apps engineered for scale.',
    context: 'Portfolio',
  },
  '/about': {
    title: `About Our Engineering Firm | ${COMPANY_NAME}`,
    description: 'Learn about OITS Dhaka, our engineering philosophy, agile delivery process, and the elite team behind our solutions.',
    context: 'About Us',
  },
  '/careers': {
    title: `Join Our Engineering Team - Careers | ${COMPANY_NAME}`,
    description: 'Build high-scale software with top-tier engineers. Explore career opportunities and engineering roles at OITS Dhaka.',
    context: 'Careers',
  },
  '/contact': {
    title: `Get In Touch & Schedule Consultation | ${COMPANY_NAME}`,
    description: 'Connect with our senior software architects to discuss your technical scope, timelines, and project requirements.',
    context: 'Contact Us',
  },
};

// Helper to format dynamic paths into clean titles
const formatPathToTitle = (pathname: string): { title: string; context: string } => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    return {
      title: `${COMPANY_NAME} | Digital Solutions`,
      context: 'Home',
    };
  }

  const formattedSegments = segments.map((seg) =>
    seg
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );

  const context = formattedSegments.join(' › ');
  return {
    title: `${formattedSegments.reverse().join(' - ')} | ${COMPANY_NAME}`,
    context,
  };
};

export const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, url, category }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Determine base config from static map or dynamic route formatting
    const routeInfo = ROUTE_CONFIG[pathname] || formatPathToTitle(pathname);
    
    // 2. Format final title
    let finalTitle = title;
    if (!finalTitle) {
      finalTitle = routeInfo.title;
    } else if (!finalTitle.includes(COMPANY_NAME)) {
      finalTitle = `${finalTitle} | ${COMPANY_NAME}`;
    }

    // 3. Format final description
    const defaultDesc = ROUTE_CONFIG['/']?.description || 'Modern Software Solutions by OITS Dhaka.';
    const finalDesc = description || (ROUTE_CONFIG[pathname] ? ROUTE_CONFIG[pathname].description : defaultDesc);

    // 4. Update Document Title
    document.title = finalTitle;

    // 5. Update standard and social meta tags
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

    const currentUrl = url || window.location.href;

    setMetaTag('description', finalDesc);
    setMetaTag('keywords', keywords || 'software engineering, web development, mobile apps, cloud architecture, OITS Dhaka, custom software');
    setMetaTag('page-context', category || routeInfo.context);

    // Open Graph / Facebook
    setMetaTag('og:title', finalTitle, true);
    setMetaTag('og:description', finalDesc, true);
    setMetaTag('og:site_name', COMPANY_NAME, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', currentUrl, true);
    if (image) setMetaTag('og:image', image, true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', finalTitle);
    setMetaTag('twitter:description', finalDesc);
    if (image) setMetaTag('twitter:image', image);

    // Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

  }, [pathname, title, description, keywords, image, url, category]);

  return null;
};
