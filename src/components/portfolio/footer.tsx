
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────
   CLOCK — Refined Mechanical Rotating Dial
───────────────────────────────────────── */
const Clock = () => {
  const [time, setTime] = useState(new Date());
  const secondsRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      
      const s = now.getSeconds();
      const m = now.getMinutes();

      if (secondsRef.current) {
        if (s === 0) secondsRef.current.classList.add('stop-anim');
        else secondsRef.current.classList.remove('stop-anim');
        secondsRef.current.style.setProperty('--dRotate', `${6 * s}deg`);
      }

      if (minutesRef.current) {
        if (m === 0) minutesRef.current.classList.add('stop-anim');
        else minutesRef.current.classList.remove('stop-anim');
        minutesRef.current.style.setProperty('--dRotate', `${6 * m}deg`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const spikes = Array.from({ length: 60 });

  return (
    <div className="clock-wrapper relative flex items-center justify-center">
      <style>{`
        .km-clock {
          --clock-size: 260px;
          --accent-blue: #2563EB;
          --text-white: #F8FAFC;
          --text-muted: rgba(248, 250, 252, 0.4);
          width: var(--clock-size);
          height: var(--clock-size);
          position: relative;
          border-radius: 50%;
        }

        .km-spike {
          position: absolute;
          width: 6px;
          height: 1px;
          background: var(--text-muted);
          transform-origin: 50%;
          z-index: 5;
          inset: 0;
          margin: auto;
          font-style: normal;
          transform: rotate(var(--rotate)) translateX(var(--dail-size));
        }

        .km-spike:nth-child(5n + 1) {
          background: var(--text-white);
          width: 8px;
          box-shadow: -5px 0 var(--text-white);
        }

        .km-spike:nth-child(5n + 1):after {
          content: attr(data-i);
          position: absolute;
          right: 20px;
          top: -8px;
          transition: 1s linear;
          transform: rotate(calc(var(--dRotate) - var(--rotate)));
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: var(--text-white);
        }

        .km-seconds {
          --dRotate: 0deg;
          --dail-size: calc((var(--clock-size) / 2) - 8px);
          transform: rotate(calc(-1 * var(--dRotate)));
          position: absolute;
          inset: 0;
          margin: auto;
          transition: 1s linear;
        }

        .km-minutes {
          --dRotate: 0deg;
          --dail-size: calc((var(--clock-size) / 2) - 45px);
          transform: rotate(calc(-1 * var(--dRotate)));
          position: absolute;
          inset: 0;
          margin: auto;
          transition: 1s linear;
        }

        .stop-anim, .stop-anim:after {
          transition: 0s linear !important;
        }
        
        .stop-anim .km-spike:after {
          transition: 0s linear !important;
        }

        .km-hour-display {
          font-family: 'Clash Display', sans-serif;
          font-size: 52px;
          font-weight: 700;
          color: var(--text-white);
          line-height: 1;
        }

        .km-minute-display {
          font-family: 'DM Mono', monospace;
          font-size: 26px;
          font-weight: 500;
          color: var(--accent-blue);
          position: absolute;
          background: #0A0F1E;
          z-index: 20;
          right: calc(var(--clock-size) / 5);
          top: 50%;
          transform: translateY(-50%);
          padding: 0 4px;
        }

        .km-minute-display:after {
          content: '';
          position: absolute;
          border: 1.5px solid var(--accent-blue);
          border-right: none;
          height: 38px;
          left: -10px;
          top: 50%;
          border-radius: 30px 0 0 30px;
          width: calc(var(--clock-size) / 3);
          transform: translateY(-50%);
          z-index: -1;
          pointer-events: none;
        }

        .km-hour-group {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .km-timezone-display {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          font-weight: 600;
          color: var(--accent-blue);
          letter-spacing: 0.24em;
          text-transform: uppercase;
          padding: 0;
          background: transparent;
          border: 0;
          box-shadow: none;
          opacity: 0.92;
        }
      `}</style>
      <div className="km-clock">
        <div ref={secondsRef} className="km-seconds">
          {spikes.map((_, i) => (
            <i 
              key={i} 
              className="km-spike" 
              style={{ '--rotate': `${6 * i}deg` } as any} 
              data-i={String(i).padStart(2, '0')} 
            />
          ))}
        </div>

        <div ref={minutesRef} className="km-minutes">
          {spikes.map((_, i) => (
            <i 
              key={i} 
              className="km-spike" 
              style={{ '--rotate': `${6 * i}deg` } as any} 
              data-i={String(i).padStart(2, '0')} 
            />
          ))}
        </div>

        <div className="km-hour-group">
          <div className="km-hour-display">
            {time.getHours().toString().padStart(2, '0')}
          </div>
          <div className="km-timezone-display">GMT+5:30</div>
        </div>
        <div className="km-minute-display">
          {time.getMinutes().toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={footerRef}
      id="contact"
      className="relative z-20 bg-[#0A0F1E] overflow-hidden border-t border-white/5 section-dark min-h-[60vh] flex flex-col py-24 snap-start snap-always"
    >
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right,  #F8FAFC 1px, transparent 1px),
            linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)
          `,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 w-full items-start">

          {/* Column 1: Let's Connect */}
          <div className="lg:col-span-4 space-y-10">
            <div
              className={cn(
                'flex flex-col gap-4 transition-opacity duration-1000 ease-in-out',
                isVisible ? 'opacity-100' : 'opacity-0'
              )}
            >
              <h2 className="text-heading text-[#F8FAFC]">Let's Connect</h2>
              <div className="w-16 h-1 bg-[#2563EB]" />
            </div>

            <div
              className={cn(
                'space-y-6 transition-all duration-1000 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}
            >
              <span className="text-label text-[#2563EB] block">Availability</span>
              <p className="text-body text-[#F8FAFC]/80 max-w-lg">
                I'm currently available for{' '}
                <span className="text-[#2563EB] font-bold">New Projects</span> or architectural
                consultations. Let's build something efficient, scalable, and visually precise.
              </p>
            </div>
          </div>

          {/* Column 2: Directory */}
          <div
            className={cn(
              'lg:col-span-2 flex flex-col transition-all duration-1000 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}
          >
            <div className="space-y-4">
              <h4 className="text-label text-[#F8FAFC] uppercase">
                Directory
              </h4>
              <nav className="flex flex-col gap-2 pl-4">
                {[
                  { label: 'Intro',        href: '/#about'   },
                  { label: 'My Lab',       href: '/#skills'  },
                  { label: 'My Vault',     href: '/#work'    },
                  { label: 'Contact',      href: '/#contact' },
                ].map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="text-label text-[#F8FAFC]/50 hover:text-[#2563EB] transition-colors w-full flex items-center gap-2 group py-2"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Column 3: Social Media */}
          <div
            className={cn(
              'lg:col-span-2 flex flex-col transition-all duration-1000 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: isVisible ? '0.25s' : '0s' }}
          >
            <div className="space-y-4">
              <h4 className="text-label text-[#F8FAFC] uppercase">
                Social Media
              </h4>
              <nav className="flex flex-col gap-2 pl-4">
                {[
                  { label: 'LinkedIn',  href: 'https://linkedin.com' },
                  { label: 'Instagram', href: 'https://instagram.com' },
                  { label: 'GitHub',    href: 'https://github.com' },
                  { label: 'Mail',      href: 'mailto:khushmakwana1980@gmail.com' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-label text-[#F8FAFC]/50 hover:text-[#2563EB] transition-colors w-full flex items-center gap-2 group py-2"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Column 4: Mechanical Clock */}
          <div
            className={cn(
              'lg:col-span-4 flex items-start justify-center lg:justify-end transition-all duration-1000 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}
          >
            <Clock />
          </div>

        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 mt-24 pt-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[10px] font-mono text-[#F8FAFC]/20 uppercase tracking-[0.2em]">
            © 2024 KM · Architecting logic into art
          </span>
          <span className="text-[10px] font-mono text-[#F8FAFC]/20 uppercase tracking-[0.2em]">
            Built with precision in studio
          </span>
        </div>
      </div>
    </section>
  );
};
