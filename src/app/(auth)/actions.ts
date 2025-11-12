"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
//import { useRouter } from "next/navigation";

export type FormState = {
  error: string | null;
};

export async function login(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      return { error: "Verify your email before you login." };
    }
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Invalid login credentials." };
    }
    console.error("Login Error:", error.message);
    return { error: "Login failed." };
  }

  revalidatePath("/", "layout");

  redirect("/profile");
}

export async function register(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const headersList = await headers();
  const origin = headersList.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL!;

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/confirm`,
    },
  });

  if (error) {
    if (error.message.includes("User already registered")) {
      return { error: "This email is already registered." };
    }
    return { error: "Could not register user." };
  }

  redirect("/verify");
}

export async function requestPasswordReset(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") ?? "");

  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/update-password`,
  });

  return { error: null };
}

export async function updateUserPassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  const passwordAgain = String(formData.get("passwordAgain") ?? "");

  if (password !== passwordAgain) {
    return { error: "Passwords do not match." };
  }
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  // Force logout after password update
  await supabase.auth.signOut();

  
  // Then redirect to login page with a message
  redirect("/login?message=password-updated");
}
