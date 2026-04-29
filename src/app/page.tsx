import { Header } from '@/components/portfolio/header';
import { Hero } from '@/components/portfolio/hero';
import { ProjectGrid } from '@/components/portfolio/project-grid';
import { PotentialSection } from '@/components/portfolio/potential-section';
import { AboutEducation } from '@/components/portfolio/about-education';
import { SkillsParallax } from '@/components/portfolio/skills-parallax';
import { ContactCTA } from '@/components/portfolio/contact-cta';
import { Footer } from '@/components/portfolio/footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Header />
      {/* Hero is sticky top-0 and z-0 */}
      <Hero />
      
      {/* Subsequent sections have higher z-index to overlap the Hero */}
      <div className="relative z-10">
        <AboutEducation />
        
        {/* Unified Capabilities Section to prevent clipping of rotated cards and shadows */}
        <section id="capabilities" className="relative z-20 bg-[#F8FAFC] section-light overflow-visible snap-start snap-always">
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
