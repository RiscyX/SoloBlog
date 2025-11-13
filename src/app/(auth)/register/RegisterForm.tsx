"use client";

import { useActionState } from "react";
import { register } from "../actions";
import Submit from "@/components/Submit";
import Input from "@/components/Input";

type FormState = { error: string | null };

export default function RegisterForm() {
  const initialState: FormState = { error: null };

  const [formState, formAction] = useActionState<FormState, FormData>(
    register,
    initialState
  );

  return (
    <form action={formAction} className="space-y-8">
      <Input
        label="Email"
        id="email"
        type="email"
        name="email"
        placeholder="you@example.com"
        required
      />

      <Input
        label="Password"
        id="password"
        type="password"
        name="password"
        placeholder="••••••••"
        allowPasswordToggle
        required
      />

      <Input
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        placeholder="••••••••"
        allowPasswordToggle
        required
      />
      {formState?.error && <p className="text-red-500">{formState.error}</p>}
      <Submit mode="Register" disableMode="Creating account..." />
    </form>
  );
}
