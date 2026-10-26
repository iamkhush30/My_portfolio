"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAdjacentProjects } from '@/data/projects';

interface ProjectNavProps {
  currentSlug: string;
}

export const ProjectNav: React.FC<ProjectNavProps> = ({ currentSlug }) => {
  const { prev, next } = getAdjacentProjects(currentSlug);

  return (
    <nav
      aria-label="Previous and next project navigation"
      className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full min-w-0"
    >
      {/* Previous Project */}
      <Link
        href={`/${prev.slug}`}
        className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-border hover:border-primary/50 hover:shadow-lg transition-all flex flex-col justify-between min-w-0"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-2.5 sm:mb-3 group-hover:text-primary transition-colors">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 shrink-0" />
          <span>Previous Project</span>
        </div>
        <div className="min-w-0">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-primary font-bold block">
            {prev.category}
          </span>
          <span className="block text-sm sm:text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors mt-0.5 truncate">
            {prev.title}
          </span>
        </div>
      </Link>

      {/* Next Project */}
      <Link
        href={`/${next.slug}`}
        className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-border hover:border-primary/50 hover:shadow-lg transition-all flex flex-col justify-between text-left sm:text-right min-w-0"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-2.5 sm:mb-3 sm:justify-end group-hover:text-primary transition-colors">
          <span>Next Project</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 shrink-0" />
        </div>
        <div className="min-w-0">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-primary font-bold block">
            {next.category}
          </span>
          <span className="block text-sm sm:text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors mt-0.5 truncate">
            {next.title}
          </span>
        </div>
      </Link>
    </nav>
  );
};
