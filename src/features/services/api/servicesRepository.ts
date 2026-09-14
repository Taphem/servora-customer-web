import { MOCK_CATEGORIES } from "@/features/services/data/categories.mock";
import { MOCK_SERVICES } from "@/features/services/data/services.mock";
import type { Category, Service } from "@/features/services/types";
import { simulateLatency } from "@/lib/mock/simulateLatency";

/**
 * The service/category repository. Every function here returns a Promise
 * and is the ONLY place UI code should read category/service data from —
 * components must not import the `*.mock.ts` files directly. Today these
 * functions resolve local mock data (see `data/`); replacing them with
 * real `apiRequest()` calls against a verified `servora-services`
 * contract later is a change contained entirely to this file.
 */

export interface ListServicesParams {
  categorySlug?: string;
  query?: string;
  limit?: number;
}

export async function listCategories(): Promise<Category[]> {
  return simulateLatency(MOCK_CATEGORIES);
}

export async function getCategory(slug: string): Promise<Category | null> {
  const category = MOCK_CATEGORIES.find((item) => item.slug === slug) ?? null;
  return simulateLatency(category);
}

export async function listServices(params: ListServicesParams = {}): Promise<Service[]> {
  const { categorySlug, query, limit } = params;
  const normalizedQuery = query?.trim().toLowerCase();

  let results = MOCK_SERVICES;

  if (categorySlug) {
    results = results.filter((service) => service.categorySlug === categorySlug);
  }

  if (normalizedQuery) {
    results = results.filter(
      (service) =>
        service.name.toLowerCase().includes(normalizedQuery) ||
        service.categoryName.toLowerCase().includes(normalizedQuery) ||
        service.providerName.toLowerCase().includes(normalizedQuery),
    );
  }

  if (typeof limit === "number") {
    results = results.slice(0, limit);
  }

  return simulateLatency(results);
}

export async function getService(slug: string): Promise<Service | null> {
  const service = MOCK_SERVICES.find((item) => item.slug === slug) ?? null;
  return simulateLatency(service);
}

/**
 * Home's "Recommended" rail. There's no recommendation engine or
 * location-based ranking yet, so this is honestly just the
 * highest-rated services — not personalized, not distance-sorted.
 */
export async function listRecommendedServices(limit = 6): Promise<Service[]> {
  const sorted = [...MOCK_SERVICES].sort((a, b) => b.rating - a.rating);
  return simulateLatency(sorted.slice(0, limit));
}
