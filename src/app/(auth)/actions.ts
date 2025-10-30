"use server";

import {
  isValidEmail,
  isNotEmpty,
  isEqualsToOtherValue,
  hasMinLength,
} from "@/utils/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(prevFormState: any, formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errors = [];

  if (!isNotEmpty(email) || !isNotEmpty(password)) {
    errors.push("All fields are required");
  }

  if (!isValidEmail(email)) {
    errors.push("Invalid email format");
  }

  if (errors.length > 0) {
    return {
      errors: {
        general: errors,
      },
      enteredValues: {
        email,
        password,
      },
    };
  }

  // supabase login
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      errors: {
        general: [error.message],
      },
      enteredValues: {
        email,
        password,
      },
    };
  }

  // Check if email is confirmed
  if (data.user && !data.user.email_confirmed_at) {
    return {
      errors: {
        general: ["Please confirm your email before logging in."],
      },
      enteredValues: {
        email,
        password,
      },
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function register(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  let errors = [];

  if (
    !isNotEmpty(email) ||
    !isNotEmpty(password) ||
    !isNotEmpty(confirmPassword)
  ) {
    errors.push("All fields are required");
  }

  if (!isValidEmail(email)) {
    errors.push("Invalid email format");
  }

  if (!hasMinLength(password, 8)) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!isEqualsToOtherValue(password, confirmPassword)) {
    errors.push("Passwords do not match");
  }

  if (errors.length > 0) {
    return {
      errors: {
        general: errors,
      },
      enteredValues: {
        email,
        password,
        confirmPassword,
      },
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/confirm`,
    },
  });

  if (error) {
    return {
      errors: {
        general: [error.message],
      },
      enteredValues: {
        email,
        password,
        confirmPassword
      },
    };
  }

  redirect(`/verify?email=${encodeURIComponent(email)}`);
}
