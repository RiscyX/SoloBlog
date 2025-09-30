import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { solway } from "./fonts";


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
    <html lang="en" className={`${solway.variable} antialiased`}>
      <body
      >
        {children}
      </body>
    </html>
  );
}
