import type { Metadata } from 'next';
import { Header } from '@/features/header';
import { Hero } from '@/features/hero';
import { ProjectGrid } from '@/features/project-grid';
import { PotentialSection } from '@/features/potential-section';
import { AboutEducation } from '@/features/about-education';
import { SkillsParallax } from '@/features/skills-parallax';
import { ContactCTA } from '@/features/contact-cta';
import { Footer } from '@/features/footer';
import { siteConfig } from '@/shared/lib/site-config';

export const metadata: Metadata = {
  title: 'Khush Makwana | Cloud & DevOps Engineer, UI/UX Designer',
  description:
    'Explore the portfolio of Khush Makwana, featuring automated CI/CD pipelines, modular AWS cloud infrastructure, and human-centered UI/UX design systems.',
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: 'Khush Makwana | Cloud & DevOps Engineer, UI/UX Designer',
    description:
      'Explore the portfolio of Khush Makwana, featuring automated CI/CD pipelines, modular AWS cloud infrastructure, and human-centered UI/UX design systems.',
    url: siteConfig.url,
    siteName: 'Khush Makwana Portfolio',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Khush%20Makwana&subtitle=Cloud%20%26%20DevOps%20Engineer%20%C2%B7%20UI%2FUX%20Designer&category=Portfolio',
        width: 1200,
        height: 630,
        alt: 'Khush Makwana | Cloud & DevOps Engineer, UI/UX Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khush Makwana | Cloud & DevOps Engineer, UI/UX Designer',
    description:
      'Explore the portfolio of Khush Makwana, featuring automated CI/CD pipelines, modular AWS cloud infrastructure, and human-centered UI/UX design systems.',
    images: [
      '/api/og?title=Khush%20Makwana&subtitle=Cloud%20%26%20DevOps%20Engineer%20%C2%B7%20UI%2FUX%20Designer&category=Portfolio',
    ],
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero is fixed — sits behind content scroll */}
      <Hero />

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