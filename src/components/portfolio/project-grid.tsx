"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { RippleButton } from '@/components/ui/ripple-button';
import LayeredPanelReveal from '@/components/Animations&Motion/ScrollReveals/tsx/CinematicScroll';

interface Project {
  id: string;
  title: string;
  imageId: string;
  bgColor: string;
  href: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Global Cloud Orchestration",
    imageId: "project-1",
    bgColor: "bg-background",
    href: "/work/global-cloud-orchestration"
  },
  {
    id: "02",
    title: "Online Electronics Store",
    imageId: "project-2",
    bgColor: "bg-background",
    href: "/work/online-electronics-store"
  },
  {
    id: "03",
    title: "CI/CD Pipeline Analytics",
    imageId: "project-4",
    bgColor: "bg-background",
    href: "/work/cicd-pipeline-analytics"
  }
];

const ProjectCard = ({
  project,
  index,
  isDesktop,
  scrollProgress
}: {
  project: Project;
  index: number;
  isDesktop: boolean;
  scrollProgress: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const image = PlaceHolderImages.find(img => img.id === project.imageId);
  const isMiddle = index === 1;

  const baseOffset = isDesktop ? (isMiddle ? 20 : 150) : 0;
  const scrollShift = isDesktop ? (isMiddle ? 0 : (scrollProgress * -140)) : 0;
  const totalY = baseOffset + scrollShift;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -12;
    const tiltY = ((x - centerX) / centerX) * 12;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      className={cn(
        "transition-all duration-1000 ease-out will-change-transform",
        isVisible
          ? "opacity-100 translate-y-0"
          : (isMiddle ? "opacity-0" : "opacity-0 translate-y-24")
      )}
    >
      <div
        className="will-change-transform"
        style={{ transform: `translateY(${totalY}px)` }}
      >
        <RippleButton
          asChild
          className="block group relative w-full text-left h-auto p-0 bg-transparent border-0 hover:bg-transparent focus-visible:bg-transparent"
        >
          <Link
            href={project.href}
            className="block group relative w-full text-left"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              boxShadow: tilt.x === 0 && tilt.y === 0
                ? '0 30px 60px -12px rgba(15,23,42,0.15)'
                : `${-tilt.y * 4.5}px ${tilt.x * 4.5}px 100px -20px rgba(0,0,0,0.5)`,
              transition: tilt.x === 0 && tilt.y === 0
                ? 'transform 0.7s ease-out, box-shadow 0.7s ease'
                : 'transform 0.1s linear, box-shadow 0.1s linear',
              transformStyle: 'preserve-3d'
            }}
          >
            <div
              className={cn(
                "relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-none flex flex-col p-8 md:p-10 border border-border transition-all duration-300 ease-out hover:border-primary/50",
                project.bgColor
              )}
              style={{ transform: 'translateZ(0)' }}
            >
              {image && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover transition-all duration-700 opacity-60 group-hover:scale-110"
                    data-ai-hint={image.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                </div>
              )}
              <div
                className="relative z-20 flex flex-col h-full pointer-events-none"
                style={{ transform: 'translateZ(50px)' }}
              >
                <div className="space-y-4">
                  <h3 className="text-card-title text-primary-foreground max-w-[240px] drop-shadow-xl">
                    {project.title}
                  </h3>
                </div>
                <div className="mt-auto">
                  <span className="text-label text-primary-foreground/60 border-b border-primary-foreground/20 pb-2 transition-all duration-300 group-hover:text-primary-foreground group-hover:border-primary group-hover:pl-2">
                    Access Archive
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </RippleButton>
      </div>
    </div>
  );
};

export const ProjectGrid = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (headerRef.current) headerObserver.observe(headerRef.current);

    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    handleResize();

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startTrigger = rect.top - windowHeight;
      const endTrigger = rect.bottom;
      const totalRange = endTrigger - startTrigger;
      const currentPos = -startTrigger;
      const progress = Math.max(0, Math.min(1, currentPos / totalRange));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      headerObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Header — scrolls normally above the pinned section */}
      <div
        id="work"
        ref={headerRef}
        className={cn(
          "relative z-20 bg-background px-6 md:px-12 pt-24 pb-10 opacity-0 transition-opacity duration-1000",
          headerVisible && "animate-fade-in opacity-100"
        )}
      >
        <div className="container mx-auto">
          <span className="text-label text-primary">Selected Archive</span>
          <h2 className="text-heading text-foreground mt-4">My Vault</h2>
        </div>
      </div>

      {/* 
        Cinematic section — full width, no container, no padding.
        GSAP pins stickyRef (inside LayeredPanelReveal) to "top top",
        meaning it locks the moment this div's top edge hits the viewport top.
        The card inside is centered via items-center so it is already
        visually centered when the pin kicks in.
      */}
      <div
        ref={sectionRef}
        className="relative z-20 w-full"
      >
        <LayeredPanelReveal />
      </div>
    </>
  );
};