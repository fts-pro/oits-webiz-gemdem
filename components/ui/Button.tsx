import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-black transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] uppercase tracking-widest";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20 dark:bg-blue-600 dark:hover:bg-blue-500",
    secondary: "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100",
    outline: "border-2 border-slate-900 text-slate-900 bg-transparent hover:bg-slate-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900",
    ghost: "hover:bg-slate-100 text-slate-600 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/50",
  };

  const sizes = {
    sm: "h-10 px-6 text-[10px]",
    md: "h-12 px-8 text-xs",
    lg: "h-14 px-10 text-sm",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
