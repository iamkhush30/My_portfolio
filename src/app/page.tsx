import { Header } from '@/features/portfolio/components/header';
import { Hero } from '@/features/portfolio/components/hero';
import { ProjectGrid } from '@/features/portfolio/components/project-grid';
import { PotentialSection } from '@/features/portfolio/components/potential-section';
import { AboutEducation } from '@/features/portfolio/components/about-education';
import { SkillsParallax } from '@/features/portfolio/components/skills-parallax';
import { ContactCTA } from '@/features/portfolio/components/contact-cta';
import { Footer } from '@/features/portfolio/components/footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero is fixed — sits behind content scroll */}
      <Hero />

      {/*
        FIX: Split the old single div (z-10 + paddingTop:100vh) into two:

        1. A pointer-events-none spacer — pushes scroll down by 100vh
           without creating a stacking context that blocks the hero handle.

        2. The real content wrapper — z-10, pointer-events normal,
           scroll and all interactions work exactly as before.

        Root cause: the original single div had both z-10 (stacking context)
        AND paddingTop:100vh, meaning it physically covered the full hero
        viewport with an invisible blocking layer, swallowing every pointer
        event before they reached the slider handle.
      */}

      {/* SPACER: pushes scroll, never blocks pointer events */}
      <div
        style={{ height: '100vh', pointerEvents: 'none' }}
        aria-hidden="true"
      />

      {/* CONTENT: everything below the hero, scroll intact */}
      <div className="relative z-10">
        <AboutEducation />

        <section
          id="lab"
          className="relative z-20 bg-[#F5F5F7] section-light overflow-visible snap-start snap-always"
        >
          <SkillsParallax />
          <PotentialSection />
        </section>

        <ProjectGrid />
        <ContactCTA />
        <Footer />
      </div>
    </main>
  );
}