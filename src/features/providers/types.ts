export interface Provider {
  id: string;
  slug: string;
  businessName: string;
  categorySlug: string;
  categoryName: string;
  rating: number;
  reviewCount: number;
  /** A human-facing description of where this provider operates, e.g. "Serves North Austin". Not derived from real geocoding yet. */
  serviceArea: string;
  /** Distance from the customer's resolved location, in km — null until real location + provider service-area data exists. */
  distanceKm: number | null;
  /**
   * Reflects that this provider completed Servora's own verification flow —
   * never used to imply anything not actually true of the mock record.
   */
  verified: boolean;
  /** Deterministic placeholder art token (see MarketImage) — not a real photo. */
  imageSeed: string;
}
