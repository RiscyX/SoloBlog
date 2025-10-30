'use client';

import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import BrandMark from './Brandmark';

const Navbar = () => {
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
          <Link
            href="/login"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
          >
            Register
          </Link>
          <Link href="/dashboard">
            <Image
              src="/avatar-placeholder.svg"
              alt="Profile avatar"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-border/50 bg-card object-cover"
              priority
            />
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};



export default Navbar;