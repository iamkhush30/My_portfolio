
"use client";

import React from 'react';
import Link from 'next/link';

/**
 * @fileOverview High-fidelity navigation bar with organic "liquid" concave curves.
 * Updated with About, My Lab, KM, My Vault, and Contact hierarchy.
 * KM Logo targets #hero for smooth scroll to home from any page.
 */

export const Header = () => {
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
      
      <header className="fixed top-1 left-0 right-0 z-[60] flex justify-center pointer-events-none">
        <div className="relative flex justify-center items-start">
          
          {/* Floating Organic Navbar Body - Beveled Bottom Only */}
          <nav className="pointer-events-auto relative flex items-center justify-between bg-[#0A0F1E] h-[58px] px-8 md:px-12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] min-w-[320px] md:min-w-[800px] border-b border-white/5" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 92% 100%, 8% 100%)' }}>
          
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
          <div className="relative flex items-center justify-center px-4 md:px-10">
            <Link href="/" onClick={handleHeroClick} className="group flex flex-col items-center cursor-pointer">
              <div className="flex items-baseline gap-0.5 relative">
                  <span className="text-2xl font-semibold text-[#F5F5F7] tracking-tighter font-heading">K</span>
                <span className="text-2xl font-semibold text-[#2563EB] tracking-tighter font-heading">M</span>
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
        </nav>
      </div>
    </header>

    </>
  );
};
