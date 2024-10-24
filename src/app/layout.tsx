import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import OgImage from '../../public/banner.png';
import { Analytics } from '@vercel/analytics/react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Classic Snake Game - Simple and Fun Online Snake Game',
  description:
    'Play the classic Snake Game online! Enjoy this simple and fun web-based Snake Game where you control a snake, eat food, and aim for the highest score. Start playing now and relive the retro gaming experience!',
  metadataBase: new URL('https://snake.pragusga.com'),
  authors: [
    {
      name: 'Taufik Pragusga',
      url: 'https://pragusga.com',
    },
  ],
  abstract:
    'Play the classic Snake Game online! Enjoy this simple and fun web-based Snake Game where you control a snake, eat food, and aim for the highest score. Start playing now and relive the retro gaming experience!',
  applicationName: 'Classic Snake Game',
  alternates: {
    canonical: 'https://snake.pragusga.com',
  },
  category: 'Religion',
  openGraph: {
    type: 'website',
    emails: ['taufik@pragusga.com'],
    title: 'Classic Snake Game - Simple and Fun Online Snake Game',
    description:
      'Play the classic Snake Game online! Enjoy this simple and fun web-based Snake Game where you control a snake, eat food, and aim for the highest score. Start playing now and relive the retro gaming experience!',
    siteName: 'Classic Snake Game',
    countryName: 'Indonesia',
    url: 'https://snake.pragusga.com',
    alternateLocale: 'id_ID',
    images: [
      {
        url: `${OgImage.src}`,
        width: 1200,
        height: 630,
        alt: 'Classic Snake Game - Simple and Fun Online Snake Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pragusga',
    title: 'Classic Snake Game - Simple and Fun Online Snake Game',
    creator: '@pragusga',
    description:
      'Play the classic Snake Game online! Enjoy this simple and fun web-based Snake Game where you control a snake, eat food, and aim for the highest score. Start playing now and relive the retro gaming experience!',
    images: [
      {
        url: `${OgImage.src}`,
        width: 1200,
        height: 630,
        alt: 'Classic Snake Game - Simple and Fun Online Snake Game',
      },
    ],
  },
  keywords: [
    'snake game',
    'classic snake game',
    'game',
    'snake',
    'online snake game',
    'retro snake game',
  ],
  appLinks: {
    web: {
      url: 'https://snake.pragusga.com',
      should_fallback: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
