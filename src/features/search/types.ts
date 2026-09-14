import type { Service } from "@/features/services/types";
import type { Provider } from "@/features/providers/types";
import type { AsyncStatus } from "@/types/common";

export type SortOption = "relevance" | "rating" | "priceLow" | "priceHigh" | "distance";

export type ViewMode = "list" | "map";

export interface SearchFilters {
  maxPrice: number | null;
  minRating: number | null;
  maxDistanceKm: number | null;
}

export const DEFAULT_FILTERS: SearchFilters = {
  maxPrice: null,
  minRating: null,
  maxDistanceKm: null,
};

/**
 * The full shape of a search query — deliberately made of flat,
 * primitive fields so it maps cleanly to URL query params
 * (`/search?q=plumber&category=plumbing`) later. Only `query` and
 * `category` are synced with the URL today (see `useSearchState`);
 * `sort`, `filters`, and `viewMode` stay in-memory for this milestone.
 */
export interface SearchQuery {
  query: string;
  /** Category slug, or null for "all categories". */
  category: string | null;
  sort: SortOption;
  filters: SearchFilters;
  viewMode: ViewMode;
}

export type SearchResultItem =
  | { kind: "service"; service: Service }
  | { kind: "provider"; provider: Provider };

export interface SearchResultsState {
  status: AsyncStatus;
  items: SearchResultItem[];
  error: string | null;
}
