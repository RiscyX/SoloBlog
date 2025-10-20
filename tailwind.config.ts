import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg) / <alpha-value>)",
        fg: "hsl(var(--fg) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        success: "hsl(var(--success) / <alpha-value>)",
        warning: "hsl(var(--warning) / <alpha-value>)",
        destructive: "hsl(var(--destructive) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-solway)", "serif"],
        solway: ["var(--font-solway)", "serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 4px 12px hsl(var(--fg) / 0.08)",
        "card-dark": "0 4px 12px hsl(var(--fg) / 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
