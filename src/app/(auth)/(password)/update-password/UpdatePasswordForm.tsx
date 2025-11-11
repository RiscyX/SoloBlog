"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function UpdatePasswordForm() {
  const supabase = createClient();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (password !== passwordAgain) {
      setErr("Passwords do not match");
      return;
    }

    setStatus("loading");
    setErr(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
      setErr(error.message);
      return;
    }
    setStatus("success");

    // Force logout after password update
    await supabase.auth.signOut();

    // Then redirect to login page with a message
    router.replace("/login?message=password-updated");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          New password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="passwordAgain" className="block text-sm font-medium">
          New password again
        </label>
        <input
          id="passwordAgain"
          type="password"
          required
          minLength={8}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md border px-3 py-2 text-sm font-medium"
      >
        {status === "loading" ? "Updating..." : "Update password"}
      </button>

      {status === "success" && (
        <p className="text-sm text-green-600">Password updated successfully.</p>
      )}
      {status === "error" && err && (
        <p className="text-sm text-red-600">{err}</p>
      )}
    </form>
  );
}
