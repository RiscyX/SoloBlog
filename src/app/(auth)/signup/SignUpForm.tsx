"use client";

import { useActionState } from "react";
import { signup } from "../actions";
import styles from "../auth.module.css";

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form
      action={action}
      className={`flex flex-col items-center ${styles["auth-form"]}`}
    >
      {state?.errors?.general && (
        <p style={{ color: "red" }}>{state.errors.general}</p>
      )}

      <div>
        <label htmlFor="email" className="block mt-4 text-lg">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block mt-4 text-lg">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block mt-4 text-lg">
          Password Again
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`w-full p-2 my-3 text-white rounded ${styles["auth-button"]}`}
      >
        {pending ? "Signing in..." : "Sign Up"}
      </button>
    </form>
  );
}
