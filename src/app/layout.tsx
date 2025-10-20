import type { Metadata } from "next";
import "./globals.css";
import { Solway } from 'next/font/google';

import Navbar from "../components/Navbar";


export const solway = Solway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-solway',
  weight: ['400','500','700'],
});

export const metadata: Metadata = {
  title: "Blog CMS",
  description: "Blog CMS built with Next.js and TypeScript powered with Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${solway.variable} antialiased dark`}>
      <body className="min-h-screen bg-bg text-fg transition-colors">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
