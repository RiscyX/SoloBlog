"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import BrandMark from "./Brandmark";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  return (
    <>
      <header className="sticky top-4 z-30 w-full px-4">
        <nav className="flex w-full items-center justify-between gap-4 px-6 py-3 rounded-lg bg-background shadow-sm">
          <Link
            href="/"
            className="flex items-center gap-3 text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <BrandMark />
            <span className="text-lg font-semibold">SoloBlog</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden items-center gap-2 sm:flex sm:gap-3">
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

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-slate-900 dark:text-slate-200 dark:shadow-[inset_0_0_0_1px_rgba(148,163,184,0.15)] sm:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            <MenuIcon isOpen={isMenuOpen} />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-50 overflow-hidden bg-secondary transition-all duration-300 ease-in-out sm:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col overflow-hidden">
          {/* Mobile menu header - matches navbar layout */}
          <div className="px-4 pt-4">
            <div className="flex w-full items-center justify-end gap-4 px-2 py-2">
              {/* Animated close button */}
              <button
                onClick={toggleMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-slate-900 dark:text-slate-200 dark:shadow-[inset_0_0_0_1px_rgba(148,163,184,0.15)]"
                aria-label="Close menu"
              >
                <span className="sr-only">Close menu</span>
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Mobile menu content */}
          <div
            className={`flex flex-1 flex-col items-center justify-center px-6 transition-all duration-500 ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex items-center gap-8">
              <Image
                src="/avatar-placeholder.svg"
                alt="Profile avatar"
                width={80}
                height={80}
                className="h-20 w-20 rounded-full border border-border/50 bg-card object-cover"
                priority
              />

              <ThemeToggle size="large" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        className={`origin-center transition-all duration-300 ${
          isOpen ? "translate-y-[6px] rotate-45" : ""
        }`}
      />
      <line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        className={`transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <line
        x1="3"
        y1="18"
        x2="21"
        y2="18"
        className={`origin-center transition-all duration-300 ${
          isOpen ? "-translate-y-[6px] -rotate-45" : ""
        }`}
      />
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      className="h-6 w-6 transition-transform duration-300 hover:rotate-90"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
};

export default Navbar;
