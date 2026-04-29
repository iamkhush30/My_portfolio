"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  duration: string;
  logo: string; // Background color or icon for the logo
  imageId: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "CogniSync x SAY Design",
    duration: "Mar 2025 - Present",
    logo: "bg-[#0F172A]",
    imageId: "project-1",
  },
  {
    id: "02",
    title: "SAY Design",
    duration: "Dec 2023 - Present",
    logo: "bg-slate-700",
    imageId: "project-2",
  },
  {
    id: "03",
    title: "Precision Studio",
    duration: "Jan 2023 - Dec 2023",
    logo: "bg-slate-500",
    imageId: "project-5",
  },
  {
    id: "04",
    title: "Nexus Cloud",
    duration: "Jun 2022 - Dec 2022",
    logo: "bg-slate-900",
    imageId: "project-4",
  }
];

const ProjectFolder = ({ project }: { project: Project }) => {
  const image = PlaceHolderImages.find(img => img.id === project.imageId);

  return (
    <div className="flex flex-col items-center group cursor-pointer w-full max-w-[320px] mx-auto">
      {/* Folder Container */}
      <div className="relative w-full aspect-[4/3] mb-6">
        {/* Folder Tab (Back) */}
        <div className="absolute top-0 left-0 w-24 h-8 bg-slate-300 rounded-t-xl -translate-y-2"></div>
        
        {/* Folder Back Flap */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl shadow-inner border border-slate-400/20"></div>
        
        {/* Popping Image Content */}
        <div className="absolute inset-x-3 bottom-6 top-2 transition-all duration-500 ease-out transform translate-y-2 opacity-40 group-hover:-translate-y-12 group-hover:opacity-100 group-hover:rotate-1 z-0">
          <div className="relative w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-200">
            {image && (
              <Image 
                src={image.imageUrl} 
                alt={image.description}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                data-ai-hint={image.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Folder Front Flap */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/60 z-10 flex items-center justify-center transition-transform duration-500 group-hover:translate-y-1">
          {/* Logo in the middle */}
          <div className={cn(
            "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-700 group-hover:scale-90",
            project.logo
          )}>
             {/* Custom SVG Logo style */}
             <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10L30 30" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                <path d="M30 10L10 30" stroke="white" strokeWidth="6" strokeLinecap="round" opacity="0.5"/>
             </svg>
          </div>
          
          {/* Subtle Folder Lip Shadow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-white/50 rounded-t-2xl"></div>
        </div>
      </div>

      {/* Project Details Below */}
      <div className="text-center space-y-1">
        <h3 className="text-body text-slate-700 group-hover:text-[#0F172A] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm font-code text-slate-400 tracking-wider uppercase">
          {project.duration}
        </p>
      </div>
    </div>
  );
};

export const WorkGallery = () => {
  return (
    <section id="work-gallery" className="relative z-20 py-32 bg-[#F5F7FA]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-24 text-center">
          <span className="text-[#0F172A]/40 font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Selected Case Studies</span>
          <h2 className="text-heading text-[#0F172A]">
            My Vault
          </h2>
          <div className="w-16 h-1 bg-[#0F172A] mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {projects.map((project) => (
            <ProjectFolder key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
