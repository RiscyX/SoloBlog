import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-1">Sign Up</h1>
      <SignUpForm />
    </div>
  );
}
