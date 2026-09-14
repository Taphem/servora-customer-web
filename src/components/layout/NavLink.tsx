"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
}

// Takes plain primitives (not the icon-carrying NavItem from
// constants/nav.ts) so a Server Component parent can pass this a prop
// without crossing the Server/Client boundary with a function reference
// — Next.js can't serialize a component function into a Client Component prop.
export function NavLink({ href, label, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-(--radius-md) px-3 py-2 text-small font-medium text-text-secondary transition-colors duration-(--duration-hover) hover:bg-ink-50 hover:text-text-primary",
        isActive && "text-text-primary",
        className,
      )}
    >
      {label}
    </Link>
  );
}
