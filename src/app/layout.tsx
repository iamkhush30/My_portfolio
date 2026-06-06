import type { Metadata } from 'next';
import './globals.css';
import { SmoothScrollProvider } from '@/features/smooth-scroll-provider';

export const metadata: Metadata = {
  title: 'Khush Makwana | Hybrid Engineer & Designer',
  description: 'Portfolio of Khush Makwana, a hybrid engineer specializing in DevOps infrastructure and human-centered UI/UX design. Architecting logic into art.',
  icons: {
    icon: [
      { url: '/favicon.png?v=1', type: 'image/png', sizes: '256x256' },
      { url: '/worldicon.png', type: 'image/png', sizes: 'any' }
    ],
    apple: '/favicon.png?v=1',
    shortcut: '/favicon.png?v=1',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png?v=1" sizes="256x256" />
        <link rel="alternate icon" type="image/png" href="/worldicon.png" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A0F1E" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@300,400,500,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
