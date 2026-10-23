"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { siteConfig } from '@/shared/lib/site-config';

interface BreadcrumbProps {
  projectTitle: string;
  projectSlug: string;
}

export const Breadcrumbs: React.FC<BreadcrumbProps> = ({ projectTitle, projectSlug }) => {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'My Vault',
        item: `${baseUrl}/#vault`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: projectTitle,
        item: `${baseUrl}/${projectSlug}`,
      },
    ],
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8 sm:mb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-primary transition-colors"
        aria-label="Home"
      >
        <Home size={13} aria-hidden="true" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      <ChevronRight size={12} className="opacity-40" aria-hidden="true" />
      <Link href="/#vault" className="hover:text-primary transition-colors">
        My Vault
      </Link>
      <ChevronRight size={12} className="opacity-40" aria-hidden="true" />
      <span className="text-foreground font-medium truncate max-w-[130px] sm:max-w-none" aria-current="page">
        {projectTitle}
      </span>
    </nav>
  );
};
