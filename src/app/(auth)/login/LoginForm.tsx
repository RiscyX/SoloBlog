'use client';

import { useActionState } from "react";
import { login } from "../actions";
import styles from "../auth.module.css";

export default function LoginForm() {
    const [state, action, pending] = useActionState(login, undefined);

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
        <button
          type="submit"
          disabled={pending}
          className={`w-full p-2 my-3 text-white rounded ${styles["auth-button"]}`}
        >
          {pending ? "Logging in..." : "Login"}
        </button>
      </form>
    );
}