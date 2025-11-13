"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import Input from "@/components/Input.tsx";
import Submit from "@/components/Submit.tsx";
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
      <Input
        label="New password"
        id="password"
        type="password"
        name="password"
        placeholder="••••••••"
        minLength={8}
        onChange={(e) => setPassword(e.target.value)}
        allowPasswordToggle
        required
      />

      <Input
        label="New password again"
        id="passwordAgain"
        type="password"
        name="passwordAgain"
        placeholder="••••••••"
        minLength={8}
        onChange={(e) => setPasswordAgain(e.target.value)}
        allowPasswordToggle
        required
      />

      <Submit
        mode="Update password"
        disableMode="Updating..."
        status={status}
      />

      {status === "success" && (
        <p className="text-sm text-green-600">Password updated successfully.</p>
      )}
      {status === "error" && err && (
        <div className="space-y-3">
          <div className="text-center text-red-600 text-sm">{err}</div>
          <div className="text-center text-sm">
            <Link href="/forgot-password" className="underline">
              Request a new reset link
            </Link>
          </div>
        </div>
      )}
    </form>
  );
}
