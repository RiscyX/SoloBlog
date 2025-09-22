import React from "react";
import styles from "../auth.module.css";
import { login } from "../actions";

type Props = {};

export default function Login({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <h1 className="text-4xl font-bold  mb-1">Login</h1>
      <form className={`flex flex-col items-center ${styles["auth-form"]}`}>
        <div>
          <p className="mt-4 text-lg">Email</p>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <p className="mt-4 text-lg">Password</p>
          <input
            type="password"
            name="password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          formAction={login}
          className={`w-full p-2 my-3 text-white rounded ${styles["auth-button"]}`}
        >
          Login
        </button>
      </form>
    </div>
  );
}