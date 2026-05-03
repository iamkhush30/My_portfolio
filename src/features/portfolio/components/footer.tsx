"use client";

import React from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Vault", href: "#vault" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Mail", href: "mailto:hello@khushmakwana.com" },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative bg-[var(--dark-bg)] border-t border-[var(--dark-border)] overflow-hidden min-h-[70vh]"
      aria-label="Site footer"
    >
      {/* ── Main Grid: 3 columns on desktop ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr]"
        style={{ borderBottom: "1px solid var(--footer-line)" }}
      >
        {/* Col 1 — Brand */}
        <div className="footer-box">
          <p className="text-heading text-[var(--dark-text)]">
            Let's Connect
          </p>
          <p className="text-card-body text-[var(--dark-text-muted)] mt-[var(--space-md)] max-w-[260px]">
            Architecting logic into art — bridging DevOps infrastructure with human-centered design.
          </p>
        </div>

        {/* Col 2 — Navigation */}
        <div className="footer-box">
          <p className="text-label text-[var(--dark-text-muted)] mb-[var(--space-lg)]">
            Navigation
          </p>
          <nav className="flex flex-col gap-[var(--space-sm)]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-nav text-[var(--dark-text)] opacity-70 hover:opacity-100 hover:text-[hsl(var(--primary))] transition-all duration-[var(--duration-fast)] w-fit relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[hsl(var(--primary))] after:transition-all after:duration-[var(--duration-base)] group flex items-center justify-between gap-2"
              >
                <span>{link.label}</span>
                <span className="arrow-icon transition-transform duration-[var(--duration-base)] group-hover:rotate-45 inline-block">↗</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Col 3 — Connect */}
        <div className="footer-box" style={{ borderRight: "none" }}>
          <p className="text-label text-[var(--dark-text-muted)] mb-[var(--space-lg)]">
            Connect
          </p>
          <div className="flex flex-col gap-[var(--space-sm)]">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-nav text-[var(--dark-text)] opacity-70 hover:opacity-100 hover:text-[hsl(var(--primary))] transition-all duration-[var(--duration-fast)] w-fit relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[hsl(var(--primary))] after:transition-all after:duration-[var(--duration-base)] group flex items-center justify-between gap-2"
              >
                <span>{link.label}</span>
                <span className="arrow-icon transition-transform duration-[var(--duration-base)] group-hover:rotate-45 inline-block">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="footer-box" style={{ borderBottom: "none" }}>
          <p className="text-label text-[var(--dark-text-muted)]">
            © {year} Khush Makwana. All rights reserved.
          </p>
        </div>
        <div
          className="footer-box"
          style={{ borderRight: "none", borderBottom: "none" }}
        >
          <p className="text-label text-[var(--dark-text-muted)] md:text-right">
            Built with Next.js · Deployed on Firebase
          </p>
        </div>
      </div>

      {/* ── Ambient glow (decoration) ── */}
      <div
        className="pointer-events-none absolute top-0 right-0"
        style={{
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(37, 99, 235, 0.4) 0%, rgba(37, 99, 235, 0.15) 40%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.6,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0"
        style={{
          width: "500px",
          height: "300px",
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(37, 99, 235, 0.3) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 80%)",
          filter: "blur(70px)",
          opacity: 0.5,
        }}
        aria-hidden
      />
    </footer>
  );
};