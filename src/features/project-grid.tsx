"use client";

import React from 'react';
import LayeredPanelReveal from './cinematic-scroll/page';

export const ProjectGrid = () => {
  return (
    <section id="vault" className="relative z-20 w-full bg-[#F5F5F7] overflow-hidden">
      <LayeredPanelReveal />
    </section>
  );
};
