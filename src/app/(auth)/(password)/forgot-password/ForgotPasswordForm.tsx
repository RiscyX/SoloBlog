"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPasswordForm() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErr(null);

    const origin = typeof window !== "undefined" ? window.location.origin : "";

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/update-password`,
    });

    if (error) {
      setStatus("error");
      setErr(error.message);
      return;
    }
    setStatus("success");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Type in your email address so we can send you a password reset link.
        </label>
        <input
          id="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md border px-3 py-2 text-sm font-medium"
      >
        {status === "loading" ? "Sending..." : "Send reset link"}
      </button>

      {status === "success" && (
        <p className="text-sm text-green-600">
          Check your email for the reset link.
        </p>
      )}
      {status === "error" && err && (
        <p className="text-sm text-red-600">{err}</p>
      )}
    </form>
  );
}
