"use client";

import { login, type FormState } from "../actions.ts";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Submit from "@/components/Submit.tsx";
import Input from "@/components/Input.tsx";

export default function LoginForm() {
  const searchParams = useSearchParams();

  const message = searchParams.get("message");

  const [formState, formAction] = useActionState<FormState, FormData>(login, {
    error: null,
  });

  return (
    <>
      {message === "password-updated" && (
        <div className="mb-4 rounded-md border p-3 text-sm bg-emerald-50 border-emerald-200 text-emerald-800">
          Password updated. Please sign in again.
        </div>
      )}
      <form action={formAction} className="space-y-8">
        <div className="space-y-6">
          <Input
            label="Email"
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />

          <div className="space-y-2">
            <Input
              label="Password"
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              allowPasswordToggle
              required
            />
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-md text-primary transition-colors hover:text-accent"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
        {formState?.error && <p className="text-red-500">{formState.error}</p>}
        <Submit mode="Login" disableMode="Logging in..." />
      </form>
    </>
  );
}
