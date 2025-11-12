"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import UpdatePasswordForm from "./UpdatePasswordForm";

type Status = "checking" | "ok" | "error";

export default function UpdatePasswordPage() {
  const [status, setStatus] = useState<Status>("checking");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const hash = window.location.hash;
    if (!hash.includes("access_token")) {
      setStatus("error");
      setErrorMsg(
        "Invalid or expired recovery link. Please request a new one."
      );
      return;
    }

    const params = new URLSearchParams(
      hash.startsWith("#") ? hash.slice(1) : hash
    );
    const access_token = params.get("access_token") ?? undefined;
    const refresh_token = params.get("refresh_token") ?? undefined;

    (async () => {
      try {
        if (!access_token || !refresh_token) {
          throw new Error("Missing tokens");
        }

        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (error) throw error;

        // check that there is a user
        const { data, error: userError } = await supabase.auth.getUser();
        if (userError || !data.user)
          throw userError ?? new Error("No user in session");

        // delete the hash – clean URL
        history.replaceState(null, "", window.location.pathname);
        setStatus("ok");
      } catch (e) {
        console.error(e);
        setErrorMsg(
          "This recovery link is invalid or expired. Please request a new one."
        );
        setStatus("error");
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg w-full h-1/2">
      <div className="w-full max-w-xl px-12 py-12 bg-card rounded-2xl dark:shadow-md dark:shadow-primary">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-fg mb-2">
            Set New Password
          </h1>
          {status === "ok"  &&(
            <p className="text-muted">Your new password must be different from previously used passwords.</p>
          )}
        </div>
        { status === "checking" && (
          <p className="text-center text-muted">Preparing reset...</p>
        )}
        {/* status === "error" && */ (
          <div className="space-y-3">
            <div className="text-center text-red-600 text-sm">{errorMsg}</div>
            <div className="text-center text-sm">
              <Link href="/forgot-password" className="underline">
                Request a new reset link
              </Link>
            </div>
          </div>
        )}
        {status === "ok" && <UpdatePasswordForm />}
      </div>
    </div>
  );
}
