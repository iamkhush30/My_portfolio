
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Layout, Palette, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillItem {
  title: string;
  bgTitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const skills: SkillItem[] = [
  {
    title: "UI/UX Design",
    bgTitle: "Design",
    description: "Crafting intuitive digital journeys where every pixel serves a purpose. I focus on behavioral science and aesthetic precision to create interfaces that users don't just use—they feel.",
    icon: <Palette className="w-10 h-10" />,
    tags: ["User Research", "User Flow Design", "UI Design", "Prototyping"]
  },
  {
    title: "Web Designing",
    bgTitle: "Web",
    description: "Building responsive, high-performance web experiences that blend art with technical excellence. My approach ensures your brand's digital presence is as robust as it is beautiful.",
    icon: <Layout className="w-10 h-10" />,
    tags: ["Next.js", "Tailwind CSS", "Motion", "A11y"]
  },
  {
    title: "DevOps Engineering",
    bgTitle: "Systems",
    description: "Architecting the invisible engines that power modern applications. I specialize in CI/CD pipelines and cloud infrastructure to ensure seamless, scalable, and secure deployments.",
    icon: <Server className="w-10 h-10" />,
    tags: ["GitHub", "Docker", "Nexus", "Jenkins"]
  }
];

const SkillCard = ({ 
  skill, 
  index, 
  isEven, 
  isVisible,
  cardRef
}: { 
  skill: SkillItem; 
  index: number; 
  isEven: boolean; 
  isVisible: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduced intensity: multiplier changed from 10 to 4 to match project pages
    const tiltX = ((y - centerY) / centerY) * -4;
    const tiltY = ((x - centerX) / centerX) * 4;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      data-index={index}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full lg:w-[55%] min-h-[400px] p-8 md:p-12 bg-secondary backdrop-blur-md border border-border rounded-none transition-all duration-700 group opacity-0 flex flex-col overflow-hidden hover:border-primary/50",
        isVisible && "animate-in fade-in slide-in-from-bottom-24 fill-mode-both opacity-100",
        isEven ? "lg:mr-12 -rotate-1" : "lg:ml-12 rotate-1"
      )}
      style={{ 
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        // Reduced shadow intensity: multipliers changed to 0.8, blur reduced to 40px
        boxShadow: tilt.x === 0 && tilt.y === 0 
          ? '0 10px 30px -5px rgba(0,0,0,0.05)' 
          : `${-tilt.y * 0.8}px ${tilt.x * 0.8}px 40px -10px rgba(0,0,0,0.15)`,
        transition: tilt.x === 0 && tilt.y === 0 
          ? 'all 0.7s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.7s ease' 
          : 'transform 0.1s linear, box-shadow 0.1s linear, border-color 0.3s ease, opacity 0.7s cubic-bezier(0.2, 0, 0.2, 1)',
        transformStyle: 'preserve-3d'
      }}
    >
      <div 
        className="relative z-10 pointer-events-none w-full h-full flex flex-col flex-grow"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div className="flex items-start justify-between mb-8">
          <div className="text-primary">
            {skill.icon}
          </div>
        </div>

        <h3 className="text-card-title mb-4">
          {skill.title}
        </h3>
        
        <p className="text-body mb-8 max-w-2xl flex-grow">
          {skill.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {skill.tags.map((tag, tagIdx) => (
            <span 
              key={tagIdx}
              className="px-4 py-1.5 bg-primary/5 text-primary text-label border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SkillsParallax = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const sectionProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, sectionProgress));
      
      setScrollOffset(clampedProgress * 250 - 125); 
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current) {
              setHeaderVisible(true);
              observer.unobserve(entry.target);
            } else {
              const index = Number(entry.target.getAttribute('data-index'));
              setVisibleIndices((prev) => new Set(prev).add(index));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -5% 0px'
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative z-10 py-12"
      id="skills"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div 
          ref={headerRef}
          className={cn(
            "mb-16 md:mb-24 space-y-4 opacity-0 transition-opacity duration-1000",
            headerVisible && "animate-fade-in opacity-100"
          )}
        >
          <span className="text-label text-primary">Capabilities</span>
          <h2 className="text-heading text-foreground">
            My Lab
          </h2>
          <div className="w-16 h-1.5 bg-primary"></div>
        </div>

        <div className="space-y-12 md:space-y-24">
          {skills.map((skill, index) => {
            const isEven = index % 2 === 0;
            const itemOffset = scrollOffset * (1 + index * 0.2);
            const isCardVisible = visibleIndices.has(index);

            return (
              <div 
                key={index} 
                className={cn(
                  "relative flex flex-col items-center",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                <div 
                  className={cn(
                    "absolute -z-10 select-none pointer-events-none opacity-[0.03] font-heading font-black leading-none transition-transform duration-500 ease-out will-change-transform text-7xl md:text-9xl lg:text-[12rem] text-foreground",
                    isEven ? "left-[10%] lg:left-[55%]" : "right-[10%] lg:right-[55%]"
                  )}
                  style={{ transform: `translateY(${itemOffset}px)` }}
                >
                  {skill.bgTitle}
                </div>

                <SkillCard 
                  skill={skill}
                  index={index}
                  isEven={isEven}
                  isVisible={isCardVisible}
                  cardRef={(el) => { cardRefs.current[index] = el; }}
                />

                <div className="hidden lg:block lg:w-2/5"></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent -z-20"></div>
    </div>
  );
};
