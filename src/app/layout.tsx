import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://carmeloreyes.com'),
  title: 'Carmelo Reyes — I Built a 7-Figure Telecom Company at 22',
  description:
    "I went from $47 in my bank account to building a $1.2M+ eSIM telecom company by 22. Now I'm showing you exactly how I did it — no fluff, just real game.",
  openGraph: {
    title: 'Carmelo Reyes — I Built a 7-Figure Telecom Company at 22',
    description:
      "I went from $47 in my bank account to building a $1.2M+ eSIM telecom company by 22. Now I'm showing you exactly how I did it — no fluff, just real game.",
    url: 'https://carmeloreyes.com',
    siteName: 'Carmelo Reyes',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carmelo Reyes — I Built a 7-Figure Telecom Company at 22',
    description:
      "I went from $47 in my bank account to building a $1.2M+ eSIM telecom company by 22. Now I'm showing you exactly how I did it — no fluff, just real game.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0A0A0A] text-white font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
