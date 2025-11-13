import { Metadata } from "next";

import ErrorActions from "./ErrorActions";

export const metadata: Metadata = {
  title: "Error | SoloBlog",
  description: "Something went wrong. Please try again.",
};

export default function ErrorPage({ searchParams }: { searchParams?: { message?: string, from?: string } }) {
  const message = searchParams?.message ?? "Sorry, something went wrong";
  const from = searchParams?.from;
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-2">Error</h1>
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
      {
        // Display navigation link based on 'from' parameter
        // If 'from' is 'register', show link to the Register page; otherwise, show link to Login page
        // This is handled inside the ErrorActions component
      }
      <ErrorActions from={from} />
    </div>
  );
}