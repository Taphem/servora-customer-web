import { MOCK_PROVIDERS } from "@/features/providers/data/providers.mock";
import type { Provider } from "@/features/providers/types";
import { simulateLatency } from "@/lib/mock/simulateLatency";

/**
 * The provider repository. Every function here returns a Promise and is
 * the ONLY place UI code should read provider data from — components
 * must not import `providers.mock.ts` directly. Replacing these with
 * real `apiRequest()` calls later is a change contained to this file.
 */

export interface ListProvidersParams {
  categorySlug?: string;
  query?: string;
  minRating?: number;
  limit?: number;
}

export async function listProviders(params: ListProvidersParams = {}): Promise<Provider[]> {
  const { categorySlug, query, minRating, limit } = params;
  const normalizedQuery = query?.trim().toLowerCase();

  let results = MOCK_PROVIDERS;

  if (categorySlug) {
    results = results.filter((provider) => provider.categorySlug === categorySlug);
  }

  if (normalizedQuery) {
    results = results.filter(
      (provider) =>
        provider.businessName.toLowerCase().includes(normalizedQuery) ||
        provider.categoryName.toLowerCase().includes(normalizedQuery),
    );
  }

  if (typeof minRating === "number") {
    results = results.filter((provider) => provider.rating >= minRating);
  }

  if (typeof limit === "number") {
    results = results.slice(0, limit);
  }

  return simulateLatency(results);
}

export async function getProvider(slug: string): Promise<Provider | null> {
  const provider = MOCK_PROVIDERS.find((item) => item.slug === slug) ?? null;
  return simulateLatency(provider);
}

/** Home's "Featured" rail — highest-rated verified providers, not a real editorial pick. */
export async function listFeaturedProviders(limit = 4): Promise<Provider[]> {
  const sorted = [...MOCK_PROVIDERS]
    .filter((provider) => provider.verified)
    .sort((a, b) => b.rating - a.rating);
  return simulateLatency(sorted.slice(0, limit));
}
