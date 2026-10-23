"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { ArrowUp, ChevronRight } from 'lucide-react';

export interface SectionLink {
  id: string;
  label: string;
}

interface StickySectionNavProps {
  sections: SectionLink[];
}

export const StickySectionNav: React.FC<StickySectionNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  const currentIndexNumber = activeIndex >= 0 ? activeIndex + 1 : 1;

  // Real-time scroll listener for edge safety (top/bottom snap) - Desktop only
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1280) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Top snap
      if (scrollY < 240 && sections[0]) {
        setActiveSection(sections[0].id);
        return;
      }

      // Bottom snap
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 120) {
        if (sections[sections.length - 1]) {
          setActiveSection(sections[sections.length - 1].id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // IntersectionObserver: accurately tracks active section in reading viewport zone - Desktop only
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1280) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-12% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Smooth scroll with header clearance
  const scrollTo = useCallback((id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (!el) return;

    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(el, { offset: -110 });
    } else {
      const targetY = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <aside
      aria-label="In-page section navigator"
      className="hidden xl:block sticky top-28 w-[270px] shrink-0 self-start z-30 select-none"
    >
      {/* ── Futuristic Dark Architectural HUD Console ── */}
      <div className="relative rounded-2xl bg-[#0A0F1E] border border-blue-900/40 p-5 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Subtle Ambient Radial Backlight */}
        <div
          className="absolute -top-12 -right-12 w-36 h-36 bg-blue-600/15 rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* ── Top Header with Live Indicator & Step Counter ── */}
        <div className="relative z-10 pb-3 mb-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_8px_#3B82F6]" />
            </span>
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-blue-400">
              Index
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-400 font-semibold bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
            0{currentIndexNumber} / 0{sections.length}
          </span>
        </div>

        {/* ── Vertical Timeline Rail & Interactive Nodes ── */}
        <nav aria-label="Sections index" className="relative z-10">
          <ul className="space-y-1 relative">
            {/* Centered Timeline Rail Track (top-5 to bottom-5 spans exactly from node 1 center to node N center) */}
            <div
              className="absolute left-[22px] -translate-x-1/2 top-5 bottom-5 w-[1.5px] pointer-events-none z-0"
              aria-hidden="true"
            >
              {/* Inactive Base Rail */}
              <div className="absolute inset-0 bg-white/10" />

              {/* Active Rail Line (Restored to original clean blue, strictly bounded within track) */}
              <div
                className="absolute top-0 left-0 w-full bg-blue-500 transition-all duration-300"
                style={{
                  height: `${((currentIndexNumber - 1) / Math.max(1, sections.length - 1)) * 100}%`,
                }}
              />
            </div>

            {sections.map((sec, idx) => {
              const isActive = activeSection === sec.id;
              const isPassed = idx < activeIndex;
              const cleanLabel = sec.label.replace(/^\d+[\.\s·]+/, '');
              const stageNum = String(idx + 1).padStart(2, '0');

              return (
                <li key={sec.id} className="relative z-10">
                  <button
                    type="button"
                    onClick={() => scrollTo(sec.id)}
                    className={cn(
                      "w-full text-left py-2 px-2.5 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                      isActive
                        ? "bg-blue-600/20 text-white font-bold border border-blue-500/40 shadow-[0_0_20px_rgba(37,99,235,0.25)]"
                        : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04] border border-transparent"
                    )}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Step Number Circuit Node (Sits cleanly on top of the centered rail) */}
                      <span
                        className={cn(
                          "w-6 h-6 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center shrink-0 transition-all z-10",
                          isActive
                            ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.8)] scale-105"
                            : isPassed
                            ? "bg-[#0A0F1E] text-blue-400 border border-blue-500/30"
                            : "bg-[#0A0F1E] text-slate-400 border border-white/10 group-hover:border-blue-500/30 group-hover:text-blue-300"
                        )}
                      >
                        {stageNum}
                      </span>

                      {/* Section Title */}
                      <span
                        className={cn(
                          "text-xs truncate transition-all",
                          isActive
                            ? "text-white font-semibold"
                            : isPassed
                            ? "text-slate-200 group-hover:text-white"
                            : "text-slate-400 group-hover:text-slate-200"
                        )}
                      >
                        {cleanLabel}
                      </span>
                    </div>

                    {/* Active State Icon */}
                    {isActive ? (
                      <span className="text-blue-400 shrink-0 ml-1.5 flex items-center">
                        <ChevronRight size={13} className="stroke-[3]" />
                      </span>
                    ) : (
                      <span className="text-slate-600 opacity-0 group-hover:opacity-100 shrink-0 ml-1.5 transition-opacity">
                        <ChevronRight size={13} />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Card Utility Footer ── */}
        <div className="relative z-10 pt-3.5 mt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-blue-400 flex items-center gap-1 transition-colors cursor-pointer group"
            aria-label="Scroll to top of case study"
          >
            <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
            <span>Top</span>
          </button>

          <Link
            href="/#vault"
            className="hover:text-blue-400 flex items-center gap-1 transition-colors cursor-pointer"
            aria-label="Return to Vault archive"
          >
            <span>Vault</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
