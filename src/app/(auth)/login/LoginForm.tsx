"use client";

import { login } from "../actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import styles from "../auth.module.css";



export default function LoginForm() {
  const [state, action] = useActionState(login, undefined);

function SubmitButton() {
  const { pending } = useFormStatus(); // To track the form submission status
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full p-2 my-3 text-white rounded ${styles["auth-button"]}`}
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}

  return (
    <form
      action={action}
      className={`flex flex-col items-center ${styles["auth-form"]}`}
    >
      {state?.errors?.general && (
        <p style={{ color: "red" }}>{state.errors.general[0]}</p>
      )}
      <div>
        <label htmlFor="email" className="block mt-4 text-lg">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block mt-4 text-lg">
          Password:
        </label>
        <input
          id="password"
          type="password"
          name="password"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
}
