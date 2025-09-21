import React from "react";

type Props = {};

export default function Login({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold  mb-1">Login</h1>
      <form
        className="flex flex-col items-center"
        style={{
          backgroundColor: "#1e1b3a",
          width: "300px",
          borderRadius: "8px",
        }}
      >
        <div>
          <p className="mt-4 text-lg">Email</p>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <p className="mt-4 text-lg">Password</p>
          <input
            type="password"
            name="password"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 my-3 text-white rounded"
          style={{
            backgroundColor: "#cba6f7",
            cursor: "pointer",
            width: "209.6px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
