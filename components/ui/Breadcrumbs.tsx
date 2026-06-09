import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'motion/react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') return null;

  return (
    <nav className="container mx-auto px-6 py-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <Home size={14} />
        <span>Home</span>
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

        return (
          <React.Fragment key={to}>
            <ChevronRight size={12} className="text-slate-300 dark:text-slate-700" />
            {last ? (
              <span className="text-blue-600 dark:text-blue-400 font-black">{label}</span>
            ) : (
              <Link to={to} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
