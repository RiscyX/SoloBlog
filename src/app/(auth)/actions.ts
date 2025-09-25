"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(prevState: any, formData: FormData): Promise<{ errors?: any } | void> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      errors: {
        general: ["All fields are required"],
      },
    };
  }

  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailregex.test(email)) {
    return {
      errors: {
        general: ["Invalid email format"],
      },
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Login error:", error.message);
    redirect(`/error?message=${encodeURIComponent("Login failed. Please check your credentials.")}&from=login`);
  }

  // Check if email is confirmed
  if(data.user && !data.user.email_confirmed_at) {
    return {
      errors: {
        general: ["Please confirm your email before logging in."],
      }
    }
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(prevState: any, formData: FormData): Promise<{ errors?: any } | void> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !password || !confirmPassword) {
    return {
      errors: {
        general: ["All fields are required"],
      },
    };
  }

  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailregex.test(email)) {
    return {
      errors: {
        general: ["Invalid email format"],
      },
    };
  }

  if (password.length < 8) {
    return {
      errors: {
        general: ["Password must be at least 8 characters long"],
      },
    };
  }

  if (password !== confirmPassword) {
    return {
      errors: {
        general: ["Passwords do not match"],
      },
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Signup error:", error.message);
    redirect(`/error?message=${encodeURIComponent("Signup failed. Please try again.")}&from=signup`);
  }

  redirect("/auth/confirm?message=Check your email to confirm your account&from=signup");
}
