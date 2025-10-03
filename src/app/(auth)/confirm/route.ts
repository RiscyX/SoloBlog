import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/account";

  if (token_hash && type) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error && data.user) {
      // Email confirmed successfully - the confirmed user is now logged in
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      // Error confirming email
      return NextResponse.redirect(
        new URL(
          "/error?message=Invalid%20or%20expired%20confirmation%20link",
          request.url
        )
      );
    }
  }

  // Invalid confirmation link
  return NextResponse.redirect(
    new URL("/error?message=Invalid%20confirmation%20link", request.url)
  );
}
