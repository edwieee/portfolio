import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Dock from '@/components/Dock';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Edwin Biju | AI Systems Builder',
  description:
    'I build AI systems. Alone, on purpose. No handoffs, no account managers, no telephone game between what you need and what gets built.',
  keywords: [
    'AI systems',
    'AI automation',
    'AI agents',
    'workflow automation',
    'internal tools',
  ],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Edwin Biju | AI Systems Builder',
    description:
      'I build AI systems. Alone, on purpose. One person, start to finish.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#0A0A0B" />
      </head>
      <body>
        {children}
        <Dock />
      </body>
    </html>
  );
}
