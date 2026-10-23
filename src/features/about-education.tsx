"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AboutEducation: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const fullText = `I'm Khush Makwana — a Cloud & DevOps Engineer and UI/UX Designer. I architect automated CI/CD pipelines using GitLab, Jenkins, Docker, and Kubernetes, delivering software from code commit to containerized registry without manual handoffs. On AWS, I provision modular infrastructure with Terraform, multi-AZ networking, and proactive CloudWatch telemetry. On the design side, I engineer high-density dashboards, wireframes, and design systems in Figma. I treat both disciplines as one: engineering makes my interfaces buildable, and design makes my infrastructure intuitive.`;

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
      className="relative z-20 min-h-screen md:h-screen flex items-start pt-[9vh] sm:pt-[10vh] md:pt-[12vh] overflow-hidden bg-white border-t border-border shadow-[0_-40px_100px_-20px_rgba(15,23,42,0.1)]"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-[var(--space)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 sm:gap-y-10 lg:gap-x-20 items-start w-full">
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex flex-col">
              <span className="text-label text-primary mb-2">Core Identity</span>
              <h2 className="text-heading text-foreground tracking-tighter">About</h2>
            </div>
            <div className="mt-8 sm:mt-10 lg:mt-24 flex flex-col gap-8 sm:gap-10">
              <div className="flex flex-col gap-2">
                <span className="text-label text-primary">PRIMARY FOCUS</span>
                <span className="text-body text-foreground leading-[1.45]">
                  Cloud Infrastructure & DevOps Pipelines
                  <br />
                  <span className="text-muted-foreground text-sm">Terraform · Docker · Kubernetes · AWS</span>
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex items-center">
            <div className="max-w-4xl">
              {/* Screen reader / crawler plain text */}
              <p
                ref={textRef}
                aria-label={fullText}
                className="font-body font-medium text-[clamp(16px,4.5vw,28px)] text-black leading-[1.4] text-left tracking-tight flex flex-wrap max-w-none sm:max-w-5xl"
              >
                <span className="sr-only">{fullText}</span>
                <span aria-hidden="true" className="flex flex-wrap">
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
                        {(() => { letterCount++; return null; })()}
                      </span>
                    );
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

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
