"use client";

import { login } from "../actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [state, action] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 px-4 bg-primary hover:bg-accent text-primary-foreground font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Signing in..." : "Sign In"}
      </button>
    );
  }

  return (
    <form action={action} className="space-y-8">
      {state?.errors?.general && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{state.errors.general[0]}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-md font-medium text-fg mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-fg placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
          required
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="block text-md font-medium text-fg">
            Password
          </label>
          <Link 
            href="/forgot-password" 
            className="text-md text-primary hover:text-accent transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-fg placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
