import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/data/projects';
import { DevOpsProjectTemplate } from '@/features/case-study/devops-template';
import { siteConfig } from '@/shared/lib/site-config';

const SLUG = 'aws-terraform-infrastructure';

export async function generateMetadata(): Promise<Metadata> {
  const project = getProjectBySlug(SLUG);
  if (!project) return {};

  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const pageUrl = `${baseUrl}/${SLUG}`;
  const ogImageUrl = `/api/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.subtitle)}&category=${encodeURIComponent(project.category)}`;

  return {
    title: project.seoTitle,
    description: project.seoDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: project.seoTitle,
      description: project.seoDescription,
      url: pageUrl,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.seoTitle,
      description: project.seoDescription,
      images: [ogImageUrl],
    },
  };
}

export default function AwsTerraformInfraPage() {
  const project = getProjectBySlug(SLUG);
  if (!project) notFound();

  return <DevOpsProjectTemplate project={project} />;
}
