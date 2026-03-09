import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, url }) => {
  useEffect(() => {
    document.title = title;
    
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

    setMetaTag('description', description);
    if (keywords) setMetaTag('keywords', keywords);
    
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    if (image) setMetaTag('og:image', image, true);
    if (url) setMetaTag('og:url', url, true);
    
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    if (image) setMetaTag('twitter:image', image);
    
  }, [title, description, keywords, image, url]);

  return null;
};
