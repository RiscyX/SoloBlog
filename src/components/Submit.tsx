import { useFormStatus } from "react-dom";

interface SubmitProps {
  mode: string;
  disableMode: string;
}

export default function Submit({ mode, disableMode }: SubmitProps) {
  const { pending } = useFormStatus();

  return (
    <p className="actions">
      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 px-4 bg-primary hover:bg-accent text-primary-foreground font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? disableMode : mode}
      </button>
    </p>
  );
}
