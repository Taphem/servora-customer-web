import type { ComponentType } from "react";

export interface Category {
  slug: string;
  name: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  /** Shown on the category card — kept short (a few words). */
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  providerId: string;
  providerName: string;
  rating: number;
  reviewCount: number;
  /** Starting price in whole currency units — always a "from" price, never a quote. */
  priceFrom: number;
  priceUnit: "visit" | "hour" | "sqft";
  /** Distance from the customer's resolved location, in km. Only present once a real location + provider service-area calculation exists — never fabricated. */
  distanceKm: number | null;
  /** Deterministic placeholder art token (see MarketImage) — not a real photo. */
  imageSeed: string;
}
