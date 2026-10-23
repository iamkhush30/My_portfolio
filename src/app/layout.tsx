import type { Metadata } from 'next';
import { Space_Grotesk, DM_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/features/smooth-scroll-provider';
import { siteConfig } from '@/shared/lib/site-config';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khushmakwana.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Khush Makwana | Cloud & DevOps Engineer, UI/UX Designer',
    template: '%s',
  },
  description:
    'Portfolio of Khush Makwana — Cloud & DevOps Engineer and UI/UX Designer. Specializing in CI/CD pipelines, container orchestration, AWS infrastructure, and intuitive interface design.',
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Khush Makwana', url: siteUrl }],
  creator: 'Khush Makwana',
  publisher: 'Khush Makwana',
  icons: {
    icon: [
      { url: '/favicon.png?v=1', type: 'image/png', sizes: '256x256' },
      { url: '/worldicon.png', type: 'image/png', sizes: 'any' },
    ],
    apple: '/favicon.png?v=1',
    shortcut: '/favicon.png?v=1',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Khush Makwana | Cloud & DevOps Engineer, UI/UX Designer',
    description:
      'Portfolio of Khush Makwana — Cloud & DevOps Engineer and UI/UX Designer. Specializing in CI/CD pipelines, container orchestration, AWS infrastructure, and intuitive interface design.',
    siteName: 'Khush Makwana Portfolio',
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
      'Portfolio of Khush Makwana — Cloud & DevOps Engineer and UI/UX Designer.',
    creator: '@iamkhush30',
    images: [
      '/api/og?title=Khush%20Makwana&subtitle=Cloud%20%26%20DevOps%20Engineer%20%C2%B7%20UI%2FUX%20Designer&category=Portfolio',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: 'Cloud & DevOps Engineer, UI/UX Designer',
    url: siteUrl,
    email: 'khushmakwana1980@gmail.com',
    sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
    knowsAbout: [
      'Cloud Architecture',
      'DevOps Engineering',
      'CI/CD Pipelines',
      'Docker',
      'Kubernetes',
      'AWS Infrastructure',
      'Terraform',
      'UI/UX Design',
      'Figma',
      'Design Systems',
    ],
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#080B14" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@300,400,500,600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground" suppressHydrationWarning>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
