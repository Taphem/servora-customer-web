import Link from "next/link";
import { Search } from "lucide-react";
import { ROUTES } from "@/constants/routes";

/**
 * The header's search/discovery entry point. Links to /search rather than
 * submitting a query itself — the actual search experience is a future
 * milestone; this is only the entry point the shell needs to exist now.
 */
export function SearchEntry() {
  return (
    <Link
      href={ROUTES.search}
      className="flex h-11 w-full max-w-md items-center gap-2.5 rounded-(--radius-full) border border-border-default bg-surface-raised px-4 text-small text-text-secondary transition-colors duration-(--duration-hover) hover:border-border-strong hover:text-text-primary"
    >
      <Search size={16} className="shrink-0" aria-hidden />
      Search services or providers
    </Link>
  );
}
