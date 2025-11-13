import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg w-full h-1/2">
      <div className="w-full max-w-xl px-12 py-12 bg-card rounded-2xl dark:shadow-md dark:shadow-primary">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-fg mb-2">Forgot password?</h1>
          <p className="text-muted">
            No worries, we'll send you reset instructions.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
