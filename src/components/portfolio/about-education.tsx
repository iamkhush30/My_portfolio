
"use client";

import React, { useRef, useState, useEffect } from 'react';

export const AboutEducation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const fullText = "I am Khush Makwana, bridging the gap between infrastructure efficiency and human-centered design. My journey began with a curiosity about how systems work, which evolved into a career dedicated to transforming complex technical requirements into seamless, beautiful experiences. I believe true magic happens when backend robustness meets frontend beauty, ensuring every project is as robust as it is elegant. I architect scalable systems that don't just function—they inspire.";

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startTrigger = windowHeight;
      const endTrigger = 0;
      const currentPos = rect.top;
      
      const progress = Math.max(0, Math.min(1, (startTrigger - currentPos) / (startTrigger - endTrigger)));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalChars = fullText.length;
  const highlightedChars = Math.floor(scrollProgress * totalChars);

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative z-20 bg-secondary min-h-screen flex items-center shadow-[0_-40px_100px_-20px_rgba(15,23,42,0.1)] border-t border-border overflow-hidden section-light snap-start snap-always"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-20 items-start w-full">
          
          {/* Left Column: Heading & Meta */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex flex-col">
              <h2 className="text-heading text-foreground">
                About
              </h2>
              <div className="w-16 h-1 bg-primary mt-8"></div>
            </div>

            <div className="mt-16 lg:mt-24 flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <span className="text-label text-primary">Focus</span>
                <span className="text-card-title text-foreground">Hybrid Architecture</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-label text-primary">Philosophy</span>
                <span className="text-card-title text-foreground">Logic Meets Art</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-8 flex items-center">
            <div className="max-w-4xl">
              <div className="text-card-title text-foreground leading-tight text-left tracking-tight">
                {fullText.split("").map((char, index) => (
                  <span 
                    key={index}
                    className="transition-colors duration-200"
                    style={{ 
                      color: index < highlightedChars ? 'hsl(var(--foreground))' : 'hsl(var(--border))' 
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px' 
        }}
      ></div>
    </section>
  );
};
