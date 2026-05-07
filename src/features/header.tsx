
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';

/**
 * @fileOverview High-fidelity navigation bar with organic "liquid" concave curves.
 * Updated with About, My Lab, KM, My Vault, and Contact hierarchy.
 * KM Logo targets #hero for smooth scroll to home from any page.
 */

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHeroClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      if (window.__lenis) {
        window.__lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (window.location.hash) {
        window.history.replaceState(null, '', '/');
      }
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Generate randomized positions and animation params for mobile bubbles
  const [bubblePositions, setBubblePositions] = useState<
    { left: string; top: string; delay: number; duration: number; offsetX: number; offsetY: number }[]
  >([]);

  useEffect(() => {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    // Quadrant centers expressed in percent (container normalized to 100x100)
    const base = [
      { cx: 20, cy: 18 },
      { cx: 80, cy: 18 },
      { cx: 20, cy: 78 },
      { cx: 80, cy: 78 },
    ];

    // Bubble diameter in percent of container (keeps same as CSS width/height)
    const diameter = 26; // percent
    const gap = 6; // percent extra gap between bubbles
    const minDist = diameter + gap; // min center-to-center distance

    const placed: { x: number; y: number }[] = [];
    const positions = base.map((b) => {
      let attempts = 0;
      let x = Math.round(rand(b.cx - 6, b.cx + 6));
      let y = Math.round(rand(b.cy - 6, b.cy + 6));

      const isTooClose = (nx: number, ny: number) => {
        for (const p of placed) {
          const dx = p.x - nx;
          const dy = p.y - ny;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) return true;
        }
        return false;
      };

      while (isTooClose(x, y) && attempts < 12) {
        x = Math.round(rand(b.cx - 8, b.cx + 8));
        y = Math.round(rand(b.cy - 8, b.cy + 8));
        attempts += 1;
      }

      // If still colliding after retries, nudge away deterministically
      if (isTooClose(x, y)) {
        let angle = Math.random() * Math.PI * 2;
        x = Math.round(Math.min(92, Math.max(6, x + Math.cos(angle) * minDist)));
        y = Math.round(Math.min(92, Math.max(6, y + Math.sin(angle) * minDist)));
      }

      placed.push({ x, y });

      return {
        left: `${x}%`,
        top: `${y}%`,
        delay: Math.round(rand(20, 260)),
        duration: Math.round(rand(3200, 5600)),
        offsetX: Math.round(rand(-10, 10)),
        offsetY: Math.round(rand(-8, 8)),
      };
    });

    setBubblePositions(positions);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <>
      {/* Static Top Line - Full Width - Matches Navbar Color */}
      <div className="fixed top-0 left-0 right-0 z-50 h-3 bg-[#0A0F1E]"></div>

      {/* Imperceptible Depth Onset - Nearly Invisible Bottom to Strong Top */}
      <div 
        className="fixed top-0 left-0 right-0 h-16 pointer-events-none z-40"
        style={{
          background: 'linear-gradient(to bottom, rgba(10, 15, 30, 0.11) 0%, rgba(10, 15, 30, 0.10) 8%, rgba(10, 15, 30, 0.08) 18%, rgba(10, 15, 30, 0.06) 32%, rgba(10, 15, 30, 0.03) 55%, rgba(10, 15, 30, 0.01) 78%, transparent 100%)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          boxShadow: 'inset 0 14px 35px -20px rgba(0, 0, 0, 0.07)',
        }}
      ></div>

      <header className="fixed top-1 left-0 right-0 z-[60] flex justify-center pointer-events-none px-0 sm:px-0">
        <div className="relative flex justify-center items-start">
          
          {/* Floating Organic Navbar Body - Beveled Bottom Only */}
          <nav className="header-nav-shape pointer-events-auto relative flex items-center justify-between bg-[#0A0F1E] h-[52px] sm:h-[58px] px-3 sm:px-6 md:px-12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] w-[100vw] md:w-auto md:max-w-[calc(100vw-0.5rem)] md:min-w-[800px] border-b border-white/5 overflow-hidden rounded-none">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563EB] md:hidden" />
          
          {/* Left Menu Items */}
          <div className="hidden md:flex items-center gap-10 flex-1 justify-end pr-12">
            <Link 
              href="/#about" 
              className="text-[#94A3B8] text-nav hover:text-[#2563EB] transition-all duration-500 ease-out"
            >
              About
            </Link>
            <Link 
              href="/#lab" 
              className="text-[#94A3B8] text-nav hover:text-[#2563EB] transition-all duration-500 ease-out"
            >
              My Lab
            </Link>
          </div>

          {/* Center Logo Branding - Click to navigate/scroll to Hero */}
          <div className="relative flex items-center justify-center px-1 sm:px-4 md:px-10">
            <Link href="/" onClick={handleHeroClick} className="group flex flex-col items-center cursor-pointer">
              <div className="flex items-baseline gap-0.5 relative">
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-[#F5F5F7] tracking-tighter font-heading">K</span>
                <span className="text-lg sm:text-xl md:text-2xl font-semibold text-[#2563EB] tracking-tighter font-heading">M</span>
                <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#2563EB] group-hover:w-full transition-all duration-700 ease-in-out"></div>
              </div>
            </Link>
          </div>

          {/* Right Menu Items */}
          <div className="hidden md:flex items-center gap-10 flex-1 justify-start pl-12">
            <Link 
              href="/#vault" 
              className="text-[#94A3B8] text-nav hover:text-[#2563EB] transition-all duration-500 ease-out"
            >
              My Vault
            </Link>
            <Link 
              href="/#contact" 
              className="text-[#94A3B8] text-nav hover:text-[#2563EB] transition-all duration-500 ease-out"
            >
              Contact
            </Link>
          </div>

          <div
            className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto z-[100]"
            style={{
              transform: 'translateX(0) translateY(-50%)',
              transition: 'none',
            }}
          >
            <button
              type="button"
              className="h-8 w-8 rounded-full border border-white/10 bg-white/5 text-[#F5F5F7] hover:bg-white/10 transition-colors flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((current) => !current)}
            >
              <span className="relative h-4 w-4">
                <Menu
                  className={`absolute inset-0 h-4 w-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mobileMenuOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
                  }`}
                  strokeWidth={2.5}
                />
                <X
                  className={`absolute inset-0 h-4 w-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'
                  }`}
                  strokeWidth={2.5}
                />
              </span>
            </button>
          </div>

          <div
            className={`md:hidden fixed inset-0 z-[70] ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            aria-hidden={!mobileMenuOpen}
          >
            <div
              className="absolute left-0 right-0 bottom-0 mobile-overlay"
              onClick={closeMobileMenu}
              style={{
                top: '58px',
                background: mobileMenuOpen ? 'rgba(10,15,30,0.10)' : 'transparent',
                backdropFilter: mobileMenuOpen ? 'blur(4px) saturate(105%)' : 'blur(0px) saturate(100%)',
                WebkitBackdropFilter: mobileMenuOpen ? 'blur(4px) saturate(105%)' : 'blur(0px) saturate(100%)',
                clipPath: mobileMenuOpen
                  ? 'circle(160% at calc(100% - 24px) 28px)'
                  : 'circle(0px at calc(100% - 24px) 28px)',
                opacity: mobileMenuOpen ? 1 : 0,
              }}
            />

            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: mobileMenuOpen
                  ? 'circle(160% at calc(100% - 24px) 28px)'
                  : 'circle(0px at calc(100% - 24px) 28px)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: 1,
              }}
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563EB]" />
              <div
                className="absolute inset-x-0 top-0 pt-14 pl-4 sm:pl-6 pr-0 flex justify-end"
                style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
              >
                <div
                  className="top-panel overflow-hidden bg-[#0A0F1E]/90 shadow-2xl"
                  style={{
                    width: '30vw',
                    maxWidth: '240px',
                    minWidth: '180px',
                    marginRight: '0px',
                    transformOrigin: 'top right',
                    transform: mobileMenuOpen ? 'scaleY(1)' : 'scaleY(0.06)',
                    transition: 'transform 680ms cubic-bezier(0.16, 1, 0.3, 1)',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(18px) saturate(130%)',
                    WebkitBackdropFilter: 'blur(18px) saturate(130%)',
                  }}
                >
                  <div className="px-5 py-5">
                    <nav>
                      <ul className="space-y-3">
                        {[
                          { label: 'Home', href: '/' },
                          { label: 'About', href: '/#about' },
                          { label: 'My Lab', href: '/#lab' },
                          { label: 'My Vault', href: '/#vault' },
                          { label: 'Contact', href: '/#contact' },
                        ].map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={closeMobileMenu}
                              className="flex w-full items-center justify-between gap-3 text-left py-3 px-4 rounded-lg side-menu-item"
                            >
                              <span className="text-label">{item.label}</span>
                              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#94A3B8]" strokeWidth={2.5} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>

    </>
  );
};
