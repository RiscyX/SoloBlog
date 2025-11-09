'use client';

import { useEffect, useState } from 'react';

type ThemeOption = 'light' | 'dark';

type IconProps = {
  className?: string;
};

type ThemeToggleProps = {
  size?: 'default' | 'large';
};

const ThemeToggle = ({ size = 'default' }: ThemeToggleProps = {}) => {
  const [theme, setTheme] = useState<ThemeOption>('dark');
  const [mounted, setMounted] = useState(false);

  const sizeClasses = size === 'large' ? 'h-20 w-20' : 'h-10 w-10';
  const iconSizeClasses = size === 'large' ? 'h-10 w-10' : 'h-5 w-5';

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const stored = window.localStorage.getItem('theme') as ThemeOption | null;

    if (stored === 'light' || stored === 'dark') {
      root.classList.toggle('dark', stored === 'dark');
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial: ThemeOption = root.classList.contains('dark') || prefersDark ? 'dark' : 'light';
      root.classList.toggle('dark', initial === 'dark');
      setTheme(initial);
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const nextTheme: ThemeOption = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;

    if (nextTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    window.localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  const resolvedTheme: ThemeOption = mounted ? theme : 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={`relative flex ${sizeClasses} items-center justify-center overflow-hidden rounded-full bg-slate-100 text-slate-600 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-slate-900 dark:text-slate-200 dark:shadow-[inset_0_0_0_1px_rgba(148,163,184,0.15)]`}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/35 via-transparent to-black/10 opacity-70 dark:from-white/5 dark:via-transparent dark:to-black/40"
      />
      <SunIcon
        className={`relative ${iconSizeClasses} transition-all duration-200 ${resolvedTheme === 'light' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
      />
      <MoonIcon
        className={`absolute ${iconSizeClasses} transition-all duration-200 ${resolvedTheme === 'dark' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
      />
    </button>
  );
};

const SunIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" opacity="0.2" />
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    stroke="none"
  >
    <path d="M21 12.5a8.5 8.5 0 01-9.5-9.5 8.5 8.5 0 109.5 9.5z" />
  </svg>
);

export default ThemeToggle;
