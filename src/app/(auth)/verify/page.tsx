import Link from "next/link";
import styles from "../auth.module.css";

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-md w-full space-y-8 p-8 ${styles["auth-form"]}`}>
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Check Your Email
          </h2>
          <p className="mt-4 text-sm text-gray-300">
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

          <div className="text-center text-sm text-gray-400">
            <p>Didn't receive the email? Check your spam folder or</p>
            <Link
              href="/register"
              className="font-medium text-purple-400 hover:text-purple-300 underline"
            >
              try registering again
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/login"
              className={`inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${styles["auth-button"]} hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}