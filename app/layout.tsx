import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { type ReactNode } from "react";

const FigtreeFont = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aegis Waitlist',
  description:
    'Join the exclusive Aegis waitlist and be the first to the programming language revolution.',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon-96x96.png',
    },
    {
      rel: 'manifest',
      url: '/site.webmanifest',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <meta property="og:image" content="/opengraph-image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="832" />
      <meta property="og:site_name" content="Aegis Waitlist" />
      <meta property="og:url" content="https://aegislang.com/" />
      <meta name="twitter:image" content="/twitter-image.png" />
      <meta name="twitter:image:type" content="image/png" />
      <meta name="twitter:image:width" content="1280" />
      <meta name="twitter:image:height" content="832" />
      <body className={FigtreeFont.className}>
        <Header />
        {children}
        <Toaster richColors position="top-center" />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
