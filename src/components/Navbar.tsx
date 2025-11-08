//"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

import ThemeToggle from "./theme-toggle.tsx";
import BrandMark from "./Brandmark.tsx";

type NavbarProps = {
  user: User | null;
};

export default function Navbar({ user }: NavbarProps) {
  return (
    <header className="sticky top-4 z-30 w-full px-4">
      <nav className="flex w-full items-center justify-between gap-4 px-6 py-3 rounded-lg bg-background shadow-sm">
        <Link
          href="/"
          className="flex items-center gap-3 text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <BrandMark />
          <span className="text-lg font-semibold">SoloBlog</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          {!user ? (
            <>
              <Link href="/login" className="link">
                Login
              </Link>
              <Link href="/register" className="btn">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="link">
                Dashboard
              </Link>
              <form action="/logout" method="POST">
                <button type="submit" className="btn-outline">
                  Logout
                </button>
              </form>
            </>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
