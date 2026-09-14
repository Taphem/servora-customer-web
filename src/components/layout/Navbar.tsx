import Link from "next/link";
import { Search, Heart, CalendarCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { NavLink } from "@/components/layout/NavLink";
import { SearchEntry } from "@/components/layout/SearchEntry";
import { LocationButton } from "@/components/layout/LocationButton";
import { AuthArea } from "@/components/layout/AuthArea";
import { PRIMARY_NAV } from "@/constants/nav";
import { ROUTES } from "@/constants/routes";

const iconLinkStyles =
  "flex h-11 w-11 items-center justify-center rounded-(--radius-md) text-text-secondary transition-colors duration-(--duration-hover) hover:bg-ink-50 hover:text-text-primary";

export function Navbar() {
  return (
    <header className="sticky top-0 z-(--z-nav) border-b border-border-default bg-surface/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center gap-3">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {PRIMARY_NAV.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="hidden flex-1 justify-center px-2 lg:flex">
          <SearchEntry />
        </div>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          <LocationButton />
          <Link href={ROUTES.favorites} aria-label="Favorites" className={iconLinkStyles}>
            <Heart size={18} />
          </Link>
          <Link href={ROUTES.bookings} aria-label="Bookings" className={iconLinkStyles}>
            <CalendarCheck size={18} />
          </Link>
          <div className="ml-2">
            <AuthArea />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <Link href={ROUTES.search} aria-label="Search" className={iconLinkStyles}>
            <Search size={20} />
          </Link>
          <LocationButton iconOnly />
        </div>
      </Container>
    </header>
  );
}
