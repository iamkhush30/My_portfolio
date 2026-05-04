"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AboutEducation: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const fullText = `I'm Khush Makwana — a Computer Science student who works 
across DevOps engineering and UI/UX design. I've built 
CI/CD pipelines using GitLab, Jenkins, Docker, and Kubernetes, 
taking projects from code commit to containerized deployment 
without manual steps. On the design side, I've designed 50+ 
screens for a different projects, created visual content 
that contributed to significant engagement growth for a 
financial services client, and guided university students 
through Figma and interface design fundamentals. I don't 
treat these as separate careers — the engineering makes my 
designs more buildable, and the design makes my systems 
more considered.`;

  const words = fullText.split(" ");
  const totalLetters = fullText.length;

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "start 0.24"]
  });

  let letterCount = 0;

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative z-20 h-screen flex items-start pt-[12vh] overflow-hidden bg-white border-t border-border shadow-[0_-40px_100px_-20px_rgba(15,23,42,0.1)]"
    >
      <div className="container mx-auto px-6 md:px-12 py-[var(--space)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-20 items-start w-full">
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex flex-col">
              <h2 className="text-heading text-foreground tracking-tighter">About</h2>
              <div className="w-16 h-1 bg-primary mt-6" />
            </div>
            <div className="mt-16 lg:mt-24 flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <span className="text-label text-primary">CURRENT FOCUS</span>
                <span className="text-body text-foreground leading-[1.45]">
                  Learning Kubernetes orchestration
                  <br />
                  and Terraform infrastructure-as-code
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex items-center">
            <div className="max-w-4xl">
              <p
                ref={textRef}
                className="font-body font-medium text-[clamp(18px,2.5vw,28px)] text-black leading-[1.4] text-left tracking-tight flex flex-wrap"
              >
                {words.map((word, wordIndex) => {
                  return (
                    <span key={wordIndex} className="inline-block mr-[0.25em] whitespace-nowrap">
                      {word.split("").map((letter, letterIndex) => {
                        const start = letterCount / totalLetters;
                        const end = start + (1 / totalLetters);
                        letterCount++;
                        return (
                          <Letter key={letterIndex} progress={scrollYProgress} range={[start, end]}>
                            {letter}
                          </Letter>
                        );
                      })}
                      {/* Manually increment for the space between words */}
                      {(() => { letterCount++; return null; })()}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Optional subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </section>
  );
};

const Letter = ({ children, progress, range }: { children: string; progress: any; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="text-black inline-block">
      {children}
    </motion.span>
  );
};