import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function Logo() {
  return (
    <Link
      href={ROUTES.home}
      className="flex shrink-0 items-center gap-2 rounded-(--radius-sm)"
      aria-label="Servora home"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-(--radius-md) bg-primary text-small font-semibold text-text-inverse">
        S
      </span>
      <span className="hidden text-h4 font-display font-medium text-text-primary sm:inline">
        Servora
      </span>
    </Link>
  );
}
