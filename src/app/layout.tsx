import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { Header, Footer } from '@/components';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aria Fashion - Timeless Style, Modern Design',
  description:
    'Discover our curated collection of timeless fashion pieces with modern design. Quality, elegance, and style in every piece.',
  keywords: [
    'fashion',
    'clothing',
    'women fashion',
    'men fashion',
    'accessories',
    'online shopping',
  ],
  authors: [{ name: 'Aria Fashion' }],
  creator: 'Aria Fashion',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Aria Fashion - Timeless Style, Modern Design',
    description:
      'Discover our curated collection of timeless fashion pieces with modern design.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Aria Fashion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aria Fashion',
    description:
      'Discover our curated collection of timeless fashion pieces with modern design.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-white text-gray-900">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
