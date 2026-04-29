"use client";

import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { PipelineAnimation } from '@/components/portfolio/pipeline-animation';
import { RippleButton } from '@/components/ui/ripple-button';

export const Hero = () => {
  const firstName = "Khush";
  const lastName = "Makwana";
  
  // Start animation when heading is roughly half complete
  const paragraphStartDelay = ((firstName.length + lastName.length) * 0.08) / 2 + 0.1;

  return (
    <section 
      id="hero" 
      className="sticky top-0 z-0 h-screen flex items-center justify-center overflow-hidden bg-[#0A0F1E] section-dark snap-start snap-always"
      style={{ paddingTop: 'clamp(24px, 4vw, 48px)' }}
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8 text-left">
            <div className="space-y-4">
              <h1 className="text-display select-none text-left">
                <span className="block overflow-hidden pb-1">
                  {firstName.split("").map((char, i) => (
                    <span
                      key={`first-${i}`}
                      className="inline-block opacity-0 animate-reveal-blur"
                      style={{ animationDelay: `${i * 0.08}s`, color: '#F8FAFC' }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="block text-[#2563EB]">
                  {lastName.split("").map((char, i) => (
                    <span
                      key={`last-${i}`}
                      className="inline-block opacity-0 animate-reveal-blur"
                      style={{ animationDelay: `${(firstName.length + i) * 0.08}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </h1>
              
              <h3 
                className="text-body text-[#F8FAFC]/80 opacity-0 animate-fade-in"
                style={{ animationDelay: `${paragraphStartDelay}s` }}
              >
                Architecting Logic Into Art
              </h3>
            </div>
            
            <div className="space-y-4 overflow-hidden">
              <div className="text-[#94A3B8] text-body max-w-2xl">
                <span 
                  className="block opacity-0 animate-fade-in"
                  style={{ animationDelay: `${paragraphStartDelay + 0.15}s` }}
                >
                  Every great product starts with a single commit.
                </span>
                <span 
                  className="block opacity-0 animate-fade-in"
                  style={{ animationDelay: `${paragraphStartDelay + 0.3}s` }}
                >
                  I bridge the gap between high-performance DevOps infrastructure and high-fidelity UI/UX design.
                </span>
                <span className="block mt-4">
                  <span 
                    className="inline-block text-[#2563EB] font-bold tracking-tight opacity-0 animate-fade-in"
                    style={{ animationDelay: `${paragraphStartDelay + 0.45}s` }}
                  >
                    Architecting Reliability With Aesthetic Precision.
                  </span>
                </span>
              </div>
            </div>

            <div 
              className="flex flex-col items-start gap-8 pt-4 opacity-0 animate-fade-in"
              style={{ animationDelay: `${paragraphStartDelay + 0.6}s` }}
            >
              <div className="flex flex-wrap gap-4">
                <RippleButton className="group h-[58px] min-w-[220px] rounded-[45px] border-2 border-[#333] bg-[#111] px-12 flex items-center justify-center outline-none cursor-pointer">
                  <span className="relative z-20 flex items-center gap-3 text-button text-white transition-colors duration-400 group-hover:text-[#111]">
                    View Archive
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </span>
                </RippleButton>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-10">
                {[
                  { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: <Github className="w-5 h-5" />, href: "https://github.com", label: "GitHub" },
                  { icon: <Mail className="w-5 h-5" />, href: "mailto:khushmakwana1980@gmail.com", label: "Email" },
                  { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com", label: "Instagram" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#94A3B8] hover:text-[#2563EB] transition-all duration-300 hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pipeline Animation Visual */}
          <div 
            className="lg:col-span-5 relative hidden lg:flex items-center justify-center opacity-0 animate-fade-in"
            style={{ animationDelay: `${paragraphStartDelay}s` }}
          >
            <PipelineAnimation />
          </div>

        </div>
      </div>

      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #F8FAFC 1px, transparent 1px),
            linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)
          `,
          backgroundSize: '200px 200px' 
        }}
      ></div>
    </section>
  );
};
