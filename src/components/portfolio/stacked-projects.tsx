"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageId: string;
  color: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Helios",
    description: "Helios is a free Framer template designed for crypto infrastructure, DeFi platforms, and developer-first products that need a bold, technical, and credible web presence.",
    tags: ["Web Design", "UI Design", "Framer", "Figma"],
    imageId: "project-1",
    color: "bg-white"
  },
  {
    id: "02",
    title: "Precision Dashboard",
    description: "A sophisticated cloud orchestration platform that visualizes complex CI/CD pipelines through a minimalist, high-performance interface designed for scale.",
    tags: ["DevOps", "Data Viz", "Next.js", "Tailwind"],
    imageId: "project-2",
    color: "bg-[#F8FAFC]"
  },
  {
    id: "03",
    title: "Nexus System",
    description: "A comprehensive design system built for global scale, focusing on behavioral science and aesthetic precision to create unified digital experiences.",
    tags: ["Design System", "A11y", "React", "Storybook"],
    imageId: "project-5",
    color: "bg-[#F1F5F9]"
  }
];

export const StackedProjects = () => {
  return (
    <section id="work" className="relative z-20 bg-[#FFFFFF] border-t">
      {/* Section Header */}
      <div className="container mx-auto px-6 pt-12 pb-16">
        <span className="text-[#0F172A]/30 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Selected Archive</span>
        <h2 className="text-heading text-[#0F172A]">
          Digital Works
        </h2>
      </div>

      <div className="flex flex-col items-center pb-[30vh]">
        {projects.map((project, index) => {
          const image = PlaceHolderImages.find(img => img.id === project.imageId);
          
          // Staggered top offset to keep headings visible
          const stickyTop = 100 + (index * 64);
          
          return (
            <div 
              key={project.id}
              className="sticky w-full h-[75vh] flex items-start justify-center px-4 md:px-8 mb-[8vh]"
              style={{ 
                zIndex: index + 1,
                top: `${stickyTop}px`,
              }}
            >
              <div className={cn(
                "relative w-full max-w-[1100px] h-full rounded-3xl overflow-hidden shadow-[0_-20px_80px_rgba(0,0,0,0.06)] border border-slate-200 flex flex-col justify-start p-8 md:p-12 lg:p-14",
                project.color
              )}>
                {/* Content Layout */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start flex-grow overflow-hidden">
                  
                  {/* Left Column: Title, Description & Tags */}
                  <div className="lg:w-1/2 space-y-4 flex flex-col justify-start">
                    <div>
                      <h3 className="text-card-title text-[#0F172A] mb-3">
                        {project.title}
                      </h3>
                      <p className="text-[#64748B] font-body text-lg md:text-xl leading-relaxed max-w-xl">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-5 gap-y-1 pt-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-[#0F172A] font-body text-body font-semibold tracking-tight">
                          {tag}{i < project.tags.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Project Mockup */}
                  <div className="lg:w-1/2 relative h-[250px] lg:h-full w-full group">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg transition-transform duration-700 group-hover:scale-[1.01] bg-slate-50">
                      {image && (
                        <Image 
                          src={image.imageUrl} 
                          alt={image.description}
                          fill
                          className="object-cover transition-all duration-700 grayscale hover:grayscale-0"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                      
                      {/* Architectural glow overlay */}
                      <div className="absolute -inset-20 bg-primary/5 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>
                    </div>
                  </div>

                </div>

                {/* Subtle Stack Indicator (ID) */}
                <div className="absolute bottom-8 right-8 pointer-events-none">
                  <span className="text-[#0F172A]/5 font-mono text-7xl font-bold select-none">{project.id}</span>
                </div>
              </div>
            </div>
          );
        })}
        {/* Spacer to ensure the last card can be fully scrolled through while sticky */}
        <div className="h-[30vh] w-full pointer-events-none" aria-hidden="true" />
      </div>
    </section>
  );
};
