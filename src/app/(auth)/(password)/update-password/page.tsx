"use client";

import UpdatePasswordForm from "./UpdatePasswordForm";

export default function UpdatePasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg w-full h-1/2">
      <div className="w-full max-w-xl px-12 py-12 bg-card rounded-2xl dark:shadow-md dark:shadow-primary">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-fg mb-2">
            Set a new password
          </h1>
          <p className="text-muted">Type in your new password below.</p>
        </div>
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
