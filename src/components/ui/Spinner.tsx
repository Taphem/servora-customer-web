import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: number;
  className?: string;
  label?: string;
  /** Hides this from the accessibility tree — for use inside a control that already announces its own busy/loading state (e.g. Button's `aria-busy`). */
  decorative?: boolean;
}

export function Spinner({ size = 18, className, label = "Loading", decorative = false }: SpinnerProps) {
  return (
    <svg
      role={decorative ? undefined : "status"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn("animate-spin text-current", className)}
      data-motion-exempt
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
        fill="none"
      />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
