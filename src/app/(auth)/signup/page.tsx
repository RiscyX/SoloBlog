import Link from "next/link";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-1">Create Account</h1>
      <SignUpForm />
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">Log in here</Link>.
      </p>
    </div>
  );
}
