
"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ContactCTA = () => {
  return (
    <a
      href="mailto:khushmakwana1980@gmail.com"
      className="group relative z-20 flex flex-col items-center justify-center transition-all duration-700 px-6 w-full gap-3 bg-secondary border-t border-border !py-4 section-light snap-start snap-always overflow-hidden"
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-in-out origin-left -z-10"></div>

      {/* Label/Overline */}
      <span className="text-label group-hover:text-primary transition-colors duration-500">
        Draft An Email
      </span>

      {/* Main Narrative Heading & Icon - Merged into a single horizontal block for flat DOM */}
      <h2 className="text-heading text-foreground group-hover:text-primary transition-colors duration-500 text-center flex items-center justify-center gap-3 md:gap-6 max-w-[1400px]">
        Let's Cook Up Conversation

        {/* Interactive Icon Component - Now a direct child of h2 to avoid parent div wrappers */}
        <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 shrink-0">
          <div className="relative overflow-hidden w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
            <ArrowRight className="w-full h-full text-foreground group-hover:text-primary transition-all transform -translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500 ease-out" />
            <ArrowRight className="absolute w-full h-full text-foreground group-hover:text-primary transition-all transform group-hover:translate-x-12 group-hover:opacity-0 duration-500 ease-in" />
          </div>
        </div>
      </h2>

      {/* Architectural Bottom Line Animation */}
      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-primary group-hover:w-full transition-all duration-1000 ease-in-out origin-left"></div>
    </a>
  );
};
