import UpdatePasswordForm from "./UpdatePasswordForm";

export default function UpdatePasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg w-full h-1/2">
      <div className="w-full max-w-xl px-12 py-12 bg-card rounded-2xl dark:shadow-md dark:shadow-primary">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-fg mb-2">Set New Password</h1>
          <p className="text-muted">
            Your new password must be different from previously used passwords.
          </p>
          {/*status === "ok" && (
            )*/}
        </div>
        <UpdatePasswordForm />
        {/*status === "checking" && (
            <p className="text-center text-muted">Preparing reset...</p>
          )*/}
      </div>
    </div>
  );
}
