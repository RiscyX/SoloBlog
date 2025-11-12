"use client";

import { requestPasswordReset, type FormState } from "../../actions.ts";
import { useState, useActionState, useEffect } from "react";
import Input from "@/components/Input.tsx";
import Submit from "@/components/Submit.tsx";

export default function ForgotPasswordForm() {
  const initialState: FormState = { error: null };
  const [formState, formAction] = useActionState<FormState, FormData>(
    requestPasswordReset,
    initialState
  );

  const [lastSent, setLastSent] = useState<number | null>(null);
  const [isCooldown, setIsCooldown] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const waitTime = 10000; // 10 seconds
  useEffect(() => {
    if (lastSent === null) return;
    
    const id = setInterval(() => {
      setIsCooldown(Date.now() - lastSent < waitTime);
    }, 1000);
    return () => clearInterval(id);
  }, [lastSent]);

  const handleAction = async (formData: FormData) => {
    if (isCooldown) return;
    setLastSent(Date.now());
    setSubmitted(true);
    await formAction(formData);
  };

  return (
    <form action={handleAction} className="space-y-8">
      <div>
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          required
        />
      </div>
      <Submit mode="Reset Password" disableMode="Sending email..." />

      {formState?.error === null && submitted && (
        <p className="text-sm">
          If an account exists with this email a password reset link was sent.
        </p>
      )}

      {formState.error && (
        <p className="text-red-600 text-sm">
          Something went wrong. Please try again later.
        </p>
      )}
    </form>
  );
}
