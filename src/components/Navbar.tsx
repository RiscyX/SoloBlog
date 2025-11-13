"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import ThemeToggle from "./theme-toggle";
import BrandMark from "./Brandmark";

type NavbarProps = {
  user: User | null;
};

const Navbar = ({ user }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopUserMenuOpen, setIsDesktopUserMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const desktopUserMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileUserMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    const nextMenuState = !isMenuOpen;
    setIsMenuOpen(nextMenuState);
    setIsDesktopUserMenuOpen(false);
    setIsMobileUserMenuOpen(false);
  };

  const toggleDesktopUserMenu = () => {
    setIsDesktopUserMenuOpen((prev) => !prev);
    setIsMobileUserMenuOpen(false);
  };

  const toggleMobileUserMenu = () => {
    setIsMobileUserMenuOpen((prev) => !prev);
    setIsDesktopUserMenuOpen(false);
  };

  useEffect(() => {
    if (!isDesktopUserMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node | null;
      if (desktopUserMenuRef.current && targetNode && !desktopUserMenuRef.current.contains(targetNode)) {
        setIsDesktopUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDesktopUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDesktopUserMenuOpen]);

  useEffect(() => {
    if (!isMobileUserMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node | null;
      if (mobileUserMenuRef.current && targetNode && !mobileUserMenuRef.current.contains(targetNode)) {
        setIsMobileUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileUserMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  return (
    <>
      <header className="sticky top-4 z-30 w-full px-4">
        <nav className="flex w-full items-center justify-between gap-4 px-2 py-2">
          <Link
            href="/"
            className="flex items-center gap-3 text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <BrandMark />
            <span className="text-xl font-semibold sm:text-lg">SoloBlog</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden items-center gap-2 sm:flex sm:gap-3">
            {!user ? (
              <>
                <Link href="/login" className="link">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-center py-3 px-4 bg-primary hover:bg-accent text-primary-foreground font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="relative" ref={desktopUserMenuRef}>
                  <button
                    type="button"
                    onClick={toggleDesktopUserMenu}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-haspopup="menu"
                    aria-expanded={isDesktopUserMenuOpen}
                    aria-label="Open user menu"
                  >
                    <Image
                      src="/avatar-placeholder.svg"
                      alt="Profile avatar"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                      priority
                    />
                  </button>
                  {isDesktopUserMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 rounded-xl border border-border/60 bg-card shadow-card z-40 transition-all duration-150 ease-out"
                      role="menu"
                      aria-hidden={!isDesktopUserMenuOpen}
                      tabIndex={-1}
                    >
                      <ul className="py-2" aria-label="User options">
                        <li>
                          <Link
                            href="/profile"
                            className="flex items-center px-4 py-2 text-sm text-fg transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            role="menuitem"
                            onClick={() => setIsDesktopUserMenuOpen(false)}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <form
                            action="/logout"
                            method="POST"
                            onSubmit={() => {
                              setTimeout(() => setIsDesktopUserMenuOpen(false), 0);
                            }}
                          >
                            <button
                              type="submit"
                              className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-destructive transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                              Logout
                            </button>
                          </form>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
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
            <div className="flex flex-col items-center gap-8">
              {!user ? (
                <>
                  <Link href="/login" className="link text-2xl">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-2xl text-center py-3 px-4 bg-primary hover:bg-accent text-primary-foreground font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <div className="relative w-full max-w-xs" ref={mobileUserMenuRef}>
                    <button
                      type="button"
                      onClick={toggleMobileUserMenu}
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-border/50 bg-card transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      aria-haspopup="menu"
                      aria-expanded={isMobileUserMenuOpen}
                      aria-label="Open user menu"
                    >
                      <Image
                        src="/avatar-placeholder.svg"
                        alt="Profile avatar"
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-full object-cover"
                        priority
                      />
                    </button>
                    {isMobileUserMenuOpen && (
                      <div
                        className="mt-4 w-full rounded-xl border border-border/60 bg-card shadow-card transition-all duration-150 ease-out"
                        role="menu"
                        aria-hidden={!isMobileUserMenuOpen}
                        tabIndex={-1}
                      >
                        <ul className="py-2" aria-label="User options">
                          <li>
                            <Link
                              href="/profile"
                              className="flex items-center justify-center px-4 py-2 text-lg text-fg transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                              role="menuitem"
                              onClick={() => {
                                setIsMobileUserMenuOpen(false);
                                setIsMenuOpen(false);
                              }}
                            >
                              Profile
                            </Link>
                          </li>
                          <li>
                            <form
                              action="/logout"
                              method="POST"
                              onSubmit={() => {
                                setTimeout(() => {
                                  setIsMobileUserMenuOpen(false);
                                  setIsMenuOpen(false);
                                }, 0);
                              }}
                            >
                              <button
                                type="submit"
                                className="flex w-full items-center justify-center px-4 py-2 text-lg text-destructive transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                              >
                                Logout
                              </button>
                            </form>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}
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
