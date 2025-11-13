import { useFormStatus } from "react-dom";

interface SubmitProps {
  mode: string;
  disableMode: string;
  status?: "idle" | "loading" | "success" | "error" | null;
}

export default function Submit({ mode, disableMode, status = null }: SubmitProps) {
  const { pending } = useFormStatus();

  return (
    <p className="actions">
      <button
        type="submit"
        disabled={pending || status === "loading"}
        className="w-full py-3 px-4 bg-primary hover:bg-accent text-primary-foreground font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {(pending || status === 'loading') ? disableMode : mode}
      </button>
    </p>
  );
}
