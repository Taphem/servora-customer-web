import { Sparkles, Wrench, Zap, Scissors, Cog, PaintRoller, Truck, Car, Tag } from "lucide-react";
import type { ComponentType } from "react";

/**
 * Category-slug → icon lookup, kept separate from `data/categories.mock.ts`
 * on purpose: a service/provider card only ever knows a `categorySlug`
 * string (a stable identifier a real backend would use too), never a
 * `Category` record — so this stays a small presentation concern, not
 * another place UI components read mock data from directly.
 */
const CATEGORY_ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  "home-cleaning": Sparkles,
  plumbing: Wrench,
  electrical: Zap,
  beauty: Scissors,
  "appliance-repair": Cog,
  painting: PaintRoller,
  moving: Truck,
  "car-services": Car,
};

const DEFAULT_CATEGORY_ICON = Tag;

export function iconForCategory(categorySlug: string) {
  return CATEGORY_ICONS[categorySlug] ?? DEFAULT_CATEGORY_ICON;
}
