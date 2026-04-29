"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * @fileOverview High-fidelity 404 Error page with interactive parallax movement.
 * Strictly adheres to the provided design while utilizing centralized architectural fonts.
 */

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const dx = (clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (clientY - rect.top - rect.height / 2) / (rect.height / 2);
    // Calibration for subtle depth movement (20px horizontal, 10px vertical)
    setMousePos({ x: dx * 20, y: dy * 10 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div 
      className="page min-h-[580px] h-screen w-full bg-[#0A0F1E] flex flex-col items-center justify-center p-6 md:p-12 text-center relative overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Architectural 404 text with Parallax & Drift */}
      <div 
        className="behind-wrap absolute top-1/2 left-1/2 z-[1] leading-none pointer-events-none"
        style={{ 
          transform: `translate(-50%, -38%) translate(${mousePos.x}px, ${mousePos.y}px)`,
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 25%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 25%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)',
          transition: mousePos.x === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out'
        }}
      >
        <div 
          className="behind font-heading font-bold text-[#0F172A] tracking-[0.04em] whitespace-nowrap animate-drift"
          style={{ fontSize: 'clamp(180px, 32vw, 340px)' }}
        >
          404
        </div>
      </div>

      {/* Main Narrative Content */}
      <div className="content relative z-10 max-w-[600px] pointer-events-auto">
        <div className="overline font-mono text-[12px] font-normal text-[#2563EB] tracking-[0.15em] uppercase mb-5">
          Error 404
        </div>
        <h1 className="heading font-heading font-semibold text-[#475569] leading-[1.25] tracking-[0.02em] mb-7" style={{ fontSize: 'clamp(22px, 3vw, 38px)' }}>
          You're in uncharted <strong className="text-[#F8FAFC] font-bold">territory!</strong>
        </h1>
        <Link 
          href="/" 
          className="return font-body text-[15px] font-medium text-[#F8FAFC] underline underline-offset-4 decoration-[#2563EB] hover:text-[#2563EB] transition-colors tracking-[0.02em]"
        >
          Return home
        </Link>
      </div>

      {/* Signature Branding */}
      <div className="km absolute bottom-7 left-1/2 -translate-x-1/2 font-heading font-bold text-[14px] tracking-[0.1em] z-20">
        <span className="text-[#F8FAFC]">K</span>
        <span className="text-[#2563EB]">M</span>
      </div>

      <style jsx global>{`
        @keyframes drift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .animate-drift {
          animation: drift 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}