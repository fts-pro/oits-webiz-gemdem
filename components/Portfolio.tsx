import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Tag, MonitorPlay, RotateCcw, Check, Play, Pause, AlertTriangle, Layers, FilterX, Linkedin, Twitter, Maximize, Minimize, BarChart3, TrendingUp, Info } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell } from 'recharts';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { Button } from './ui/Button';
import { Tooltip } from './ui/Tooltip';
import { ScrollReveal } from './ui/ScrollReveal';

const FALLBACK_IMAGE = '/assets/portfolio_fallback.png';

const ALL_CATEGORY = 'All Categories';
const STORAGE_KEY_CATEGORIES = 'portfolio-filter-categories';
const STORAGE_KEY_TAGS = 'portfolio-filter-tags';

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const ProjectSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
    <div className="aspect-[4/3] shimmer"></div>
    <div className="p-8 space-y-4">
      <div className="h-6 w-3/4 shimmer rounded-lg"></div>
      <div className="h-20 w-full shimmer rounded-2xl"></div>
      <div className="flex gap-2">
        <div className="h-6 w-16 shimmer rounded-lg"></div>
        <div className="h-6 w-16 shimmer rounded-lg"></div>
      </div>
    </div>
  </div>
);

interface CustomVideoPlayerProps {
  src: string | { mp4: string; webm: string };
  captionsUrl?: string;
  poster?: string;
  onClose: () => void;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src, captionsUrl, poster, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setVideoError("The video could not be loaded. Please check your connection or try again later.");
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    video.play().catch(() => setIsPlaying(false));

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black flex flex-col justify-center group overflow-hidden outline-none"
      onMouseMove={() => {
        setShowControls(true);
        window.clearTimeout((window as any)._controlsTimeout);
        (window as any)._controlsTimeout = window.setTimeout(() => setShowControls(false), 3000);
      }}
    >
      {videoError ? (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950 p-6 text-center">
          <AlertTriangle size={48} className="text-yellow-500 mb-4 animate-pulse" />
          <h3 className="text-xl font-black text-white mb-2">Oops! Something went wrong</h3>
          <p className="text-slate-400 max-w-xs mb-6 text-sm">{videoError}</p>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Retry Loading</Button>
        </div>
      ) : (
        <video 
          ref={videoRef} 
          poster={poster} 
          className="w-full h-full object-contain cursor-pointer" 
          onClick={togglePlay} 
          playsInline 
          crossOrigin="anonymous"
          aria-hidden="true"
        >
          {typeof src === 'string' ? (
            <source src={src} type="video/mp4" />
          ) : (
            <>
              <source src={src.webm} type="video/webm" />
              <source src={src.mp4} type="video/mp4" />
            </>
          )}
          {captionsUrl && <track kind="captions" src={captionsUrl} srcLang="en" label="English" default={true} />}
        </video>
      )}

      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-6 pb-6 pt-16 transition-all duration-500 z-10 ${showControls || !isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition-all active:scale-90 hover:scale-110">
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="translate-x-0.5" />}
            </button>
            <span className="text-sm font-mono tracking-tight text-slate-300">
              {formatTime(currentTime)} <span className="text-white/40">/</span> {formatTime(duration)}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleFullscreen} className="p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-90">
              {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
            </button>
            <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest px-5 py-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-all border border-white/20 active:scale-95">
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const isSlowConnection = (): boolean => {
  if (typeof window === 'undefined' || !window.navigator) return false;
  const connection = (window.navigator as any).connection || 
                     (window.navigator as any).mozConnection || 
                     (window.navigator as any).webkitConnection;
  if (!connection) return false;
  return connection.saveData === true || ['slow-2g', '2g', '3g'].includes(connection.effectiveType);
};

const prefetchAsset = (url: string | { mp4: string; webm: string }, asType: 'image' | 'video') => {
  if (!url) return;
  // If the user's connection is slow or in Save-Data mode, skip downloading heavy video files
  if (asType === 'video' && isSlowConnection()) {
    return;
  }
  
  const urlsToPrefetch = typeof url === 'string' ? [url] : [url.mp4, url.webm].filter(Boolean);

  urlsToPrefetch.forEach(u => {
    // Prevent duplicate prefetch link injection
    const existing = document.querySelector(`link[href="${u}"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = asType;
    link.href = u;
    document.head.appendChild(link);
  });
};

const ProjectCard = ({ project, onClick, onViewDemo, highlightedTags, index }: any) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const hoverTimeoutRef = useRef<any>(null);

  const handleMouseEnter = () => {
    // 150ms delay threshold prevents thrashing the prefetch engine on rapid sweeps
    hoverTimeoutRef.current = setTimeout(() => {
      if (project.imageUrl) {
        prefetchAsset(project.imageUrl, 'image');
      }
      if (project.demoVideoUrl) {
        prefetchAsset(project.demoVideoUrl, 'video');
      }
    }, 150);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-700`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800 cursor-pointer" onClick={onClick}>
        <img 
          src={project.imageUrl || FALLBACK_IMAGE} 
          alt={project.title} 
          loading="lazy"
          onLoad={() => setImageLoaded(true)} 
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
          aria-label={`Project image for ${project.title}`}
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-4 items-center justify-center bg-slate-900/60 backdrop-blur-sm z-10">
          <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-blue-600 hover:text-white active:scale-95" onClick={(e) => { e.stopPropagation(); onClick(); }} aria-label={`View Case Study: ${project.title}`}>
            Case Study
          </button>
          {project.demoVideoUrl && (
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 hover:bg-blue-700 hover:scale-110 flex items-center gap-2 active:scale-95" onClick={(e) => { e.stopPropagation(); onViewDemo(); }} aria-label={`View Demo: ${project.title}`}>
              <MonitorPlay size={18} /> Demo
            </button>
          )}
        </div>
      </div>
      <div className="p-8">
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors leading-tight">{project.title}</h4>
        <Tooltip content={project.description} position="top">
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 h-[40px]">
            {project.description}
          </p>
        </Tooltip>
        <div className="flex flex-wrap gap-2" aria-label={`Technologies used in ${project.title}`}>
          {project.technologies?.map((tech: string) => (
            <span 
              key={tech} 
              className={`text-[11px] px-3 py-1 rounded-lg border transition-all duration-300 font-bold tracking-tight ${
                highlightedTags.includes(tech) 
                  ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-lg shadow-blue-500/20' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface PortfolioProps {
  limit?: number;
}

export const Portfolio: React.FC<PortfolioProps> = ({ limit }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CATEGORIES);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TAGS);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState<{ project: Project; autoPlay: boolean } | null>(null);

  // Dynamic connection-aware prefetching for top entries to optimize modal load responsiveness
  useEffect(() => {
    const topProjects = PROJECTS.slice(0, 3);
    topProjects.forEach(project => {
      if (project.imageUrl) {
        prefetchAsset(project.imageUrl, 'image');
      }
      if (project.demoVideoUrl) {
        prefetchAsset(project.demoVideoUrl, 'video');
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(selectedCategories));
    localStorage.setItem(STORAGE_KEY_TAGS, JSON.stringify(selectedTags));
  }, [selectedCategories, selectedTags]);

  useEffect(() => { 
    const timer = setTimeout(() => setLoading(false), 800); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get('project');
      if (projectId) {
        const found = PROJECTS.find(p => p.id === projectId);
        if (found) {
          setModalState({ project: found, autoPlay: false });
        }
      } else {
        const hash = window.location.hash;
        if (hash.startsWith('#project-')) {
          const id = hash.replace('#project-', '');
          const found = PROJECTS.find(p => p.id === id);
          if (found) {
            setModalState({ project: found, autoPlay: false });
          }
        }
      }
    } catch (e) {
      console.error('Error parsing share URL parameters:', e);
    }
  }, []);

  const categories = useMemo(() => [ALL_CATEGORY, ...Array.from(new Set(PROJECTS.map(p => p.category)))], []);
  const allTags = useMemo(() => Array.from(new Set(PROJECTS.flatMap(p => p.technologies || []))).sort(), []);

  const techAnalyticsData = useMemo(() => {
    const counts: Record<string, number> = {};
    const totalProjects = PROJECTS.length;
    
    PROJECTS.forEach(p => {
      p.technologies?.forEach(tech => {
        counts[tech] = (counts[tech] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / totalProjects) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, []);

  const dynamicCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      if (cat === ALL_CATEGORY) {
        let matchCount = 0;
        PROJECTS.forEach(p => {
          const matchTags = selectedTags.length === 0 || (p.technologies && selectedTags.every(t => p.technologies?.includes(t)));
          if (matchTags) matchCount++;
        });
        counts[cat] = matchCount;
      } else {
        const targetCats = selectedCategories.includes(cat)
          ? selectedCategories.filter(c => c !== cat)
          : [...selectedCategories, cat];
        
        let matchCount = 0;
        PROJECTS.forEach(p => {
          const matchCat = targetCats.length === 0 || targetCats.includes(p.category);
          const matchTags = selectedTags.length === 0 || (p.technologies && selectedTags.every(t => p.technologies?.includes(t)));
          if (matchCat && matchTags) {
            matchCount++;
          }
        });
        counts[cat] = matchCount;
      }
    });
    return counts;
  }, [selectedCategories, selectedTags, categories]);

  const dynamicTagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allTags.forEach(tag => {
      const targetTags = selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag];

      let matchCount = 0;
      PROJECTS.forEach(p => {
        const matchCat = selectedCategories.length === 0 || selectedCategories.includes(p.category);
        const matchTags = targetTags.length === 0 || (p.technologies && targetTags.every(t => p.technologies?.includes(t)));
        if (matchCat && matchTags) {
          matchCount++;
        }
      });
      counts[tag] = matchCount;
    });
    return counts;
  }, [selectedCategories, selectedTags, allTags]);

  const filteredProjects = useMemo(() => {
    let projs = PROJECTS.filter(p => {
      const matchCat = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchTags = selectedTags.length === 0 || (p.technologies && selectedTags.every(tag => p.technologies?.includes(tag)));
      return matchCat && matchTags;
    });
    return limit ? projs.slice(0, limit) : projs;
  }, [selectedCategories, selectedTags, limit]);

  const toggleCategory = (cat: string) => {
    if (cat === ALL_CATEGORY) setSelectedCategories([]);
    else setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const toggleTag = (tag: string) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  const shareProject = (platform: 'linkedin' | 'twitter') => {
    if (!modalState) return;
    const baseUrl = window.location.origin + '/portfolio';
    const url = `${baseUrl}?project=${modalState.project.id}`;
    const text = `Check out this project by OITS Dhaka: ${modalState.project.title}`;
    const links = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    };
    window.open(links[platform], '_blank');
  };

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        {!limit && (
          <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-[0.3em] border-b border-slate-200 dark:border-slate-800 pb-6 mb-12">
             <Layers size={14} className="text-blue-600" />
             <span>Active Filters</span>
             <span className="ml-auto text-[10px] text-slate-400">Total: {filteredProjects.length}</span>
          </div>
        )}

        {!limit && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 mb-16 shadow-sm overflow-hidden animate-in fade-in-50 slide-in-from-bottom-10 duration-700">
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
                <div className="flex items-center gap-3">
                   <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                      <BarChart3 size={20} />
                   </div>
                   <div>
                      <h4 className="font-black text-xl tracking-tight text-slate-900 dark:text-white">Technology Stack Ecosystem</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Distribution and frequency of modern technologies utilized across our complete catalog</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-xl text-xs font-bold leading-none border border-blue-100 dark:border-blue-900/30">
                   <Info size={14} />
                   <span>Interactive Dashboard: Click a bar or item to filter state</span>
                </div>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* Recharts Column */}
                <div className="lg:col-span-3 h-[280px]">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={techAnalyticsData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
                         <XAxis 
                            dataKey="name" 
                            stroke="#94a3b8" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                            className="font-mono"
                         />
                         <YAxis 
                            stroke="#94a3b8" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                            allowDecimals={false}
                            className="font-mono"
                         />
                         <RechartsTooltip 
                            cursor={{ fill: 'rgba(59, 130, 246, 0.04)', radius: 12 }}
                            content={({ active, payload }) => {
                               if (active && payload && payload.length) {
                                  const item = payload[0].payload;
                                  const isSelected = selectedTags.includes(item.name);
                                  return (
                                     <div className="bg-slate-900 dark:bg-slate-950 border border-slate-850 text-white rounded-2xl p-4 shadow-2xl text-xs space-y-2 font-sans">
                                        <div className="flex items-center gap-2">
                                           <span className="font-extrabold tracking-tight text-slate-100">{item.name}</span>
                                           {isSelected && <span className="text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/35 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">Filtered</span>}
                                        </div>
                                        <div className="flex justify-between gap-8 pt-1 border-t border-slate-800">
                                           <span className="text-slate-400">Total Projects:</span>
                                           <span className="font-mono font-bold text-blue-400">{item.count}</span>
                                        </div>
                                        <div className="flex justify-between gap-8">
                                           <span className="text-slate-400">Ecosystem Density:</span>
                                           <span className="font-mono font-bold text-emerald-400">{item.percentage}%</span>
                                        </div>
                                     </div>
                                  );
                               }
                               return null;
                            }}
                         />
                         <Bar dataKey="count" radius={[6, 6, 0, 0]} onClick={(data) => {
                            if (data && data.name) {
                               toggleTag(data.name);
                            }
                         }}>
                            {techAnalyticsData.map((entry, index) => {
                               const isSelected = selectedTags.includes(entry.name);
                               return (
                                  <Cell 
                                     key={`cell-${index}`} 
                                     fill={isSelected ? '#2563eb' : 'rgba(59, 130, 246, 0.15)'}
                                     stroke={isSelected ? '#3b82f6' : 'rgba(59, 130, 246, 0.3)'}
                                     strokeWidth={isSelected ? 1.5 : 1}
                                     style={{ cursor: 'pointer' }}
                                     className="transition-all duration-300 hover:opacity-90"
                                  />
                               );
                            })}
                         </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                </div>
                
                {/* Metric Summary Column */}
                <div className="lg:col-span-2 flex flex-col justify-center space-y-4">
                   <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                      <TrendingUp size={12} className="text-blue-500" />
                      Ecosystem Stats
                   </h5>
                   <div className="grid grid-cols-2 gap-4">
                      {techAnalyticsData.slice(0, 4).map((tech) => {
                         const isSelected = selectedTags.includes(tech.name);
                         return (
                            <button
                               key={tech.name}
                               onClick={() => toggleTag(tech.name)}
                               className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 flex flex-col justify-between ${isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/10' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:border-blue-400 text-slate-900 dark:text-white'}`}
                            >
                               <span className={`text-[11px] font-black uppercase tracking-wider ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>{tech.name}</span>
                               <div className="flex items-baseline gap-2 mt-2">
                                  <span className="font-mono text-xl font-bold">{tech.count}</span>
                                  <span className={`text-xs ${isSelected ? 'text-white/70' : 'text-slate-500 font-medium'}`}>{tech.percentage}%</span>
                               </div>
                            </button>
                         );
                      })}
                   </div>
                </div>
             </div>
          </div>
        )}

        <div className="mb-16 flex flex-col lg:flex-row gap-12">

           <div className="flex-1">
              {!limit && (
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 mb-12 shadow-sm relative overflow-hidden group/filter">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                        <Tag size={20}/>
                      </div>
                      <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">Filters</span>
                    </div>
                    {(selectedTags.length > 0 || selectedCategories.length > 0) && (
                      <button onClick={handleResetFilters} className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-2 font-black uppercase tracking-widest hover:underline px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full transition-all">
                        <RotateCcw size={14}/> Reset
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-8">
                     {/* Categories */}
                     <div>
                       <h5 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-5">Verticals</h5>
                       <div className="flex flex-wrap gap-3" role="group" aria-label="Vertical Filter Chips">
                        {categories.filter(c => c !== ALL_CATEGORY).map(cat => {
                          const active = selectedCategories.includes(cat);
                          const count = dynamicCategoryCounts[cat] || 0;
                          const isZero = count === 0 && !active;
                          return (
                            <button 
                              key={cat} 
                              onClick={() => toggleCategory(cat)} 
                              aria-pressed={active} 
                              aria-label={`Filter by ${cat} category, ${count} projects available`}
                              disabled={isZero}
                              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black border transition-all active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:scale-105 ${active ? 'bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105' : isZero ? 'bg-slate-50/40 dark:bg-slate-900/20 border-dashed border-slate-200/50 dark:border-slate-800/50 text-slate-300 dark:text-slate-600 opacity-40 cursor-not-allowed hover:scale-100' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400'}`}
                            >
                              {cat}
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold tracking-tight ${active ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                                 {count}
                              </span>
                            </button>
                          );
                        })}
                       </div>
                     </div>

                     {/* Technologies */}
                     <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <h5 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-5 pt-6">Technologies</h5>
                        <div className="flex flex-wrap gap-3" role="group" aria-label="Technology Filter Chips">
                          {allTags.map(tag => {
                            const active = selectedTags.includes(tag);
                            const count = dynamicTagCounts[tag] || 0;
                            const isZero = count === 0 && !active;
                            return (
                              <button 
                                key={tag} 
                                onClick={() => toggleTag(tag)} 
                                aria-pressed={active} 
                                aria-label={`Filter by ${tag} technology, ${count} projects available`}
                                disabled={isZero}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black border transition-all active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:scale-105 ${active ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' : isZero ? 'bg-slate-50/40 dark:bg-slate-900/20 border-dashed border-slate-200/50 dark:border-slate-800/50 text-slate-300 dark:text-slate-600 opacity-40 cursor-not-allowed hover:scale-100' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400'}`}
                              >
                                {tag}
                                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold tracking-tight ${active ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                                   {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                     </div>
                  </div>
                </div>
              )}
              
              <div 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 min-h-[500px]"
              >
                <AnimatePresence mode="popLayout">
                  {loading ? [1,2,3].map(i => <ProjectSkeleton key={i}/>) : filteredProjects.map((p, i) => (
                    <ProjectCard 
                      key={p.id} 
                      project={p} 
                      index={i} 
                      highlightedTags={selectedTags} 
                      onClick={() => setModalState({ project: p, autoPlay: false })} 
                      onViewDemo={() => setModalState({ project: p, autoPlay: true })} 
                    />
                  ))}
                </AnimatePresence>
                {!loading && filteredProjects.length === 0 && (
                   <div className="col-span-full py-40 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-500">
                      <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <FilterX className="text-slate-300 dark:text-slate-600" size={40} />
                      </div>
                      <h5 className="text-2xl font-black text-slate-900 dark:text-white mb-4">No projects found matching your criteria</h5>
                      <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
                        Try adjusting your filters or search terms to find what you're looking for.
                      </p>
                      <button 
                        onClick={handleResetFilters} 
                        className="inline-flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
                      >
                        <RotateCcw size={16}/> Reset Filters
                      </button>
                   </div>
                )}
              </div>
           </div>
        </div>
      </div>
      {modalState && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setModalState(null)}/>
          <div className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col pointer-events-auto">
            <div className="relative aspect-video bg-black flex-shrink-0">
              {modalState.autoPlay && modalState.project.demoVideoUrl ? (
                <CustomVideoPlayer 
                  src={modalState.project.demoVideoUrl} 
                  poster={modalState.project.imageUrl} 
                  onClose={() => setModalState({ ...modalState, autoPlay: false })} 
                />
              ) : (
                <div className="relative w-full h-full group/modal-img">
                  <img src={modalState.project.imageUrl || FALLBACK_IMAGE} alt={modalState.project.title} className="w-full h-full object-cover"/>
                  <button onClick={() => setModalState(null)} className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all active:scale-90 z-20">
                    <X size={24}/>
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10 md:p-16">
                    <h3 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">{modalState.project.title}</h3>
                    <div className="flex gap-4">
                      {modalState.project.demoVideoUrl && (
                        <Button onClick={() => setModalState({ ...modalState, autoPlay: true })} variant="primary" className="rounded-full shadow-2xl shadow-blue-500/40">
                          <Play size={18} className="mr-2" /> Play Showreel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 sm:p-10 md:p-16 overflow-y-auto">
              <div className="max-w-4xl">
                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                    <h4 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em]">Case Study Overview</h4>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Share Project:</span>
                       <a 
                         href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/portfolio?project=' + modalState.project.id)}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         aria-label={`Share ${modalState.project.title} on LinkedIn`} 
                         className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-[#0077b5] hover:text-white transition-all shadow-sm hover:scale-110 active:scale-[0.93] focus-visible:ring-2 focus-visible:ring-blue-500 group focus:outline-none"
                       >
                         <Linkedin size={18} className="transition-transform group-hover:-rotate-6" />
                       </a>
                       <a 
                         href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this project by OITS Dhaka: ${modalState.project.title}`)}&url=${encodeURIComponent(window.location.origin + '/portfolio?project=' + modalState.project.id)}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         aria-label={`Share ${modalState.project.title} on Twitter`} 
                         className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-sky-500 hover:text-white transition-all shadow-sm hover:scale-110 active:scale-[0.93] focus-visible:ring-2 focus-visible:ring-blue-500 group focus:outline-none"
                       >
                         <Twitter size={18} className="transition-transform group-hover:rotate-6" />
                       </a>
                    </div>
                 </div>
                 <p className="text-slate-700 dark:text-slate-300 text-xl leading-relaxed mb-10 font-medium">
                   {modalState.project.fullDescription || modalState.project.description}
                 </p>
                 <div className="flex flex-wrap gap-3">
                   {modalState.project.technologies?.map(tech => (
                     <span key={tech} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300">
                       {tech}
                     </span>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};