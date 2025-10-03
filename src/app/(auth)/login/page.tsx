import LoginForm from "./LoginForm";
import styles from "../auth.module.css";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-1">Login</h1>
      <LoginForm /> 
    </div>
  );
}
