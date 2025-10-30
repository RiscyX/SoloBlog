import LoginForm from "./LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg w-full h-1/2">
      <div className="w-full max-w-xl px-12 py-12 bg-card rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-fg mb-2">Welcome Back!</h1>
          <p className="text-muted">Sign in to continue your journey.</p>
        </div>
        <LoginForm />
        <div className="text-center mt-6 text-muted text-md">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:text-accent transition-colors">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
