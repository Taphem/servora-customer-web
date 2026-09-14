"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOBILE_TAB_NAV } from "@/constants/nav";
import { cn } from "@/lib/utils";

/**
 * The customer app's primary mobile navigation — an always-visible bottom
 * tab bar (Home/Search/Bookings/Favorites/Profile), not a hamburger menu.
 * This is deliberately a different pattern from provider-side navigation.
 */
export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-(--z-nav) flex border-t border-border-default bg-surface-raised pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      {MOBILE_TAB_NAV.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-caption font-medium text-text-tertiary",
              isActive && "text-primary",
            )}
          >
            <Icon size={22} className="shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
