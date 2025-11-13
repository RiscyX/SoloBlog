import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  allowPasswordToggle?: boolean;
}

export default function Input({
  label,
  id,
  type = "text",
  allowPasswordToggle = false,
  className = "",
  ...rest
}: InputProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const inputId = id ?? (typeof rest.name === "string" ? rest.name : undefined);
  const showToggle = allowPasswordToggle && type === "password";
  const resolvedType = showToggle ? (isRevealed ? "text" : "password") : type;

  const baseStyles =
    "w-full px-4 py-3 bg-input border border-border rounded-lg text-fg placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all";
  const inputClasses = [baseStyles, showToggle ? "pr-12" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="control no-margin">
      {label !== undefined ? (
        <label
          htmlFor={inputId}
          className="mb-2 block text-md font-medium text-fg"
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          id={inputId}
          type={resolvedType}
          className={inputClasses}
          {...rest}
        />
        {showToggle ? (
          <button
            type="button"
            onClick={() => setIsRevealed((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-fg"
            aria-label={isRevealed ? "Hide password" : "Show password"}
          >
            {isRevealed ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}
