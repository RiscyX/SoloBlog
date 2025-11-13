import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | SoloBlog",
  description: "Verify your email address to complete your registration.",
};

export default function VerifyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg w-4/5 h-2/3">
      <div className="w-full max-w-xl px-12 py-12 bg-card rounded-2xl border border-border dark:shadow-md dark:shadow-primary">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-fg mb-2">Check Your Email</h2>
          <p className="mt-4 text-muted">
            We've sent you a verification link. Please check your email and
            click the link to verify your account.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div className="text-center mt-6 text-muted text-md">
            <p>Didn't receive the email? Check your spam folder or</p>
            <Link
              href="/register"
              className="font-medium text-purple-400 hover:text-purple-300 underline"
            >
              try registering again
            </Link>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/login"
              className="w-full py-3 px-4 bg-primary hover:bg-accent text-primary-foreground font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
