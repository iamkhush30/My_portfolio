import { MetadataRoute } from 'next';
import { PROJECTS } from '@/data/projects';
import { siteConfig } from '@/shared/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];

  PROJECTS.forEach((project) => {
    routes.push({
      url: `${baseUrl}/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  return routes;
}
