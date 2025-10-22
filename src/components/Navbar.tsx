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
          <Image
            src="/avatar-placeholder.svg"
            alt="Profile avatar"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-border/50 bg-card object-cover"
            priority
          />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};



export default Navbar;