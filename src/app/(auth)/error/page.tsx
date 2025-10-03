'use client';

import { use } from "react";

export default function ErrorPage({ searchParams }: { searchParams: Promise<{ message?: string, from?: string }> }) {
  const resolvedSearchParams = use(searchParams);
  const message = resolvedSearchParams.message || "Sorry, something went wrong";
  const from = resolvedSearchParams.from;
  
  return (
    <div>
      <h1>Error</h1>
      <p>
        {message && message !== "Sorry, something went wrong"
          ? (() => {
              try {
                return decodeURIComponent(message);
              } catch (e) {
                return message;
              }
            })()
          : message}
      </p>
      {from === "signup" ? (
        <a href="/signup">Back to Sign Up</a>
      ) : (
        <a href="/login">Back to Login</a>
      )}
    </div>
  );
}