import { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";

import type { Metadata } from "next";
import "./globals.css";
import { Solway } from "next/font/google";
import Navbar from "@/components/Navbar";

export const solway = Solway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-solway",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Blog CMS",
  description:
    "Blog CMS built with Next.js and TypeScript powered with Supabase",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  // Securely get the user on the server
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={`${solway.variable} antialiased`}>
      <body className="min-h-screen bg-bg text-fg transition-colors">
        <Navbar user={user}/>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
