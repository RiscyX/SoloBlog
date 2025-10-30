import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg w-4/5 h-2/3">
      <div className="w-full max-w-xl px-12 py-12 bg-card rounded-2xl border border-border">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-fg mb-2">Create your Account</h1>
          <p className="text-muted">Join SoloBlog to start your writing journey.</p>
        </div>
        <RegisterForm />
        <div className="text-center mt-6 text-muted text-md">
          Have an account?{" "}
          <Link href="/login" className="text-primary hover:text-accent transition-colors">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
