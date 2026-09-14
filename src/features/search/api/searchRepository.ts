import { listServices } from "@/features/services/api/servicesRepository";
import { listProviders } from "@/features/providers/api/providersRepository";
import type { SearchFilters, SearchQuery, SearchResultItem, SortOption } from "@/features/search/types";

/**
 * Combines the service and provider repositories into one result list.
 * This is local, in-memory filtering/sorting over mock data — kept
 * isolated here (not in any component) specifically so it can be deleted
 * in favor of a real `/api/search`-style call later without UI changes,
 * once that endpoint actually exists (see README's API boundary notes).
 */
export async function search(query: SearchQuery): Promise<SearchResultItem[]> {
  const [services, providers] = await Promise.all([
    listServices({ categorySlug: query.category ?? undefined, query: query.query }),
    listProviders({ categorySlug: query.category ?? undefined, query: query.query }),
  ]);

  const items: SearchResultItem[] = [
    ...services.map((service): SearchResultItem => ({ kind: "service", service })),
    ...providers.map((provider): SearchResultItem => ({ kind: "provider", provider })),
  ];

  return sortResults(applyFilters(items, query.filters), query.sort);
}

function applyFilters(items: SearchResultItem[], filters: SearchFilters): SearchResultItem[] {
  return items.filter((item) => {
    const rating = item.kind === "service" ? item.service.rating : item.provider.rating;
    if (filters.minRating !== null && rating < filters.minRating) {
      return false;
    }

    if (filters.maxPrice !== null && item.kind === "service" && item.service.priceFrom > filters.maxPrice) {
      return false;
    }

    // Distance is only filtered when it's actually known for this item —
    // excluding items with an unknown distance would silently hide real
    // results just because location data doesn't exist yet.
    const distanceKm = item.kind === "service" ? item.service.distanceKm : item.provider.distanceKm;
    if (filters.maxDistanceKm !== null && distanceKm !== null && distanceKm > filters.maxDistanceKm) {
      return false;
    }

    return true;
  });
}

function sortResults(items: SearchResultItem[], sort: SortOption): SearchResultItem[] {
  const withMeta = items.map((item) => ({
    item,
    rating: item.kind === "service" ? item.service.rating : item.provider.rating,
    price: item.kind === "service" ? item.service.priceFrom : null,
    distanceKm: item.kind === "service" ? item.service.distanceKm : item.provider.distanceKm,
  }));

  switch (sort) {
    case "rating":
      withMeta.sort((a, b) => b.rating - a.rating);
      break;
    case "priceLow":
      withMeta.sort((a, b) => comparePrice(a.price, b.price, "asc"));
      break;
    case "priceHigh":
      withMeta.sort((a, b) => comparePrice(a.price, b.price, "desc"));
      break;
    case "distance":
      // Items with an unknown distance stay in place rather than being
      // pushed around by a comparison that has nothing real to compare.
      withMeta.sort((a, b) => {
        if (a.distanceKm === null || b.distanceKm === null) return 0;
        return a.distanceKm - b.distanceKm;
      });
      break;
    case "relevance":
    default:
      break;
  }

  return withMeta.map((entry) => entry.item);
}

function comparePrice(a: number | null, b: number | null, direction: "asc" | "desc"): number {
  // Providers have no price — they sort after every priced service, in
  // either direction, rather than being treated as free or excluded.
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return direction === "asc" ? a - b : b - a;
}
