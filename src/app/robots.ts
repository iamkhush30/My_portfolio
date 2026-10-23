import { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
