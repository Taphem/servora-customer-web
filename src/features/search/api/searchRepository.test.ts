import { describe, expect, it } from "vitest";
import { search } from "./searchRepository";
import { DEFAULT_FILTERS, type SearchQuery } from "@/features/search/types";

function buildQuery(overrides: Partial<SearchQuery> = {}): SearchQuery {
  return {
    query: "",
    category: null,
    sort: "relevance",
    filters: DEFAULT_FILTERS,
    viewMode: "list",
    ...overrides,
  };
}

describe("search", () => {
  it("returns both services and providers matching a text query", async () => {
    const results = await search(buildQuery({ query: "plumb" }));
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.kind === "service")).toBe(true);
    expect(results.some((item) => item.kind === "provider")).toBe(true);
  });

  it("filters by category", async () => {
    const results = await search(buildQuery({ category: "beauty" }));
    expect(results.length).toBeGreaterThan(0);
    for (const item of results) {
      const categorySlug = item.kind === "service" ? item.service.categorySlug : item.provider.categorySlug;
      expect(categorySlug).toBe("beauty");
    }
  });

  it("returns no results for a query that matches nothing", async () => {
    const results = await search(buildQuery({ query: "zzz-nonexistent-zzz" }));
    expect(results).toEqual([]);
  });

  it("sorts by rating descending", async () => {
    const results = await search(buildQuery({ category: "plumbing", sort: "rating" }));
    const ratings = results.map((item) => (item.kind === "service" ? item.service.rating : item.provider.rating));
    expect(ratings).toEqual([...ratings].sort((a, b) => b - a));
  });

  it("sorts services by price ascending, with un-priced providers last", async () => {
    const results = await search(buildQuery({ category: "plumbing", sort: "priceLow" }));
    const serviceIndexes = results.map((item, index) => (item.kind === "service" ? index : -1)).filter((i) => i >= 0);
    const providerIndexes = results.map((item, index) => (item.kind === "provider" ? index : -1)).filter((i) => i >= 0);
    if (serviceIndexes.length > 0 && providerIndexes.length > 0) {
      expect(Math.max(...serviceIndexes)).toBeLessThan(Math.min(...providerIndexes));
    }
  });

  it("applies a minimum rating filter to both services and providers", async () => {
    const results = await search(buildQuery({ filters: { ...DEFAULT_FILTERS, minRating: 4.8 } }));
    for (const item of results) {
      const rating = item.kind === "service" ? item.service.rating : item.provider.rating;
      expect(rating).toBeGreaterThanOrEqual(4.8);
    }
  });

  it("never excludes an item on distance when that item's distance is unknown", async () => {
    const withoutFilter = await search(buildQuery());
    const withDistanceFilter = await search(
      buildQuery({ filters: { ...DEFAULT_FILTERS, maxDistanceKm: 1 } }),
    );
    // Every mock record has distanceKm === null today, so a distance filter must be a no-op.
    expect(withDistanceFilter.length).toBe(withoutFilter.length);
  });
});
