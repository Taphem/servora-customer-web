import { Compass, Search, LayoutGrid, Users, CalendarCheck, Heart, User } from "lucide-react";
import type { ComponentType } from "react";
import { ROUTES } from "@/constants/routes";

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

/** Shown in the desktop header and, condensed, in the mobile menu. */
export const PRIMARY_NAV: NavItem[] = [
  { label: "Discover", href: ROUTES.home, icon: Compass },
  { label: "Services", href: ROUTES.services, icon: LayoutGrid },
  { label: "Providers", href: ROUTES.providers, icon: Users },
];

/** The mobile bottom tab bar — the customer app's primary on-the-go navigation. */
export const MOBILE_TAB_NAV: NavItem[] = [
  { label: "Home", href: ROUTES.home, icon: Compass },
  { label: "Search", href: ROUTES.search, icon: Search },
  { label: "Bookings", href: ROUTES.bookings, icon: CalendarCheck },
  { label: "Favorites", href: ROUTES.favorites, icon: Heart },
  { label: "Profile", href: ROUTES.profile, icon: User },
];
