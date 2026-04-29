import type { Metadata } from 'next';
import './globals.css';
import { SmoothScrollProvider } from '@/components/portfolio/smooth-scroll-provider';

export const metadata: Metadata = {
  title: 'Khush Makwana | Portfolio',
  description: 'A sophisticated blend of DevOps and UI/UX Design',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Clash Display from Fontshare */}
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@300,400,500,600&display=swap" rel="stylesheet" />
        {/* Space Grotesk and DM Mono from Google Fonts */}
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
