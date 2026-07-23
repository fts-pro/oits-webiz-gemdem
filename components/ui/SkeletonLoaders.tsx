import React from 'react';

export const ServiceSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 animate-pulse space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="w-20 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="space-y-3">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6" />
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <div className="w-16 h-5 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="w-20 h-5 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="w-14 h-5 rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const PortfolioSkeleton: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Featured Big Project Skeleton */}
      <div className="rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 lg:p-12 animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="w-28 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-4/5" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-11/12" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
          </div>
          <div className="flex gap-3 pt-4">
            <div className="w-24 h-8 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="w-24 h-8 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
        <div className="aspect-[16/10] rounded-[2rem] bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Grid Projects Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 animate-pulse space-y-4"
          >
            <div className="aspect-[16/10] rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-2/3" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const PageSkeletonLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Skeleton */}
      <div className="text-center max-w-3xl mx-auto space-y-4 animate-pulse">
        <div className="w-32 h-6 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-2xl w-3/4 mx-auto" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3 mx-auto" />
      </div>

      {/* Services Skeleton Grid */}
      <ServiceSkeleton />
    </div>
  );
};
